"use client";

import MenuItem from "@/component/menu-item";
import { MenuProvider } from "@/component/menu-context";
import { menuItems } from "@/data/menu-data";
import { useState } from "react";

export default function Main() {
  return (
    <MenuProvider>
      {menuItems.map((item) => (
        <MenuItem
          key={item.index}
          index={item.index}
          title={item.title}
          description={item.description}
          link={item.link}
        />
      ))}
    </MenuProvider>
  );
}
