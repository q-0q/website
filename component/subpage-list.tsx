"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, useEffect, useRef, useState } from "react";
import SubpageListItem, { SubpageListItemData } from "./subpage-list-item";
import SubpageListSelection from "./subpage-list-selection";

type SubpageListProps = {
  items: SubpageListItemData[];
};

export default function SubpageList({ items }: SubpageListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get("item");

  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    selectedSlug
  );

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll to selected item
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
    if (selectedSlug) setSelectedItemId(selectedSlug);
  }, [selectedSlug]);

  const handleItemClick = (id: string) => {
    setSelectedItemId(id);
    router.push(`?item=${id}`, { scroll: false });
  };

  return (
    <>
      <div style={styles.listOuterContainer}>
        <hr style={styles.divider} />
        <div style={styles.listInnerContainer}>
          {items.map((item) => (
            <SubpageListItem
              key={item.title}
              title={item.title}
              description={item.description}
              engine={item.engine}
              thumbnailVideoUrl={item.thumbnailVideoUrl}
              onClick={() => handleItemClick(item.title)}
              isSelected={selectedItemId === item.title}
              ref={(el) => {
                itemRefs.current[item.title] = el;
              }}
            />
          ))}
        </div>
        <hr style={styles.divider} />
      </div>

      <div style={styles.selectionContainer}>
        {selectedItemId ? (
          <SubpageListSelection itemId={selectedItemId} items={items} />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

const styles: {
  listOuterContainer: CSSProperties;
  listInnerContainer: CSSProperties;
  selectionContainer: CSSProperties;
  divider: CSSProperties;
} = {
  listOuterContainer: {
    marginTop: "17vh",
    width: "40%",
    flexDirection: "column",
  },

  listInnerContainer: {
    height: "100%",
    overflow: "scroll",
    paddingTop: "15px",
    paddingBottom: "15px",
    flexDirection: "column",
    pointerEvents: "all",
  },

  selectionContainer: {
    height: "100%",
    width: "60%",
    flexDirection: "column",
    display: "flex",
    pointerEvents: "all",
  },

  divider: {
    color: "gray",
    opacity: "0.5",
  },
};
