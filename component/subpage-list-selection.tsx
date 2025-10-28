
import { CSSProperties, useEffect, useState } from "react";
import { getMarkdownContent } from "@/app/api/api";
import markdownStyles from "./markdown-styles.module.css";
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
  if (!item) return;
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(true);
  const date = new Date(item.date);
  console.log(date)

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
      <Loader />
    ) : (
      <>
        <div style={styles.header}>
          <div style={styles.title}>{item.title}</div>
          <div>
            {item.sourceUrl && (
              <a
                href={item.sourceUrl}
                style={{
                  ...styles.button,
                  borderWidth: "1px",
                  borderColor: "var(--brand-color)",
                  color: "var(--brand-color)",
                }}
              >
                Source
              </a>
            )}
            {item.playUrl && (
              <a
                href={item.playUrl}
                style={{
                  ...styles.button,
                  backgroundColor: "var(--brand-color)",
                  color: "black",
                }}
              >
                Play
              </a>
            )}
          </div>
        </div>
        <time style={styles.time} dateTime={date.toDateString()}>
          Edited {date.toDateString()}
        </time>
        {/* <hr style={styles.divider} /> */}
        <div
          className={markdownStyles["markdown"]}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </>
    )}
  </div>
);

}

const styles: {
  container: CSSProperties;
  button: CSSProperties;
  header: CSSProperties;
  title: CSSProperties;
  divider: CSSProperties;
  time: CSSProperties;
} = {
  container: {
    border: "1px solid gray",
    borderRadius: "4px",
    padding: "2rem",
    color: "white",
    overflow: "scroll",
    height: "100%",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  button: {
    width: "fit-content",
    padding: "0.5rem 1rem 0.5rem 1rem",
    margin: "0 0.5rem 0 0.5rem",
    borderRadius: "30px",
  },
  divider: {
    color: "gray",
    opacity: "0.5",
    margin: "1rem 0 1rem 0",
  },
  time: {
    color: "gray",
    fontSize: "0.75rem"
  },
};
