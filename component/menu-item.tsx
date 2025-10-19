"use client";

// pages/gsap-demo.js
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

type MenuItemProps = {
  index: number;
  title: string
};

export default function MenuItem({ index, title } : MenuItemProps) {
  const boxRef = useRef(null);

  useEffect(() => {

    gsap.set(boxRef.current, {
      x: "-25vh",
    });

    const duration = ((index) * 0.175) + 0.5;
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

    const offset = padding + index * step + 100*vh;

    gsap.to(boxRef.current, {
      x: offset,
      opacity: 1,
      duration: duration,
      ease: "power2.out",
    });
  }, []);

  return (
    <div style={styles.container} ref={boxRef}>
      <div
        style={{
          width: "25vh",
          height: "25vh",
          background: "tomato",
          borderRadius: "0px",
        }}
      />
      <div style={styles.title}>
        <h1>{title}</h1>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "100vw",
    marginLeft: "-100vh"
  },
  title: {
    display: "flex",
    width: "10vh",
    padding: "10px",
    // backgroundColor: "red"
  },
};
