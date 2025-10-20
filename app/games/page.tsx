"use client"

import MenuItem, { MenuItemContext } from "@/component/menu-item";

export default function Games() {
  return (
    <MenuItem
      key={3}
      index={3}
      title={"Games"}
      description="Interactive experiences"
      link="games"
      context={MenuItemContext.Page}
    ></MenuItem>
  );
}


