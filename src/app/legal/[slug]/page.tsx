import { notFound } from "next/navigation";
import { getLegalPage, getLegalSlugs } from "@/lib/legal";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export function generateStaticParams() {
  return getLegalSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  const titles: Record<string, string> = {
    impressum: "Impressum",
    datenschutz: "Datenschutz",
    cookies: "Cookies",
    privacy: "Datenschutz",
  };

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-cream pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <header className="mb-12 border-b border-linen pb-8">
            <p className="font-cormorant-sc text-terre text-xs tracking-[0.4em] uppercase mb-3">
              Rechtliches
            </p>
            <h1
              className="font-cormorant font-light text-espresso"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {titles[slug] ?? page.title ?? slug}
            </h1>
          </header>
          <article
            className="post-body text-espresso/80 font-sans text-sm"
            dangerouslySetInnerHTML={{ __html: page.html }}
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
