import Footer3 from "@/components/footers/Footer3";
import { Metadata } from "next";
import Hero from "@/components/homes/index-design-studio/Hero";
import ProjectsGrid from "@/components/homes/index-design-studio/ProjectsGrid";
import Partners from "@/components/homes/index-design-studio/Partners";
import MarqueeDivider from "@/components/homes/index-design-studio/MarqueeDivider";
import BlogPreview from "@/components/homes/index-design-studio/BlogPreview";
import CTA from "@/components/homes/index-design-studio/CTA";
export const metadata: Metadata = {
  title: "Estúdio de Design | Mindsite - Agência Digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function IndexDesignStudioPage() {
  return (
    <>
      <>
        <Hero />
        <ProjectsGrid />
        <Partners />
        <MarqueeDivider />
        <BlogPreview />
        <CTA />
      </>
      <Footer3 />
    </>
  );
}
