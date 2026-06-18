import type { Metadata } from "next";
import { Poppins, Fraunces } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap"
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
  display: "swap"
});

export const metadata: Metadata = {
  title: { default: "DangiHouse — San Salvo Marina", template: "%s" },
  icons: { icon: "/logo/favicon.ico", apple: "/logo/dangihouse-mark-192.png" }
};

// lang predefinito IT; aggiornato lato client per /en (vedi HtmlLang).
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${poppins.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
