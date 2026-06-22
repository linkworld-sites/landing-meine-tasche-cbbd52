import { SiteNav } from "@/components/SiteNav";
import { HeroSection } from "@/components/HeroSection";
import { FounderSection } from "@/components/FounderSection";
import { KollektionSection } from "@/components/KollektionSection";
import { ProzessSection } from "@/components/ProzessSection";
import { MaterialSection } from "@/components/MaterialSection";
import { UnikateBanner } from "@/components/UnikateBanner";
import { KontaktSection } from "@/components/KontaktSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <FounderSection />
        <KollektionSection />
        <ProzessSection />
        <MaterialSection />
        <UnikateBanner />
        <KontaktSection />
      </main>
      <SiteFooter />
    </>
  );
}
