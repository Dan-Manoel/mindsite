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
  title:
    "Index Web Developer | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
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
          topCtaLabel="Explore"
          topCtaHref="/services"
          captionCursorText="I do best"
          captionHref="/services"
        >
          From <span>pixel-perfect designs</span> to
          <span>flawless code</span>- the highest standards of quality.
        </DividerStickyCaption>
        <ParallaxDividerVideo />
        <BlogPreview />
        <CTAWithMarquee />
      </>
      <Footer4 />
    </>
  );
}
