import { Metadata } from "next";
import InnerHeadline from "@/components/other-pages/faq/InnerHeadline";
import ParallaxDividerImage from "@/components/other-pages/faq/ParallaxDividerImage";
import BlogPreview from "@/components/other-pages/faq/BlogPreview";
import CTAWithMarquee from "@/components/other-pages/faq/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Faq | Mindsite - Agencia digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function FaqPage() {
  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <ParallaxDividerImage />
        <BlogPreview />
        <CTAWithMarquee />
      </div>
    </>
  );
}
