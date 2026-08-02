import { Metadata } from "next";
import InnerHeadline from "@/components/projects/works-default/InnerHeadline";
import ProjectsStack from "@/components/projects/works-default/ProjectsStack";
import ProjectsList from "@/components/projects/works-default/ProjectsList";
import ParallaxDividerVideo from "@/components/projects/works-default/ParallaxDividerVideo";
import TestimonialsSticky from "@/components/projects/works-default/TestimonialsSticky";
import CTAWithMarquee from "@/components/projects/works-default/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Works Default | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
};
export default function WorksDefaultPage() {
  return (
    <>
      <InnerHeadline />
      <ProjectsStack />
      <ProjectsList />
      <ParallaxDividerVideo />
      <TestimonialsSticky />
      <CTAWithMarquee />
    </>
  );
}
