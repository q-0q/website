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
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.title}>{item.title}</div>
            <div style={styles.buttonContainer}>
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

          {/* Date */}
          <time style={styles.time} dateTime={date.toDateString()}>
            Edited {date.toDateString()}
          </time>

          {/* Article content */}
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
  buttonContainer: CSSProperties;
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
    display: "flex",
    flexWrap: "wrap", // ✅ allows wrapping
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
    gap: "0.5rem", // spacing when wrapped
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    flexShrink: 0,
  },
  button: {
    width: "fit-content",
    padding: "0.5rem 1rem",
    borderRadius: "30px",
    textDecoration: "none",
    borderStyle: "solid",
  },
  divider: {
    color: "gray",
    opacity: "0.5",
    margin: "1rem 0",
  },
  time: {
    color: "gray",
    fontSize: "0.75rem",
  },
};
