// @/data/menu-data.ts

export interface MenuItemData {
  index: number;
  title: string;
  description: string;
  slug: string;
}

export const menuItems: MenuItemData[] = [
  {
    index: 0,
    title: "Games",
    description: "Interactive experiences",
    slug: "/games",
  },
  {
    index: 1,
    title: "Code",
    description: "Libraries, tools, & apps",
    slug: "/code",
  },
  {
    index: 2,
    title: "Resume",
    description: "Professional and educational experience",
    slug: "/resume",
  },
  {
    index: 3,
    title: "Bio",
    description: "More about me",
    slug: "/bio",
  },
];

