"use client"

import MenuItem from "@/component/menu-item";
import {MenuItemContext} from "@/component/menu-item";
import SvgNoiseBackground from "@/component/noise-svg";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { MenuContext } from "@/component/menu-context";



export default function Home() {
  const [selectedIndex, setSelectedIndex,] = useState<number | null>(null);
  const [swipeComplete, setSwipeComplete] = useState<boolean>(false);

  return (
    null
  );
}

