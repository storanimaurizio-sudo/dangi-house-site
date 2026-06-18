import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { getDict } from "@/lib/content";
import { getPrenotazioni, getSite } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const d = await getPrenotazioni(params.lang);
  return buildMetadata({ title: d.seoTitle, description: d.seoDescription, locale: params.lang, path: "prenotazioni" });
}

export default async function PrenotazioniPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const cta = getDict(lang).cta;
  const [d, site] = await Promise.all([getPrenotazioni(lang), getSite()]);
  return (
    <>
      <Hero title={d.h1} subtitle={d.heroSubtitle} />
      <Section intro={d.intro}>
        <div className="grid gap-6 md:grid-cols-3">
          {d.steps.map((s) => (
            <div key={s.title} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200">
              <h3 className="font-serif text-xl text-sea-700">{s.title}</h3>
              <p className="mt-3 text-sea-600/80">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {d.policies.map((p) => (
            <div key={p.title} className="border-l-2 border-sun pl-4">
              <h4 className="font-medium text-sea-700">{p.title}</h4>
              <p className="mt-1 text-sm text-sea-600/80">{p.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href={`/${lang}/contatti`} className="rounded-full bg-sea-600 px-7 py-3 text-sm font-medium text-white hover:bg-sea-700">
            {cta.book}
          </Link>
          <a
            href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-sea-600/30 px-7 py-3 text-sm font-medium text-sea-700 hover:bg-sand-100"
          >
            {cta.whatsapp}
          </a>
        </div>
      </Section>

      <Section title="FAQ" muted>
        <div className="mx-auto max-w-3xl divide-y divide-sand-200">
          {d.faq.map((f) => (
            <details key={f.question} className="group py-4">
              <summary className="cursor-pointer list-none font-medium text-sea-700 marker:hidden">
                {f.question}
              </summary>
              <p className="mt-2 text-sea-600/80">{f.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <CTA title={d.closing.title} body={d.closing.body} href={`/${lang}/contatti`} label={cta.contact} />
    </>
  );
}
