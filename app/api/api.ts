// app/actions/getMarkdownContent.ts
"use server";

import fs from "fs";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

export async function getMarkdownContent(path: string) {
  const fileContents = fs.readFileSync(path, "utf8");
  const { content } = matter(fileContents);
  const result = await remark().use(html).process(content);
  return result.toString();
}
