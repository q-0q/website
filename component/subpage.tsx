import React, { ReactNode, useEffect, useRef } from "react";
import { CSSProperties } from "react";
import "../app/globals.css";
import { useAppContext } from "./context";
import { MenuState } from "./menu-item";
import gsap from "gsap";

type SubpageProps = {
  children: ReactNode;
};

export default function Subpage({ children } : SubpageProps ) {

    const { 
        selectedPageIndex, 
        setSelectedPageIndex, 
        previousSelectedPageIndex,
        setPreviousSelectedPageIndex,
        menuState, 
        setMenuState
    } = useAppContext()

    const ref = useRef<HTMLDivElement>(null);
      
  useEffect(() => {

    gsap.to(ref.current, {
      opacity: menuState === MenuState.Closed ? 1 : 0,
      duration: 0.2
    })
  }, [menuState])
  
  return (
    <div style={styles.subpage} ref={ref}>
      { children }
    </div>
  );
}

const styles: { subpage: CSSProperties } = {
  subpage: {
    color: "black",
    opacity: "0",
    position: "absolute",
    width: "700px",
    maxWidth: "90vw",
    top: "calc(var(--vh, 1vh) * 24)",
    left: "calc(var(--vh, 1vh) * 3)",
  },
};