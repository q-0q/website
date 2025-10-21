"use client";

import { menuItems } from "@/data/menu-data";
import { CSSProperties, useState } from "react";
import MenuItem from "./menu-item";

export default function Menu() {
  return (
    <div style={styles.menu}>
      {menuItems.map((item) => (
        <MenuItem
          key={item.index}
          index={item.index}
          title={item.title}
          description={item.description}
          link={item.link}
        />
      ))}
    </div>
  );
}

const styles : { menu: CSSProperties } = {
  menu: {
    height: "calc(var(--vh, 1vh) * 97)",
    width: "10%",
    // display: "flex",

  },
};