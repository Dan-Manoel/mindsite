export type ProjectStackItem = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  coverClassName?: string;
  tags: string[];
};

export type ProjectShowcaseItem = {
  titleLines: [string, string];
  bgImageSrc: string;
  cardImageSrc: string;
  cardImageAlt: string;
  cursorText: string;
  href: string;
  tags: string[];
};
