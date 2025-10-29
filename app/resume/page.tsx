"use client";

import SubpageList from "@/component/subpage-list";
import Subpage from "@/component/subpage";
import { resumeItems } from "@/data/resume-data";

export default function Resume() {
  return (
    <Subpage>
      <SubpageList items={resumeItems}></SubpageList>
    </Subpage>
  );
}
