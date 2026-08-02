import Footer2 from "@/components/footers/Footer2";
import { Metadata } from "next";
import Hero from "@/components/homes/index-freelancer-portfolio/Hero";
import About from "@/components/homes/index-freelancer-portfolio/About";
import ProjectsList from "@/components/homes/index-freelancer-portfolio/ProjectsList";
import DividerStickyImages from "@/components/animations/DividerStickyImages";
import BlogPreview from "@/components/homes/index-freelancer-portfolio/BlogPreview";
import CTA from "@/components/homes/index-freelancer-portfolio/CTA";
export const metadata: Metadata = {
  title:
    "Index Freelancer Portfolio | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
};
export default function IndexFreelancerPortfolioPage() {
  return (
    <>
      <>
        <Hero />
        <About />
        <ProjectsList />
        <DividerStickyImages ctaHref="/about-me" ctaLabel="My Approach" />
        <BlogPreview />
        <CTA />
      </>
      <Footer2 name="Walker" />
    </>
  );
}
