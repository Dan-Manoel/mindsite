import Footer2 from "@/components/footers/Footer2";
import { Metadata } from "next";
import Hero from "@/components/homes/index-software-development-company/Hero";
import StatisticsLines from "@/components/homes/index-software-development-company/StatisticsLines";
import NicheCards from "@/components/homes/index-software-development-company/NicheCards";
import OurCapabilities from "@/components/homes/index-software-development-company/OurCapabilities";
import ParallaxDividerImage from "@/components/homes/index-software-development-company/ParallaxDividerImage";
import ProjectsGrid from "@/components/homes/index-software-development-company/ProjectsGrid";
import ParallaxDividerImage2 from "@/components/homes/index-software-development-company/ParallaxDividerImage2";
import TechStackList from "@/components/homes/index-software-development-company/TechStackList";
import ParallaxDividerImage3 from "@/components/homes/index-software-development-company/ParallaxDividerImage3";
import BlogPreview from "@/components/homes/index-software-development-company/BlogPreview";
import CTA from "@/components/homes/index-software-development-company/CTA";
export const metadata: Metadata = {
  title:
    "Index Software Development Company | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
};
export default function IndexSoftwareDevelopmentCompanyPage() {
  return (
    <>
      <>
        <Hero />
        <StatisticsLines />
        <NicheCards />
        <OurCapabilities />
        <ParallaxDividerImage />
        <ProjectsGrid />
        <ParallaxDividerImage2 />
        <TechStackList />
        <ParallaxDividerImage3 />
        <BlogPreview />
        <CTA />
      </>
      <Footer2 />
    </>
  );
}
