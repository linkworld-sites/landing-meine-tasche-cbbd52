import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Kasse — Meine Tasche",
  description: "Bestellung bestätigen und Zahlung abschließen.",
};

export default function CheckoutPage() {
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-cream pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <CheckoutClient />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
