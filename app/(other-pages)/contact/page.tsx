import { Metadata } from "next";
import InnerHeadline from "@/components/other-pages/contact/InnerHeadline";
import Socials from "@/components/other-pages/contact/Socials";
import ParallaxDividerImage from "@/components/other-pages/contact/ParallaxDividerImage";
import SectionTitle from "@/components/other-pages/contact/SectionTitle";
import CTAWithMarquee from "@/components/other-pages/contact/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Contact | Mindsite - Agencia digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function ContactPage() {
  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <Socials />
        <ParallaxDividerImage />
        <SectionTitle />
        <CTAWithMarquee />
      </div>
    </>
  );
}
