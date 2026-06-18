import Link from "next/link";
import { Logo } from "./Logo";
import type { Locale } from "@/lib/i18n";
import { getDict } from "@/lib/content";
import type { SiteInfo } from "@/lib/data";

export function Footer({ locale, site }: { locale: Locale; site: SiteInfo }) {
  const dict = getDict(locale);
  const base = `/${locale}`;
  return (
    <footer className="mt-24 border-t border-sea-700/20 bg-sea-700 text-sand-100">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <Logo variant="dark" className="h-20 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-sand-200/80">{dict.footer.tagline}</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-sand-300">{dict.footer.nav}</h3>
          <ul className="space-y-2 text-sm">
            {dict.nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href ? `${base}/${item.href}` : base} className="text-sand-100/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-sand-300">{dict.footer.contacts}</h3>
          <ul className="space-y-2 text-sm text-sand-100/80">
            <li>{site.address}</li>
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">{site.phone}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-sand-100/15">
        <div className="mx-auto flex max-w-content flex-col gap-1 px-5 py-5 text-xs text-sand-200/60 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. {dict.footer.rights}</span>
          <span>{dict.footer.builtNote}</span>
        </div>
      </div>
    </footer>
  );
}
