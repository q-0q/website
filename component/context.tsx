"use client";

import { createContext, MenuHTMLAttributes, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { MenuState } from "./menu-item";
import { menuItems } from "@/data/menu-data";
import { usePathname } from "next/navigation";

type AppContextType = {
  selectedPageIndex: number | null;
  setSelectedPageIndex: (index: number | null) => void;

  previousSelectedPageIndex: number | null;
  setPreviousSelectedPageIndex: (index: number | null) => void;

  menuState: MenuState | null;
  setMenuState: (state: MenuState) => void;
};

export const AppContext = createContext<AppContextType>({
  selectedPageIndex: null,
  setSelectedPageIndex: () => {},

  previousSelectedPageIndex: null,
  setPreviousSelectedPageIndex: () => {},

  menuState: null,
  setMenuState: () => {},
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState<number | null>(null);
  const [previousSelectedPageIndex, setPreviousSelectedPageIndex] = useState<number | null>(null);
  const [menuState, setMenuState] = useState<MenuState | null>(null);

    const path = usePathname();

  useEffect(() => {
      if (previousSelectedPageIndex === null && selectedPageIndex === null) {
          let init = true;
          menuItems.forEach((i) => {
            if (i.slug == path) {
                setSelectedPageIndex(i.index);
                console.log("seed closed");
                setMenuState(MenuState.Closed);
                init = false;
            }
        });
        if (init) {
            console.log("seed init");
            setMenuState(MenuState.Init);
        }
    }

  });
//   console.log("AppContextProvider rendered");
//   useEffect(() => {
//     console.log("AppContextProvider mounted");
//     return () => {
//       console.log("AppContextProvider unmounted");
//     };
//   }, []);    

  return (
    <AppContext.Provider
      value={{

        selectedPageIndex,
        setSelectedPageIndex,

        previousSelectedPageIndex,
        setPreviousSelectedPageIndex,

        menuState,
        setMenuState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);