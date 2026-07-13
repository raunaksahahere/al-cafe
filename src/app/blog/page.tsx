import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { getAllBlogPosts } from "@/lib/blog";
import siteConfig from "@/data/site-config.json";

export const metadata: Metadata = {
  title: "Journal",
  description: `Stories, guides, and venue updates from ${siteConfig.business.name} in ${siteConfig.contact.address.addressLocality}.`,
  alternates: { canonical: "/blog" },
  openGraph: { images: ["/image/img13.jpg"] },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <section className="px-4 pb-24 pt-36">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#FF7A00]">Journal</p>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">From the <span className="text-[#FF7A00]">Lounge</span></h1>
          <p className="mt-5 max-w-2xl text-lg font-light text-white/60">Guides, menu notes, and event ideas from AL Cafe & Lounge.</p>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.slug} className="overflow-hidden rounded-lg border border-white/10 bg-[#111] transition-colors hover:border-[#FF7A00]/60">
                <Image src={post.coverImage} alt="" width={900} height={600} className="h-48 w-full object-cover" />
                <div className="p-6"><p className="text-sm text-[#FF7A00]">{new Date(`${post.date}T00:00:00`).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p><h2 className="mt-3 text-2xl font-semibold text-white"><Link href={`/blog/${post.slug}`} className="hover:text-[#FF7A00]">{post.title}</Link></h2><p className="mt-3 text-white/60">{post.excerpt}</p><div className="mt-5 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded border border-white/10 px-2 py-1 text-xs text-white/55">{tag}</span>)}</div></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
