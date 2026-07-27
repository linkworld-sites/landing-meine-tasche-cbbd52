import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/posts";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";

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

  return (
    <>
      <SiteNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
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
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
