import { NextResponse } from "next/server";
import { CONTACT } from "@/lib/contact";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message || !isEmail(email) || message.length > 5000 || name.length > 120) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const payload = {
    name,
    email,
    message,
    _replyto: email,
    _subject: `Portfolio — ${name}`,
  };

  const formspreeId = process.env.FORMSPREE_ID || process.env.NEXT_PUBLIC_FORMSPREE_ID;
  if (formspreeId) {
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
    return NextResponse.json({ ok: true });
  }

  const to = CONTACT.email;
  if (!to) return NextResponse.json({ ok: false }, { status: 500 });

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      message,
      _subject: `Portfolio — ${name}`,
      _template: "box",
      _captcha: "false",
    }),
  });

  if (!res.ok) return NextResponse.json({ ok: false }, { status: 502 });
  return NextResponse.json({ ok: true });
}
