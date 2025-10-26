import { CSSProperties, forwardRef, MouseEventHandler, useState } from "react";
import Loader from "./loader";

type SubpageListItemProps = {
  title: string;
  description: string;
  engine: string;
  thumbnailVideoUrl: string;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const SubpageListItem = forwardRef<HTMLDivElement, SubpageListItemProps>(
  (
    { title, description, engine, thumbnailVideoUrl: videoUrl, onClick },
    ref
  ) => {
    const [loading, setLoading] = useState(true);

    const handleVideoLoaded = () => {
      setLoading(false);
    };

    const handleVideoError = () => {
      setLoading(false); // hide loader even if video fails to load
    };

    return (
      <div style={styles.container} onClick={onClick} ref={ref}>
        <div style={styles.text}>
          <div>
            <p style={styles.title}>{title}</p>
            <p style={styles.description}>{description}</p>
          </div>
        </div>

        <div style={styles.thumbnail}>
          {loading && <Loader />}

          {videoUrl && (
            <video
              src={videoUrl}
              style={{
                ...styles.video,
                display: loading ? "none" : "block", // hide video until loaded
              }}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              onLoadedData={handleVideoLoaded} // fires when video data is ready
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
    backgroundColor: "black",
    width: "45%",
    height: "100%",
    borderRadius: "6px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // allows loader centering
  },

  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "6px",
    pointerEvents: "none",
  },
};
