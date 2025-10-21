"use client";

import { CSSProperties, RefObject, useContext, useEffect, useRef } from "react";
import { menuItems } from "@/data/menu-data";
import { useState } from "react";
import { useAppContext } from "./context";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { inverseLerp, lerp } from "@/helper/helper";

type MenuItemProps = {
  index: number;
  title: string;
  description: string;
  link: string;
};

enum MenuState {
    Init,
    Opening,
    Closing
}

export { MenuState }

export default function MenuItem({ index, title, description, link }: MenuItemProps) {

    const shapeRef = useRef<HTMLDivElement>(null);
    const mouseMoveContainerRef = useRef<HTMLDivElement>(null);
    const transitionContainerRef = useRef<HTMLDivElement>(null);

    const { selectedPageIndex, setSelectedPageIndex, menuState, setMenuState} = useAppContext()

    function handleClick(){
        setSelectedPageIndex(index)
        if (menuState === MenuState.Init || menuState === MenuState.Opening) {
            setMenuState(MenuState.Closing);
        } else {
            setMenuState(MenuState.Opening);
        }
    }

    useEffect(() => {

        // menu-wide animations
        choreograph();

        // Mouse motion effect
        const handleMouseMove = (e: MouseEvent) => {
            if (!shapeRef.current) return;
            if (!mouseMoveContainerRef.current) return;

            const rect = shapeRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const mouseDistance = Math.sqrt(dx * dx + dy * dy);

            const maxOffset = 10;
            const maxDistanceToTrigger = 300;
            const minDistanceToTrigger = 100;
            let weight = inverseLerp(maxDistanceToTrigger, minDistanceToTrigger, mouseDistance);
            const moveX = lerp(0, maxOffset, weight);
            setMouseMoveRefTranslateX(moveX);
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    });

    return (
      <div style={styles.container} ref={transitionContainerRef}>
        <div ref={mouseMoveContainerRef} style={styles.mouseMove}>
          <div style={styles.shape} onClick={handleClick} ref={shapeRef}></div>
          <div style={styles.text}>
            <p onClick={handleClick} style={styles.name}>{title}</p> 
            <p style={styles.description}>{description} </p>
          </div>
        </div>
      </div>
    );

    function setMouseMoveRefTranslateX(moveX: number) {
        if (!mouseMoveContainerRef.current) return;
        mouseMoveContainerRef.current.style.transform = `translate(${moveX}px, 0px)`;
    }

    function computeSwipeDuration(index: number) {
      return index * 0.175 + 0.5;
    }

    function computeSwipeXDestination(index: number) {
      const vh = window.innerHeight / 100;

      const numTiles = 4;
      const tileWidth = 25 * vh;
      const maxPadding = 100;
      const maxCascade = 300;

      const maxStep = maxCascade / (numTiles - 1);
      const cascadeWidth = maxStep * (numTiles - 1);
      const totalWidth = tileWidth + cascadeWidth + 2 * maxPadding;

      let padding: number;
      let step: number;

      if (totalWidth <= window.innerWidth) {
        padding = maxPadding;
        step = maxStep;
      } else {
        const denominator = maxCascade + 2 * maxPadding;
        const s = (window.innerWidth - tileWidth) / denominator;
        padding = maxPadding * s;
        step = maxStep * s;
      }

      const output = padding + index * step;
      return output;
    }

    function choreograph() {
        switch (menuState) {
          case MenuState.Init: {
            choreographInit();
            break;
          }
          case MenuState.Opening: {
            choreographOpen();
            break;
          }
          case MenuState.Closing: {
            choreographClose();
            break;
          }
        }
    }

    function choreographInit() {
        gsap.to(transitionContainerRef.current, {
          x: computeSwipeXDestination(index),
          opacity: 1,
        });
    }

    function choreographOpen() {
        gsap.to(transitionContainerRef.current, {
          x: computeSwipeXDestination(index),
          height: "25%",
          opacity: 1,
        });
    }

    function choreographClose() {
        if (selectedPageIndex === index) {
            gsap.to(transitionContainerRef.current, {
            x: 0,
            opacity: 1,
            });
            gsap.to(mouseMoveContainerRef.current, {
                x: 0,
            });
        } else {
            gsap.to(transitionContainerRef.current, {
            height: 0,
            opacity: 0,
            });
        }
    }

}

const styles: {
  shape: CSSProperties;
  container: CSSProperties;
  text: CSSProperties;
  mouseMove: CSSProperties;
  name: CSSProperties;
  description: CSSProperties;
} = {
  container: {
    height: "25%",
    width: "30vw",
    display: "flex",
    flexDirection: "row",
    // background: "red",
  },
  shape: {
    width: "8vw",
    height: "100%",
    background: "var(--brand-color)",
  },
  text: {
    paddingTop: "20px",
    paddingLeft: "10px",
    maxWidth: "40%",
  },
  name: {
    color: "white",
  },
  description: {
    color: "gray",
    fontSize: "0.9rem"
  },

  mouseMove: {
    width: "25vw",
    // background: "blue",
    zIndex: "10",
    display: "flex",
    flexDirection: "row",
  },
};

