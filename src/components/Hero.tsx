import Link from "next/link";

export function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta
}: {
  title: string;
  subtitle?: string;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand-100 to-sand-50">
      {/* onda decorativa */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-60">
        <svg viewBox="0 0 1440 120" className="h-full w-full" preserveAspectRatio="none">
          <path d="M0,64 C240,112 480,16 720,48 C960,80 1200,112 1440,56 L1440,120 L0,120 Z" fill="#E7DAC0" />
        </svg>
      </div>
      <div className="relative mx-auto max-w-content px-5 py-24 md:py-32">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-sea-500">San Salvo Marina · Abruzzo</p>
        <h1 className="max-w-3xl font-serif text-4xl leading-tight text-sea-700 md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-6 max-w-xl text-lg text-sea-600/80">{subtitle}</p>}
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="rounded-full bg-sea-600 px-7 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-sea-700"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-full border border-sea-600/30 px-7 py-3 text-sm font-medium text-sea-700 transition-colors hover:bg-sand-100"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
