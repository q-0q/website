import MenuItem from "@/component/menu-item";
import SvgNoiseBackground from "@/component/noise-svg";
import Image from "next/image";
import type { CSSProperties } from "react";


export default function Home() {
  return (
    <SvgNoiseBackground>

      <div style={styles.title}>
        <p>Jack Withers | q-0q</p>
      </div>

      <div style={styles.main}>
        <MenuItem index={0} title={"Bio"} description="More about me"></MenuItem>
        <MenuItem index={1} title={"Resume"} description="Professional and educational experience"></MenuItem>
        <MenuItem index={2} title={"Code"} description="Libraries & tools"></MenuItem>
        <MenuItem index={3} title={"Games"} description="Interactive experiences"></MenuItem>
      </div>
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
    flexDirection: "column-reverse",
    alignItems: "start",
    justifyItems: "start",
    background: "black",
  },

  menu: {
    height: "calc(var(--vh, 1vh) * 100)",
    width: "100vw",
    display: "flex",
    flexDirection: "column-reverse",
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

