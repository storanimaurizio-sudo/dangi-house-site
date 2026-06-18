import type { Locale } from "./i18n";
import { getDict, site as staticSite } from "./content";
import { sanityFetch } from "@sanity-cfg/lib/fetch";
import { urlForImage } from "@sanity-cfg/lib/image";
import {
  siteSettingsQuery,
  pageByKeyQuery,
  servicesQuery,
  faqQuery,
  galleryQuery,
  apartmentsQuery
} from "@sanity-cfg/lib/queries";

// Ritorna `value` se valorizzato, altrimenti il fallback statico.
function pick<T>(value: T | null | undefined, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value === "string" && value.trim() === "") return fallback;
  if (Array.isArray(value) && value.length === 0) return fallback;
  return value;
}

type CmsPage = {
  seoTitle?: string; seoDescription?: string;
  heroTitle?: string; heroSubtitle?: string; intro?: string;
  highlights?: { title: string; body: string }[];
  sections?: { title: string; body: string }[];
  places?: { name: string; detail: string }[];
  steps?: { title: string; body: string }[];
  policies?: { title: string; body: string }[];
  closingTitle?: string; closingBody?: string;
};

const groupOrder = ["comfort", "kitchen", "outdoor"] as const;
const groupTitles: Record<Locale, Record<string, string>> = {
  it: { comfort: "Comfort", kitchen: "Cucina", outdoor: "Esterni & mobilità" },
  en: { comfort: "Comfort", kitchen: "Kitchen", outdoor: "Outdoor & mobility" }
};

async function cmsPage(key: string, lang: Locale): Promise<CmsPage | null> {
  return sanityFetch<CmsPage>(pageByKeyQuery, { key, lang });
}

/* ---------------- Site settings (contatti) ---------------- */
export type SiteInfo = typeof staticSite;
export async function getSite(): Promise<SiteInfo> {
  const s = await sanityFetch<Partial<{
    title: string; phone: string; email: string; whatsapp: string;
    address: string; mapUrl: string; instagram: string; bookingUrl: string;
  }>>(siteSettingsQuery, {});
  if (!s) return staticSite;
  return {
    ...staticSite,
    name: pick(s.title, staticSite.name),
    phone: pick(s.phone, staticSite.phone),
    email: pick(s.email, staticSite.email),
    whatsapp: pick(s.whatsapp, staticSite.whatsapp),
    address: pick(s.address, staticSite.address),
    mapEmbed: pick(s.mapUrl, staticSite.mapEmbed),
    instagram: pick(s.instagram, staticSite.instagram),
    bookingUrl: pick(s.bookingUrl, staticSite.bookingUrl)
  };
}

/* ---------------- Pages ---------------- */
export async function getHome(lang: Locale) {
  const f = getDict(lang).home;
  const c = await cmsPage("home", lang);
  return {
    seoTitle: pick(c?.seoTitle, f.seoTitle),
    seoDescription: pick(c?.seoDescription, f.seoDescription),
    h1: pick(c?.heroTitle, f.h1),
    heroSubtitle: pick(c?.heroSubtitle, f.heroSubtitle),
    intro: pick(c?.intro, f.intro),
    highlights: pick(c?.highlights, f.highlights),
    closing: {
      title: pick(c?.closingTitle, f.closing.title),
      body: pick(c?.closingBody, f.closing.body)
    }
  };
}

export async function getLaCasa(lang: Locale) {
  const f = getDict(lang).laCasa;
  const c = await cmsPage("la-casa", lang);
  const sections = c?.sections?.length
    ? c.sections.map((s) => ({ title: s.title, body: [s.body] }))
    : f.sections ?? [];
  return {
    seoTitle: pick(c?.seoTitle, f.seoTitle),
    seoDescription: pick(c?.seoDescription, f.seoDescription),
    h1: pick(c?.heroTitle, f.h1),
    heroSubtitle: pick(c?.heroSubtitle, f.heroSubtitle),
    intro: pick(c?.intro, f.intro),
    sections
  };
}

export async function getServizi(lang: Locale) {
  const f = getDict(lang).servizi;
  const c = await cmsPage("servizi", lang);
  const services = await sanityFetch<{ title: string; group: string }[]>(servicesQuery, { lang });

  let groups = f.groups;
  if (services && services.length) {
    groups = groupOrder
      .map((g) => ({
        title: groupTitles[lang][g],
        items: services.filter((s) => s.group === g).map((s) => s.title)
      }))
      .filter((grp) => grp.items.length > 0);
  }
  return {
    seoTitle: pick(c?.seoTitle, f.seoTitle),
    seoDescription: pick(c?.seoDescription, f.seoDescription),
    h1: pick(c?.heroTitle, f.h1),
    heroSubtitle: pick(c?.heroSubtitle, f.heroSubtitle),
    intro: pick(c?.intro, f.intro),
    groups
  };
}

export async function getPosizione(lang: Locale) {
  const f = getDict(lang).posizione;
  const c = await cmsPage("posizione", lang);
  return {
    seoTitle: pick(c?.seoTitle, f.seoTitle),
    seoDescription: pick(c?.seoDescription, f.seoDescription),
    h1: pick(c?.heroTitle, f.h1),
    heroSubtitle: pick(c?.heroSubtitle, f.heroSubtitle),
    intro: pick(c?.intro, f.intro),
    places: pick(c?.places, f.places)
  };
}

export type GalleryItem = { url: string; alt: string; caption?: string; category: string };
export async function getGalleria(lang: Locale) {
  const f = getDict(lang).galleria;
  const c = await cmsPage("galleria", lang);
  const raw = await sanityFetch<{ alt: string; caption?: string; category?: string; image: unknown }[]>(galleryQuery, {});
  const images: GalleryItem[] = (raw ?? [])
    .map((r) => {
      const url = urlForImage(r.image as never);
      return url ? { url, alt: r.alt, caption: r.caption, category: r.category ?? "interni" } : null;
    })
    .filter((x): x is GalleryItem => x !== null);
  return {
    seoTitle: pick(c?.seoTitle, f.seoTitle),
    seoDescription: pick(c?.seoDescription, f.seoDescription),
    h1: pick(c?.heroTitle, f.h1),
    heroSubtitle: pick(c?.heroSubtitle, f.heroSubtitle),
    intro: pick(c?.intro, f.intro),
    categories: f.categories,
    images
  };
}

export async function getPrenotazioni(lang: Locale) {
  const f = getDict(lang).prenotazioni;
  const c = await cmsPage("prenotazioni", lang);
  const faqDocs = await sanityFetch<{ question: string; answer: string }[]>(faqQuery, { lang });
  return {
    seoTitle: pick(c?.seoTitle, f.seoTitle),
    seoDescription: pick(c?.seoDescription, f.seoDescription),
    h1: pick(c?.heroTitle, f.h1),
    heroSubtitle: pick(c?.heroSubtitle, f.heroSubtitle),
    intro: pick(c?.intro, f.intro),
    steps: pick(c?.steps, f.steps),
    policies: pick(c?.policies, f.policies),
    closing: {
      title: pick(c?.closingTitle, getDict(lang).home.closing.title),
      body: pick(c?.closingBody, getDict(lang).home.closing.body)
    },
    faq: pick(faqDocs, f.faq)
  };
}

export async function getContatti(lang: Locale) {
  const f = getDict(lang).contatti;
  const c = await cmsPage("contatti", lang);
  return {
    seoTitle: pick(c?.seoTitle, f.seoTitle),
    seoDescription: pick(c?.seoDescription, f.seoDescription),
    h1: pick(c?.heroTitle, f.h1),
    heroSubtitle: pick(c?.heroSubtitle, f.heroSubtitle),
    intro: pick(c?.intro, f.intro)
  };
}

/* ---------------- Apartments (case gestite) ---------------- */
export type Apartment = {
  title: string;
  summary?: string;
  sleeps?: number;
  bedrooms?: number;
  sizeSqm?: number;
  features?: string[];
};
export async function getApartments(lang: Locale): Promise<Apartment[]> {
  const rows = await sanityFetch<Apartment[]>(apartmentsQuery, { lang });
  return rows ?? [];
}
