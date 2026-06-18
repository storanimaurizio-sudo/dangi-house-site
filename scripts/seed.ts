/**
 * Seed: importa in Sanity tutti i contenuti statici di src/lib/content.ts
 * (siteSettings, pagine IT/EN, servizi, FAQ). Idempotente: usa _id deterministici.
 *
 *   1. Compila .env.local (PROJECT_ID, DATASET, SANITY_API_WRITE_TOKEN)
 *   2. npm run seed
 *
 * NB: le immagini della galleria vanno caricate manualmente nello Studio (/studio).
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@sanity/client";
import { getDict, site } from "../src/lib/content";
import { locales } from "../src/lib/i18n";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("\n✗ Mancano NEXT_PUBLIC_SANITY_PROJECT_ID e/o SANITY_API_WRITE_TOKEN in .env.local\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-01",
  useCdn: false
});

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const groupKeys = ["comfort", "kitchen", "outdoor"] as const;

async function run() {
  const docs: Record<string, unknown>[] = [];

  // --- Site settings ---
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    title: site.name,
    phone: site.phone,
    email: site.email,
    whatsapp: site.whatsapp,
    address: site.address,
    mapUrl: site.mapEmbed,
    instagram: site.instagram,
    bookingUrl: site.bookingUrl
  });

  for (const lang of locales) {
    const d = getDict(lang);

    // --- Pages ---
    docs.push({
      _id: `page.home.${lang}`, _type: "page", key: "home", lang,
      seoTitle: d.home.seoTitle, seoDescription: d.home.seoDescription,
      heroTitle: d.home.h1, heroSubtitle: d.home.heroSubtitle, intro: d.home.intro,
      highlights: d.home.highlights.map((h) => ({ _type: "highlight", _key: slug(h.title), title: h.title, body: h.body })),
      closingTitle: d.home.closing.title, closingBody: d.home.closing.body
    });
    docs.push({
      _id: `page.la-casa.${lang}`, _type: "page", key: "la-casa", lang,
      seoTitle: d.laCasa.seoTitle, seoDescription: d.laCasa.seoDescription,
      heroTitle: d.laCasa.h1, heroSubtitle: d.laCasa.heroSubtitle, intro: d.laCasa.intro,
      sections: (d.laCasa.sections ?? []).map((s) => ({ _type: "section", _key: slug(s.title), title: s.title, body: s.body.join(" ") }))
    });
    docs.push({
      _id: `page.servizi.${lang}`, _type: "page", key: "servizi", lang,
      seoTitle: d.servizi.seoTitle, seoDescription: d.servizi.seoDescription,
      heroTitle: d.servizi.h1, heroSubtitle: d.servizi.heroSubtitle, intro: d.servizi.intro
    });
    docs.push({
      _id: `page.posizione.${lang}`, _type: "page", key: "posizione", lang,
      seoTitle: d.posizione.seoTitle, seoDescription: d.posizione.seoDescription,
      heroTitle: d.posizione.h1, heroSubtitle: d.posizione.heroSubtitle, intro: d.posizione.intro,
      places: d.posizione.places.map((p) => ({ _type: "place", _key: slug(p.name), name: p.name, detail: p.detail }))
    });
    docs.push({
      _id: `page.galleria.${lang}`, _type: "page", key: "galleria", lang,
      seoTitle: d.galleria.seoTitle, seoDescription: d.galleria.seoDescription,
      heroTitle: d.galleria.h1, heroSubtitle: d.galleria.heroSubtitle, intro: d.galleria.intro
    });
    docs.push({
      _id: `page.prenotazioni.${lang}`, _type: "page", key: "prenotazioni", lang,
      seoTitle: d.prenotazioni.seoTitle, seoDescription: d.prenotazioni.seoDescription,
      heroTitle: d.prenotazioni.h1, heroSubtitle: d.prenotazioni.heroSubtitle, intro: d.prenotazioni.intro,
      steps: d.prenotazioni.steps.map((s) => ({ _type: "step", _key: slug(s.title), title: s.title, body: s.body })),
      policies: d.prenotazioni.policies.map((p) => ({ _type: "policy", _key: slug(p.title), title: p.title, body: p.body })),
      closingTitle: d.home.closing.title, closingBody: d.home.closing.body
    });
    docs.push({
      _id: `page.contatti.${lang}`, _type: "page", key: "contatti", lang,
      seoTitle: d.contatti.seoTitle, seoDescription: d.contatti.seoDescription,
      heroTitle: d.contatti.h1, heroSubtitle: d.contatti.heroSubtitle, intro: d.contatti.intro
    });

    // --- Services (da groups → documenti per lingua) ---
    d.servizi.groups.forEach((grp, gi) => {
      const group = groupKeys[gi] ?? "comfort";
      grp.items.forEach((item, ii) => {
        docs.push({
          _id: `service.${lang}.${group}.${slug(item)}`,
          _type: "service", lang, group, title: item, order: gi * 10 + ii, included: true
        });
      });
    });

    // --- FAQ ---
    d.faq.forEach((f, i) => {
      docs.push({
        _id: `faq.${lang}.${i}`, _type: "faq", lang, order: i, question: f.question, answer: f.answer
      });
    });
  }

  console.log(`Importazione di ${docs.length} documenti in ${projectId}/${dataset}…`);
  let tx = client.transaction();
  for (const doc of docs) tx = tx.createOrReplace(doc as never);
  await tx.commit();
  console.log("✓ Seed completato. Apri /studio per gestire i contenuti.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
