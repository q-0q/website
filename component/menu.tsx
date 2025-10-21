"use client";

import { menuItems } from "@/data/menu-data";
import { useState } from "react";
import MenuItem from "./menu-item";

export default function Menu() {
  return (
    <>
      {menuItems.map((item) => (
        <MenuItem
          key={item.index}
          index={item.index}
          title={item.title}
          description={item.description}
          link={item.link}
        />
      ))}
    </>
  );
}
