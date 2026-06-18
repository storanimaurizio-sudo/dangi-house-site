import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { getPosizione, getSite } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const d = await getPosizione(params.lang);
  return buildMetadata({ title: d.seoTitle, description: d.seoDescription, locale: params.lang, path: "posizione" });
}

export default async function PosizionePage({ params }: { params: { lang: Locale } }) {
  const [d, site] = await Promise.all([getPosizione(params.lang), getSite()]);
  return (
    <>
      <Hero title={d.h1} subtitle={d.heroSubtitle} />
      <Section intro={d.intro}>
        <div className="grid gap-10 lg:grid-cols-2">
          <ul className="space-y-5">
            {d.places.map((p) => (
              <li key={p.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sand-200">
                <h3 className="font-serif text-xl text-sea-700">{p.name}</h3>
                <p className="mt-2 text-sea-600/80">{p.detail}</p>
              </li>
            ))}
          </ul>
          <div className="overflow-hidden rounded-2xl ring-1 ring-sand-200">
            <iframe
              title="Mappa DangiHouse"
              src={site.mapEmbed}
              className="h-full min-h-[360px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
