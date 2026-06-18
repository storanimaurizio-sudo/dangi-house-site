import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { getDict } from "@/lib/content";
import { getLaCasa, getHome, getApartments } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const d = await getLaCasa(params.lang);
  return buildMetadata({ title: d.seoTitle, description: d.seoDescription, locale: params.lang, path: "la-casa" });
}

const L = {
  it: { homes: "Le nostre case", beds: "posti letto", rooms: "camere", sqm: "m²" },
  en: { homes: "Our homes", beds: "sleeps", rooms: "bedrooms", sqm: "m²" }
};

export default async function LaCasaPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const cta = getDict(lang).cta;
  const t = L[lang];
  const [d, home, apartments] = await Promise.all([getLaCasa(lang), getHome(lang), getApartments(lang)]);
  return (
    <>
      <Hero title={d.h1} subtitle={d.heroSubtitle} />

      {apartments.length > 0 && (
        <Section title={t.homes}>
          <div className="grid gap-6 md:grid-cols-2">
            {apartments.map((a) => (
              <article key={a.title} className="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200">
                <h3 className="font-serif text-2xl text-sea-700">{a.title}</h3>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-sea-500">
                  {a.sleeps ? <span>{a.sleeps} {t.beds}</span> : null}
                  {a.bedrooms ? <span>{a.bedrooms} {t.rooms}</span> : null}
                  {a.sizeSqm ? <span>{a.sizeSqm} {t.sqm}</span> : null}
                </div>
                {a.summary && <p className="mt-3 text-sea-600/80">{a.summary}</p>}
                {a.features && a.features.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {a.features.map((f) => (
                      <li key={f} className="rounded-full bg-sand-100 px-3 py-1 text-xs text-sea-600">{f}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </Section>
      )}

      <Section title={apartments.length > 0 ? undefined : undefined} intro={d.intro} muted={apartments.length > 0}>
        <div className="grid gap-6 md:grid-cols-2">
          {d.sections.map((s) => (
            <div key={s.title} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200">
              <h3 className="font-serif text-2xl text-sea-700">{s.title}</h3>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-sea-600/80">{p}</p>
              ))}
            </div>
          ))}
        </div>
      </Section>

      <CTA title={home.closing.title} body={home.closing.body} href={`/${lang}/prenotazioni`} label={cta.book} />
    </>
  );
}
