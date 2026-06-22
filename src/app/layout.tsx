import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_SC, DM_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { CookieConsent } from "@/components/CookieConsent";
import { CartProvider } from "@/components/CartContext";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const cormorantSC = Cormorant_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant-sc",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meine Tasche — Atelier für handgefertigte Ledertaschen",
  description: "Kuratierte Taschenmode, die Persönlichkeit und Trend vereint. Für jeden Anlass die perfekte Tasche — entworfen von Hand, gedacht für ein Leben.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${cormorant.variable} ${cormorantSC.variable} ${dmSans.variable}`}
    >
      <body className="bg-cream text-espresso font-sans antialiased">
        <FunnelTracker />
        <CartProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </CartProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
