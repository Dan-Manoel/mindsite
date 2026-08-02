import { Metadata } from "next";
import InnerHeadline from "@/components/other-pages/pricing/InnerHeadline";
import PricingCards from "@/components/other-pages/pricing/PricingCards";
import Partners from "@/components/other-pages/pricing/Partners";
import ParallaxDividerVideo from "@/components/other-pages/pricing/ParallaxDividerVideo";
import BlogPreview from "@/components/other-pages/pricing/BlogPreview";
import CTAWithMarquee from "@/components/other-pages/pricing/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Pricing | Mindsite - Agencia digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function PricingPage() {
  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <PricingCards />
        <Partners />
        <ParallaxDividerVideo />
        <BlogPreview />
        <CTAWithMarquee />
      </div>
    </>
  );
}
