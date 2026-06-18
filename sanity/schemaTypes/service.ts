import { defineType, defineField } from "sanity";

export const service = defineType({
  name: "service",
  title: "Servizio",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titolo", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "lang", title: "Lingua", type: "string", validation: (r) => r.required(),
      options: { list: [{ title: "Italiano", value: "it" }, { title: "English", value: "en" }], layout: "radio" },
      initialValue: "it"
    }),
    defineField({
      name: "group", title: "Gruppo", type: "string", validation: (r) => r.required(),
      options: {
        list: [
          { title: "Comfort", value: "comfort" },
          { title: "Cucina / Kitchen", value: "kitchen" },
          { title: "Esterni & mobilità / Outdoor", value: "outdoor" }
        ]
      },
      initialValue: "comfort"
    }),
    defineField({ name: "order", title: "Ordine", type: "number", initialValue: 1 }),
    defineField({ name: "description", title: "Descrizione (opzionale)", type: "string" }),
    defineField({ name: "included", title: "Incluso nel soggiorno", type: "boolean", initialValue: true })
  ],
  preview: { select: { title: "title", subtitle: "group" } }
});
