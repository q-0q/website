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
      } else if (
        previousSelectedPageIndex === null &&
        selectedPageIndex !== null &&
        path === "/" &&
        menuState === MenuState.Closed
      ) {
        setMenuState(MenuState.Opening);
        setPreviousSelectedPageIndex(selectedPageIndex);
        setSelectedPageIndex(null);
      } else if (
        menuState === MenuState.Open && path !== "/"
      ) {
        setMenuState(MenuState.Closing);
        menuItems.forEach((i) => {
            if (i.slug == path) {
            setSelectedPageIndex(i.index);
            }
        });
        // console.log(
        //     "Current: " + selectedPageIndex +
        //     " Prev: " + previousSelectedPageIndex +
        //     " Path: " + path +
        //     " State: " + menuState
        // )
      }
  }, [path]);


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