import { Metadata } from "next";
import InnerHeadline from "@/components/projects/works-grid-sticky/InnerHeadline";
import ProjectsGridStickyShowcase from "@/components/projects/works-grid-sticky/ProjectsGridStickyShowcase";
import ParallaxDividerVideo from "@/components/projects/works-grid-sticky/ParallaxDividerVideo";
import ProjectsList from "@/components/projects/works-grid-sticky/ProjectsList";
import CTAWithMarquee from "@/components/projects/works-grid-sticky/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Works Grid Sticky | Mindsite - Agencia digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function WorksGridStickyPage() {
  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <ProjectsGridStickyShowcase />
        <ParallaxDividerVideo />
        <ProjectsList />
        <CTAWithMarquee />
      </div>
    </>
  );
}
