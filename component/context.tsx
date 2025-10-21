"use client";

import { createContext, MenuHTMLAttributes, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { MenuState } from "./menu-item";

type AppContextType = {
  selectedPageIndex: number | null;
  setSelectedPageIndex: (index: number | null) => void;
  menuState: MenuState;
  setMenuState: (state: MenuState) => void;
};

export const AppContext = createContext<AppContextType>({
  selectedPageIndex: null,
  setSelectedPageIndex: () => {},
  menuState: MenuState.Init,
  setMenuState: () => {},
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState<number | null>(null);
  const [menuState, setMenuState] = useState<MenuState>(MenuState.Init);

  return (
    <AppContext.Provider
      value={{
        selectedPageIndex,
        setSelectedPageIndex,
        menuState,
        setMenuState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);