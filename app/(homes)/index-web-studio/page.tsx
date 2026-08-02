import Footer3 from "@/components/footers/Footer3";
import { Metadata } from "next";
import Hero from "@/components/homes/index-web-studio/Hero";
import AboutMission from "@/components/homes/index-web-studio/AboutMission";
import SelectedWork from "@/components/homes/index-web-studio/SelectedWork";
import ServicesStackVideo from "@/components/homes/index-web-studio/ServicesStackVideo";
import Process from "@/components/homes/index-web-studio/Process";
import DividerCursor from "@/components/homes/index-web-studio/DividerCursor";
import ParallaxDividerImage from "@/components/homes/index-web-studio/ParallaxDividerImage";
export const metadata: Metadata = {
  title: "Estúdio Web | Mindsite - Agência Digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function IndexWebStudioPage() {
  return (
    <>
      <>
        <Hero />
        <AboutMission />
        <SelectedWork />
        <ServicesStackVideo />
        <Process />
        <DividerCursor />
        <ParallaxDividerImage />
      </>
      <Footer3 />
    </>
  );
}
