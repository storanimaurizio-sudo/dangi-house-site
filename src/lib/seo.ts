import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { site } from "./content";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.dangihouse.it";

export function buildMetadata(opts: {
  title: string;
  description: string;
  locale: Locale;
  path: string; // es. "la-casa" oppure "" per home
}): Metadata {
  const { title, description, locale, path } = opts;
  const segment = path ? `/${path}` : "";
  const canonical = `${SITE_URL}/${locale}${segment}`;
  const other = locale === "it" ? "en" : "it";
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
      languages: {
        it: `${SITE_URL}/it${segment}`,
        en: `${SITE_URL}/en${segment}`,
        "x-default": `${SITE_URL}/it${segment}`
      }
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: canonical,
      locale: locale === "it" ? "it_IT" : "en_GB",
      alternateLocale: other === "it" ? "it_IT" : "en_GB",
      images: [{ url: "/logo/dangihouse-logo-horizontal.png", width: 1280, height: 360, alt: site.name }]
    },
    twitter: { card: "summary_large_image", title, description }
  };
}

export function localBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: site.name,
    description:
      locale === "it"
        ? "Casa vacanza luminosa a San Salvo Marina, a pochi passi dal mare."
        : "Bright holiday home in San Salvo Marina, a short walk from the sea.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Salvo Marina",
      addressRegion: "Abruzzo",
      addressCountry: "IT",
      postalCode: "66050"
    },
    email: site.email,
    telephone: site.phone,
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/logo/dangihouse-logo-horizontal.png`,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Wi-Fi" },
      { "@type": "LocationFeatureSpecification", name: "Air conditioning" },
      { "@type": "LocationFeatureSpecification", name: "Parking" },
      { "@type": "LocationFeatureSpecification", name: "Kitchen" }
    ]
  };
}
