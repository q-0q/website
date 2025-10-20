"use client";

import { CSSProperties, RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMenu } from "@/component/menu-context";
import { inverseLerp, lerp } from "@/helper/helper"


type MenuItemProps = {
  index: number;
  title: string;
  description: string;
};

export default function MenuItem({ index, title, description }: MenuItemProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const { selectedIndex, setSelectedIndex, swipeComplete, setSwipeComplete } = useMenu();
  const selectedIndexRef = useRef<number | null>(selectedIndex);
  const isSelected = selectedIndex === index;

  //
  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  // Trigger animation on selection change
  useEffect(() => {
    handleSelectionAnimation(containerRef, sliderRef, selectedIndex, isSelected)
  }, [selectedIndex]);

  

  function setVhVariable() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useGSAP(() => {

    const duration = computeDuration(index);
    const xDestination = computeXDestination(index);
    setVhVariable();

    gsap.to(containerRef.current, {
      x: xDestination,
      opacity: 1,
      duration: duration,
      ease: "power2.out",
      onComplete: () => {
        if (index === 3) setSwipeComplete(true);
      },
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

      let weight = inverseLerp(300, 100, distance);

      if (selectedIndex != null && selectedIndex !== index) weight = 0;

      const moveX = lerp(0, maxOffset, weight)
      // const color = lerpHexColor("#d4f70e", "#ffffff", weight * 0.9);

      sliderRef.current.style.transform = `translate(${moveX}px, 0px)`;
      // shapeRef.current.style.backgroundColor = `${color}`;
    };

  const handleResize = () => {
    if (selectedIndexRef.current != null) return; // ✅ Use ref value
    setVhVariable();
    gsap.set(containerRef.current, {
      x: computeXDestination(index),
      borderRadius: "0px",
    });
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("resize", handleResize);
  };
  });


  return (
    <div
      style={styles.container}
      ref={containerRef}
      onClick={() => {
        if (!swipeComplete) return;
        setSelectedIndex(index);
      }}
    >
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

const styles: {
  container: CSSProperties;
  title: CSSProperties;
  description: CSSProperties;
} = {
  container: {
    display: "flex",
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

function handleSelectionAnimation(
  containerRef: RefObject<HTMLDivElement | null>,
  sliderRef: RefObject<HTMLDivElement | null>,
  selectedIndex: number | null,
  isSelected: boolean
) {
  if (!containerRef.current) return;

  if (selectedIndex === null) {
    // Reset all
    gsap.to(containerRef.current, {
      scale: 1,
      // opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    return;
  }

  let tl = gsap.timeline();

  if (isSelected) {
    const vh = window.innerHeight / 100;
    const xDestination = vh * 105;

    // Selected animation
    tl.to(containerRef.current, {
      // scale: 1.1,
      opacity: 1,
      x: xDestination,
      duration: 0.4,
      ease: "power2.out",
    })
      .to(containerRef.current, {
        // scale: 1.1,
        duration: 0.1,
        y: 50,
        ease: "power2.out",
      })
      .to(
        sliderRef.current,
        {
          // scale: 1.1,
          duration: 0.4,
          x: 0,
          ease: "power2.out",
        },
        "-=0.5"
      );
  } else {
    // Unselected animation
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.out",
    }).to(
      containerRef.current,
      {
        opacity: 0,
        height: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "+=0.1"
    );
  }
}