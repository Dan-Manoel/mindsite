export interface Template {
  slug: string;
  title: string;
  category: 'Biotech & Organic' | 'E-commerce' | 'Criadores & Portfólio' | 'Essencial' | 'Corporate & Hubs';
  hostedUrl: string;
  coverImage?: string;
  tags?: string[];
  description?: string;
  featured?: boolean;
  createdAt?: string;
}

export const templatesData: Template[] = [
  {
    slug: 'web-clinic',
    title: 'Web Clinic',
    category: 'Essencial',
    hostedUrl: 'https://webclinic.mindsite.com.br',
    coverImage: '/img/demo/screens/web-clinic.webp',
    tags: [
      'Clínicas & Saúde',
      'Tailwind CSS v4',
      'High-Conversion'
    ],
    description: 'Arquitetura premium para clínicas médicas e centros de saúde integrados, com triagem humanizada, integração Supabase/Resend e funil de conversão via WhatsApp.',
    featured: true,
    createdAt: '2026-11-01',
  },
  {
    slug: 'cosmic',
    title: 'Cosmic',
    category: 'Biotech & Organic',
    hostedUrl: 'https://cosmic.mindsite.com.br',
    coverImage: '/img/demo/screens/cosmic1.webp',
    tags: ['Holístico', 'Área de Membros', 'Comunidade', 'Next.js 16', 'Design Arquetípico'],
    description: 'Arquitetura digital imersiva com área de membros, fórum e design arquetípico para marcas de alto padrão.',
    featured: true,
    createdAt: '2026-11-01',
  },
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
