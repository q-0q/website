"use client";

// pages/gsap-demo.js
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import MenuSquare from "./menu-square";

type MenuItemProps = {
  index: number;
  title: string
};

export default function MenuItem({ index, title } : MenuItemProps) {
  const boxRef = useRef(null);

  useEffect(() => {

    gsap.set(boxRef.current, {
      x: "-100vh"
    });

    const duration = (index + 1) * 0.25;

    gsap.to(boxRef.current, {
      x: 0, // move 300px to the right
      duration: duration,
      ease: "power2.out",
    });
  }, []);

  return (
    <div style={styles.container} ref={boxRef}>
      <MenuSquare index={index}></MenuSquare>
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
  },
  title: {
    display: "flex",
    width: "10vh",
    padding: "10px",
    // backgroundColor: "red"
  },
};
