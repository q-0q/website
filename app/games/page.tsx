"use client"

import { gameItems } from "@/data/games-data";
import SubpageList from "@/component/subpage-list";
import Subpage from "@/component/subpage";


export default function Games() {  
  return (
    <Subpage>
      <SubpageList items={gameItems}></SubpageList>
    </Subpage>
  );
}

