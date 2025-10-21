"use client";

import { CSSProperties, useContext } from "react";
import { menuItems } from "@/data/menu-data";
import { useState } from "react";
import { useAppContext } from "./context";

type MenuItemProps = {
  index: number;
  title: string;
  description: string;
  link: string;
};


export default function MenuItem({ index, title, description, link }: MenuItemProps) {

    const { selectedPageIndex, setSelectedPageIndex} = useAppContext()

    function handleClick(){
        setSelectedPageIndex(index)
    }

    return (
      <div style={styles.container}>
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