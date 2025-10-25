// @/data/menu-data.ts

export interface SubpageListItemData {
  title: string;
  description: string;
  slug: string;
  contributions: string;
  playUrl: string;
  engine: string;
  markdownPath: string;
  thumbnailVideoUrl: string;
}

export const gameItems: SubpageListItemData[] = [
  {
    title: "Iapetus",
    description: "Movement-centered 3D platformer",
    slug: "/iapetus",
    contributions: "Everything",
    playUrl: "",
    engine: "Unity",
    markdownPath: "markdown/iapetus.md",
    thumbnailVideoUrl:
      "https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/iapetus-thumb.mp4",
  },
  {
    title: "Project Silver Needle",
    description: "1v1 2D fighter with rollback netcode",
    slug: "/project-silver-needle",
    contributions: "Everything",
    playUrl: "",
    engine: "Unity & Photon Quantum",
    markdownPath: "markdown/psn.md",
    thumbnailVideoUrl:
      "https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/psn-sindar.mp4",
  },
  {
    title: "Melody Temple",
    description: "Musical 2D platformer",
    slug: "/melody-temple",
    contributions: "Everything",
    playUrl: "",
    engine: "Godot",
    markdownPath: "markdown/melody-temple.md",
    thumbnailVideoUrl:
      "https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/melody-thumb.mp4",
  },
  {
    title: "Synapse",
    description: "Graph-based music synthesizer",
    slug: "/synapse",
    contributions: "Everything",
    playUrl: "",
    engine: "Unity",
    markdownPath: "markdown/synapse.md",
    thumbnailVideoUrl:
      "https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/iapetus-thumb.mp4",
  },
  {
    title: "PAWPRINCE",
    description: "Isometric puzzle adventure",
    slug: "/pawprince",
    contributions: "Everything",
    playUrl: "",
    engine: "Unity",
    markdownPath: "markdown/pawprince.md",
    thumbnailVideoUrl:
      "https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/pawprince-thumb.mp4",
  },
  {
    title: "Ornament",
    description: "2D metroidvania",
    slug: "/ornament",
    contributions: "Everything",
    playUrl: "",
    engine: "Godot",
    markdownPath: "markdown/ornament.md",
    thumbnailVideoUrl:
      "https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/iapetus-thumb.mp4",
  },
  {
    title: "Dungeonballs",
    description: "3D adventure game with funky gravity",
    slug: "/dungeonballs",
    contributions: "Everything",
    playUrl: "",
    engine: "Unity",
    markdownPath: "markdown/dungeonballs.md",
    thumbnailVideoUrl:
      "https://osgho0ft4qfkeusc.public.blob.vercel-storage.com/dungeonballs-thumb.mp4",
  },
];

