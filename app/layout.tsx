import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CSSProperties } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jack Withers",
  description: "Personal website for Jack Withers A.K.A. q-0q",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={styles.body}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div style={styles.title}>
          <p>Jack Withers | q-0q</p>
        </div>
        <div style={styles.main}>
          {children}
        </div>
      </body>
    </html>
  );
}

const styles: { body: CSSProperties; title: CSSProperties; main : CSSProperties } = {
  body: {
    height: "calc(var(--vh, 1vh) * 100)",
    width: "100vw",
    alignItems: "start",
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
  main: {
    height: "calc(var(--vh, 1vh) * 97)",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyItems: "start",
    background: "black",
  },
};