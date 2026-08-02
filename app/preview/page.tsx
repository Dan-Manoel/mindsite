import Footer1 from "@/components/footers/Footer1";
import { Metadata } from "next";
import Hero from "@/components/preview/Hero";
import DemoGrid from "@/components/preview/DemoGrid";
import ContentPagesStack from "@/components/preview/ContentPagesStack";
import ResponsivePromo from "@/components/preview/ResponsivePromo";
import InnerPagesSlider from "@/components/preview/InnerPagesSlider";
import Components from "@/components/preview/Components";
import FeaturesCards from "@/components/preview/FeaturesCards";
import DemoCTA from "@/components/preview/DemoCTA";
export const metadata: Metadata = {
  title: "Preview | Mindsite - Agencia digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function PreviewPage() {
  return (
    <>
      <>
        <Hero />
        <DemoGrid />
        <ContentPagesStack />
        <ResponsivePromo />
        <InnerPagesSlider />
        <Components />
        <FeaturesCards />
        <DemoCTA />
      </>
      <Footer1 />
    </>
  );
}
