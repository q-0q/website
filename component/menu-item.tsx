"use client";

import { CSSProperties, RefObject, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMenu } from "@/component/menu-context";
import { inverseLerp, lerp, setVhVariable } from "@/helper/helper"
import { useRouter, usePathname } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

enum MenuItemContext {
  Home,
  Page
}

type MenuItemProps = {
  index: number;
  title: string;
  description: string;
  link: string;
};


export default function MenuItem({ index, title, description, link }: MenuItemProps) {

  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const { selectedIndex, setSelectedIndex, swipeComplete, setSwipeComplete } = useMenu();
  const selectedIndexRef = useRef<number | null>(selectedIndex);
  const isSelected = selectedIndex === index;
  const router = useRouter();

  const context = usePathname() == "/" ? MenuItemContext.Home : MenuItemContext.Page;

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
    handleSelectionAnimation(containerRef, sliderRef, selectedIndex, isSelected, router, link, context)

    const handleMouseMove = mouseMoveHandler(sliderRef, shapeRef, selectedIndex, index);
    const handleResize = resizeHandler(selectedIndexRef, containerRef, index, context);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedIndex]);

  useGSAP(() => {
    if (context == MenuItemContext.Home) {
      invokeOnLoadSwipeAnimation(index, containerRef, setSwipeComplete);
    } else if (context == MenuItemContext.Page) {
        gsap.set(containerRef.current, {
          x: computeSelectedXPosition(),
          y: computeSelectedYPosition(),
          borderRadius: "0px",
        });
    }
  }, []);

  return (
    <div
      style={styles.container}
      ref={containerRef}
      onClick={handleClick(swipeComplete, setSelectedIndex, index, context, containerRef, sliderRef, router)}
    >
      <div ref={sliderRef}>
        <div
          ref={shapeRef}
          style={styles.shape}
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
  shape: CSSProperties;
} = {
  container: {
    display: "flex",
    height: "25%",
    marginLeft: "calc(var(--vh, 1vh) * -100)",
    backgroundColor: "white",
  },
  shape: {
    width: "calc(var(--vh, 1vh) * 15)",
    height: "100%",
    background: "#d4f70e",
    borderRadius: "0px",
  },
  title: {
    display: "flex",
    width: "10vh",
    marginLeft: "calc(var(--vh, 1vh) * 16)",
    paddingTop: "calc(var(--vh, 1vh) * 2)",
    color: "white",
  },
  description: {
    display: "flex",
    width: "calc(var(--vh, 1vh) * 20)",
    marginLeft: "calc(var(--vh, 1vh) * 16)",
    paddingBottom: "30px",
    color: "gray",
    fontSize: "0.75rem",
  },
};

function handleClick(
  swipeComplete: boolean,
  setSelectedIndex: (index: number | null) => void,
  index: number,
  context: MenuItemContext,
  containerRef: RefObject<HTMLDivElement | null>,
  sliderRef: RefObject<HTMLDivElement | null>,
  router: AppRouterInstance
) {
  return () => {
    if (context === MenuItemContext.Home) {
      if (!swipeComplete) return;
      setSelectedIndex(index);
    } else {
      console.log("weee");
      let tl = gsap.timeline();
      tl.to(containerRef.current, {
        x: computeSwipeOutXPosition(),
        borderRadius: "0px",
        duration: 0.2,
      }).to(
        sliderRef.current,
        {
          duration: 0.4,
          x: 0,
          ease: "power2.out",
          onComplete: () => {
            router.push("/")
          }
        },
        "-=0.5"
      );
    }
  };
}

function resizeHandler(selectedIndexRef: RefObject<number | null>, containerRef: RefObject<HTMLDivElement | null>, index: number, context : MenuItemContext) {
  return () => {
    setVhVariable();
    const x = (selectedIndexRef.current !== null && selectedIndexRef.current === index) || context === MenuItemContext.Page ? computeSelectedXPosition() : computeSwipeXDestination(index)
    gsap.set(containerRef.current, {
      x: x,
      borderRadius: "0px",
    });
  };
}

function mouseMoveHandler(sliderRef: RefObject<HTMLDivElement | null>, shapeRef: RefObject<HTMLDivElement | null>, selectedIndex: number | null, index: number) {
  return (e: MouseEvent) => {
    if (!sliderRef.current) return;
    if (!shapeRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const distance = Math.max(90, Math.sqrt(dx * dx + dy * dy));


    // Movement logic
    const maxOffset = 10; // Maximum px movement

    let weight = inverseLerp(300, 100, distance);

    if (selectedIndex != null && selectedIndex !== index) weight = 0;

    const moveX = lerp(0, maxOffset, weight);
    // const color = lerpHexColor("#d4f70e", "#ffffff", weight * 0.9);
    sliderRef.current.style.transform = `translate(${moveX}px, 0px)`;
  };
}

function invokeOnLoadSwipeAnimation(index: number, containerRef: RefObject<HTMLDivElement | null>, setSwipeComplete: (swipeComplete: boolean) => void) {
  const duration = computeSwipeDuration(index);
  const xDestination = computeSwipeXDestination(index);
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

  const output = padding + index * step + 100 * vh;
  return output;
}

function handleSelectionAnimation(
  containerRef: RefObject<HTMLDivElement | null>,
  sliderRef: RefObject<HTMLDivElement | null>,
  selectedIndex: number | null,
  isSelected: boolean,
  router: AppRouterInstance,
  link : string,
  context : MenuItemContext
) {
  if (!containerRef.current) return;
  if (context != MenuItemContext.Home) return;

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
    const xDestination = computeSelectedXPosition();

    // Move selected to corner
    tl.to(containerRef.current, {
      opacity: 1,
      x: xDestination,
      duration: 0.4,
      ease: "power2.out",
    })
      .to(containerRef.current, {
        duration: 0.1,
        y: computeSelectedYPosition(),
        ease: "power2.out",
      })
      .to(
        sliderRef.current,
        {
          duration: 0.4,
          x: 0,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(sliderRef.current, {
        onComplete: () => {
          router.push("/" + link);
        },
      },
    );
  } else {

    // Collapse unselected
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: "power2.inOut",
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

function computeSelectedXPosition() {
  const vh = window.innerHeight / 100;
  const xDestination = vh * 105;
  return xDestination;
}

function computeSwipeOutXPosition() {
  const vh = window.innerHeight / 100;
  const xDestination = vh * 70;
  return xDestination;
}

function computeSelectedYPosition() {
  const vh = window.innerHeight / 100;
  const yDestination = vh * 5;
  return yDestination;
}
