export type DigitalDesignerProjectShowcaseItem = {
  titleLines: [string, string];
  bgImageSrc: string;
  cardImageSrc: string;
  cardImageAlt: string;
  cursorText: string;
  href: string;
  tags: string[];
};

export const digitalDesignerProjectsShowcase: DigitalDesignerProjectShowcaseItem[] = [
  {
    titleLines: ["Editorial", "illustrations set"],
    bgImageSrc: "/img/works/1920x1280_pr01.webp",
    cardImageSrc: "/img/works/700x700_pr01.webp",
    cardImageAlt: "Editorial illustrations project preview",
    cursorText: "View Work",
    href: "/project-details",
    tags: ["Design", "Illustrations", "Packaging", "Marketing"],
  },
  {
    titleLines: ["Interactive", "concept"],
    bgImageSrc: "/img/works/1920x1280_pr02.webp",
    cardImageSrc: "/img/works/700x700_pr02.webp",
    cardImageAlt: "Interactive concept project preview",
    cursorText: "Behance",
    href: "/project-details",
    tags: ["UI/UX", "Development", "Brand", "Web App"],
  },
  {
    titleLines: ["Creative", "studio template"],
    bgImageSrc: "/img/works/1920x1280_pr03.webp",
    cardImageSrc: "/img/works/700x700_pr03.webp",
    cardImageAlt: "Creative studio template project preview",
    cursorText: "View Work",
    href: "/project-details",
    tags: ["Design", "Illustrations", "Packaging", "Marketing"],
  },
];
