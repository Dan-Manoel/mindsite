import { Metadata } from "next";
import InnerHeadline from "@/components/other-pages/team/InnerHeadline";
import SplitAboutTeam from "@/components/other-pages/team/SplitAboutTeam";
import TeamList from "@/components/other-pages/team/TeamList";
import ParallaxDividerImage from "@/components/other-pages/team/ParallaxDividerImage";
import TestimonialsSlider from "@/components/other-pages/team/TestimonialsSlider";
import CTAWithMarquee from "@/components/other-pages/team/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Equipe | Mindsite - Agência Digital",
  description:
    "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function TeamPage() {
  return (
    <>
      <>
        <InnerHeadline />
        <SplitAboutTeam />
        <TeamList />
        <ParallaxDividerImage />
        <TestimonialsSlider />
        <CTAWithMarquee />
      </>
    </>
  );
}
