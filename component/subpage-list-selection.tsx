import { SubpageListItemData } from "@/data/games-data";
import { CSSProperties } from "react";
import fs from "fs";
import matter from "gray-matter";
import html from "remark-html";
import { remark } from "remark";


export default function ItemDetailPanel({
  itemId,
  items,
}: {
  itemId: string;
  items: SubpageListItemData[];
}) {
  const item = items.find((i) => i.title === itemId);
  if (!item) return <div>Item not found</div>;

  const { content: markdownContent } = getMarkdownFile(item.markdownPath);
  const markdownHtml = markdownToHtml(markdownContent);

  return (
    <div style={styles.container}>
      <h3>{item.title}</h3>
      <p>{item.description}</p>

      <div className="max-w-2xl mx-auto">
        <div dangerouslySetInnerHTML={{ __html: markdownHtml }} />
      </div>
    </div>
  );
}

const styles: {
  container: CSSProperties;
} = {
  container: {
    border: "1px solid gray",
    borderRadius: "4px",
    padding: "1rem",
    // marginTop: "2vh",
    // marginBottom: "2vh",
    color: "white",
    top: "0px",
    // position: "fixed",
    // flex: 1,
  
    height: "100%",

  },
};

function getMarkdownFile(path : string) {
  const fileContents = fs.readFileSync(path, "utf8");
  const { data, content } = matter(fileContents);
  return { ...data, content };
}

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}