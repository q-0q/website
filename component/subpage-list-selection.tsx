
import { CSSProperties, useEffect, useState } from "react";
import { getMarkdownContent } from "@/app/api/api";
import markdownStyles from "./markdown-styles.module.css";
import { SquareLoader } from "react-spinners";
import Loader from "./loader";
import { SubpageListItemData } from "./subpage-list-item";

export default function SubpageListSelection({
  itemId,
  items,
}: {
  itemId: string;
  items: SubpageListItemData[];
}) {
  const item = items.find((i) => i.title === itemId);
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!item) return;
    setLoading(true);
    getMarkdownContent(item.markdownPath)
      .then((content) => setHtmlContent(content))
      .finally(() => setLoading(false));
  }, [item]);

  if (!item) return <div>Item not found</div>;

  return (
    <div style={styles.container}>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
}

const styles: { container: CSSProperties } = {
  container: {
    border: "1px solid gray",
    borderRadius: "4px",
    padding: "2rem",
    color: "white",
    overflow: "scroll",
    height: "100%",
  }
};
