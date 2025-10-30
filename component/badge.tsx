import React, { ReactNode } from "react";
import { CSSProperties } from "react";
import "../app/globals.css";

export default function Badge() {
  return (
    <div style={styles.title}>
      <p>Jack Withers | q-0q</p>
    </div>
  );
}

const styles : { title: CSSProperties } = {
  title: {
    position: "absolute",
    height: "calc(var(--vh, 1vh) * 3)",
    background: "var(--brand-color)",
    color: "black",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "10px",
  },
};