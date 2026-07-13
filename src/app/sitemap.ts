import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import siteConfig from "@/data/site-config.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.business.websiteUrl;
  const staticRoutes = ["", "/menu", "/hookah-lounge", "/blog"];
  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })),
    ...getAllBlogPosts().map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(post.date) })),
  ];
}
