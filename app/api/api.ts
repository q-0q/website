"use server";

import { unified } from "unified"
import { remark } from "remark";
import html from "remark-html";
import oembed from "@agentofuser/remark-oembed"
import remarkDirectiveSugar from "remark-directive-sugar";
import rehypeStringify from "rehype-stringify";
import rehypeFormat from "rehype-format";
import remarkDirective from "remark-directive";
import matter from "gray-matter";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";


export async function getMarkdownContent(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
    : "http://localhost:3000";

  const url = `${baseUrl}/${path}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load markdown file: ${url}`);
  }

  const fileContents = await res.text();
  const { content } = matter(fileContents);

  const result = await unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(remarkDirectiveSugar)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  return result.toString();
}
