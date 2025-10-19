"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


type MenuItemProps = {
  index: number;
  title: string;
};

export default function MenuItem({ index, title }: MenuItemProps) {
  const boxRef = useRef<HTMLDivElement>(null); // whole container
  const shapeRef = useRef<HTMLDivElement>(null); // tomato-colored shape

  useGSAP(() => {
    gsap.set(boxRef.current, {
      x: "-25vh",
      borderRadius: "0px"
    });

    const duration = computeDuration(index);
    const xDestination = computeXDestination(index);

    gsap.to(boxRef.current, {
      x: xDestination,
      opacity: 1,
      duration: duration,
      ease: "power2.out",
    });
  }, []);

  // 👇 Effect for mouse tracking and border radius control
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapeRef.current) return;

      const rect = shapeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.max(90, Math.sqrt(dx * dx + dy * dy));


      // Movement logic
      const threshold = 150; // Distance within which shape reacts
      const maxOffset = 10; // Maximum px movement

      const weight = inverseLerp(300, 100, distance);
      const moveX = lerp(0, maxOffset, weight)

      shapeRef.current.style.transform = `translate(${moveX}px, 0px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", _ => {
          gsap.set(boxRef.current, {
            x: computeXDestination(index),
            borderRadius: "0px",
          });
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  return (
    <div style={styles.container} ref={boxRef}>
      <div
        ref={shapeRef}
        style={{
          width: "25vh",
          height: "25vh",
          background: "#d4f70e",
          borderRadius: "0px",
        }}
      >
        <div style={styles.title}>
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "100vw",
    marginLeft: "-100vh",
  },
  title: {
    display: "flex",
    width: "10vh",
    height: "25vh",
    flexDirection: "column-reverse",
    marginLeft: "26vh",
    paddingBottom: "30px"
  },
};

function computeDuration(index: number) {
  return index * 0.175 + 0.5;
}

function computeXDestination(index: number) {
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

  const output = padding + index * step + 100 * vh;
  return output;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function inverseLerp(a: number, b: number, value: number): number {
  if (a === b) return 0; // Avoid division by zero
  return clamp((value - a) / (b - a), 0, 1);
}
