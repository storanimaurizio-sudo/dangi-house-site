import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HtmlLang } from "@/components/HtmlLang";
import { locales, isLocale, type Locale } from "@/lib/i18n";
import { localBusinessJsonLd } from "@/lib/seo";
import { getSite } from "@/lib/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();
  const locale = params.lang as Locale;
  const site = await getSite();

  return (
    <>
      <HtmlLang locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(locale)) }}
      />
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} site={site} />
    </>
  );
}
