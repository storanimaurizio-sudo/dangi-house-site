import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { getServizi } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const d = await getServizi(params.lang);
  return buildMetadata({ title: d.seoTitle, description: d.seoDescription, locale: params.lang, path: "servizi" });
}

export default async function ServiziPage({ params }: { params: { lang: Locale } }) {
  const d = await getServizi(params.lang);
  return (
    <>
      <Hero title={d.h1} subtitle={d.heroSubtitle} />
      <Section intro={d.intro}>
        <div className="grid gap-8 md:grid-cols-3">
          {d.groups.map((g) => (
            <div key={g.title} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200">
              <h3 className="font-serif text-xl text-sea-700">{g.title}</h3>
              <ul className="mt-4 space-y-2 text-sea-600/80">
                {g.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
