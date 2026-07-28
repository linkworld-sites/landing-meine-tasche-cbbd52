import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_SC, DM_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { CookieConsent } from "@/components/CookieConsent";
import { CartProvider } from "@/components/CartContext";
import { SITE_URL } from "@/lib/site";
import siteMeta from "../../content/site-meta.json";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Meine Tasche — Atelier für handgefertigte Ledertaschen",
    template: "%s — Meine Tasche",
  },
  description: "Kuratierte Taschenmode, die Persönlichkeit und Trend vereint. Für jeden Anlass die perfekte Tasche — entworfen von Hand, gedacht für ein Leben.",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "WlJ66mw7eszwjs5WXh-HAJ_3n22gXQA1yf23ABf0enE",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteMeta.organization.name,
  url: siteMeta.organization.url,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Meine Tasche",
  url: SITE_URL,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="de"
      className={`${cormorant.variable} ${cormorantSC.variable} ${dmSans.variable}`}
    >
      <body className="bg-cream text-espresso font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <FunnelTracker />
        <CartProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </CartProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
