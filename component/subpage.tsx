import React, { ReactNode, Suspense, useEffect, useRef } from "react";
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
    <div style={styles.container} ref={ref}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </div>
  );
}

const styles: { container: CSSProperties } = {
  container: {
    // background: "red",
    padding: "calc(var(--vh, 1vh) * 3)",
    // paddingRight: "calc(var(--vh, 1vh) * 3)",
    // paddingTop: "calc(var(--vh, 1vh) * 3)",
    opacity: "0",
    position: "absolute",
    display: "flex",
    width: "100vw",
    height: "calc(var(--vh, 1vh) * 100)",
    top: "0",
    left: 0,
    pointerEvents: "none",
    gap: "calc(var(--vh, 1vh) * 3)",
  },
};