import MenuItem from "@/component/menu-item";
import SvgNoiseBackground from "@/component/noise-svg";
import Image from "next/image";
import type { CSSProperties } from "react";


export default function Home() {
  return (
    <SvgNoiseBackground>

      <div style={styles.title}>
        <p>q-0q | jack withers</p>
      </div>

      <div style={styles.main}>
        <MenuItem index={0} title={"resume"}></MenuItem>
        <MenuItem index={1} title={"bio"}></MenuItem>
        <MenuItem index={2} title={"not games"}></MenuItem>
        <MenuItem index={3} title={"games"}></MenuItem>
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
    height: "100vh",
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

