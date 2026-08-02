import type { SoftwareCapabilityItem } from "@/types/service";

export const softwareDevelopmentCompanyCapabilities: SoftwareCapabilityItem[] = [
  {
    number: "[01]",
    name: "Software development",
    imageSrc: "/img/services/1200x980_cpb01.webp",
    descriptionLead: "Transforming concepts into seamless and",
    descriptionHighlight: "future-ready digital products.",
    tagsLeft: ["Technology", "Architecture"],
    tagsRight: ["Collaboration", "Performance"],
  },
  {
    number: "[02]",
    name: "Web app development",
    imageSrc: "/img/services/1200x980_cpb02.webp",
    descriptionLead: "Elegant, high-speed web experiences that",
    descriptionHighlight: "feel effortless and refined.",
    tagsLeft: ["Frontend", "Backend", "Interactions"],
    tagsRight: ["Usability", "Motion"],
  },
  {
    number: "[03]",
    name: "Mobile app development",
    imageSrc: "/img/services/1200x980_cpb03.webp",
    descriptionLead: "Designing fluid mobile experiences that",
    descriptionHighlight: "inspire creativity.",
    tagsLeft: ["Interface", "Gesture"],
    tagsRight: ["Animation", "Product design"],
  },
  {
    number: "[04]",
    name: "UI/UX design",
    imageSrc: "/img/services/1200x980_cpb04.webp",
    descriptionLead: "Blending clarity and emotion into",
    descriptionHighlight: "experiences that feel beautifully simple.",
    tagsLeft: ["Prototype", "Layout", "Typography"],
    tagsRight: ["Interaction", "User flow"],
  },
  {
    number: "[05]",
    name: "Software testing",
    imageSrc: "/img/services/1200x980_cpb05.webp",
    descriptionLead: "Perfecting every detail to ensure precision, stability,",
    descriptionHighlight: "and confidence in every click.",
    tagsLeft: ["Quality", "Automation"],
    tagsRight: ["Reliability", "Refinement"],
  },
  {
    number: "[06]",
    name: "Generative AI development",
    imageSrc: "/img/services/1200x980_cpb06.webp",
    descriptionLead: "Merging creativity and intelligence to build",
    descriptionHighlight: "systems that imagine and evolve.",
    tagsLeft: ["Machine learning", "Innovation", "Neural networks"],
    tagsRight: ["Automation", "Future tech"],
  },
  {
    number: "[07]",
    name: "Data engineering",
    imageSrc: "/img/services/1200x980_cpb07.webp",
    descriptionLead: "Raw information to clear, powerful insights that",
    descriptionHighlight: "drive smart decisions.",
    tagsLeft: ["Analytics", "Pipelines", "Cloud"],
    tagsRight: ["Visualization", "Structure"],
  },
];

export const personalPortfolioExpertiseCapabilities: SoftwareCapabilityItem[] =
  softwareDevelopmentCompanyCapabilities.slice(0, 3);
