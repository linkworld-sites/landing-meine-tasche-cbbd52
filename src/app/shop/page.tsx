import { getProducts } from "@/lib/products";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import ShopWrapper from "./ShopWrapper";

export const metadata = {
  title: "Kollektion — Meine Tasche",
  description: "Kuratierte Ledertaschen aus dem Berliner Atelier. Handgefertigt. Zeitlos.",
  alternates: {
    canonical: "/shop",
  },
};

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-cream pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <header className="mb-16 border-b border-linen pb-10">
            <p className="font-cormorant-sc text-terre text-xs tracking-[0.4em] uppercase mb-4">
              Kollektion
            </p>
            <h1 className="font-cormorant font-light text-espresso leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}>
              Ausgewählte Stücke
            </h1>
            <p className="font-sans text-terre text-sm mt-4 max-w-md">
              Jedes Stück ist ein Unikat — handgefertigt im Berliner Atelier.
              Kein Lagerbestand. Kein Kompromiss.
            </p>
          </header>

          <ShopWrapper products={products} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
