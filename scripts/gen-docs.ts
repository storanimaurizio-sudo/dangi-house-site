import { getDict, site } from "../src/lib/content.ts";
import { locales } from "../src/lib/i18n.ts";
import { writeFileSync } from "node:fs";

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const k = (s: string) => ({ _key: slug(s).slice(0, 40) || Math.random().toString(36).slice(2, 8) });

const groupKeys = ["comfort", "kitchen", "outdoor"] as const;

const apartments: Record<string, any[]> = {
  it: [
    {
      title: "Villetta indipendente — 180 m dal mare", lang: "it", order: 1, sleeps: 6, bedrooms: 2,
      summary: "Villetta indipendente in un complesso recintato e centrale, a 180 metri dalla spiaggia. Finiture in marmo, due balconi e una pertinenza privata. Posto auto custodito all'interno del complesso: arrivi, parcheggi e lasci l'auto. Supermercato, gelateria e ristoro a pochi passi.",
      features: ["Fino a 6 posti letto","Camera matrimoniale","Cameretta con letto a castello","Divano letto","Cucina a vista attrezzata","Due balconi","Pertinenza privata","Aria condizionata","Wi-Fi gratuito","Lavatrice","Zanzariere e inferriate","Posto auto privato nel complesso"]
    },
    {
      title: "Appartamento vista mare — ristrutturato nel 2023", lang: "it", order: 2, sleeps: 6, bedrooms: 2,
      summary: "Appartamento ristrutturato nel 2023, con vista mare, in un complesso centrale a 180 metri dalla spiaggia. Ambienti moderni e freschi, due balconi sulla brezza marina. Parcheggio gratuito riservato e ogni servizio raggiungibile a piedi.",
      features: ["Ristrutturato nel 2023","Vista mare","Camera matrimoniale","Cameretta con letto a castello","Divano letto","Cucina a vista","Due balconi","Aria condizionata","Wi-Fi gratuito","Zanzariere","Lavatrice","Parcheggio gratuito riservato"]
    }
  ],
  en: [
    {
      title: "Detached villa — 180 m from the sea", lang: "en", order: 1, sleeps: 6, bedrooms: 2,
      summary: "A detached villa in a gated, central complex, 180 metres from the beach. Marble finishes, two balconies and a private outdoor area. A guarded parking space inside the complex: you arrive, park and leave the car behind. Shops, ice-cream and dining are all a short walk away.",
      features: ["Sleeps up to 6","Double bedroom","Bunk-bed room","Sofa bed","Open equipped kitchen","Two balconies","Private outdoor area","Air conditioning","Free Wi-Fi","Washing machine","Window screens and grilles","Private parking in the complex"]
    },
    {
      title: "Sea-view apartment — renovated in 2023", lang: "en", order: 2, sleeps: 6, bedrooms: 2,
      summary: "An apartment renovated in 2023, with a sea view, in a central complex 180 metres from the beach. Bright, modern spaces and two balconies open to the sea breeze. Reserved free parking, with every service within walking distance.",
      features: ["Renovated in 2023","Sea view","Double bedroom","Bunk-bed room","Sofa bed","Open kitchen","Two balconies","Air conditioning","Free Wi-Fi","Window screens","Washing machine","Reserved free parking"]
    }
  ]
};

const docs: { type: string; content: any }[] = [];

// site settings
docs.push({ type: "siteSettings", content: {
  title: site.name, phone: site.phone, email: site.email, whatsapp: site.whatsapp,
  address: site.address, mapUrl: site.mapEmbed, instagram: site.instagram, bookingUrl: site.bookingUrl
}});

for (const lang of locales) {
  const d = getDict(lang);
  docs.push({ type: "page", content: { key: "home", lang, seoTitle: d.home.seoTitle, seoDescription: d.home.seoDescription, heroTitle: d.home.h1, heroSubtitle: d.home.heroSubtitle, intro: d.home.intro, highlights: d.home.highlights.map(h => ({ _type: "highlight", ...k(h.title), title: h.title, body: h.body })), closingTitle: d.home.closing.title, closingBody: d.home.closing.body } });
  docs.push({ type: "page", content: { key: "la-casa", lang, seoTitle: d.laCasa.seoTitle, seoDescription: d.laCasa.seoDescription, heroTitle: d.laCasa.h1, heroSubtitle: d.laCasa.heroSubtitle, intro: d.laCasa.intro, sections: (d.laCasa.sections ?? []).map(s => ({ _type: "section", ...k(s.title), title: s.title, body: s.body.join(" ") })) } });
  docs.push({ type: "page", content: { key: "servizi", lang, seoTitle: d.servizi.seoTitle, seoDescription: d.servizi.seoDescription, heroTitle: d.servizi.h1, heroSubtitle: d.servizi.heroSubtitle, intro: d.servizi.intro } });
  docs.push({ type: "page", content: { key: "posizione", lang, seoTitle: d.posizione.seoTitle, seoDescription: d.posizione.seoDescription, heroTitle: d.posizione.h1, heroSubtitle: d.posizione.heroSubtitle, intro: d.posizione.intro, places: d.posizione.places.map(p => ({ _type: "place", ...k(p.name), name: p.name, detail: p.detail })) } });
  docs.push({ type: "page", content: { key: "galleria", lang, seoTitle: d.galleria.seoTitle, seoDescription: d.galleria.seoDescription, heroTitle: d.galleria.h1, heroSubtitle: d.galleria.heroSubtitle, intro: d.galleria.intro } });
  docs.push({ type: "page", content: { key: "prenotazioni", lang, seoTitle: d.prenotazioni.seoTitle, seoDescription: d.prenotazioni.seoDescription, heroTitle: d.prenotazioni.h1, heroSubtitle: d.prenotazioni.heroSubtitle, intro: d.prenotazioni.intro, steps: d.prenotazioni.steps.map(s => ({ _type: "step", ...k(s.title), title: s.title, body: s.body })), policies: d.prenotazioni.policies.map(p => ({ _type: "policy", ...k(p.title), title: p.title, body: p.body })), closingTitle: d.home.closing.title, closingBody: d.home.closing.body } });
  docs.push({ type: "page", content: { key: "contatti", lang, seoTitle: d.contatti.seoTitle, seoDescription: d.contatti.seoDescription, heroTitle: d.contatti.h1, heroSubtitle: d.contatti.heroSubtitle, intro: d.contatti.intro } });

  d.servizi.groups.forEach((grp, gi) => {
    const group = groupKeys[gi] ?? "comfort";
    grp.items.forEach((item, ii) => {
      docs.push({ type: "service", content: { lang, group, title: item, order: gi * 10 + ii, included: true } });
    });
  });

  d.faq.forEach((f, i) => {
    docs.push({ type: "faq", content: { lang, order: i, question: f.question, answer: f.answer } });
  });

  apartments[lang].forEach(a => docs.push({ type: "apartment", content: a }));
}

writeFileSync("/sessions/great-sharp-newton/mnt/outputs/dh-docs.json", JSON.stringify(docs, null, 2));
console.log("documents:", docs.length);
const counts: Record<string, number> = {};
for (const d of docs) counts[d.type] = (counts[d.type] || 0) + 1;
console.log(JSON.stringify(counts));
