"use client"

import SubpageList from "@/component/subpage-list";
import Subpage from "@/component/subpage";
import { gameItems } from "@/data/games-data";


export default function Games() {  
  return (
    <Subpage>
      <SubpageList items={gameItems}></SubpageList>
    </Subpage>
  );
}

