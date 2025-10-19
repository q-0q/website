import React, { ReactNode } from "react";

type NoiseBackgroundDiv = {
  children?: ReactNode; // allow children
};

export default function SvgNoise({ children }: NoiseBackgroundDiv) {
  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1"
            numOctaves={4}
            stitchTiles="stitch"
          />
        </filter>
      </svg>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          filter: "url(#noiseFilter)",
          opacity: 0.15,
          background: "#000",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {children}
    </>
  );
}
