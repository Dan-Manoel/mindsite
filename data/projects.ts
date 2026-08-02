import type { ProjectShowcaseItem, ProjectStackItem } from "@/types/project";

const commonTags = ["Design", "Ilustrações", "Embalagem", "Marketing"];
const showcaseCommonTags = ["Design", "Ilustrações", "Embalagem", "Marketing"];

export const brandingStudioProjects: ProjectStackItem[] = [
  {
    title: "Identidade visual para projeto NFT",
    imageSrc: "/img/works/showcase-stack/pr03.webp",
    imageAlt: "Preview do Projeto",
    imageWidth: 1920,
    imageHeight: 1180,
    tags: commonTags,
  },
  {
    title: "Conceito de aplicativo interativo",
    imageSrc: "/img/works/showcase-stack/pr02.webp",
    imageAlt: "Preview do Projeto",
    imageWidth: 2200,
    imageHeight: 1240,
    tags: commonTags,
  },
  {
    title: "Coleção de ilustrações editoriais",
    imageSrc: "/img/works/showcase-stack/pr01.webp",
    imageAlt: "Preview do Projeto",
    imageWidth: 1920,
    imageHeight: 1180,
    tags: commonTags,
  },
  {
    title: "Template de estúdio criativo",
    imageSrc: "/img/works/showcase-stack/pr04.webp",
    imageAlt: "Preview do Projeto",
    imageWidth: 1920,
    imageHeight: 1180,
    coverClassName: "cover-darken",
    tags: commonTags,
  },
];

export const digitalDesignerProjectsShowcase: ProjectShowcaseItem[] = [
  {
    titleLines: ["Ilustrações", "Editoriais"],
    bgImageSrc: "/img/works/1920x1280_pr01.webp",
    cardImageSrc: "/img/works/700x700_pr01.webp",
    cardImageAlt: "Preview de ilustrações editoriais",
    cursorText: "Ver Projeto",
    href: "/project-details",
    tags: showcaseCommonTags,
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
    tags: showcaseCommonTags,
  },
];
