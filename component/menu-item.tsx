"use client";

import { CSSProperties, useContext, useEffect, useRef } from "react";
import { menuItems } from "@/data/menu-data";
import { useState } from "react";
import { useAppContext } from "./context";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type MenuItemProps = {
  index: number;
  title: string;
  description: string;
  link: string;
};


export default function MenuItem({ index, title, description, link }: MenuItemProps) {

    const ref = useRef<HTMLDivElement>(null);

    const { selectedPageIndex, setSelectedPageIndex} = useAppContext()

    function handleClick(){
        setSelectedPageIndex(index)
    }

    useEffect(() => {
        if (selectedPageIndex === index) {
            gsap.to(ref.current, {
                x: 60
    
            })
        } else {
            gsap.to(ref.current, {
                x: 0,
            });
        }
    });

    return (
      <div style={styles.container} ref={ref}>
        <div style={styles.shape} onClick={handleClick} />
        <div style={styles.text}>
          <p onClick={handleClick}>{title}</p>
          <p>{description}</p>
        </div>
      </div>
    );
}

const styles: {
  shape: CSSProperties;
  container: CSSProperties;
  text: CSSProperties;
} = {
  container: {
    height: "25%",
    display: "flex",
    flexDirection: "row",
},
shape: {
    width: "200px",
    height: "100%",
    background: "var(--brand-color)"
  },
  text: {
    paddingLeft: "10px"
  },
};