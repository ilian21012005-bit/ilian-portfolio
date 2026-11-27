import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/contact";
import { SITE_URL } from "@/lib/site";

const MAX_BODY_BYTES = 20000;
const REQUEST_LIMIT = 30;
const REQUEST_WINDOW_MS = 60_000;
const SUBMISSION_LIMIT = 5;
const SUBMISSION_WINDOW_MS = 15 * 60_000;
const MAX_TRACKED_IPS = 1000;

class SlidingWindowLimiter {
	private readonly hits = new Map<string, number[]>();

	constructor(
		private readonly limit: number,
		private readonly windowMs: number,
	) {}

	check(
		key: string,
		now = Date.now(),
	): { allowed: boolean; retryAfter: number } {
		const cutoff = now - this.windowMs;
		const active = (this.hits.get(key) ?? []).filter((ts) => ts > cutoff);

		if (active.length >= this.limit) {
			this.hits.set(key, active);
			const oldest = active[0] ?? now;
			const retryAfter = Math.max(
				1,
				Math.ceil((oldest + this.windowMs - now) / 1000),
			);
			return { allowed: false, retryAfter };
		}

		active.push(now);
		this.hits.delete(key);
		this.hits.set(key, active);
		this.prune(cutoff);
		return { allowed: true, retryAfter: 0 };
	}

	private prune(cutoff: number) {
		if (this.hits.size <= MAX_TRACKED_IPS) return;
		for (const [key, timestamps] of this.hits) {
			const active = timestamps.filter((ts) => ts > cutoff);
			if (active.length === 0) {
				this.hits.delete(key);
			} else {
				this.hits.set(key, active);
			}
		}
		while (this.hits.size > MAX_TRACKED_IPS) {
			const oldestKey = this.hits.keys().next().value;
			if (oldestKey === undefined) break;
			this.hits.delete(oldestKey);
		}
	}
}

const requestLimiter = new SlidingWindowLimiter(
	REQUEST_LIMIT,
	REQUEST_WINDOW_MS,
);
const submissionLimiter = new SlidingWindowLimiter(
	SUBMISSION_LIMIT,
	SUBMISSION_WINDOW_MS,
);

const ALLOWED_ORIGINS = new Set<string>();
try {
	ALLOWED_ORIGINS.add(new URL(SITE_URL).origin);
} catch {
	// Ignore invalid SITE_URL configuration
}

const failure = (status: number) =>
	NextResponse.json({ ok: false }, { status });

const rateLimited = (retryAfter: number) =>
	NextResponse.json(
		{ ok: false },
		{ status: 429, headers: { "Retry-After": String(retryAfter) } },
	);

function getClientIp(request: Request): string {
	const vercelForwarded = request.headers.get("x-vercel-forwarded-for");
	if (vercelForwarded) {
		const first = vercelForwarded.split(",")[0]?.trim();
		if (first) return first.slice(0, 64);
	}
	const realIp = request.headers.get("x-real-ip")?.trim();
	if (realIp) return realIp.slice(0, 64);
	const forwardedFor = request.headers.get("x-forwarded-for");
	if (forwardedFor) {
		const first = forwardedFor.split(",")[0]?.trim();
		if (first) return first.slice(0, 64);
	}
	return "unknown";
}

function isAllowedOrigin(request: Request): boolean {
	const origin = request.headers.get("origin");
	if (!origin) return true;
	try {
		const originUrl = new URL(origin).origin;
		const requestOrigin = new URL(request.url).origin;
		return originUrl === requestOrigin || ALLOWED_ORIGINS.has(originUrl);
	} catch {
		return false;
	}
}

function hasControlChars(value: string): boolean {
	for (let i = 0; i < value.length; i++) {
		const code = value.charCodeAt(i);
		if (code <= 0x1f || code === 0x7f || code === 0x2028 || code === 0x2029) {
			return true;
		}
	}
	return false;
}

async function readJsonBodyWithLimit(
	request: Request,
	maxBytes: number,
): Promise<
	{ ok: true; data: Record<string, unknown> } | { ok: false; status: 400 | 413 }
> {
	const reader = request.body?.getReader();
	if (!reader) return { ok: false, status: 400 };

	const chunks: Uint8Array[] = [];
	let totalBytes = 0;

	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			if (!value) continue;
			totalBytes += value.byteLength;
			if (totalBytes > maxBytes) {
				await reader.cancel().catch(() => undefined);
				return { ok: false, status: 413 };
			}
			chunks.push(value);
		}
	} catch {
		return { ok: false, status: 400 };
	}

	const bytes = new Uint8Array(totalBytes);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}

	try {
		const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
		const parsed: unknown = JSON.parse(text);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
			return { ok: false, status: 400 };
		}
		return { ok: true, data: parsed as Record<string, unknown> };
	} catch {
		return { ok: false, status: 400 };
	}
}

export async function POST(request: Request) {
	const clientIp = getClientIp(request);
	const reqLimit = requestLimiter.check(clientIp);
	if (!reqLimit.allowed) return rateLimited(reqLimit.retryAfter);

	if (!isAllowedOrigin(request)) return failure(403);

	const contentType = request.headers
		.get("content-type")
		?.split(";")[0]
		?.trim()
		.toLowerCase();
	if (contentType !== "application/json") return failure(400);

	const contentLengthHeader = request.headers.get("content-length");
	if (contentLengthHeader !== null) {
		const trimmed = contentLengthHeader.trim();
		if (!/^\d+$/.test(trimmed)) return failure(400);
		const declaredLength = Number(trimmed);
		if (!Number.isSafeInteger(declaredLength) || declaredLength < 0) {
			return failure(400);
		}
		if (declaredLength > MAX_BODY_BYTES) return failure(413);
	}

	const parsed = await readJsonBodyWithLimit(request, MAX_BODY_BYTES);
	if (!parsed.ok) return failure(parsed.status);
	const body = parsed.data;

	if (typeof body.website === "string" && body.website.trim()) {
		return NextResponse.json({ ok: true });
	}

	if (
		typeof body.name !== "string" ||
		typeof body.email !== "string" ||
		typeof body.message !== "string"
	) {
		return failure(400);
	}

	const name = body.name.trim();
	const email = body.email.trim();
	const message = body.message.trim();

	if (
		!name ||
		name.length > 120 ||
		hasControlChars(name) ||
		!email ||
		email.length > 254 ||
		hasControlChars(email) ||
		/[,;<>]/.test(email) ||
		!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
		!message ||
		message.length > 5000
	) {
		return failure(400);
	}

	const subLimit = submissionLimiter.check(clientIp);
	if (!subLimit.allowed) return rateLimited(subLimit.retryAfter);

	const formspree = process.env.FORMSPREE_ID?.trim();
	const endpoint = formspree
		? `https://formspree.io/f/${encodeURIComponent(formspree)}`
		: `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT.email)}`;

	try {
		const res = await fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				message,
				_replyto: email,
				_subject: `Portfolio — ${name}`,
			}),
			signal: AbortSignal.timeout(10000),
		});
		if (!res.ok) return failure(502);
		const result = await res.json();
		if (
			result.success === false ||
			result.success === "false" ||
			result.errors
		) {
			return failure(502);
		}
		return NextResponse.json({ ok: true });
	} catch {
		return failure(502);
	}
}
