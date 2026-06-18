import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title, phone, email, whatsapp, address, mapUrl, instagram, bookingUrl
  }
`;

export const pageByKeyQuery = groq`
  *[_type == "page" && key == $key && lang == $lang][0]{
    seoTitle, seoDescription, heroTitle, heroSubtitle, intro,
    "heroImage": heroImage,
    highlights[]{ title, body },
    sections[]{ title, body },
    places[]{ name, detail },
    steps[]{ title, body },
    policies[]{ title, body },
    closingTitle, closingBody
  }
`;

export const servicesQuery = groq`
  *[_type == "service" && lang == $lang] | order(order asc){
    title, group, description, included
  }
`;

export const faqQuery = groq`
  *[_type == "faq" && lang == $lang] | order(order asc){ question, answer }
`;

export const galleryQuery = groq`
  *[_type == "galleryImage"] | order(order asc){ alt, caption, category, image }
`;

export const apartmentsQuery = groq`
  *[_type == "apartment"] | order(order asc){
    title, slug, sleeps, bedrooms, sizeSqm, summary, features, gallery
  }
`;
