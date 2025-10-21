"use client";

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

type ContextType = {
  selectedPageIndex: number | null;
  setSelectedPageIndex: (index: number | null) => void;
};

export const Context = createContext<ContextType>({
    selectedPageIndex: null,
    setSelectedPageIndex: () => {}
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPageIndex, setSelectedPageIndex] = useState<number | null>(
    null
  );

  return (
    <Context.Provider
      value={{
        selectedPageIndex,
        setSelectedPageIndex,
      }}
    >
      {children}
    </Context.Provider>
  );
};