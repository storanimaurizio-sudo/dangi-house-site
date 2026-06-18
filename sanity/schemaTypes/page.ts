import { defineType, defineField, defineArrayMember } from "sanity";

const titleBody = (name: string, title: string) =>
  defineArrayMember({
    type: "object",
    name,
    fields: [
      { name: "title", title: "Titolo", type: "string" },
      { name: "body", title: "Testo", type: "text", rows: 3 }
    ],
    preview: { select: { title: "title", subtitle: "body" } }
  });

export const page = defineType({
  name: "page",
  title: "Pagina",
  type: "document",
  fieldsets: [
    { name: "seo", title: "SEO", options: { collapsible: true, collapsed: true } },
    { name: "hero", title: "Hero", options: { collapsible: true } },
    { name: "content", title: "Contenuto", options: { collapsible: true } }
  ],
  fields: [
    defineField({
      name: "key", title: "Pagina", type: "string", validation: (r) => r.required(),
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "La Casa", value: "la-casa" },
          { title: "Servizi", value: "servizi" },
          { title: "Posizione", value: "posizione" },
          { title: "Galleria", value: "galleria" },
          { title: "Tariffe & Prenotazioni", value: "prenotazioni" },
          { title: "Contatti", value: "contatti" }
        ]
      }
    }),
    defineField({
      name: "lang", title: "Lingua", type: "string", validation: (r) => r.required(),
      options: { list: [{ title: "Italiano", value: "it" }, { title: "English", value: "en" }], layout: "radio" },
      initialValue: "it"
    }),

    defineField({ name: "seoTitle", title: "SEO title", type: "string", fieldset: "seo", validation: (r) => r.max(65) }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2, fieldset: "seo", validation: (r) => r.max(165) }),

    defineField({ name: "heroTitle", title: "Titolo (H1)", type: "string", fieldset: "hero" }),
    defineField({ name: "heroSubtitle", title: "Sottotitolo", type: "text", rows: 2, fieldset: "hero" }),
    defineField({ name: "heroImage", title: "Immagine hero", type: "image", options: { hotspot: true }, fieldset: "hero" }),

    defineField({ name: "intro", title: "Introduzione", type: "text", rows: 3, fieldset: "content" }),

    defineField({
      name: "highlights", title: "Punti in evidenza (Home)", type: "array",
      of: [titleBody("highlight", "Highlight")], fieldset: "content"
    }),
    defineField({
      name: "sections", title: "Sezioni (La Casa)", type: "array",
      of: [titleBody("section", "Sezione")], fieldset: "content"
    }),
    defineField({
      name: "places", title: "Luoghi (Posizione)", type: "array",
      of: [defineArrayMember({
        type: "object", name: "place",
        fields: [
          { name: "name", title: "Nome", type: "string" },
          { name: "detail", title: "Dettaglio", type: "string" }
        ]
      })], fieldset: "content"
    }),
    defineField({
      name: "steps", title: "Passi prenotazione", type: "array",
      of: [titleBody("step", "Passo")], fieldset: "content"
    }),
    defineField({
      name: "policies", title: "Policy", type: "array",
      of: [titleBody("policy", "Policy")], fieldset: "content"
    }),

    defineField({ name: "closingTitle", title: "CTA — titolo", type: "string", fieldset: "content" }),
    defineField({ name: "closingBody", title: "CTA — testo", type: "text", rows: 2, fieldset: "content" })
  ],
  preview: {
    select: { key: "key", lang: "lang" },
    prepare: ({ key, lang }) => ({ title: `${key} · ${String(lang).toUpperCase()}` })
  }
});
