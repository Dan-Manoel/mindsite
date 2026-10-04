# Documentação Técnica e Onboarding: Mindsite Platform
**Para:** Desenvolvedor Full Stack / Backend  
**Data:** Setembro/Outubro de 2026  
**Repositório:** [https://github.com/Dan-Manoel/mindsite](https://github.com/Dan-Manoel/mindsite)  
**Branch Principal:** `main`

---

## 1. Visão Geral do Projeto e Modelo de Negócio

O **Mindsite** é uma plataforma e agência digital focada em engenharia de ecossistemas web de alta performance. 

O core do modelo de negócios combina:
1. **Vitrine de Templates Modulares:** Venda e implantação ágil de páginas e plataformas customizadas de alta conversão para nichos específicos (ex: Biotech & Organic, Deep-Tech, E-commerce, Criadores & Portfólio, Corporate & Hubs).
2. **Desenvolvimento Sob Medida:** Criação de plataformas SaaS, portfólios imersivos e arquiteturas escaláveis.
3. **Planos de Sustentação de Infraestrutura:** Hospedagem segura na nuvem, banco de dados gerenciado, caixas de e-mail corporativo e manutenção técnica contínua.

### Objetivo da sua Entrada no Time:
O frontend do projeto foi construído e polido com animações avançadas, suporte a temas e layout responsivo. A sua missão como **Desenvolvedor Full Stack** é transformar essa base de apresentação em uma plataforma dinâmica e conectada:
- Construir a camada de **Backend (API Routes / Server Actions no Next.js)**;
- Integrar e modelar o banco de dados e serviços do **Supabase** (comentários dinâmicos, CMS de templates, captura e gestão de leads);
- Modernizar o pipeline de e-mails transacionais com **Resend**;
- Estruturar a infraestrutura de deploy, subdomínios na **Vercel** e automações no **GitHub**.

---

## 2. Stack Tecnológica Atual

| Camada | Tecnologia | Detalhes & Versões |
| :--- | :--- | :--- |
| **Framework Web** | [Next.js](https://nextjs.org/) | Versão `16.2.3` com **App Router** e Server Components |
| **Biblioteca UI** | [React](https://react.dev/) | Versão `19.2.4` (Concurrent Mode, React Compiler ready) |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) | Versão `5.x`, tipagem estrita |
| **Motor de Animação** | [GSAP](https://gsap.com/) | `3.14.2` com plugins `ScrollTrigger` e `CustomEase` |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) | `1.3.21` integrado via `TemplateRuntimeProvider` |
| **Física & Interações** | Matter.js, Typed.js, Swiper | Física 2D interativa em banners e sliders de conteúdo |
| **Estilos** | CSS Vanilla + Bootstrap 5 | Folhas modulares em `styles/` e `public/css/`, sem Tailwind puro |
| **Hospedagem & Edge** | [Vercel](https://vercel.com/) | Edge Network, Serverless Functions, SSR & SSG |
| **Banco & Auth** | [Supabase](https://supabase.com/) | PostgreSQL, RLS, Storage e Realtime (em fase de integração) |
| **E-mails Transacionais** | [Resend](https://resend.com/) | Transição da solução legada (Web3Forms) para API server-side |
| **Versionamento** | [GitHub](https://github.com/) | Repositório `Dan-Manoel/mindsite` |

---

## 3. Arquitetura de Pastas e Estrutura do Código

```text
site-mindsite/
├── app/                              # Next.js App Router (Rotas, Layouts e Páginas)
│   ├── layout.tsx                    # Root Layout (Fonts, Cookies de tema, Provider GSAP/Lenis)
│   ├── page.tsx                      # Rota raiz "/" (renderiza o Preview da vitrine)
│   ├── not-found.tsx                 # Página 404 personalizada
│   ├── preview/                      # Vitrine principal e Sandbox
│   │   ├── page.tsx                  # Home com catálogo de templates por categoria
│   │   └── [slug]/page.tsx           # Sandbox iframe interativo para testar templates
│   ├── (homes)/                      # Demonstrações de layouts específicos (branding, SaaS, etc.)
│   ├── (blogs)/                      # Rotas de blog (standard, creative, artigos técnicos)
│   ├── (other-pages)/                # Páginas institucionais:
│   │   ├── contact/page.tsx          # Página de contato com formulário
│   │   ├── pricing/page.tsx          # Planos de setup e sustentação
│   │   ├── services/page.tsx         # Catálogo de serviços e stack
│   │   ├── faq/page.tsx              # FAQ interativo
│   │   └── about-me/page.tsx         # Perfil institucional
│   └── (projects)/                   # Vitrines de portfólio (grid, sticky, etc.)
├── components/                       # Componentes React modulares
│   ├── animations/                   # Wrappers de animação (CommonLoadAnimation, BlurSection, etc.)
│   ├── blogs/                        # Artigos e seções de comentários
│   ├── common/                       # Runtime global (TemplateRuntimeProvider, LenisContext)
│   ├── cursor/                       # Cursor customizado animado (CustomCursor, CursorContext)
│   ├── footers/                      # Variações de rodapé
│   ├── headers/                      # Header1, Nav, ThemeSwitcher, Menu GSAP
│   ├── other-pages/contact/          # Formulário de contato (ContactForm.tsx)
│   └── preview/                      # Hero, DemoGrid, Sliders e CTAs da vitrine
├── data/                             # Dados estáticos (serão gradualmente migrados ao Supabase)
│   ├── templates.ts                  # Registro dos templates da vitrine e URLs hospedadas
│   ├── projects.ts                   # Portfólio e cases
│   ├── services.ts                   # Lista de serviços
│   ├── menu.ts                       # Itens e links de navegação
│   └── testimonials.ts               # Depoimentos de clientes
├── hooks/                            # Custom Hooks (useMxdMenuGsap, useViewportHeight, etc.)
├── lib/                              # Utilitários de runtime e efeitos GSAP
├── public/                           # Ativos estáticos públicos (css, fonts, img, video)
├── styles/                           # CSS customizado (template.css, menu-open.css)
└── types/                            # Definições de tipos TypeScript
```

---

## 4. Detalhamento da Infraestrutura e Serviços

### 4.1. Vercel (Hospedagem & Deploy)
- **Papel:** Host oficial da aplicação Next.js.
- **Ambiente:** Serveless Node.js Runtime para Server Components e API Routes.
- **Configuração de Domínio:** Domínio principal `mindsite.com.br` com DNS gerenciado na Vercel ou Cloudflare.
- **Subdomínios dos Templates:** A vitrine aponta para demos como `https://xama.mindsite.com.br`, `https://kokopelli.mindsite.com.br`. Você ajudará a estruturar se esses templates serão projetos isolados ou roteados via middleware multi-tenant (`middleware.ts` com rewrites).
- **Variáveis de Ambiente:** Configuradas no painel da Vercel divididas em `Production`, `Preview` e `Development`.

### 4.2. GitHub (Repositório & CI/CD)
- **Repositório:** `Dan-Manoel/mindsite` (branch de produção: `main`).
- **Deploy Automático:** Conectado à Vercel via GitHub App (cada push em `main` gera deploy em produção; cada PR gera uma URL de Preview isolada).
- **Tarefas de Infraestrutura GitHub pendentes:**
  - Criar pipeline de **GitHub Actions** (`.github/workflows/ci.yml`) para rodar `npm run lint` e `npx tsc --noEmit` automaticamente antes de qualquer merge.

### 4.3. Supabase (Banco de Dados, Autenticação & Storage)
- **Papel:** Backend-as-a-Service em nuvem com PostgreSQL.
- **Status Atual:** 
  - O código frontend já referencia explicitamente o Supabase (por exemplo, em `components/blogs/frontend-innovations/FrontendInnovationsArticle.tsx` e `components/blogs/blog-article/BlogArticle.tsx` onde está anotado: `{/* Comentários dinâmicos via Supabase serão renderizados aqui */}`).
  - Falta a instalação da SDK oficial e a criação das tabelas/conexão.
- **O que você precisará implementar:**
  1. Instalar `@supabase/supabase-js` e `@supabase/ssr`.
  2. Criar o helper do cliente (`lib/supabase/client.ts` e `lib/supabase/server.ts`).
  3. Modelar o banco no PostgreSQL com Row Level Security (RLS):
     - `comments`: Comentários de artigos de blog (autor, email, mensagem, aprovado, article_slug).
     - `leads`: Formulários de contato e propostas recebidas (nome, empresa, email, telefone, mensagem, status).
     - `templates`: Catálogo dinâmico de templates para alimentar `data/templates.ts`.

### 4.4. Resend (E-mails Transacionais)
- **Status Atual:** 
  - O formulário de contato (`components/other-pages/contact/ContactForm.tsx`) atualmente faz um POST client-side para o `api.web3forms.com` usando uma chave pública `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
- **Nova Arquitetura com Resend:**
  - Desativar o envio client-side via Web3Forms.
  - Instalar o pacote `resend` e opcionalmente `@react-email/components`.
  - Criar um Route Handler seguro: `app/api/contact/route.ts` ou Server Action.
  - A chave `RESEND_API_KEY` fica restrita ao servidor (não exposta no browser).
  - Enviar e-mail de notificação para a caixa da Mindsite (`contato@mindsite.com.br`) e um e-mail com design elegante confirmando o recebimento ao cliente.
  - Gravar o lead simultaneamente no Supabase.

---

## 5. Variáveis de Ambiente Necessárias

Crie um arquivo `.env.local` na raiz do projeto com a seguinte estrutura:

```bash
# ====================================================
# MINDSITE - VARIÁVEIS DE AMBIENTE LOCAIS
# ====================================================

# Resend (E-mails transacionais)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL_TO=contato@mindsite.com.br
CONTACT_EMAIL_FROM=onboarding@resend.dev # ou noreply@mindsite.com.br após validar domínio

# Supabase (PostgreSQL & BaaS)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh... # Apenas para Server-side/Admin

# Configurações do App
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Legado (Web3Forms - em fase de descontinuação)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=
```

---

## 6. Guia Prático de Início (Setup Local)

### Pré-requisitos
- **Node.js**: Versão 20.x ou superior (LTS recomendada);
- **npm**: 10.x+;
- **Git** configurado.

### Passo a Passo
```bash
# 1. Clonar o repositório
git clone https://github.com/Dan-Manoel/mindsite.git
cd site-mindsite

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# (Preencha as chaves no seu .env.local)

# 4. Rodar o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Comandos de Validação e Qualidade
```bash
# Checagem de tipagem TypeScript
npx tsc --noEmit

# Análise de ESLint
npm run lint

# Formatação Prettier
npm run format:check
```

---

## 7. Próximos Passos e Prioridades do Backend

1. **Substituição do Web3Forms por Resend:** [CONCLUÍDO]
   - Criada rota `app/api/contact/route.ts` segura com validação e proteção contra bots (honeypot).
   - Desenvolvido template de e-mail HTML premium (`lib/email-template.ts`) seguindo o design system do Mindsite.
   - Atualizado `ContactForm.tsx` e `CTAWithMarquee.tsx` para integração direta com a API Resend.
2. **Setup do Supabase:**
   - Provisionar o projeto no Supabase.
   - Criar tabelas com SQL migrations (`comments`, `leads`).
   - Implementar a listagem e envio de comentários nos artigos (`components/blogs/blog-article/BlogArticle.tsx`).
3. **Configuração de CI/CD no GitHub:**
   - Criar workflow de verificação automática para Pull Requests.
4. **Gerenciamento de Templates e Sandboxing:**
   - Avaliar a dinâmica dos subdomínios dos templates na Vercel e implementar a camada de API/Admin se necessário.
