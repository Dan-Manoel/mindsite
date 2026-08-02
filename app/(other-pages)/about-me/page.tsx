import { Metadata } from "next";
import InnerHeadline from "@/components/other-pages/about-me/InnerHeadline";
import DoubleMarqueeDivider from "@/components/other-pages/about-me/DoubleMarqueeDivider";
import StatisticsLines from "@/components/other-pages/about-me/StatisticsLines";
import ParallaxDividerImage from "@/components/other-pages/about-me/ParallaxDividerImage";
import Resume from "@/components/other-pages/about-me/Resume";
import ParallaxDividerImage2 from "@/components/other-pages/about-me/ParallaxDividerImage2";
import TestimonialsSlider from "@/components/other-pages/about-me/TestimonialsSlider";
import CTAWithMarquee from "@/components/other-pages/about-me/CTAWithMarquee";
export const metadata: Metadata = {
  title: "About Me | Mindsite - Agencia digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function AboutMePage() {
  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <DoubleMarqueeDivider />
        <StatisticsLines />
        <ParallaxDividerImage />
        <Resume />
        <ParallaxDividerImage2 />
        <TestimonialsSlider />
        <CTAWithMarquee />
      </div>
    </>
  );
}
