import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Domanda", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Risposta", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "lang", title: "Lingua", type: "string",
      options: { list: [{ title: "Italiano", value: "it" }, { title: "English", value: "en" }], layout: "radio" },
      initialValue: "it"
    }),
    defineField({ name: "order", title: "Ordine", type: "number", initialValue: 1 })
  ]
});
