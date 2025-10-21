"use client";

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

type AppContextType = {
  selectedPageIndex: number | null;
  setSelectedPageIndex: (index: number | null) => void;
};

export const AppContext = createContext<AppContextType>({
    selectedPageIndex: null,
    setSelectedPageIndex: () => {}
});

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState<number | null>(null);

  return (
    <AppContext.Provider
      value={{
        selectedPageIndex,
        setSelectedPageIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);