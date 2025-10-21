import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CSSProperties } from "react";
import { AppContextProvider } from "@/component/context";
import Header from "@/component/header";
import Menu from "@/component/menu";

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
          <Header />
          <Menu></Menu>
        </body>
      </AppContextProvider>
    </html>
  );
}

const styles: { body: CSSProperties } = {
  body: {
    height: "calc(var(--vh, 1vh) * 100)",
    width: "100vw",
    alignItems: "start",
    background: "black",
  },
};