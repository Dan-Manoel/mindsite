import Footer2 from "@/components/footers/Footer2";
import { Metadata } from "next";
import Hero from "@/components/homes/index-freelancer-portfolio/Hero";
import About from "@/components/homes/index-freelancer-portfolio/About";
import ProjectsList from "@/components/homes/index-freelancer-portfolio/ProjectsList";
import DividerStickyImages from "@/components/animations/DividerStickyImages";
import BlogPreview from "@/components/homes/index-freelancer-portfolio/BlogPreview";
import CTA from "@/components/homes/index-freelancer-portfolio/CTA";
export const metadata: Metadata = {
  title: "Portfólio Freelancer | Mindsite - Agência Digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function IndexFreelancerPortfolioPage() {
  return (
    <>
      <>
        <Hero />
        <About />
        <ProjectsList />
        <DividerStickyImages ctaHref="/about-me" ctaLabel="Minha Abordagem" />
        <BlogPreview />
        <CTA />
      </>
      <Footer2 name="SEU NOME" />
    </>
  );
}
