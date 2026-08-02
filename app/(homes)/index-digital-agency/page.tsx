import Footer3 from "@/components/footers/Footer3";
import { Metadata } from "next";
import Hero from "@/components/homes/index-digital-agency/Hero";
import AboutProcess from "@/components/homes/index-digital-agency/AboutProcess";
import ProjectsShowcase from "@/components/homes/index-digital-agency/ProjectsShowcase";
import ServicesList from "@/components/homes/index-digital-agency/ServicesList";
import ParallaxDividerVideo from "@/components/homes/index-digital-agency/ParallaxDividerVideo";
import TestimonialsSticky from "@/components/homes/index-digital-agency/TestimonialsSticky";
import ParallaxDividerImage from "@/components/homes/index-digital-agency/ParallaxDividerImage";
import BlogPreview from "@/components/homes/index-digital-agency/BlogPreview";
import Divider from "@/components/homes/index-digital-agency/Divider";
export const metadata: Metadata = {
  title:
    "Index Digital Agency | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
};
export default function IndexDigitalAgencyPage() {
  return (
    <>
      <>
        <Hero />
        <AboutProcess />
        <ProjectsShowcase />
        <ServicesList />
        <ParallaxDividerVideo />
        <TestimonialsSticky />
        <ParallaxDividerImage />
        <BlogPreview />
        <Divider />
      </>
      <Footer3 />
    </>
  );
}
