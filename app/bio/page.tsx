"use client";

import SubpageList from "@/component/subpage-list";
import Subpage from "@/component/subpage";
import { bioItems } from "@/data/bio-data";

export default function Bio() {
  return (
    <Subpage>
      <SubpageList items={bioItems}></SubpageList>
    </Subpage>
  );
}
