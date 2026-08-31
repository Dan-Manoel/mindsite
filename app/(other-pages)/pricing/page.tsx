import { Metadata } from "next";
import InnerHeadline from "@/components/other-pages/pricing/InnerHeadline";
import SetupPricing from "@/components/other-pages/pricing/SetupPricing";
import PricingCards from "@/components/other-pages/pricing/PricingCards";
import Partners from "@/components/other-pages/pricing/Partners";
import BlogPreview from "@/components/other-pages/pricing/BlogPreview";
import CTAWithMarquee from "@/components/other-pages/pricing/CTAWithMarquee";

export const metadata: Metadata = {
  title: "Planos e Preços | MindSite",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o MindSite otimiza seu ecossistema digital do início ao fim.",
};

export default function PricingPage() {
  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <SetupPricing />
        <PricingCards />
        <Partners />
        <CTAWithMarquee />
        <BlogPreview />
      </div>
    </>
  );
}