"use client"

import MenuItem from "@/component/menu-item";
import SvgNoiseBackground from "@/component/noise-svg";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { MenuContext } from "@/component/menu-context";



export default function Home() {
  const [selectedIndex, setSelectedIndex,] = useState<number | null>(null);
  const [swipeComplete, setSwipeComplete] = useState<boolean>(false);

  return (
    <SvgNoiseBackground>
      <MenuContext.Provider value={{ selectedIndex, swipeComplete, setSelectedIndex, setSwipeComplete }}>
        <div style={styles.title}>
          <p>Jack Withers | q-0q</p>
        </div>

        <div style={styles.main}>
          <MenuItem
            key={0}
            index={0}
            title={"Bio"}
            description="More about me"
          ></MenuItem>
          <MenuItem
            key={1}
            index={1}
            title={"Resume"}
            description="Professional and educational experience"
          ></MenuItem>
          <MenuItem
            key={2}
            index={2}
            title={"Code"}
            description="Libraries & tools"
          ></MenuItem>
          <MenuItem
            key={3}
            index={3}
            title={"Games"}
            description="Interactive experiences"
          ></MenuItem>
        </div>
      </MenuContext.Provider>
    </SvgNoiseBackground>
  );
}

const styles: {
  main: CSSProperties;
  title: CSSProperties;
  menu: CSSProperties;
} = {
  main: {
    height: "calc(var(--vh, 1vh) * 97)",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyItems: "start",
    background: "black",
  },

  menu: {
    height: "calc(var(--vh, 1vh) * 100)",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyItems: "start",
    background: "black",
  },

  title: {
    height: "calc(var(--vh, 1vh) * 3)",
    background: "#d4f70e",
    color: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "10px",
  },
};

