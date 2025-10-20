// MenuContext.tsx
import { createContext, useContext } from "react";

export const MenuContext = createContext<{
  selectedIndex: number | null;
  swipeComplete: boolean;
  setSelectedIndex: (index: number) => void;
  setSwipeComplete: (swipeComplete: boolean) => void;
}>({
  selectedIndex: null,
  swipeComplete: false,
  setSelectedIndex: () => {},
  setSwipeComplete: () => {}
});

export const useMenu = () => useContext(MenuContext);
