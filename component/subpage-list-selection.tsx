import { SubpageListItemData } from "@/data/games-data";
import { CSSProperties, useEffect, useState } from "react";
import { getMarkdownContent } from "@/app/api/api";
import markdownStyles from "./markdown-styles.module.css";


export default function SubpageListSelection({
  itemId,
  items,
}: {
  itemId: string;
  items: SubpageListItemData[];
}) {
  const item = items.find((i) => i.title === itemId);
  if (!item) return <div>Item not found</div>;

  const [htmlContent, setHtmlContent] = useState("");

  console.log(htmlContent)
  
  useEffect(() => {
    if (item) getMarkdownContent(item.markdownPath).then(setHtmlContent);
  }, [item]);

  if (!item) return <div>Item not found</div>;

  return (
    <div style={styles.container}>
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
const styles: { container: CSSProperties } = {
  container: {
    border: "1px solid gray",
    borderRadius: "4px",
    padding: "1rem",
    color: "white",
    overflow: "scroll",
    height: "100%",
  },
};
