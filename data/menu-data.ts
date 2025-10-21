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
    title: "Bio",
    description: "More about me",
    slug: "/bio",
  },
  {
    index: 1,
    title: "Resume",
    description: "Professional and educational experience",
    slug: "/resume",
  },
  {
    index: 2,
    title: "Code",
    description: "Libraries & tools",
    slug: "/code",
  },
  {
    index: 3,
    title: "Games",
    description: "Interactive experiences",
    slug: "/games",
  },
];

