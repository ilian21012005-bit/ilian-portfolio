import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/contact";
const failure = (status: number) =>
  NextResponse.json({ ok: false }, { status });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return failure(403);
  const size = Number(request.headers.get("content-length") || 0);
  if (size > 20000) return failure(413);
  let body: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 20000) return failure(413);
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return failure(400);
    body = parsed as Record<string, unknown>;
  } catch {
    return failure(400);
  }
  if (typeof body.website === "string" && body.website.trim())
    return NextResponse.json({ ok: true });
  if (
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.message !== "string"
  )
    return failure(400);
  const name = body.name.trim(),
    email = body.email.trim(),
    message = body.message.trim();
  if (
    !name ||
    name.length > 120 ||
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    /[\r\n]/.test(name) ||
    !message ||
    message.length > 5000
  )
    return failure(400);
  const formspree =
    process.env.FORMSPREE_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID;
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
    if (result.success === false || result.success === "false" || result.errors)
      return failure(502);
    return NextResponse.json({ ok: true });
  } catch {
    return failure(502);
  }
}
