# DangiHouse — Sito web

> **Stato deploy (CMS live)**
> - **Studio online (per il cliente):** https://dangihouse.sanity.studio/ — accesso da qualsiasi dispositivo, login Sanity.
> - **Progetto Sanity:** `719w3z4s` · dataset `production` (pubblico)
> - **Contenuti pubblicati:** impostazioni, 14 pagine (IT/EN), 24 servizi, 8 FAQ, 2 strutture (IT/EN).
> - **Manca solo:** pubblicare il front-end Next.js su un host web (Vercel) + caricare le foto nello Studio. Vedi §6.

Sito ufficiale di **DangiHouse**, casa vacanza a **San Salvo Marina (CH), Abruzzo**.
Bilingue (IT/EN), SEO‑ready, **collegato al CMS Sanity** e pronto al deploy.

- **Frontend:** Next.js 14 (App Router) + TypeScript
- **Styling:** TailwindCSS (palette sabbia + blu mare)
- **CMS:** Sanity (headless) — Studio integrato su `/studio`, contenuti live via GROQ
- **Lingue:** Italiano (default) + Inglese, con `hreflang` e sitemap multilingua
- **Form contatti:** API route `/api/contact` (Resend opzionale, fallback log)

> **Tutto il sito legge da Sanity** con fallback automatico ai testi statici
> (`src/lib/content.ts`): senza progetto Sanity configurato il sito funziona
> comunque; appena colleghi le credenziali, i contenuti arrivano dal CMS.

---

## 1. Requisiti
- Node.js **18.17+** (consigliato 20+)
- Un progetto **Sanity** gratuito

## 2. Installazione
```bash
cd dangi-house-site
npm install
cp .env.local.example .env.local   # compila i valori
npm run dev
```
Sito su `http://localhost:3000` → `/it`. Studio CMS su `/studio`.

### Variabili d'ambiente (`.env.local`)
| Variabile | Descrizione |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID progetto Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (es. `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Data API (es. `2024-07-01`) |
| `SANITY_API_WRITE_TOKEN` | Token **Editor** (serve solo per `npm run seed`) |
| `CONTACT_TO_EMAIL` | Email che riceve le richieste dal form |
| `RESEND_API_KEY` | Chiave Resend per invio email (opzionale) |
| `NEXT_PUBLIC_SITE_URL` | URL pubblico (canonical/sitemap) |

## 3. Collegare e popolare Sanity (3 passi)
1. **Crea il progetto** su [sanity.io/manage](https://www.sanity.io/manage): prendi **Project ID** e crea il dataset `production`. Inserisci i valori in `.env.local`.
2. **Token di scrittura**: in *API → Tokens* crea un token con permessi **Editor** → `SANITY_API_WRITE_TOKEN`.
3. **Importa i contenuti** (siteSettings, pagine IT/EN, servizi, FAQ):
   ```bash
   npm run seed
   ```
   Lo script è idempotente: puoi rilanciarlo dopo aver aggiornato i testi statici.
4. Apri `/studio`, accedi e modifica i contenuti. Le pagine si aggiornano (ISR, ~60s).
5. In *API → CORS Origins* aggiungi `http://localhost:3000` e il dominio di produzione.

> Le **foto della galleria** vanno caricate a mano nello Studio (documenti *Foto galleria*): il seed non carica immagini. Finché non ci sono foto, la galleria mostra dei placeholder.

## 4. Come funziona il collegamento (architettura dati)
- `sanity/lib/fetch.ts` → `sanityFetch()`: legge da Sanity, ritorna `null` se non configurato o in errore (nessun crash).
- `src/lib/data.ts` → loader per pagina/collezione (`getHome`, `getServizi`, `getGalleria`, `getSite`, …): uniscono i dati Sanity ai fallback statici, campo per campo.
- Le pagine in `src/app/[lang]/…` sono **Server Component async** che chiamano i loader.
- `src/lib/content.ts` resta come **fallback** e fonte per il seed.

### Tipi di contenuto in Sanity
| Tipo | Uso |
|---|---|
| **Impostazioni sito** | contatti, mappa, social, link prenotazione (Footer, Contatti, Posizione) |
| **Pagina** (`key` + `lang`) | SEO, hero, intro e blocchi di ogni pagina |
| **Servizio** (`group` + `lang`) | voci della pagina Servizi, raggruppate |
| **Foto galleria** | immagini con `alt`, didascalia, categoria |
| **FAQ** (`lang`) | domande/risposte (pagina Prenotazioni) |
| **Alloggio** | opzionale, per elencare più unità |

## 5. Struttura
```
dangi-house-site/
├── public/logo/            # logo SVG + PNG + favicon
├── scripts/seed.ts         # importa i contenuti statici in Sanity
├── sanity/                 # CMS: env, client tollerante, query, schema
│   ├── env.ts · lib/{client,fetch,image,queries}.ts
│   └── schemaTypes/        # siteSettings, page, apartment, service, galleryImage, faq
├── sanity.config.ts        # Studio (/studio)
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # root (html/body, font)
│   │   ├── [lang]/ (layout + 7 pagine) # Home, La Casa, Servizi, Posizione,
│   │   │                               # Galleria, Prenotazioni, Contatti
│   │   ├── studio/[[...tool]]/page.tsx  # Studio CMS
│   │   ├── api/contact/route.ts
│   │   └── sitemap.ts · robots.ts
│   ├── components/         # Header, Footer, Hero, Section, Gallery, CTA, ContactForm, Logo
│   ├── lib/                # i18n, content (fallback IT/EN), data (loader Sanity), seo
│   └── middleware.ts       # rilevamento lingua + redirect
└── config (tailwind, tsconfig, next, postcss)
```

## 6. Deploy
**Vercel (consigliato):** importa il repo, imposta le env, build `next build`. Aggiungi il dominio ai CORS di Sanity.
**Netlify:** runtime Next ufficiale, build `npm run build`.
**Node classico:** `npm run build && npm run start` (serve ambiente Node: API, ISR, middleware).

## 7. SEO incluso
`generateMetadata` per pagina · canonical · `hreflang` IT/EN + `x-default` · `sitemap.xml` multilingua · `robots.txt` · JSON‑LD `LodgingBusiness` · URL puliti `/it/…` `/en/…`.

## 8. Logo
In `public/logo/`: `dangihouse-logo-horizontal`, `dangihouse-logo` (chiaro), `dangihouse-logo-dark`, `dangihouse-mark` + favicon — in **SVG (sorgente) + PNG**.

## 9. Da verificare prima del lancio
- **Dati di contatto e tecnici** (telefono, WhatsApp, mappa, mq, orari, policy) sono placeholder: aggiornali nello Studio o in `content.ts`.
- Carica le **foto reali** (galleria e hero) nello Studio.
