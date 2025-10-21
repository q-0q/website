"use client"

import GameListItem from "@/component/game-list-item";
import Menu from "@/component/menu";
import { gameItems } from "@/data/games-data";
import Image from "next/image";
import { useState, type CSSProperties } from "react";


export default function Games() {  
  return (
    <>
          {gameItems.map((item, i) => (
            <GameListItem
              key={i}
              title={item.title}
              description={item.description}
              slug={item.slug}
              engine={item.engine}
            />
          ))}
    </>
  );
}

