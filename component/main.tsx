"use client";

import MenuItem from "@/component/menu-item";
import SvgNoiseBackground from "@/component/noise-svg";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { MenuProvider } from "@/component/menu-context";

export default function Main() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [swipeComplete, setSwipeComplete] = useState<boolean>(false);

  return (
    <MenuProvider>
      <MenuItem
        key={0}
        index={0}
        title={"Bio"}
        description="More about me"
        link="bio"
      ></MenuItem>
      <MenuItem
        key={1}
        index={1}
        title={"Resume"}
        description="Professional and educational experience"
        link="resume"
      ></MenuItem>
      <MenuItem
        key={2}
        index={2}
        title={"Code"}
        description="Libraries & tools"
        link="code"
      ></MenuItem>
      <MenuItem
        key={3}
        index={3}
        title={"Games"}
        description="Interactive experiences"
        link="games"
      ></MenuItem>
    </MenuProvider>
  );
}
