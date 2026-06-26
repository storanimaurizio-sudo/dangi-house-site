import type { Locale } from "./i18n";

// Contenuti statici di fallback (bilingue IT/EN).
// In produzione questi testi possono essere sovrascritti dal CMS (Sanity).
// I dati di contatto qui sono PLACEHOLDER: aggiornarli in Sanity o in env.

export const site = {
  name: "DangiHouse",
  location: "San Salvo Marina (CH), Abruzzo",
  email: "info@dangihouse.it",
  phone: "+39 333 844 0088",
  whatsapp: "+393338440088",
  address: "San Salvo Marina, 66050 (CH), Italia",
  // Sostituire con l'embed reale della struttura
  mapEmbed:
    "https://www.google.com/maps?q=San+Salvo+Marina,+Abruzzo&output=embed",
  bookingUrl: "#",
  instagram: "#"
};

type Nav = { href: string; label: string }[];

type PageCopy = {
  seoTitle: string;
  seoDescription: string;
  h1: string;
  heroSubtitle?: string;
  intro?: string;
  sections?: { title: string; body: string[] }[];
  bullets?: { title: string; body: string }[];
};

type Dict = {
  nav: Nav;
  cta: {
    book: string;
    discover: string;
    contact: string;
    directions: string;
    whatsapp: string;
  };
  footer: {
    tagline: string;
    nav: string;
    contacts: string;
    rights: string;
    builtNote: string;
  };
  home: PageCopy & {
    highlights: { title: string; body: string }[];
    closing: { title: string; body: string };
  };
  laCasa: PageCopy;
  servizi: PageCopy & { groups: { title: string; items: string[] }[] };
  posizione: PageCopy & { places: { name: string; detail: string }[]; molise: { title: string; intro: string; spots: { name: string; detail: string }[] } };
  galleria: PageCopy & { categories: { key: string; label: string }[] };
  prenotazioni: PageCopy & {
    steps: { title: string; body: string }[];
    policies: { title: string; body: string }[];
  };
  contatti: PageCopy & {
    form: {
      name: string;
      email: string;
      dates: string;
      guests: string;
      message: string;
      send: string;
      sending: string;
      ok: string;
      error: string;
      required: string;
    };
  };
  faq: { question: string; answer: string }[];
};

const it: Dict = {
  nav: [
    { href: "", label: "Home" },
    { href: "la-casa", label: "La Casa" },
    { href: "servizi", label: "Servizi" },
    { href: "posizione", label: "Posizione" },
    { href: "galleria", label: "Galleria" },
    { href: "prenotazioni", label: "Tariffe & Prenotazioni" },
    { href: "contatti", label: "Contatti" }
  ],
  cta: {
    book: "Verifica disponibilità",
    discover: "Scopri la casa",
    contact: "Contattaci",
    directions: "Apri su Maps",
    whatsapp: "Scrivici su WhatsApp"
  },
  footer: {
    tagline: "Una casa luminosa, a pochi passi dal mare.",
    nav: "Naviga",
    contacts: "Contatti",
    rights: "Tutti i diritti riservati.",
    builtNote: "San Salvo Marina · Costa dei Trabocchi, Abruzzo"
  },
  home: {
    seoTitle: "DangiHouse — Casa vacanza a San Salvo Marina, Abruzzo",
    seoDescription:
      "Casa vacanza luminosa a San Salvo Marina, a pochi passi dal mare. Spazi accoglienti, servizi inclusi e una posizione comoda per vivere la costa abruzzese.",
    h1: "La tua casa al mare a San Salvo Marina",
    heroSubtitle:
      "Spazi luminosi, atmosfera mediterranea e il mare a pochi passi. Una base semplice da vivere per la tua vacanza in Abruzzo.",
    intro:
      "DangiHouse è una casa vacanza pensata per chi cerca comfort e leggerezza. Camere ariose, una cucina pronta all'uso e la spiaggia raggiungibile a piedi. Tutto quello che serve, niente di superfluo.",
    highlights: [
      { title: "A pochi passi dal mare", body: "La spiaggia di San Salvo Marina è raggiungibile comodamente a piedi." },
      { title: "Luminosa e accogliente", body: "Ambienti chiari, arredo essenziale e spazi pensati per il relax." },
      { title: "Semplice da vivere", body: "Check-in agevole, servizi inclusi e tutto a portata di mano." }
    ],
    closing: {
      title: "Pronti a partire?",
      body: "Raccontaci le tue date: ti rispondiamo con disponibilità e dettagli, senza pensieri."
    }
  },
  laCasa: {
    seoTitle: "La Casa — DangiHouse, San Salvo Marina",
    seoDescription:
      "Ambienti luminosi e accoglienti: zona giorno, camere, cucina e spazi esterni. Scopri come è organizzata DangiHouse a San Salvo Marina.",
    h1: "La Casa",
    heroSubtitle: "Ambienti chiari, comfort essenziale e l'aria del mare.",
    intro:
      "DangiHouse accoglie con spazi semplici e ben organizzati. La luce naturale accompagna le giornate; gli arredi, lineari e curati, lasciano spazio al riposo.",
    sections: [
      { title: "Zona giorno", body: ["Un ambiente luminoso dove ritrovarsi. Divano, tavolo da pranzo e angolo cottura completo per cucinare con calma."] },
      { title: "Camere", body: ["Stanze accoglienti e silenziose, pensate per un sonno tranquillo dopo una giornata al mare."] },
      { title: "Cucina", body: ["Attrezzata per il quotidiano: piano cottura, frigorifero, stoviglie e l'essenziale per ogni pasto."] },
      { title: "Spazi esterni", body: ["Un'area all'aperto per la colazione al mattino o una pausa all'ombra nelle ore più calde."] }
    ]
  },
  servizi: {
    seoTitle: "Servizi — DangiHouse, casa vacanza a San Salvo Marina",
    seoDescription:
      "Wi-Fi, aria condizionata, cucina attrezzata, biancheria e parcheggio: tutti i servizi inclusi nel soggiorno a DangiHouse.",
    h1: "Servizi",
    heroSubtitle: "Tutto ciò che serve per sentirsi a casa.",
    intro: "Abbiamo raccolto i servizi pensando alla praticità: quello che rende un soggiorno comodo, senza complicazioni.",
    groups: [
      { title: "Comfort", items: ["Aria condizionata", "Wi-Fi gratuito", "Biancheria e asciugamani", "Pulizia finale inclusa"] },
      { title: "Cucina", items: ["Cucina attrezzata", "Frigorifero e congelatore", "Moka", "Stoviglie complete"] },
      { title: "Esterni & mobilità", items: ["Parcheggio", "Spazio esterno", "Spiaggia a piedi", "Animali su richiesta"] }
    ]
  },
  posizione: {
    seoTitle: "Posizione — DangiHouse, San Salvo Marina, Abruzzo",
    seoDescription:
      "DangiHouse si trova a San Salvo Marina, sulla costa abruzzese: spiaggia a piedi, servizi vicini e a breve distanza dalla Costa dei Trabocchi.",
    h1: "Posizione",
    heroSubtitle: "Sul litorale di San Salvo Marina, tra il mare e la Costa dei Trabocchi.",
    intro:
      "La casa è immersa nella tranquillità di San Salvo Marina, con la spiaggia raggiungibile a piedi e i servizi quotidiani a breve distanza. Un punto di partenza comodo per esplorare l'Abruzzo costiero.",
    places: [
      { name: "Spiaggia di San Salvo Marina", detail: "A piedi — sabbia e fondali bassi, comoda per famiglie." },
      { name: "Costa dei Trabocchi", detail: "In auto — la celebre via ciclabile e i trabocchi sull'Adriatico." },
      { name: "Vasto", detail: "In auto — centro storico, ristoranti e servizi." },
      { name: "Termoli", detail: "In auto — borgo sul mare e porto verso le Isole Tremiti." }
    ],
    molise: {
      title: "Il Molise a un passo",
      intro: "Oltre il confine, a pochi minuti, comincia il Molise: borghi silenziosi, mare e piccole mete da scoprire senza fretta.",
      spots: [
        { name: "Isole Tremiti", detail: "Arcipelago nell'Adriatico, in traghetto da Termoli o Vasto." },
        { name: "Larino", detail: "Anfiteatro romano e centro storico, nell'entroterra." },
        { name: "Agnone", detail: "L'antica arte delle campane, tra le montagne molisane." },
        { name: "Pietrabbondante", detail: "Il teatro sannitico, sito archeologico tra i monti." }
      ]
    }
  },
  galleria: {
    seoTitle: "Galleria — DangiHouse, San Salvo Marina",
    seoDescription:
      "Le immagini di DangiHouse: gli interni luminosi, gli spazi esterni e il mare di San Salvo Marina.",
    h1: "Galleria",
    heroSubtitle: "Uno sguardo alla casa e al suo mare.",
    intro: "Le fotografie raccontano gli spazi così come sono: chiari, semplici, vicini al mare.",
    categories: [
      { key: "interni", label: "Interni" },
      { key: "esterni", label: "Esterni" },
      { key: "mare", label: "Mare" },
      { key: "dintorni", label: "Dintorni" }
    ]
  },
  prenotazioni: {
    seoTitle: "Tariffe & Prenotazioni — DangiHouse, San Salvo Marina",
    seoDescription:
      "Come prenotare DangiHouse a San Salvo Marina: richiesta disponibilità, modalità, check-in e policy del soggiorno.",
    h1: "Tariffe & Prenotazioni",
    heroSubtitle: "Una prenotazione semplice, dalla richiesta al benvenuto.",
    intro:
      "Le tariffe variano in base al periodo e alla durata del soggiorno. Scrivici con le tue date: ti rispondiamo con disponibilità e preventivo, in modo chiaro.",
    steps: [
      { title: "1 · Richiesta", body: "Inviaci date e numero di ospiti dal modulo contatti o su WhatsApp." },
      { title: "2 · Conferma", body: "Ricevi disponibilità, tariffa e modalità di pagamento." },
      { title: "3 · Benvenuto", body: "Ti accogliamo con le istruzioni per un check-in semplice." }
    ],
    policies: [
      { title: "Check-in / Check-out", body: "Check-in dalle 15:00, check-out entro le 10:00. Orari flessibili su richiesta." },
      { title: "Soggiorno minimo", body: "Variabile per stagione; in alta stagione è generalmente settimanale." },
      { title: "Cancellazione", body: "Condizioni comunicate in fase di conferma, in modo trasparente." }
    ]
  },
  contatti: {
    seoTitle: "Contatti — DangiHouse, San Salvo Marina",
    seoDescription:
      "Contatta DangiHouse a San Salvo Marina per disponibilità e informazioni. Modulo, telefono, WhatsApp e posizione sulla mappa.",
    h1: "Contatti",
    heroSubtitle: "Siamo qui per ogni domanda sul tuo soggiorno.",
    intro: "Scrivici per disponibilità, informazioni o semplicemente per un consiglio sulla zona. Rispondiamo con piacere.",
    form: {
      name: "Nome",
      email: "Email",
      dates: "Date del soggiorno",
      guests: "Ospiti",
      message: "Messaggio",
      send: "Invia richiesta",
      sending: "Invio in corso…",
      ok: "Grazie. Ti risponderemo a breve.",
      error: "Qualcosa è andato storto. Riprova o scrivici via email.",
      required: "Campo obbligatorio"
    }
  },
  faq: [
    { question: "Quanto dista il mare?", answer: "La spiaggia di San Salvo Marina è raggiungibile a piedi in pochi minuti." },
    { question: "È incluso il parcheggio?", answer: "Sì, è disponibile un posto auto per gli ospiti." },
    { question: "Sono ammessi animali?", answer: "Su richiesta valutiamo volentieri la presenza di animali domestici." },
    { question: "Come si prenota?", answer: "Dal modulo contatti o su WhatsApp: ti rispondiamo con disponibilità e tariffa." }
  ]
};

const en: Dict = {
  nav: [
    { href: "", label: "Home" },
    { href: "la-casa", label: "The House" },
    { href: "servizi", label: "Services" },
    { href: "posizione", label: "Location" },
    { href: "galleria", label: "Gallery" },
    { href: "prenotazioni", label: "Rates & Booking" },
    { href: "contatti", label: "Contact" }
  ],
  cta: {
    book: "Check availability",
    discover: "Discover the house",
    contact: "Get in touch",
    directions: "Open in Maps",
    whatsapp: "Message us on WhatsApp"
  },
  footer: {
    tagline: "A bright home, a short walk from the sea.",
    nav: "Explore",
    contacts: "Contact",
    rights: "All rights reserved.",
    builtNote: "San Salvo Marina · Trabocchi Coast, Abruzzo"
  },
  home: {
    seoTitle: "DangiHouse — Holiday home in San Salvo Marina, Abruzzo",
    seoDescription:
      "A bright holiday home in San Salvo Marina, a short walk from the sea. Welcoming spaces, included services and a handy base to enjoy the Abruzzo coast.",
    h1: "Your home by the sea in San Salvo Marina",
    heroSubtitle:
      "Bright spaces, a Mediterranean feel and the sea just a short walk away. A simple base for your holiday in Abruzzo.",
    intro:
      "DangiHouse is a holiday home for those who look for comfort and ease. Airy rooms, a ready-to-use kitchen and the beach within walking distance. Everything you need, nothing more.",
    highlights: [
      { title: "Steps from the sea", body: "The beach of San Salvo Marina is an easy walk away." },
      { title: "Bright and welcoming", body: "Light interiors, simple furnishing and spaces made for rest." },
      { title: "Easy to live in", body: "Smooth check-in, included services and everything close at hand." }
    ],
    closing: {
      title: "Ready to go?",
      body: "Tell us your dates: we'll reply with availability and details, hassle-free."
    }
  },
  laCasa: {
    seoTitle: "The House — DangiHouse, San Salvo Marina",
    seoDescription:
      "Bright, welcoming spaces: living area, bedrooms, kitchen and outdoor space. Discover how DangiHouse is arranged in San Salvo Marina.",
    h1: "The House",
    heroSubtitle: "Light interiors, essential comfort and sea air.",
    intro:
      "DangiHouse welcomes you with simple, well-organised spaces. Natural light fills the day; clean, careful furnishings leave room to rest.",
    sections: [
      { title: "Living area", body: ["A bright space to gather. Sofa, dining table and a full kitchenette to cook in calm."] },
      { title: "Bedrooms", body: ["Quiet, cosy rooms made for a restful sleep after a day by the sea."] },
      { title: "Kitchen", body: ["Equipped for everyday life: hob, fridge, tableware and the essentials for every meal."] },
      { title: "Outdoor space", body: ["An open-air corner for breakfast in the morning or a break in the shade during warm hours."] }
    ]
  },
  servizi: {
    seoTitle: "Services — DangiHouse, holiday home in San Salvo Marina",
    seoDescription:
      "Wi-Fi, air conditioning, equipped kitchen, linen and parking: all the services included in your stay at DangiHouse.",
    h1: "Services",
    heroSubtitle: "Everything you need to feel at home.",
    intro: "We chose services with practicality in mind: what makes a stay comfortable, without fuss.",
    groups: [
      { title: "Comfort", items: ["Air conditioning", "Free Wi-Fi", "Linen and towels", "Final cleaning included"] },
      { title: "Kitchen", items: ["Equipped kitchen", "Fridge and freezer", "Moka pot", "Complete tableware"] },
      { title: "Outdoor & mobility", items: ["Parking", "Outdoor space", "Beach on foot", "Pets on request"] }
    ]
  },
  posizione: {
    seoTitle: "Location — DangiHouse, San Salvo Marina, Abruzzo",
    seoDescription:
      "DangiHouse is in San Salvo Marina on the Abruzzo coast: beach on foot, nearby services and a short drive from the Trabocchi Coast.",
    h1: "Location",
    heroSubtitle: "On the San Salvo Marina shore, between the sea and the Trabocchi Coast.",
    intro:
      "The house sits in the calm of San Salvo Marina, with the beach within walking distance and daily services nearby. A handy starting point to explore coastal Abruzzo.",
    places: [
      { name: "San Salvo Marina beach", detail: "On foot — sand and shallow water, easy for families." },
      { name: "Trabocchi Coast", detail: "By car — the famous cycle path and the trabocchi on the Adriatic." },
      { name: "Vasto", detail: "By car — old town, restaurants and services." },
      { name: "Termoli", detail: "By car — seaside village and port to the Tremiti Islands." }
    ],
    molise: {
      title: "Molise, a step away",
      intro: "Just beyond the border, minutes away, Molise begins: quiet villages, sea and small places to discover slowly.",
      spots: [
        { name: "Tremiti Islands", detail: "An Adriatic archipelago, by ferry from Termoli or Vasto." },
        { name: "Larino", detail: "Roman amphitheatre and old town, inland." },
        { name: "Agnone", detail: "The ancient art of bell-making, in the Molise mountains." },
        { name: "Pietrabbondante", detail: "The Samnite theatre, an archaeological site among the hills." }
      ]
    }
  },
  galleria: {
    seoTitle: "Gallery — DangiHouse, San Salvo Marina",
    seoDescription:
      "Images of DangiHouse: the bright interiors, the outdoor spaces and the sea of San Salvo Marina.",
    h1: "Gallery",
    heroSubtitle: "A glimpse of the house and its sea.",
    intro: "The photos show the spaces as they are: bright, simple, close to the sea.",
    categories: [
      { key: "interni", label: "Interiors" },
      { key: "esterni", label: "Outdoors" },
      { key: "mare", label: "Sea" },
      { key: "dintorni", label: "Surroundings" }
    ]
  },
  prenotazioni: {
    seoTitle: "Rates & Booking — DangiHouse, San Salvo Marina",
    seoDescription:
      "How to book DangiHouse in San Salvo Marina: availability request, methods, check-in and stay policies.",
    h1: "Rates & Booking",
    heroSubtitle: "A simple booking, from request to welcome.",
    intro:
      "Rates vary by season and length of stay. Write to us with your dates: we'll reply with availability and a clear quote.",
    steps: [
      { title: "1 · Request", body: "Send us dates and number of guests via the contact form or WhatsApp." },
      { title: "2 · Confirmation", body: "Receive availability, rate and payment details." },
      { title: "3 · Welcome", body: "We welcome you with instructions for an easy check-in." }
    ],
    policies: [
      { title: "Check-in / Check-out", body: "Check-in from 3:00 pm, check-out by 10:00 am. Flexible on request." },
      { title: "Minimum stay", body: "Varies by season; in high season it is usually weekly." },
      { title: "Cancellation", body: "Terms shared transparently at the confirmation stage." }
    ]
  },
  contatti: {
    seoTitle: "Contact — DangiHouse, San Salvo Marina",
    seoDescription:
      "Contact DangiHouse in San Salvo Marina for availability and information. Form, phone, WhatsApp and map location.",
    h1: "Contact",
    heroSubtitle: "We're here for any question about your stay.",
    intro: "Write to us for availability, information or simply for a tip about the area. We'll be glad to help.",
    form: {
      name: "Name",
      email: "Email",
      dates: "Stay dates",
      guests: "Guests",
      message: "Message",
      send: "Send request",
      sending: "Sending…",
      ok: "Thank you. We'll get back to you shortly.",
      error: "Something went wrong. Please retry or email us.",
      required: "Required field"
    }
  },
  faq: [
    { question: "How far is the sea?", answer: "San Salvo Marina beach is a few minutes away on foot." },
    { question: "Is parking included?", answer: "Yes, a parking space is available for guests." },
    { question: "Are pets allowed?", answer: "On request we're happy to consider pets." },
    { question: "How do I book?", answer: "Via the contact form or WhatsApp: we'll reply with availability and rate." }
  ]
};

const dictionaries: Record<Locale, Dict> = { it, en };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? it;
}
export type { Dict };
