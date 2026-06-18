import { defineType, defineField } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Foto galleria",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Immagine", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt", title: "Testo alternativo (SEO/accessibilità)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Didascalia", type: "string" }),
    defineField({
      name: "category", title: "Categoria", type: "string",
      options: { list: ["interni", "esterni", "mare", "dintorni"] }
    }),
    defineField({ name: "order", title: "Ordine", type: "number", initialValue: 1 })
  ]
});
