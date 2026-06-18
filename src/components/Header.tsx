"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/content";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const dict = getDict(locale);
  const pathname = usePathname();
  const base = `/${locale}`;
  const other: Locale = locale === "it" ? "en" : "it";
  const otherPath = pathname.replace(`/${locale}`, `/${other}`) || `/${other}`;

  return (
    <header className="sticky top-0 z-40 border-b border-sand-200/70 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3">
        <Link href={base} aria-label="DangiHouse home" onClick={() => setOpen(false)}>
          <Logo variant="horizontal" priority className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {dict.nav.map((item) => {
            const href = item.href ? `${base}/${item.href}` : base;
            const active = pathname === href;
            return (
              <Link
                key={item.label}
                href={href}
                className={`text-sm tracking-wide transition-colors hover:text-sea-700 ${
                  active ? "text-sea-700" : "text-sea-600/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={otherPath}
            className="rounded-full border border-sand-300 px-3 py-1 text-xs font-medium uppercase tracking-widest text-sea-600 hover:bg-sand-100"
          >
            {other}
          </Link>
        </nav>

        <button
          className="lg:hidden text-sea-700"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-sea-700" />
          <span className="mt-1.5 block h-0.5 w-6 bg-sea-700" />
          <span className="mt-1.5 block h-0.5 w-6 bg-sea-700" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-sand-200 bg-sand-50 px-5 py-4 lg:hidden">
          {dict.nav.map((item) => {
            const href = item.href ? `${base}/${item.href}` : base;
            return (
              <Link
                key={item.label}
                href={href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sea-700"
              >
                {item.label}
              </Link>
            );
          })}
          <Link href={otherPath} onClick={() => setOpen(false)} className="mt-2 inline-block text-xs uppercase tracking-widest text-sea-600">
            {other === "en" ? "English" : "Italiano"}
          </Link>
        </nav>
      )}
    </header>
  );
}
