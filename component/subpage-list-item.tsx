import { CSSProperties, forwardRef, MouseEventHandler, useState } from "react";
import Loader from "./loader";

export interface SubpageListItemData {
  title: string;
  description: string;
  slug: string;
  contributions: string;
  playUrl: string;
  engine: string;
  markdownPath: string;
  thumbnailVideoUrl: string | null;
}

type SubpageListItemProps = {
  title: string;
  description: string;
  engine: string;
  thumbnailVideoUrl: string | null;
  onClick: MouseEventHandler<HTMLDivElement>;
  isSelected?: boolean;
};

const SubpageListItem = forwardRef<HTMLDivElement, SubpageListItemProps>(
  (
    {
      title,
      description,
      engine,
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
        <div style={styles.text}>
          <div>
            <p style={styles.title}>{title}</p>
            <p style={styles.description}>{description}</p>
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
  thumbnail: CSSProperties;
  text: CSSProperties;
  video: CSSProperties;
} = {
  container: {
    height: "200px",
    borderColor: "gray",
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
    justifyContent: "space-between",
    height: "100%",
    width: "50%",
  },

  title: {
    color: "white",
    margin: 0,
  },

  description: {
    color: "gray",
    fontSize: "0.9rem",
  },

  thumbnail: {
    // backgroundColor: "black",
    width: "45%",
    height: "100%",
    borderRadius: "6px",
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
    borderRadius: "6px",
    pointerEvents: "none",
  },
};
