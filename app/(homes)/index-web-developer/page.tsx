import Footer4 from "@/components/footers/Footer4";
import { Metadata } from "next";
import Hero from "@/components/homes/index-web-developer/Hero";
import ParallaxDividerImage from "@/components/homes/index-web-developer/ParallaxDividerImage";
import ProjectsGrid from "@/components/homes/index-web-developer/ProjectsGrid";
import AboutProcess from "@/components/homes/index-web-developer/AboutProcess";
import DividerStickyCaption from "@/components/animations/DividerStickyCaption";
import ParallaxDividerVideo from "@/components/homes/index-web-developer/ParallaxDividerVideo";
import BlogPreview from "@/components/homes/index-web-developer/BlogPreview";
import CTAWithMarquee from "@/components/homes/index-web-developer/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Desenvolvedor Web | Mindsite - Agência Digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function IndexWebDeveloperPage() {
  return (
    <>
      <>
        <Hero />
        <ParallaxDividerImage />
        <ProjectsGrid />
        <AboutProcess />
        <DividerStickyCaption
          topCtaLabel="Explorar"
          topCtaHref="/services"
          captionCursorText="Especialidades"
          captionHref="/services"
        >
          De <span>designs impecáveis</span> a
          <span>código de alta performance</span> — o mais alto padrão de qualidade.
        </DividerStickyCaption>
        <ParallaxDividerVideo />
        <BlogPreview />
        <CTAWithMarquee />
      </>
      <Footer4 />
    </>
  );
}
