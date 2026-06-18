import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { Gallery } from "@/components/Gallery";
import { getGalleria } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const d = await getGalleria(params.lang);
  return buildMetadata({ title: d.seoTitle, description: d.seoDescription, locale: params.lang, path: "galleria" });
}

export default async function GalleriaPage({ params }: { params: { lang: Locale } }) {
  const d = await getGalleria(params.lang);
  return (
    <>
      <Hero title={d.h1} subtitle={d.heroSubtitle} />
      <Section intro={d.intro}>
        <Gallery categories={d.categories} images={d.images} />
      </Section>
    </>
  );
}
