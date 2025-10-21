// @/data/menu-data.ts

export interface MenuItemData {
  index: number;
  title: string;
  description: string;
  link: string;
}

export const menuItems: MenuItemData[] = [
  {
    index: 0,
    title: "Bio",
    description: "More about me",
    link: "/bio",
  },
  {
    index: 1,
    title: "Resume",
    description: "Professional and educational experience",
    link: "/resume",
  },
  {
    index: 2,
    title: "Code",
    description: "Libraries & tools",
    link: "/code",
  },
  {
    index: 3,
    title: "Games",
    description: "Interactive experiences",
    link: "/games",
  },
];

