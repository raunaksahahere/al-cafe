import type { Metadata } from "next";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getAllBlogPosts, getBlogPost } from "@/lib/blog";
import siteConfig from "@/data/site-config.json";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, images: [post.coverImage] },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();
  const { content } = await compileMDX({ source: post.content });
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: new URL(post.coverImage, siteConfig.business.websiteUrl).toString(),
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.business.name, url: siteConfig.business.websiteUrl },
    mainEntityOfPage: new URL(`/blog/${post.slug}`, siteConfig.business.websiteUrl).toString(),
  };

  return (
    <main className="min-h-screen bg-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Navbar />
      <article className="mx-auto max-w-3xl px-4 pb-24 pt-36">
        <p className="text-sm text-[#FF7A00]">{new Date(`${post.date}T00:00:00`).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
        <h1 className="mt-4 text-4xl font-bold leading-tight text-white md:text-6xl">{post.title}</h1>
        <p className="mt-5 text-lg font-light text-white/65">{post.excerpt}</p>
        <Image src={post.coverImage} alt="" width={1200} height={800} className="mt-10 h-auto w-full rounded-lg object-cover" priority />
        <div className="prose prose-invert mt-10 max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-[#FF7A00]">{content}</div>
      </article>
      <Footer />
    </main>
  );
}
