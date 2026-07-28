import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";
import siteMeta from "../../../../content/site-meta.json";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Meine Tasche Journal`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date || undefined,
    url: `${SITE_URL}/blog/${slug}`,
  };

  const faqJsonLd = post.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: siteMeta.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      }
    : null;

  return (
    <>
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <main className="min-h-screen bg-cream pt-28 pb-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/blog"
            className="font-cormorant-sc text-terre text-xs tracking-widest uppercase hover:text-sand transition-colors inline-flex items-center gap-2"
          >
            ← Journal
          </Link>

          <header className="mt-10 mb-12 border-b border-linen pb-10">
            {post.date && (
              <p className="font-cormorant-sc text-terre text-xs tracking-widest uppercase mb-5">
                {new Date(post.date).toLocaleDateString("de-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
            <h1
              className="font-cormorant font-light text-espresso leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
            >
              {post.title}
            </h1>
            {post.description && (
              <p className="font-cormorant italic text-terre text-xl mt-4 leading-relaxed">
                {post.description}
              </p>
            )}
          </header>

          <article
            className="post-body text-espresso font-sans text-base"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {post.faq && (
            <section className="mt-16 pt-12 border-t border-linen">
              <p className="font-cormorant-sc text-terre text-xs tracking-[0.3em] uppercase mb-6">
                Häufige Fragen
              </p>
              <div className="space-y-8">
                {siteMeta.faq.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-cormorant text-espresso text-xl md:text-2xl font-medium leading-snug">
                      {item.q}
                    </h3>
                    <p className="font-sans text-espresso/80 text-sm md:text-base leading-relaxed mt-2">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
