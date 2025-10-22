"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SubpageListItemData } from "@/data/games-data";
import SubpageListItem from "./subpage-list-item";

type SubpageListProps = {
  items: SubpageListItemData[];
};

export default function SubpageList({ items }: SubpageListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get("item"); // ?item=item-id

  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    selectedSlug
  );

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll to the selected item when selectedItemId changes
  useEffect(() => {
    if (selectedItemId && itemRefs.current[selectedItemId]) {
      itemRefs.current[selectedItemId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedItemId]);

  // Update selected item on URL change
  useEffect(() => {
    if (selectedSlug) {
      setSelectedItemId(selectedSlug);
    }
  }, [selectedSlug]);

  const handleItemClick = (id: string) => {
    setSelectedItemId(id);
    router.push(`?item=${id}`, { scroll: false });
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        {items.map((item) => (
          <SubpageListItem
            key={item.title}
            title={item.title}
            description={item.description}
            engine={item.engine}
            onClick={() => handleItemClick(item.title)}
            ref={(el) => {
              itemRefs.current[item.title] = el;
            }}
          />
        ))}
      </div>

      <div
      >
        {selectedItemId ? (
          <ItemDetailPanel itemId={selectedItemId} items={items} />
        ) : (
          <div>Select an item to see details</div>
        )}
      </div>
    </div>
  );
}

function ItemDetailPanel({
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
      style={{
        border: "1px solid gray",
        borderRadius: "4px",
        padding: "1rem",
        margin: "1rem",
        color: "white",
        top: "0px",
        position: "fixed",
        width: "40%",
        height: "90vh",
      }}
    >
      <h3>{item.title}</h3>
      <p>{item.description}</p>
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
    borderRadius: "6px",
  },
};
