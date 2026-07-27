import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Journal — Meine Tasche",
  description: "Geschichten aus dem Atelier — über Handwerk, Material und die Philosophie hinter jedem Stück.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-cream pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <header className="mb-16 border-b border-linen pb-10">
            <p className="font-cormorant-sc text-terre text-xs tracking-[0.4em] uppercase mb-4">
              Journal
            </p>
            <h1
              className="font-cormorant font-light text-espresso leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
            >
              Aus dem Atelier
            </h1>
          </header>

          {posts.length === 0 ? (
            <p className="font-cormorant text-terre text-xl italic">
              Neue Geschichten sind auf dem Weg — schau bald wieder vorbei.
            </p>
          ) : (
            <ul className="space-y-14">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    {p.date && (
                      <p className="font-cormorant-sc text-terre text-xs tracking-widest uppercase mb-3">
                        {new Date(p.date).toLocaleDateString("de-DE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                    <h2 className="font-cormorant font-light text-espresso text-3xl md:text-4xl leading-snug group-hover:text-sand transition-colors duration-300">
                      {p.title}
                    </h2>
                    {p.description && (
                      <p className="font-sans text-terre text-sm mt-3 leading-relaxed">
                        {p.description}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-2 font-cormorant-sc text-terre text-xs tracking-widest uppercase mt-5 group-hover:text-sand transition-colors duration-300">
                      Weiterlesen <span className="text-base">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-20">
            <Link href="/" className="font-cormorant-sc text-terre text-xs tracking-widest uppercase hover:text-sand transition-colors">
              ← Zurück
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
