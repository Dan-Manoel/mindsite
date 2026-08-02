import type { SoftwareCapabilityItem } from "@/types/service";

export const softwareDevelopmentCompanyCapabilities: SoftwareCapabilityItem[] = [
  {
    number: "[01]",
    name: "Desenvolvimento de Software",
    imageSrc: "/img/services/1200x980_cpb01.webp",
    descriptionLead: "Transformando conceitos em produtos digitais fluídos e",
    descriptionHighlight: "prontos para o futuro.",
    tagsLeft: ["Tecnologia", "Arquitetura"],
    tagsRight: ["Colaboração", "Performance"],
  },
  {
    number: "[02]",
    name: "Desenvolvimento de Aplicações Web",
    imageSrc: "/img/services/1200x980_cpb02.webp",
    descriptionLead: "Experiências web elegantes e velozes que",
    descriptionHighlight: "parecem naturais e refinadas.",
    tagsLeft: ["Frontend", "Backend", "Interações"],
    tagsRight: ["Usabilidade", "Animação"],
  },
  {
    number: "[03]",
    name: "Desenvolvimento Mobile",
    imageSrc: "/img/services/1200x980_cpb03.webp",
    descriptionLead: "Criando experiências móveis fluídas que",
    descriptionHighlight: "inspiram a criatividade.",
    tagsLeft: ["Interface", "Gestos"],
    tagsRight: ["Animação", "Design de Produto"],
  },
  {
    number: "[04]",
    name: "Design UI/UX",
    imageSrc: "/img/services/1200x980_cpb04.webp",
    descriptionLead: "Unindo clareza e emoção em",
    descriptionHighlight: "experiências lindamente simples.",
    tagsLeft: ["Protótipo", "Layout", "Tipografia"],
    tagsRight: ["Interação", "Fluxo do Usuário"],
  },
  {
    number: "[05]",
    name: "Testes e Qualidade de Software",
    imageSrc: "/img/services/1200x980_cpb05.webp",
    descriptionLead: "Aperfeiçoando cada detalhe para garantir precisão, estabilidade",
    descriptionHighlight: "e confiança em cada clique.",
    tagsLeft: ["Qualidade", "Automação"],
    tagsRight: ["Confiabilidade", "Refinamento"],
  },
  {
    number: "[06]",
    name: "Desenvolvimento de IA Generativa",
    imageSrc: "/img/services/1200x980_cpb06.webp",
    descriptionLead: "Unindo criatividade e inteligência para construir",
    descriptionHighlight: "sistemas que imaginam e evoluem.",
    tagsLeft: ["Machine learning", "Inovação", "Redes Neurais"],
    tagsRight: ["Automação", "Tecnologia do Futuro"],
  },
  {
    number: "[07]",
    name: "Engenharia de Dados",
    imageSrc: "/img/services/1200x980_cpb07.webp",
    descriptionLead: "Dados brutos transformados em insights claros e poderosos que",
    descriptionHighlight: "guiam decisões inteligentes.",
    tagsLeft: ["Analytics", "Pipelines", "Cloud"],
    tagsRight: ["Visualização", "Estrutura"],
  },
];

export const personalPortfolioExpertiseCapabilities: SoftwareCapabilityItem[] =
  softwareDevelopmentCompanyCapabilities.slice(0, 3);
