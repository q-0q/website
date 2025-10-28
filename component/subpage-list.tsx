"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CSSProperties, useEffect, useRef, useState } from "react";
import SubpageListItem, { SubpageListItemData } from "./subpage-list-item";
import SubpageListSelection from "./subpage-list-selection";

export const MOBILE_BREAKPOINT = 800;

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
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Detect screen size and update mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to selected item (desktop only)
  useEffect(() => {
    if (!isMobile && selectedItemId && itemRefs.current[selectedItemId]) {
      itemRefs.current[selectedItemId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selectedItemId, isMobile]);

  // Sync selected item with URL
  useEffect(() => {
    const slug = searchParams.get("item");
    setSelectedItemId(slug);
  }, [searchParams.toString()]);


  const handleItemClick = (id: string) => {
    setSelectedItemId(id);
    router.push(`?item=${id}`, { scroll: false });
  };

  // === Mobile layout ===
  if (isMobile) {
    return (
      <div style={mobileStyles.container}>
        {!selectedItemId ? (
          <>
            {/* Outer container with static dividers */}
            <div style={mobileStyles.listOuterContainer}>
              <hr style={styles.divider} />
              <div style={mobileStyles.listInnerContainer}>
                {items.map((item) => (
                  <SubpageListItem
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    engine={item.engine}
                    playUrl={item.playUrl}
                    sourceUrl={item.sourceUrl}
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
          </>
        ) : (
          <div style={mobileStyles.selectionContainer}>
            <SubpageListSelection itemId={selectedItemId} items={items} />
          </div>
        )}
      </div>
    );
  }

  // === Desktop layout ===
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
                    playUrl={item.playUrl}
                    sourceUrl={item.sourceUrl}
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

// =====================
// DESKTOP STYLES
// =====================
const styles: {
  listOuterContainer: CSSProperties;
  listInnerContainer: CSSProperties;
  selectionContainer: CSSProperties;
  divider: CSSProperties;
} = {
  listOuterContainer: {
    marginTop: "18vh",
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

// =====================
// MOBILE STYLES
// =====================
const mobileStyles: Record<string, CSSProperties> = {
  container: {
    marginTop: "11vh",
    width: "100%",
    height: "calc(var(--vh, 1vh) * 85)",
    display: "flex",
    flexDirection: "column",
  },
  listOuterContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  listInnerContainer: {
    height: "100%",
    overflowY: "auto",
    padding: "10px 0",
    pointerEvents: "all",
  },
  selectionContainer: {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    pointerEvents: "all",
  },
};

