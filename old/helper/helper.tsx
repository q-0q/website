function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function inverseLerp(a: number, b: number, value: number): number {
  if (a === b) return 0; // Avoid division by zero
  return clamp((value - a) / (b - a), 0, 1);
}

/**
 * Convert hex string to RGB object.
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove "#" if present
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    // Expand shorthand (e.g. "f00" → "ff0000")
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }

  const int = parseInt(hex, 16);

  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

/**
 * Convert RGB object to hex string.
 */
function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

/**
 * Lerp between two hex colors with clamped t, returns a hex string.
 */
function lerpHexColor(hexA: string, hexB: string, t: number): string {
  const clampedT = clamp(t, 0, 1);
  const colorA = hexToRgb(hexA);
  const colorB = hexToRgb(hexB);

  const lerped = {
    r: Math.round(colorA.r + (colorB.r - colorA.r) * clampedT),
    g: Math.round(colorA.g + (colorB.g - colorA.g) * clampedT),
    b: Math.round(colorA.b + (colorB.b - colorA.b) * clampedT),
  };

  return rgbToHex(lerped);
}

function setVhVariable() {
const vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", `${vh}px`);
}

export {inverseLerp, lerp, lerpHexColor, setVhVariable}