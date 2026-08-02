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
  title: "Mindsite | Agencia digital",
  description:
    "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
  openGraph: {
    title: "Mindsite | Agencia digital",
    description:
      "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
    images: [
      {
        url: "/img/logo_og.webp",
        width: 1599,
        height: 715,
        alt: "Mindsite | Agencia digital",
        type: "image/webp",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindsite | Agencia digital",
    description:
      "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
    images: [
      {
        url: "/img/logo_og.webp",
        width: 1599,
        height: 715,
        alt: "Mindsite | Agencia digital",
      },
    ],
  },
};
export default function IndexBrandingStudioPage() {
  return (
    <>
      <Hero />
      <ProtectsStack />
      <DividerStickyCaption
        topCtaLabel="Serviços"
        topCtaHref="/services"
        captionCursorText={"O Que\u00a0Fazemos"}
        captionHref="/services"
      >
        Agência digital especializada em
        <span>design inovador</span> &amp; <span>desenvolvimento de ponta</span>
      </DividerStickyCaption>
      <DividerStickyImages ctaHref="/services" ctaLabel="Processo" />
      <SplitDescription />
      <ParallaxDivider />
      <BlogPreview />
      <CTAWithMarquee />
      <Footer2 />
    </>
  );
}
