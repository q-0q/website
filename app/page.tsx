import MenuItem from "@/component/menu-item";
import SvgNoiseBackground from "@/component/noise-svg";
import Image from "next/image";
import type { CSSProperties } from "react";


export default function Home() {
  return (
    <SvgNoiseBackground>

      <div style={styles.title}>
        q-0q
      </div>

      <div style={styles.main}>
        <MenuItem index={0} title={"games"}></MenuItem>
        <MenuItem index={1} title={"games"}></MenuItem>
        <MenuItem index={2} title={"games"}></MenuItem>
        <MenuItem index={3} title={"games"}></MenuItem>
      </div>
    </SvgNoiseBackground>
  );
}

const styles: { main: CSSProperties, title: CSSProperties } = {
  main: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "start",
    justifyItems: "start",
    background: "black",
  },

  title: {
    background: "red",
  },
};