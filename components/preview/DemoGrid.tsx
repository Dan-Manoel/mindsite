"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import CommonLoadAnimation, { CommonLoadFade } from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";
import BlurSection from "@/components/animations/BlurSection";

const PORTFOLIO_CATEGORIES = [
  {
    name: "Essencial",
    templates: [],
  },
  {
    name: "Biotech & Organic",
    templates: [],
  },
  {
    name: "Deep-Tech",
    templates: [],
  },
  {
    name: "Corporate & Hubs",
    templates: [
      {
        name: "Agência Criativa",
        image: "/img/demo/screens/01.webp",
        href: "/index-branding-studio",
        tags: ["Pilha de Cartões", "Slideshow", "Texto Dividido"],
      },
      {
        name: "Empresa Inovadora",
        image: "/img/demo/screens/02.webp",
        href: "/index-software-development-company",
        tags: ["Vídeo com Zoom", "Bento", "Perspectiva"],
      },
      {
        name: "Portfólio de Impacto",
        image: "/img/demo/screens/03.webp",
        href: "/index-creative-agency",
        tags: ["Rastro de Cursor", "Prévia de Vídeo", "Pilha de Serviços"],
      },
      {
        name: "Portfólio Freelancer",
        image: "/img/demo/screens/04.webp",
        href: "/index-freelancer-portfolio",
        tags: ["Cursor de Imagem", "Slides com Zoom", "Física"],
      },
      {
        name: "Estúdio de Design",
        image: "/img/demo/screens/05.webp",
        href: "/index-design-studio",
        tags: ["Slideshow com Hover", "Marquee", "Física"],
      },
      {
        name: "Portfólio de Completo",
        image: "/img/demo/screens/06.webp",
        href: "/index-web-developer",
        tags: ["Bloco Fixo", "Slideshow", "Cursor de Imagem"],
      },
      {
        name: "Portfólio Pessoal",
        image: "/img/demo/screens/07.webp",
        href: "/index-personal-portfolio",
        tags: ["Perspectiva", "Currículo", "Física"],
      },
      {
        name: "Agência Digital",
        image: "/img/demo/screens/08.webp",
        href: "/index-digital-agency",
        tags: ["Imagens 3D", "Carrossel Tela Cheia", "Rastro de Cursor"],
      },
      {
        name: "Estúdio Web",
        image: "/img/demo/screens/09.webp",
        href: "/index-web-studio",
        tags: ["Vitrine Horizontal", "Pilha de Cartões", "Imagens no Cursor"],
      },
      {
        name: "Designer Digital",
        image: "/img/demo/screens/10.webp",
        href: "/index-digital-designer",
        tags: ["Imagens com Inércia", "Vitrine em Tela Cheia", "Revelação de Imagens"],
      },
    ],
  },
  {
    name: "E-commerce",
    templates: [],
  },
  {
    name: "Criadores & Portfólio",
    templates: [],
  },
];

function TemplateCard({ template, isDragging = false }: { template: any; isDragging?: boolean }) {
  return (
    <div className="demo-carousel-card" style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
      <Link
        href={template.href}
        target="_blank"
        className="active-cursor-permanent"
        data-cursor-text="Analisar Projeto"
        style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', display: 'block', backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: '4px', border: '2px solid rgba(128, 128, 128, 0.3)' }}
        draggable={false}
      >
        <Image
          alt={template.name}
          src={template.image}
          fill
          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 650px"
          style={{ objectFit: 'cover', pointerEvents: 'none' }}
          draggable={false}
        />
      </Link>

      <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, paddingRight: '1rem' }}>
          <Link
            href={template.href}
            target="_blank"
            style={{ fontSize: '1.25rem', fontWeight: 'bold', textDecoration: 'none', color: 'inherit' }}
            draggable={false}
          >
            {template.name}
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', textAlign: 'right', marginTop: '4px' }}>
          {template.tags.map((tag: string) => (
            <span
              key={tag}
              style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6, fontWeight: 'bold' }}
            >
              <TextScramble className="mxd-scramble">
                {tag}
              </TextScramble>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}



const DesktopSeparator = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, opacity: 0.3, padding: '0 1rem' }}>
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  </div>
);

function DesktopCategoryCarousel({ category }: { category: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const templates = category.templates;
  const [fadeKey, setFadeKey] = useState(0);

// Hook blindado para SSR (só calcula no client)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // define initial
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const step = isMobile ? 1 : 2;

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      let nextIdx = prev - step;
      if (nextIdx < 0) {
        nextIdx = Math.max(0, templates.length - (templates.length % step === 0 ? step : 1));
      }
      return nextIdx;
    });
    setFadeKey(k => k + 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      let nextIdx = prev + step;
      if (nextIdx >= templates.length) {
        nextIdx = 0;
      }
      return nextIdx;
    });
    setFadeKey(k => k + 1);
  };

  if (templates.length === 0) return null;

  if (templates.length === 1) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingBottom: '2rem' }}>
        <TemplateCard template={templates[0]} />
      </div>
    );
  }

  const card1 = templates[currentIndex];
  // Calculate next index, but only access if we need a second card
  const nextIdx = (currentIndex + 1) % templates.length;
  const card2 = templates[nextIdx];

  return (
    <div className="demo-carousel-wrapper">
      <div
        onClick={handlePrev}
        className="carousel-control prev opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" />
        </svg>
      </div>

      <div key={fadeKey} className="desktop-carousel-fade carousel-cards-container">
        <TemplateCard template={card1} />
        {!isMobile && (
          <>
            <DesktopSeparator />
            {card2 && <TemplateCard template={card2} />}
          </>
        )}
      </div>

      <div
        onClick={handleNext}
        className="carousel-control next opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" />
        </svg>
      </div>
    </div>
  );
}

export default function DemoGrid() {
  return (
    <CommonLoadAnimation>
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .demo-carousel-container { display: flex; overflow-x: auto; scroll-behavior: smooth; gap: 2rem; padding-bottom: 2rem; user-select: none; }
        .demo-carousel-card { scroll-snap-align: start; flex-shrink: 0; display: flex; flex-direction: column; width: 85vw; max-width: 650px; }
        .demo-carousel-container.dragging { scroll-snap-type: none; scroll-behavior: auto; cursor: grabbing; }
        .demo-carousel-container:not(.dragging) { scroll-snap-type: x mandatory; cursor: grab; }
        @media (min-width: 768px) { .demo-carousel-card { width: 50vw; } }
        @media (min-width: 1024px) { .demo-carousel-card { width: 650px; } }
        
        .desktop-carousel-fade {
          animation: desktopFadeIn 0.3s ease-out forwards;
        }
        @keyframes desktopFadeIn {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        /* New Responsive CSS Rules injected for Mobile Layout */
        .demo-carousel-wrapper {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding-bottom: 2rem;
          gap: 1.5rem;
        }
        .carousel-cards-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
          order: 1;
        }
        .carousel-control { padding: 1rem; }
        .carousel-control.prev { order: 2; }
        .carousel-control.next { order: 3; }

        @media (min-width: 768px) {
          .demo-carousel-wrapper { flex-wrap: nowrap; }
          .carousel-cards-container { flex-direction: row; width: auto; order: unset; }
          .carousel-control.prev { order: unset; }
          .carousel-control.next { order: unset; }
        }
      `}} />
      <BlurSection id="demo" className="mxd-section" style={{ width: '100%' }}>
        {PORTFOLIO_CATEGORIES.map((category, index) => {
          if (category.templates.length === 0) return null;

          return (
            <CommonLoadFade key={category.name} index={index}>
              <section style={{ width: '100%', padding: '4rem 0' }}>
                <div style={{ padding: '0 2rem', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
                  <h2
                    className="font-heading font-bold"
                    style={{ marginBottom: '2.5rem', fontSize: '3rem', letterSpacing: '-0.02em', color: 'var(--text-color, inherit)' }}
                  >
                    {category.name}
                  </h2>

                  <DesktopCategoryCarousel category={category} />

                </div>
              </section>
            </CommonLoadFade>
          );
        })}
      </BlurSection>
    </CommonLoadAnimation>
  );
}