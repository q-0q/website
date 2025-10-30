"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { CSSProperties } from "react";
import "../app/globals.css";
import { useAppContext } from "./context";
import { MenuState } from "./menu-item";
import gsap from "gsap";

export default function Badge() {

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

        const handleResize = () => {
          choreograph();
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      });

      useEffect(() => {
        // menu-wide animations
        choreograph();
      }, [menuState]);

      
  return (
    <div style={styles.title} ref={ref}>
      <p>Jack Withers</p>
      <p style={{color: "gray"}}>q-0q</p>
    </div>
  );

  function choreograph() {
    // gsap.to(ref.current, {
    //   x:
    //   duration: 0.2,
    // });

    const opacity = menuState == MenuState.Open || menuState == MenuState.Init ? 1 : 0;
    console.log("opacity: " + opacity)
    gsap.to(ref.current, {
      opacity: opacity,
      duration: 0.2
    })
  }
}

const styles: { title: CSSProperties } = {
  title: {
    position: "absolute",
    top: "calc(var(--vh, 1vh) * 9)",
    left: "calc(var(--vh, 1vh) * 5)",
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
    paddingLeft: "10px",
  },
};