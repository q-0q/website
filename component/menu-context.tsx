// MenuContext.tsx
import { createContext, useContext } from "react";

export const MenuContext = createContext<{
  selectedIndex: number | null;
  setSelectedIndex: (index: number) => void;
}>({
  selectedIndex: null,
  setSelectedIndex: () => {},
});

export const useMenu = () => useContext(MenuContext);
