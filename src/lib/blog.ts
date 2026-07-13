import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const blogDirectory = path.join(process.cwd(), "content", "blog");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  excerpt: z.string().min(1),
  date: z.string().date(),
  coverImage: z.string().startsWith("/image/"),
  author: z.string().min(1),
  tags: z.array(z.string()).default([]),
});

export type BlogPost = z.infer<typeof frontmatterSchema> & { content: string };

function getPostFromFile(fileName: string): BlogPost {
  const source = fs.readFileSync(path.join(blogDirectory, fileName), "utf8");
  const { data, content } = matter(source);
  return { ...frontmatterSchema.parse(data), content };
}

export function getAllBlogPosts() {
  if (!fs.existsSync(blogDirectory)) return [];
  return fs.readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(getPostFromFile)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string) {
  return getAllBlogPosts().find((post) => post.slug === slug);
}
