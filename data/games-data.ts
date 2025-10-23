// @/data/menu-data.ts

export interface SubpageListItemData {
  title: string;
  description: string;
  slug: string;
  contributions: string;
  playUrl: string;
  engine: string;
  markdownPath: string;
}

export const gameItems: SubpageListItemData[] = [
  {
    title: "Iapetus",
    description: "Movement-centered 3D platformer",
    slug: "/iapetus",
    contributions: "Everything",
    playUrl: "",
    engine: "Unity",
    markdownPath: "markdown/iapetus.md"
  },
  {
    title: "Project Silver Needle",
    description: "1v1 2D fighter with rollback netcode",
    slug: "/project-silver-needle",
    contributions: "Everything",
    playUrl: "",
    engine: "Unity & Photon Quantum",
  },
  {
    title: "Melody Temple",
    description: "Musical 2D platformer",
    slug: "/melody-temple",
    contributions: "Everything",
    playUrl: "",
    engine: "Godot",
  },
  {
    title: "Synapse",
    description: "Graph-based music synthesizer",
    slug: "/synapse",
    contributions: "Everything",
    playUrl: "",
    engine: "Unity",
  },
  {
    title: "PAWPRINCE",
    description: "Isometric puzzle adventure",
    slug: "/pawprince",
    contributions: "Everything",
    playUrl: "",
    engine: "Unity",
  },
  {
    title: "Ornament",
    description: "2D metroidvania",
    slug: "/ornament",
    contributions: "Everything",
    playUrl: "",
    engine: "Godot",
  },
  {
    title: "Dungeonballs",
    description: "3D adventure game with funky gravity",
    slug: "/dungeonballs",
    contributions: "Everything",
    playUrl: "",
    engine: "Unity",
  },
];

