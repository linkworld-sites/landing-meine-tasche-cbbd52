import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/posts";
import { getLegalSlugs } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date() },
    { url: `${SITE_URL}/shop`, lastModified: new Date() },
    { url: `${SITE_URL}/blog`, lastModified: new Date() },
  ];

  const postRoutes: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  const legalRoutes: MetadataRoute.Sitemap = getLegalSlugs().map((slug) => ({
    url: `${SITE_URL}/legal/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...legalRoutes];
}
