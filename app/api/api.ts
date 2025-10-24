"use server";

import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

export async function getMarkdownContent(path: string) {
  // Ensure the markdown files live under /public/
  // Example: public/psn.md → accessible at /psn.md

  // Use the correct base URL for production and local dev
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const url = `${baseUrl}/${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load markdown file: ${url}`);
  }

  const fileContents = await res.text();
  const { content } = matter(fileContents);
  const result = await remark().use(html).process(content);
  return result.toString();
}
