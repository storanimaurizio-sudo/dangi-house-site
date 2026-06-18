import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { getDict } from "@/lib/content";
import { getHome } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const d = await getHome(params.lang);
  return buildMetadata({ title: d.seoTitle, description: d.seoDescription, locale: params.lang, path: "" });
}

export default async function HomePage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const cta = getDict(lang).cta;
  const home = await getHome(lang);
  const base = `/${lang}`;
  return (
    <>
      <Hero
        title={home.h1}
        subtitle={home.heroSubtitle}
        primaryCta={{ href: `${base}/prenotazioni`, label: cta.book }}
        secondaryCta={{ href: `${base}/la-casa`, label: cta.discover }}
      />
      <Section intro={home.intro}>
        <div className="grid gap-8 md:grid-cols-3">
          {home.highlights.map((h) => (
            <div key={h.title} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200">
              <h3 className="font-serif text-xl text-sea-700">{h.title}</h3>
              <p className="mt-3 text-sea-600/80">{h.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <CTA title={home.closing.title} body={home.closing.body} href={`${base}/contatti`} label={cta.contact} />
    </>
  );
}
