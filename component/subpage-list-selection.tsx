import { SubpageListItemData } from "@/data/games-data";
import { CSSProperties } from "react";

export default function ItemDetailPanel({
  itemId,
  items,
}: {
  itemId: string;
  items: SubpageListItemData[];
}) {
  const item = items.find((i) => i.title === itemId);
  if (!item) return <div>Item not found</div>;

  return (
    <div
      style={styles.container}
    >
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  );
}

const styles: {
  container: CSSProperties;
} = {
  container: {
    border: "1px solid gray",
    borderRadius: "4px",
    padding: "1rem",
    marginTop: "2vh",
    marginBottom: "2vh",
    color: "white",
    top: "0px",
    // position: "fixed",
    flex: 1,
  
    height: "96vh",

  },
};
