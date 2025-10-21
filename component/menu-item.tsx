"use client";

import { CSSProperties } from "react";
import { menuItems } from "@/data/menu-data";
import { useState } from "react";

type MenuItemProps = {
  index: number;
  title: string;
  description: string;
  link: string;
};


export default function MenuItem({ index, title, description, link }: MenuItemProps) {
    return (
      <div style={styles.container}>
        <div style = {styles.shape}/>
        <div style={styles.text}>
            <p>{title}</p>
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
    background: "var(--brand-color)",
  },
  text: {
    paddingLeft: "10px"
  },
};