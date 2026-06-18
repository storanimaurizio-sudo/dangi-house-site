import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

// Redirige "/" e i percorsi senza prefisso lingua verso la lingua scelta.
function detectLocale(req: NextRequest): string {
  const header = req.headers.get("accept-language") || "";
  const preferred = header.split(",")[0]?.split("-")[0]?.toLowerCase();
  return (locales as readonly string[]).includes(preferred || "") ? (preferred as string) : defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = (locales as readonly string[]).some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // esclude file statici, immagini, studio CMS e API
  matcher: ["/((?!_next|api|studio|logo|favicon.ico|.*\\..*).*)"]
};
