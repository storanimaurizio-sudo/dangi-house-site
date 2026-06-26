"use client";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/content";

// Chiave pubblica Web3Forms (facoltativa). Se presente, invio email "silenzioso".
// Altrimenti il modulo apre il client email dell'utente verso `toEmail`.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function ContactForm({ locale, toEmail }: { locale: Locale; toEmail: string }) {
  const t = getDict(locale).contatti.form;
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.company) return; // honeypot

    const subject = `DangiHouse — richiesta da ${data.name || ""}`;
    const lines = [
      `Nome: ${data.name || "-"}`,
      `Email: ${data.email || "-"}`,
      `${t.dates}: ${data.dates || "-"}`,
      `${t.guests}: ${data.guests || "-"}`,
      "",
      data.message || ""
    ].join("\n");

    // --- Invio reale via Web3Forms (se configurato) ---
    if (WEB3FORMS_KEY) {
      setStatus("sending");
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject,
            from_name: data.name,
            replyto: data.email,
            email: data.email,
            message: lines
          })
        });
        const out = await res.json();
        setStatus(out.success ? "ok" : "error");
        if (out.success) form.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    // --- Fallback senza configurazione: apre il client email ---
    const mailto = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
    window.location.href = mailto;
    setStatus("ok");
  }

  const field =
    "w-full rounded-lg border border-sand-300 bg-white px-4 py-3 text-sea-700 outline-none focus:border-sea-500";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label className="block">
        <span className="mb-1 block text-sm text-sea-600">{t.name} *</span>
        <input name="name" required className={field} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-sea-600">{t.email} *</span>
        <input name="email" type="email" required className={field} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-sea-600">{t.dates}</span>
        <input name="dates" placeholder="—" className={field} />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm text-sea-600">{t.guests}</span>
        <input name="guests" type="number" min={1} className={field} />
      </label>
      <label className="block md:col-span-2">
        <span className="mb-1 block text-sm text-sea-600">{t.message} *</span>
        <textarea name="message" required rows={5} className={field} />
      </label>
      <div className="md:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-sea-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-sea-700 disabled:opacity-60"
        >
          {status === "sending" ? t.sending : t.send}
        </button>
        {status === "ok" && <p className="mt-3 text-sm text-sea-600">{t.ok}</p>}
        {status === "error" && <p className="mt-3 text-sm text-sun">{t.error}</p>}
      </div>
    </form>
  );
}
