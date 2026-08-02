import Footer2 from "@/components/footers/Footer2";
import { Metadata } from "next";
import Hero from "@/components/homes/index-creative-agency/Hero";
import ParallaxDividerVideo from "@/components/homes/index-creative-agency/ParallaxDividerVideo";
import About from "@/components/homes/index-creative-agency/About";
import ProjectsGrid from "@/components/homes/index-creative-agency/ProjectsGrid";
import ServicesStack from "@/components/homes/index-creative-agency/ServicesStack";
import TestimonialsSticky from "@/components/homes/index-creative-agency/TestimonialsSticky";
import BlogPreview from "@/components/homes/index-creative-agency/BlogPreview";
import CTAWithMarquee from "@/components/homes/index-creative-agency/CTAWithMarquee";
export const metadata: Metadata = {
  title:
    "Index Creative Agency | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
};
export default function IndexCreativeAgencyPage() {
  return (
    <>
      <>
        <Hero />
        <ParallaxDividerVideo />
        <About />
        <ProjectsGrid />
        <ServicesStack />
        <TestimonialsSticky />
        <BlogPreview />
        <CTAWithMarquee />
      </>
      <Footer2 />
    </>
  );
}
