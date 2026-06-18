import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nome struttura", type: "string" }),
    defineField({ name: "phone", title: "Telefono", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp (numero internazionale)", type: "string" }),
    defineField({ name: "address", title: "Indirizzo", type: "text", rows: 2 }),
    defineField({ name: "mapUrl", title: "URL Google Maps", type: "url" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "bookingUrl", title: "Link prenotazione (Booking/Airbnb)", type: "url" })
  ],
  preview: { prepare: () => ({ title: "Impostazioni sito" }) }
});
