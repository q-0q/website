"use client";

import gsap from "gsap";
import { off } from "process";
import { useEffect, useRef, useState } from "react";

type MenuSquareProps = {
  index: number;
};

export default function MenuSquare({ index }: MenuSquareProps) {
  const [marginLeft, setMarginLeft] = useState(0);
  const boxRef = useRef(null);


  useEffect(() => {
    
    function updateMarginLeft() {

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

      const offset = padding + index * step;
      setMarginLeft(offset);
    }


    // Initial run
    updateMarginLeft();

    // Update on resize
    window.addEventListener("resize", updateMarginLeft);

    // Clean up on unmount
    return () => window.removeEventListener("resize", updateMarginLeft);
  }, [index]);

  return (
    <div
      style={{
        width: "25vh",
        height: "25vh",
        background: "tomato",
        borderRadius: "0px",
        marginLeft: `${marginLeft}px`,
        // transition: "margin-left 0.2s ease", // Optional: smooth the move
      }}
    />
  );
}

function clamp01(t: number): number {
  return Math.max(0, Math.min(1, t));
}

function lerp(a: number, b: number, t: number): number {
  t = clamp01(t);
  return a + (b - a) * t;
}

function inverseLerp(a: number, b: number, value: number): number {
  if (a === b) return 0;
  const t = (value - a) / (b - a);
  return clamp01(t);
}


