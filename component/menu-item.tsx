"use client";

import { CSSProperties, useContext, useEffect, useRef } from "react";
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

export default function MenuItem({ index, title, description, link }: MenuItemProps) {

    const shapeRef = useRef<HTMLDivElement>(null);
    const mouseMoveContainerRef = useRef<HTMLDivElement>(null);
    const transitionContainerRef = useRef<HTMLDivElement>(null);

    const { selectedPageIndex, setSelectedPageIndex} = useAppContext()

    function handleClick(){
        setSelectedPageIndex(index)
    }

    useEffect(() => {

        // Event when an item is clicked
        if (selectedPageIndex === index) {
            gsap.to(transitionContainerRef.current, {
                x: 500
    
            })
        } else {
            gsap.to(transitionContainerRef.current, {
                x: (index + 1) * 90,
            });
        }

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
            mouseMoveContainerRef.current.style.transform = `translate(${moveX}px, 0px)`;
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }
    });

    return (
      <div style={styles.container} ref={transitionContainerRef}>
        <div ref={mouseMoveContainerRef} style={styles.mouseMove}>
            <div style={styles.shape} onClick={handleClick} ref={shapeRef}>
            </div>
            <div style={styles.text}>
                <p onClick={handleClick}>{title}</p>
                <p>{description}</p>
            </div>
        </div>
      </div>
    );
}

const styles: {
  shape: CSSProperties;
  container: CSSProperties;
  text: CSSProperties;
  mouseMove: CSSProperties;
} = {
  container: {
    height: "25%",
    width: "30vw",
    display: "flex",
    flexDirection: "row",
    background: "red",
  },
  shape: {
    width: "20vw",
    height: "100%",
    background: "var(--brand-color)",
  },
  text: {
    paddingLeft: "10px",
  },

  mouseMove: {
    width: "25vw",
    background: "blue",
    zIndex: "10",
    display: "flex",
    flexDirection: "row",
  },
};