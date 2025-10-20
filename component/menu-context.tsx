// MenuContext.tsx
"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type MenuContextType = {
  selectedIndex: number | null;
  swipeComplete: boolean;
  previousPathname: string | null;
  setSelectedIndex: (index: number | null) => void;
  setSwipeComplete: (swipeComplete: boolean) => void;
};

export const MenuContext = createContext<MenuContextType>({
  selectedIndex: null,
  swipeComplete: false,
  previousPathname: null,
  setSelectedIndex: () => {},
  setSwipeComplete: () => {},
});

export const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [swipeComplete, setSwipeComplete] = useState<boolean>(false);
  const [previousPathname, setPreviousPathname] = useState<string | null>(null);

  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    // Update previousPathname only when pathname changes
    if (previousPathRef.current !== pathname) {
      setPreviousPathname(previousPathRef.current);
      previousPathRef.current = pathname;
    }
  }, [pathname]);

  return (
    <MenuContext.Provider
      value={{
        selectedIndex,
        swipeComplete,
        previousPathname,
        setSelectedIndex,
        setSwipeComplete,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
