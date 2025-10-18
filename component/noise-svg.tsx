import React, { ReactNode } from "react";

type SvgNoiseProps = {
  children?: ReactNode; // allow children
};

export default function SvgNoise({ children }: SvgNoiseProps) {
  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
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
          width: "100%",
          height: "100%",
          filter: "url(#noiseFilter)",
          opacity: 0.2,
          background: "#000",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {children}
    </>
  );
}
