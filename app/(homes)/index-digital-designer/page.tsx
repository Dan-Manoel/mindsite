import Footer3 from "@/components/footers/Footer3";
import { Metadata } from "next";
import Hero from "@/components/homes/index-digital-designer/Hero";
import AboutTeaser from "@/components/homes/index-digital-designer/AboutTeaser";
import ProjectsShowcase from "@/components/homes/index-digital-designer/ProjectsShowcase";
import ProjectsList from "@/components/homes/index-digital-designer/ProjectsList";
import ParallaxDividerImage from "@/components/homes/index-digital-designer/ParallaxDividerImage";
import ServicesList from "@/components/homes/index-digital-designer/ServicesList";
import CTAWithMarquee from "@/components/homes/index-digital-designer/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Designer Digital | Mindsite - Agência Digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function IndexDigitalDesignerPage() {
  return (
    <>
      <>
        <Hero />
        <AboutTeaser />
        <ProjectsShowcase />
        <ProjectsList />
        <ParallaxDividerImage />
        <ServicesList />
        <CTAWithMarquee />
      </>
      <Footer3 name="Walker" />
    </>
  );
}
