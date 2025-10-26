"use client";

import SubpageList from "@/component/subpage-list";
import Subpage from "@/component/subpage";
import { codeItems } from "@/data/code-data";

export default function Code() {
  return (
    <Subpage>
      <SubpageList items={codeItems}></SubpageList>
    </Subpage>
  );
}
