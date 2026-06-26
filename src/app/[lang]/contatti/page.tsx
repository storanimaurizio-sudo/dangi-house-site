import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { getDict } from "@/lib/content";
import { getContatti, getSite } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const d = await getContatti(params.lang);
  return buildMetadata({ title: d.seoTitle, description: d.seoDescription, locale: params.lang, path: "contatti" });
}

export default async function ContattiPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const cta = getDict(lang).cta;
  const [d, site] = await Promise.all([getContatti(lang), getSite()]);
  return (
    <>
      <Hero title={d.h1} subtitle={d.heroSubtitle} />
      <Section intro={d.intro}>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm locale={lang} toEmail={site.email} />
          <aside className="space-y-6">
            <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-sand-200">
              <h3 className="font-serif text-xl text-sea-700">{site.name}</h3>
              <ul className="mt-4 space-y-2 text-sea-600/80">
                <li>{site.address}</li>
                <li><a className="hover:text-sea-700" href={`mailto:${site.email}`}>{site.email}</a></li>
                <li><a className="hover:text-sea-700" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
              </ul>
              <a
                href={`https://wa.me/${site.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-full bg-sea-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-sea-700"
              >
                {cta.whatsapp}
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl ring-1 ring-sand-200">
              <iframe title="Mappa" src={site.mapEmbed} className="h-64 w-full" loading="lazy" />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
