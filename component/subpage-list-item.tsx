import { CSSProperties, forwardRef, MouseEventHandler } from "react";

type SubpageListItemProps = {
  title: string;
  description: string;
  engine: string;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const SubpageListItem = forwardRef<HTMLDivElement, SubpageListItemProps>(
  ({ title, description, engine, onClick }, ref) => {
    return (
      <div style={styles.container} onClick={onClick} ref={ref}>
        <div style={styles.text}>
          <div>
            <p style={styles.title}>{title}</p>
            <p style={styles.description}>{description}</p>
          </div>
        </div>
        <div style={styles.thumbnail}></div>
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
} = {
  container: {
    // width: "100%",
    height: "200px",
    borderColor: "gray",
    borderWidth: "1px",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // background: "red",
    padding: "20px",
    marginBottom: "10px",
    // zIndex: 200,
    pointerEvents: "all"
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
  },
  description: {
    color: "gray",
    fontSize: "0.9rem",
  },
  thumbnail: {
    backgroundColor: "white",
    width: "40%",
    height: "100%",
    borderRadius: "6px",
  },
};
