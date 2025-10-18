import MenuSquare from "@/component/menu-square";
import SvgNoiseBackground from "@/component/noise-svg";
import Image from "next/image";
import type { CSSProperties } from "react";


export default function Home() {
  return (
    <SvgNoiseBackground>
      <div style={styles.main}>
        <MenuSquare index={0}></MenuSquare>
        <MenuSquare index={1}></MenuSquare>
        <MenuSquare index={2}></MenuSquare>
        <MenuSquare index={3}></MenuSquare>
      </div>
    </SvgNoiseBackground>
  );
}

const styles: { main: CSSProperties } = {
  main: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "start",
    justifyItems: "start",
    background: "black",
  },
};