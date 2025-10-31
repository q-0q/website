import { CSSProperties, forwardRef, MouseEventHandler, useState } from "react";
import Loader from "./loader";

export interface SubpageListItemData {
  title: string;
  description: string;
  contributions: string | null;
  playUrl: string | null;
  sourceUrl : string | null;
  sourceButtonTextOverride : string | null;
  engine: string | null;
  markdownPath: string;
  thumbnailVideoUrl: string | null;
  date: string;
}

type SubpageListItemProps = {
  title: string;
  description: string;
  engine: string | null;
  thumbnailVideoUrl: string | null;
  onClick: MouseEventHandler<HTMLDivElement>;
  sourceUrl: string | null;
  playUrl: string | null;
  isSelected?: boolean;
};

const SubpageListItem = forwardRef<HTMLDivElement, SubpageListItemProps>(
  (
    {
      title,
      description,
      engine,
      sourceUrl,
      playUrl,
      thumbnailVideoUrl: videoUrl,
      onClick,
      isSelected = false,
    },
    ref
  ) => {
    const [loading, setLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const handleVideoLoaded = () => setLoading(false);
    const handleVideoError = () => setLoading(false);

    // Determine combined container style
    const containerStyle: CSSProperties = {
      ...styles.container,
      ...(isHovered ? styles.hovered : {}),
      ...(isSelected ? styles.selected : {}),
    };

    return (
      <div
        style={containerStyle}
        onClick={onClick}
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.information}>
          <div style={styles.text}>
            <p style={styles.title}>{title}</p>
            <p style={styles.description}>{description}</p>
          </div>

          <div style={styles.buttonContainer}>
            {/* {sourceUrl && (
              <a
                href={sourceUrl}
                style={{
                  ...styles.badge,
                  borderWidth: "1px",
                  borderColor: "var(--brand-color)",
                  color: "var(--brand-color)",
                }}
              >
                Source
              </a>
            )} */}
            {playUrl && (
              <a
                href={playUrl}
                style={{
                  ...styles.badge,
                  backgroundColor: "var(--brand-color)",
                  color: "black",
                }}
              >
                Play
              </a>
            )}
          </div>
        </div>

        <div style={styles.thumbnail}>
          {loading && videoUrl && <Loader />}

          {videoUrl && (
            <video
              src={videoUrl}
              style={{
                ...styles.video,
                display: loading ? "none" : "block",
              }}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              onLoadedData={handleVideoLoaded}
              onError={handleVideoError}
            />
          )}
        </div>
      </div>
    );
  }
);

export default SubpageListItem;

const styles: {
  container: CSSProperties;
  hovered: CSSProperties;
  selected: CSSProperties;
  title: CSSProperties;
  description: CSSProperties;
  text: CSSProperties;
  thumbnail: CSSProperties;
  information: CSSProperties;
  video: CSSProperties;
  badge: CSSProperties;
  buttonContainer: CSSProperties;
} = {
  container: {
    height: "27%",
    borderColor: "#474747",
    boxSizing: "border-box",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "20px",
    marginBottom: "10px",
    pointerEvents: "all",
    backgroundColor: "transparent",
    transition: "border-color 0.2s, background-color 0.2s",
    cursor: "pointer",
    overflow: "hidden"
  },

  hovered: {
    borderColor: "#888",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },

  selected: {
    borderColor: "#888",
    // borderWidth: "2px",
    backgroundColor: "rgba(255, 255, 255, 0.065)",
  },

  text: {
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
    height: "100%",
    // width: "50%",
    // backgroundColor: "red",
  },

  information: {
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
    height: "100%",
    width: "50%",
    // backgroundColor: "red",
  },

  title: {
    color: "white",
    margin: 0,
  },

  description: {
    color: "gray",
    fontSize: "0.8rem",
  },

  thumbnail: {
    // backgroundColor: "black",
    width: "45%",
    height: "100%",
    borderRadius: "3px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    // borderRadius: "6px",
    pointerEvents: "none",
  },

  badge: {
    width: "fit-content",
    padding: "0.2rem 0.5rem",
    borderRadius: "30px",
    textDecoration: "none",
    borderStyle: "solid",
    fontSize: "0.75rem",
  },

  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    justifyContent: "flex-start",
    flexShrink: 0,
  },
};
