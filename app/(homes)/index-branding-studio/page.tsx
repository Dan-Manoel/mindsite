import Footer2 from "@/components/footers/Footer2";
import { Metadata } from "next";
import Hero from "@/components/homes/index-branding-studio/Hero";
import ProtectsStack from "@/components/homes/index-branding-studio/ProtectsStack";
import DividerStickyCaption from "@/components/animations/DividerStickyCaption";
import DividerStickyImages from "@/components/animations/DividerStickyImages";
import SplitDescription from "@/components/homes/index-branding-studio/SplitDescription";
import ParallaxDivider from "@/components/homes/index-branding-studio/ParallaxDivider";
import BlogPreview from "@/components/homes/index-branding-studio/BlogPreview";
import CTAWithMarquee from "@/components/homes/index-branding-studio/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio — Digital Agency & Portfolio NextJs Template",
};
export default function IndexBrandingStudioPage() {
  return (
    <>
      <Hero />
      <ProtectsStack />
      <DividerStickyCaption
        topCtaLabel="Services"
        topCtaHref="/services"
        captionCursorText={"What We\u00a0Do"}
        captionHref="/services"
      >
        Digital agency specializing in
        <span>innovative design</span> &amp; cutting-edge
        <span>development</span>
      </DividerStickyCaption>
      <DividerStickyImages ctaHref="/services" ctaLabel="Process" />
      <SplitDescription />
      <ParallaxDivider />
      <BlogPreview />
      <CTAWithMarquee />
      <Footer2 />
    </>
  );
}
