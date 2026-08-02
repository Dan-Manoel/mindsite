import Footer3 from "@/components/footers/Footer3";
import { Metadata } from "next";
import Hero from "@/components/homes/index-design-studio/Hero";
import ProjectsGrid from "@/components/homes/index-design-studio/ProjectsGrid";
import Partners from "@/components/homes/index-design-studio/Partners";
import MarqueeDivider from "@/components/homes/index-design-studio/MarqueeDivider";
import BlogPreview from "@/components/homes/index-design-studio/BlogPreview";
import CTA from "@/components/homes/index-design-studio/CTA";
export const metadata: Metadata = {
  title:
    "Index Design Studio | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
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
