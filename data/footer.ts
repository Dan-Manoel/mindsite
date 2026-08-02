import type { MenuLinkItem } from "@/types/menu";
import { homeLinks, insightLinks, worksLinks } from "@/data/menu";

/** Inner routes shown under “/ Inner pages” (subset of site; excludes landing home `/`). */
export const footer1InnerPageLinks: MenuLinkItem[] = [
  { href: "/about-me", label: "Sobre Mim" },
  { href: "/about-us", label: "Sobre Nós" },
  { href: "/services", label: "Serviços" },
  { href: "/team", label: "Nossa Equipe" },
  { href: "/pricing", label: "Preços" },
  { href: "/faq", label: "Perguntas Frequentes" },
  { href: "/404", label: "Página 404" },
  { href: "/contact", label: "Contato" },
];

export type Footer1NavBlock = {
  title: string;
  links: MenuLinkItem[];
};

export type Footer1NavColumn = {
  className: string;
  blocks: Footer1NavBlock[];
};

export const footer1NavColumns: Footer1NavColumn[] = [
  {
    className: "col-12 col-md-4 mxd-grid-item",
    blocks: [{ title: "/ Páginas Iniciais", links: homeLinks }],
  },
  {
    className: "col-12 col-md-4 mxd-grid-item",
    blocks: [
      { title: "/ Portfólio", links: worksLinks },
      { title: "/ Artigos & Insights", links: insightLinks },
    ],
  },
  {
    className: "col-12 col-md-4 mxd-grid-item",
    blocks: [{ title: "/ Páginas Internas", links: footer1InnerPageLinks }],
  },
];

export type Footer1PromoItem = {
  href: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
  /** Text before the highlighted span */
  textLead: string;
  /** Second line inside `<span>` */
  textSpan: string;
};

export const footer1PromoItems: Footer1PromoItem[] = [
  {
    href: "https://themeforest.net/item/rayo-digital-agency-personal-portfolio-nextjs-template/60468451",
    iconSrc: "/img/demo/logo-rayo.svg",
    iconAlt: "Rayo React Nextjs Template Logo",
    iconWidth: 56,
    iconHeight: 56,
    textLead: "Rayo digital agency & personal portfolio ",
    textSpan: "React Nextjs Template",
  },
  {
    href: "https://themeforest.net/item/blayden-personal-portfolio-resume-nextjs-template/59673134",
    iconSrc: "/img/demo/logo-blayden.svg",
    iconAlt: "Blayden React Nextjs Template Logo",
    iconWidth: 56,
    iconHeight: 56,
    textLead: "Blayden personal portfolio & resume ",
    textSpan: "React Nextjs Template",
  },
  {
    href: "https://themeforest.net/item/braxton-personal-portfolio-resume-nextjs-template/59550577",
    iconSrc: "/img/demo/logo-braxton.svg",
    iconAlt: "Braxton React Nextjs Template Logo",
    iconWidth: 56,
    iconHeight: 56,
    textLead: "Braxton personal portfolio & resume ",
    textSpan: "React Nextjs Template",
  },
];

export type Footer1BackgroundImage = {
  wrapperClass: string;
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const footer1BackgroundImages: Footer1BackgroundImage[] = [
  {
    wrapperClass: "footer-background__img1",
    src: "/img/demo/clouds-01.webp",
    width: 1400,
    height: 469,
    alt: "MINDSITE Footer Background Image",
  },
  {
    wrapperClass: "footer-background__img2",
    src: "/img/demo/clouds-02.webp",
    width: 1200,
    height: 401,
    alt: "MINDSITE Footer Background Image",
  },
];

export const footer1ForegroundImages: Footer1BackgroundImage[] = [
  {
    wrapperClass: "footer-foreground__img1",
    src: "/img/demo/clouds-03.webp",
    width: 1200,
    height: 374,
    alt: "MINDSITE Footer Foreground Image",
  },
];
