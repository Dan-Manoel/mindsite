export interface Template {
  slug: string;
  title: string;
  category: 'Biotech & Organic' | 'E-commerce' | 'Criadores & Portfólio' | 'Essencial';
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
    category: 'Essencial',
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
];