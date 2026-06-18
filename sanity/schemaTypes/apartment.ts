import { defineType, defineField } from "sanity";

export const apartment = defineType({
  name: "apartment",
  title: "Casa / Struttura",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "lang", title: "Lingua", type: "string", validation: (r) => r.required(),
      options: { list: [{ title: "Italiano", value: "it" }, { title: "English", value: "en" }], layout: "radio" },
      initialValue: "it"
    }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "order", title: "Ordine", type: "number", initialValue: 1 }),
    defineField({ name: "sleeps", title: "Posti letto", type: "number" }),
    defineField({ name: "bedrooms", title: "Camere", type: "number" }),
    defineField({ name: "sizeSqm", title: "Superficie (m²)", type: "number" }),
    defineField({ name: "summary", title: "Descrizione", type: "text", rows: 4 }),
    defineField({ name: "features", title: "Dotazioni", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "gallery", title: "Foto", type: "array", of: [{ type: "image", options: { hotspot: true } }] })
  ],
  preview: { select: { title: "title", subtitle: "lang" } }
});
