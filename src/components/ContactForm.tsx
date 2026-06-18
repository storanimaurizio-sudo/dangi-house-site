"use client";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/content";

export function ContactForm({ locale }: { locale: Locale }) {
  const t = getDict(locale).contatti.form;
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale })
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  const field = "w-full rounded-lg border border-sand-300 bg-white px-4 py-3 text-sea-700 outline-none focus:border-sea-500";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
      {/* honeypot anti-spam */}
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
