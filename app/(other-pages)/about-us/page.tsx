import { Metadata } from "next";
import InnerHeadline from "@/components/other-pages/about-us/InnerHeadline";
import ParallaxDividerImage from "@/components/other-pages/about-us/ParallaxDividerImage";
import Process from "@/components/other-pages/about-us/Process";
import DoubleMarqueeDivider from "@/components/other-pages/about-us/DoubleMarqueeDivider";
import Awards from "@/components/other-pages/about-us/Awards";
import PartnersGrid from "@/components/other-pages/about-us/PartnersGrid";
import ParallaxDividerImage2 from "@/components/other-pages/about-us/ParallaxDividerImage2";
import Approach from "@/components/other-pages/about-us/Approach";
import BlogPreview from "@/components/other-pages/about-us/BlogPreview";
import CTAWithMarquee from "@/components/other-pages/about-us/CTAWithMarquee";
export const metadata: Metadata = {
  title: "About Us | Mindsite - Agencia digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function AboutUsPage() {
  return (
    <>
      <>
        <InnerHeadline />
        <ParallaxDividerImage />
        <Process />
        <DoubleMarqueeDivider />
        <PartnersGrid />
        <ParallaxDividerImage2 />
        <Approach />
        <BlogPreview />
        <CTAWithMarquee />
      </>
    </>
  );
}
