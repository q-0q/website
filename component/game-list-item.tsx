import { CSSProperties } from "react";

type GameListItemProps = {
  title: string;
  description: string;
  slug: string;
};

export default function GameListItem( {title, description, slug} : GameListItemProps) {
  return (
    <div style={styles.container}>
      <p style={styles.title}>{title}</p>
      <p style={styles.description}>{description}</p>
    </div>
  );
}

const styles: {
  container: CSSProperties;
  title: CSSProperties;
  description: CSSProperties;
} = {
  container: {
    width: "100%",
    // height: "100px",
    borderColor: "gray",
    borderWidth: "1px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    // background: "red",
    padding: "20px",
    marginBottom: "10px",
  },
  title: {
    // paddingTop: "20px",
    // paddingLeft: "10px",
    // maxWidth: "30%",
    color: "white",
  },
  description: {
    color: "gray",
    fontSize: "0.9rem",
  },
};

