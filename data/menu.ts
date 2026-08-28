import type { MenuLinkItem } from "@/types/menu";

export const homeLinks: MenuLinkItem[] = [
  { href: "/index-branding-studio", label: "Estúdio de Branding" },
  {
    href: "/index-software-development-company",
    label: "Desenvolvimento de Software",
  },
  { href: "/index-creative-agency", label: "Agência Criativa" },
  { href: "/index-freelancer-portfolio", label: "Portfólio Freelancer" },
  { href: "/index-design-studio", label: "Estúdio de Design" },
  { href: "/index-web-developer", label: "Desenvolvedor Web" },
  { href: "/index-personal-portfolio", label: "Portfólio Pessoal" },
  { href: "/index-digital-agency", label: "Agência Digital" },
  { href: "/index-web-studio", label: "Estúdio Web" },
  { href: "/index-digital-designer", label: "Designer Digital" },
];

export const worksLinks: MenuLinkItem[] = [
  //{ href: "/works-default", label: "Trabalhos Padrão" },
  //{ href: "/works-grid", label: "Grade de Trabalhos" },
  //{ href: "/works-grid-sticky", label: "Grade Fixa" },
  //{ href: "/project-details", label: "Detalhes do Projeto" },
];

export const pageLinks: MenuLinkItem[] = [
  //{ href: "/about-me", label: "Sobre Mim" },
  // { href: "/sobre-nos", label: "Sobre Nós" }, // Rota em desenvolvimento
  { href: "/services", label: "Serviços" },
  //{ href: "/team", label: "Nossa Equipe" },
  //{ href: "/pricing", label: "Preços" },
  { href: "/faq", label: "Perguntas Frequentes" },
  { href: "/404", label: "Página 404" },
  { href: "/", label: "Página Inicial" },
];

export const insightLinks: MenuLinkItem[] = [
  //{ href: "/blog-standard", label: "Blog Padrão" },
  { href: "/blog-creative", label: "Blog Criativo" },
  { href: "/blog-article", label: "Artigo Único" },
];
