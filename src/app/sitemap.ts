import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.dangihouse.it";

const paths = ["", "la-casa", "servizi", "posizione", "galleria", "prenotazioni", "contatti"];
const locales = ["it", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((lang) =>
    paths.map((p) => ({
      url: `${SITE_URL}/${lang}${p ? `/${p}` : ""}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.7,
      alternates: {
        languages: {
          it: `${SITE_URL}/it${p ? `/${p}` : ""}`,
          en: `${SITE_URL}/en${p ? `/${p}` : ""}`
        }
      }
    }))
  );
}
