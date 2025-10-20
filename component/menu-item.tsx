"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";



type MenuItemProps = {
  index: number;
  title: string;
  description: string;
};

export default function MenuItem({ index, title, description }: MenuItemProps) {
  const boxRef = useRef<HTMLDivElement>(null); // whole container
  const sliderRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  function setVhVariable() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }


  useGSAP(() => {
    gsap.set(boxRef.current, {
      x: "calc(var(--vh, 1vh) * -25)",
      borderRadius: "0px",
    });

    const duration = computeDuration(index);
    const xDestination = computeXDestination(index);
    setVhVariable();

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
      if (!sliderRef.current) return;
      if (!shapeRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
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
      const color = lerpHexColor("#d4f70e", "#ffffff", weight * 0.9);

      sliderRef.current.style.transform = `translate(${moveX}px, 0px)`;
      // shapeRef.current.style.backgroundColor = `${color}`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", _ => {
          setVhVariable();
          gsap.set(boxRef.current, {
            x: computeXDestination(index),
            borderRadius: "0px",
          });
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  return (
    <div style={styles.container} ref={boxRef}>
      <div ref={sliderRef}>
        <div
          ref={shapeRef}
          style={{
            width: "15vh",
            height: "100%",
            background: "#d4f70e",
            borderRadius: "0px",
          }}
        >
          <div style={styles.title}>
            <h1>{title}</h1>
          </div>
          <div style={styles.description}>
            <h1>{description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    // width: "0vw",
    height: "25%",
    marginLeft: "calc(var(--vh, 1vh) * -100)",
    backgroundColor: "white",
  },
  title: {
    display: "flex",
    width: "10vh",
    marginLeft: "16vh",
    paddingTop: "2vh",
    color: "white",
  },
  description: {
    display: "flex",
    width: "20vh",
    marginLeft: "16vh",
    paddingBottom: "30px",
    color: "gray",
    fontSize: "0.75rem",
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


/**
 * Convert hex string to RGB object.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove "#" if present
  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    // Expand shorthand (e.g. "f00" → "ff0000")
    hex = hex.split('').map(c => c + c).join('');
  }

  const int = parseInt(hex, 16);

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255
  };
}

/**
 * Convert RGB object to hex string.
 */
function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
  return (
    '#' +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

/**
 * Lerp between two hex colors with clamped t, returns a hex string.
 */
function lerpHexColor(hexA: string, hexB: string, t: number): string {
  const clampedT = clamp(t, 0, 1);
  const colorA = hexToRgb(hexA);
  const colorB = hexToRgb(hexB);

  const lerped = {
    r: Math.round(colorA.r + (colorB.r - colorA.r) * clampedT),
    g: Math.round(colorA.g + (colorB.g - colorA.g) * clampedT),
    b: Math.round(colorA.b + (colorB.b - colorA.b) * clampedT),
  };

  return rgbToHex(lerped);
}