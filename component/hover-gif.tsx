"use client"; // Needed for client-side state and effects in Next.js 13+

import { useState, useEffect, useRef } from "react";

interface HoverGifProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

const HoverGif: React.FC<HoverGifProps> = ({
  src,
  alt,
  width = 300,
  height = 300,
}) => {
  const [staticSrc, setStaticSrc] = useState<string | null>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // Required if GIF is from a different domain
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0);
        setStaticSrc(canvas.toDataURL("image/png"));
      }
    };
  }, [src]);

  if (!staticSrc) return null; // Wait until first frame is extracted

  return (
    <div
      style={{
        width,
        height,
        cursor: "pointer",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        ref={imgRef}
        src={hovered ? src : staticSrc}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default HoverGif;
