import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Gallery } from "@/components/Gallery";
import { getGalleria } from "@/lib/data";
import { galleryGroups } from "@/lib/galleryImages";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const d = await getGalleria(params.lang);
  return buildMetadata({ title: d.seoTitle, description: d.seoDescription, locale: params.lang, path: "galleria" });
}

export default async function GalleriaPage({ params }: { params: { lang: Locale } }) {
  const lang = params.lang;
  const d = await getGalleria(lang);
  const groups = galleryGroups.map((g) => ({
    slug: g.slug,
    label: lang === "it" ? g.labelIt : g.labelEn,
    images: g.images
  }));
  return (
    <>
      <Hero title={d.h1} subtitle={d.heroSubtitle} />
      <Section intro={d.intro}>
        <Gallery groups={groups} allLabel={lang === "it" ? "Tutte" : "All"} />
      </Section>
    </>
  );
}
