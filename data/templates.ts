export interface Template {
  slug: string;
  title: string;
  category: 'Biotech & Organic' | 'E-commerce' | 'Criadores & Portfólio' | 'Essencial' | 'Corporate & Hubs';
  hostedUrl: string;
}

export const templatesData: Template[] = [
  {
    slug: 'dottoressa',
    title: 'Dottoressa',
    category: 'Essencial',
    hostedUrl: 'https://dottoressa.mindsite.com.br',
  },
  {
    slug: 'auravita',
    title: 'AuraVita',
    category: 'Biotech & Organic',
    hostedUrl: 'https://template-auravita.mindsite.com.br',
  },
  {
    slug: 'instituto-xama',
    title: 'Instituto Xamã',
    category: 'Biotech & Organic',
    hostedUrl: 'https://xama.mindsite.com.br', // URL isolada futura
  },
  {
    slug: 'instituto-kokopelli',
    title: 'Instituto Kokopelli',
    category: 'Biotech & Organic',
    hostedUrl: 'https://kokopelli.mindsite.com.br',
  },
  {
    slug: 'rei-da-pimenta',
    title: 'Rei da Pimenta',
    category: 'E-commerce',
    hostedUrl: 'https://reidapimenta.mindsite.com.br',
  },
  {
    slug: 'dra-francis-koller',
    title: 'Dra Francis Koller',
    category: 'Criadores & Portfólio',
    hostedUrl: 'https://doctoreza.mindsite.com.br',
  },
  {
    slug: 'nightfolio',
    title: 'Nightfolio',
    category: 'Criadores & Portfólio',
    hostedUrl: 'https://nightfolio.mindsite.com.br',
  },
  {
    slug: 'branding-studio',
    title: 'Agência Criativa',
    category: 'Corporate & Hubs',
    hostedUrl: '/index-branding-studio',
  },
  {
    slug: 'software-company',
    title: 'Empresa Inovadora',
    category: 'Corporate & Hubs',
    hostedUrl: '/index-software-development-company',
  },
  {
    slug: 'creative-agency',
    title: 'Portfólio de Impacto',
    category: 'Corporate & Hubs',
    hostedUrl: '/index-creative-agency',
  },
  {
    slug: 'freelancer-portfolio',
    title: 'Portfólio Freelancer',
    category: 'Corporate & Hubs',
    hostedUrl: '/index-freelancer-portfolio',
  },
  {
    slug: 'design-studio',
    title: 'Estúdio de Design',
    category: 'Corporate & Hubs',
    hostedUrl: '/index-design-studio',
  },
  {
    slug: 'web-developer',
    title: 'Portfólio Completo',
    category: 'Corporate & Hubs',
    hostedUrl: '/index-web-developer',
  },
  {
    slug: 'personal-portfolio',
    title: 'Portfólio Pessoal',
    category: 'Corporate & Hubs',
    hostedUrl: '/index-personal-portfolio',
  },
  {
    slug: 'digital-agency',
    title: 'Agência Digital',
    category: 'Corporate & Hubs',
    hostedUrl: '/index-digital-agency',
  },
  {
    slug: 'web-studio',
    title: 'Estúdio Web',
    category: 'Corporate & Hubs',
    hostedUrl: '/index-web-studio',
  },
  {
    slug: 'digital-designer',
    title: 'Designer Digital',
    category: 'Corporate & Hubs',
    hostedUrl: '/index-digital-designer',
  },
];