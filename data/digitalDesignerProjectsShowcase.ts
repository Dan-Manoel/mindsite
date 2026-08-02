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
    titleLines: ["Ilustrações", "Editoriais"],
    bgImageSrc: "/img/works/1920x1280_pr01.webp",
    cardImageSrc: "/img/works/700x700_pr01.webp",
    cardImageAlt: "Preview de ilustrações editoriais",
    cursorText: "Ver Projeto",
    href: "/project-details",
    tags: ["Design", "Ilustrações", "Embalagem", "Marketing"],
  },
  {
    titleLines: ["Conceito", "Interativo"],
    bgImageSrc: "/img/works/1920x1280_pr02.webp",
    cardImageSrc: "/img/works/700x700_pr02.webp",
    cardImageAlt: "Preview de conceito interativo",
    cursorText: "Behance",
    href: "/project-details",
    tags: ["UI/UX", "Desenvolvimento", "Marca", "Web App"],
  },
  {
    titleLines: ["Estúdio", "Criativo"],
    bgImageSrc: "/img/works/1920x1280_pr03.webp",
    cardImageSrc: "/img/works/700x700_pr03.webp",
    cardImageAlt: "Preview de template criativo",
    cursorText: "Ver Projeto",
    href: "/project-details",
    tags: ["Design", "Ilustrações", "Embalagem", "Marketing"],
  },
];
