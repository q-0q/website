"use client"

import SubpageListItem from "@/component/subpage-list-item";
import Menu from "@/component/menu";
import { gameItems } from "@/data/games-data";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import SubpageList from "@/component/subpage-list";


export default function Games() {  
  return (
    <SubpageList items={gameItems}></SubpageList>
  );
}

