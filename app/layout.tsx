// "use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CSSProperties } from "react";
import { AppContextProvider } from "@/component/context";
import Header from "@/component/header";
import Menu from "@/component/menu";
import Subpage from "@/component/subpage";
import Badge from "@/component/badge";

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
      <AppContextProvider>
        <body
          style={styles.body}
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* <Header /> */}

          <div style={styles.content}>
            <Badge></Badge>
            <Menu></Menu>
            {children}
          </div>
        </body>
      </AppContextProvider>
    </html>
  );
}

const styles: { body: CSSProperties; content: CSSProperties } = {
  body: {
    height: "calc(var(--vh, 1vh) * 100)",
    width: "100vw",
    alignItems: "start",
    background: "black",
  },
  content: {},
};