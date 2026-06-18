import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title, phone, email, whatsapp, address,
    "mapUrl": mapUrl, instagram, bookingUrl
  }
`;

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title, lang, seoTitle, seoDescription,
    heroTitle, heroSubtitle, heroImage,
    body[]{ ..., _type == "image" => { ..., asset-> } }
  }
`;

export const apartmentsQuery = groq`
  *[_type == "apartment" && lang == $lang] | order(order asc){
    title, slug, sleeps, bedrooms, sizeSqm, summary, features, gallery
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc){
    title, description, icon, included
  }
`;

export const galleryQuery = groq`
  *[_type == "galleryImage"] | order(order asc){
    alt, caption, category, image
  }
`;

export const faqQuery = groq`
  *[_type == "faq"] | order(order asc){ question, answer, lang }
`;
