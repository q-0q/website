"use client"

import SubpageListItem from "@/component/subpage-list-item";
import Menu from "@/component/menu";
import { gameItems } from "@/data/games-data";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import SubpageList from "@/component/subpage-list";
import Subpage from "@/component/subpage";


export default function Games() {  
  return (
    <Subpage>
      <SubpageList items={gameItems}></SubpageList>
    </Subpage>
  );
}

