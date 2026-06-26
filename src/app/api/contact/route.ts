import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  dates?: string;
  guests?: string;
  message?: string;
  company?: string; // honeypot
  locale?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot: se compilato è spam → fingiamo successo.
  if (body.company) return NextResponse.json({ ok: true });

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  const to = process.env.CONTACT_TO_EMAIL || "info@dangihouse.it";
  const resendKey = process.env.RESEND_API_KEY;

  const subject = `DangiHouse — richiesta da ${body.name}`;
  const text = [
    `Nome: ${body.name}`,
    `Email: ${body.email}`,
    `Date: ${body.dates || "-"}`,
    `Ospiti: ${body.guests || "-"}`,
    `Lingua: ${body.locale || "-"}`,
    "",
    body.message
  ].join("\n");

  // Invio via Resend se configurato; altrimenti log lato server (utile in dev).
  if (resendKey) {
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "DangiHouse <noreply@dangihouse.it>",
          to: [to],
          reply_to: body.email,
          subject,
          text
        })
      });
      if (!r.ok) {
        console.error("Resend error", await r.text());
        return NextResponse.json({ error: "Email provider error" }, { status: 502 });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Email provider unreachable" }, { status: 502 });
    }
  } else {
    console.log("[contact] (no email provider configured)\n", text);
  }

  return NextResponse.json({ ok: true });
}
