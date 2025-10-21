import { CSSProperties } from "react";

type GameListItemProps = {
  title: string;
  description: string;
  slug: string;
  engine : string;
};

export default function GameListItem( {title, description, slug, engine} : GameListItemProps) {
  return (
    <div style={styles.container}>
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

const styles: {
  container: CSSProperties;
  title: CSSProperties;
  description: CSSProperties;
  thumbnail: CSSProperties;
  text: CSSProperties;
} = {
  container: {
    width: "100%",
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
    borderRadius: "6px"
  },
};

