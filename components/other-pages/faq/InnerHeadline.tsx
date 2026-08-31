"use client";

import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type FAQItem = {
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Quais soluções e tecnologias são utilizadas no desenvolvimento?",
    answer:
      "O foco está na engenharia de software frontend e backend para a construção de ecossistemas digitais sólidos. Isso inclui o desenvolvimento de plataformas SaaS, vitrines digitais de alta performance e arquiteturas escaláveis utilizando Next.js, TypeScript e Tailwind CSS, além de integrações modernas com Vercel e Supabase.",
  },
  {
    question: "Qual é o tempo estimado para o desenvolvimento de um projeto?",
    answer:
      "O cronograma está diretamente atrelado à complexidade da arquitetura exigida. Estruturas otimizadas e objetivas podem ser implementadas em algumas semanas, enquanto ecossistemas completos com lógicas complexas de backend exigem ciclos mais extensos. O escopo é definido através de etapas claras e versionadas.",
  },
  {
    question: "O escopo de desenvolvimento atende empresas de quais portes?",
    answer:
      "A infraestrutura web moderna é, por natureza, escalável. A aplicação das melhores práticas de engenharia permite o desenvolvimento de soluções tanto para startups validando novas ideias quanto para operações consolidadas que necessitam de refatoração de código e ganhos de performance.",
  },
  {
    question: "É possível modernizar ou refatorar um site que já existe?",
    answer:
      "Sim. A modernização envolve a auditoria da estrutura atual e a migração para frameworks modernos. O objetivo é substituir códigos legados por uma arquitetura de alto desempenho, melhorando drasticamente as métricas de usabilidade (Core Web Vitals) e a experiência do usuário.",
  },
  {
    question: "Como funciona a melhoria de ranqueamento em sites de busca (Google, etc.)?",
    answer:
      "Através da aplicação rigorosa de estratégias de SEO técnico (Search Engine Optimization), como o Server-Side Rendering (SSR) e a otimização de assets no código, aliados a uma arquitetura de informação limpa, é possível aumentar o ranqueamento orgânico, a performance de indexação e a visibilidade digital da plataforma.",
  },
  {
    question: "Existe suporte para manutenção e evolução após o lançamento?",
    answer:
      "A manutenibilidade é um princípio nativo do desenvolvimento. A utilização de código limpo, tipagem estática e deploys contínuos facilita o suporte a longo prazo. É possível estruturar ciclos de acompanhamento para garantir estabilidade, atualizações de segurança e a implementação escalonada de novas funcionalidades.",
  },
  {
    question: "Qual é o fluxo para iniciar a construção do projeto?",
    answer:
      "O primeiro passo é uma chamada técnica de alinhamento. Nesse momento, avaliam-se os requisitos do sistema, os objetivos de negócio e as integrações necessárias. Com essas informações, é estruturada uma proposta de arquitetura clara, definindo o roadmap de desenvolvimento e os próximos passos práticos.",
  },
];

export default function InnerHeadline() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  useLayoutEffect(() => {
    const targets = contentRefs.current;

    targets.forEach((content, idx) => {
      if (!content) return;
      gsap.killTweensOf(content);

      const isOpen = idx === openIndex;
      const targetPaddingBottom = window.matchMedia("(min-width: 768px)")
        .matches
        ? "5.4rem"
        : "3rem";

      if (isOpen) {
        gsap.set(content, {
          display: "flex",
          height: "auto",
          paddingTop: 0,
          paddingBottom: targetPaddingBottom,
        });
        const height = content.scrollHeight;
        gsap.fromTo(
          content,
          { height: 0, paddingTop: 0, paddingBottom: 0 },
          {
            height,
            paddingTop: 0,
            paddingBottom: targetPaddingBottom,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(content, { height: "auto" });
            },
          },
        );
      } else {
        if (getComputedStyle(content).display === "none") return;
        gsap.set(content, {
          height: content.scrollHeight,
          paddingTop: 0,
          paddingBottom: targetPaddingBottom,
        });
        gsap.to(content, {
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(content, { display: "none", height: "auto" });
          },
        });
      }
    });

    return () => {
      targets.forEach((content) => {
        if (!content) return;
        gsap.killTweensOf(content);
      });
    };
  }, [openIndex]);

  const onToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section padding-bottom-default">
          <div className="mxd-container grid-l-container">
            {/* Block - Inner Headline v04 Start */}
            <div className="mxd-block loading-wrap">
              <div className="inner-headline">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
                      {/* breadcrumbs */}
                      <CommonLoadFade index={0}>
                        <div className="inner-headline__breadcrumbs loading-fade">
                          <div className="breadcrumbs__nav">
                            <span>
                              <Link href={`/`}>
                                <TextScramble className="mxd-scramble">
                                  Início
                                </TextScramble>
                              </Link>
                            </span>
                            <span className="current-item">FAQ </span>
                          </div>
                        </div>
                      </CommonLoadFade>
                    </div>
                    <div className="col-12">
                      {/* content */}
                      <div className="inner-headline__content has-medium-title">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 col-xl-6 mxd-grid-item">
                              <div className="inner-headline__title pre-subtitle-medium">
                                <CommonAnimatedText
                                  as="h1"
                                  className="medium loading-split"
                                  animation="splitLinesLoad"
                                >
                                  FAQ
                                </CommonAnimatedText>
                              </div>
                              <div className="inner-headline__subtitle">
                                <CommonAnimatedText
                                  as="p"
                                  className="loading-split"
                                  animation="splitLinesLoad"
                                >
                                  Tudo o que <span>você precisa saber</span>
                                </CommonAnimatedText>
                              </div>
                            </div>
                            <div className="col-12 col-xl-6 mxd-grid-item">
                              {/* split header caption */}
                              <div className="inner-headline__caption split-caption pre-grid">
                                <CommonAnimatedText
                                  as="p"
                                  className="t-bold t-large loading-split"
                                  animation="splitLinesLoad"
                                >
                                  Tem dúvidas? Nós temos as respostas! Aqui, você
                                  encontrará informações claras e precisas{" "}
                                  <span>
                                    sobre nossos serviços, processo e o que esperar
                                    ao trabalhar conosco. Se precisar de mais detalhes,
                                    entre em contato!
                                  </span>
                                </CommonAnimatedText>
                              </div>
                              {/* split header grid block */}
                              {/* Block - Accordion Start */}
                              <CommonLoadFade index={1}>
                                <div className="mxd-accordion loading-fade">
                                  {FAQ_ITEMS.map((item, idx) => {
                                    const isOpen = openIndex === idx;
                                    return (
                                      <div
                                        key={item.question}
                                        className="mxd-accordion__item"
                                      >
                                        <CommonScrollAnimated
                                          className="mxd-accordion__divider anim-uni-in-up"
                                          as="div"
                                          animation="inUp"
                                        />
                                        <CommonScrollAnimated
                                          className={`mxd-accordion__title anim-uni-in-up ${isOpen ? "accordion-active accordion-opened" : ""}`}
                                          as="div"
                                          animation="inUp"
                                          role="button"
                                          tabIndex={0}
                                          aria-expanded={isOpen}
                                          onClick={() => onToggle(idx)}
                                          onKeyDown={(e) => {
                                            if (
                                              e.key === "Enter" ||
                                              e.key === " "
                                            ) {
                                              e.preventDefault();
                                              onToggle(idx);
                                            }
                                          }}
                                        >
                                          <p>{item.question}</p>
                                          <div
                                            className={`mxd-accordion__arrow ${isOpen ? "accordion-rotate" : ""}`}
                                          >
                                            <i className="mxd-accordion__close">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={18}
                                                height={18}
                                                version="1.1"
                                                viewBox="0 0 18 18"
                                              >
                                                <path d="M3.6,0v3.6H0V0h3.6ZM18,18v-3.6h-3.6v3.6h3.6ZM14.4,7.2v-3.6h-3.6v3.6h-3.6v-3.6h-3.6v3.6h3.6v3.6h3.6v3.6h3.6v-3.6h-3.6v-3.6h3.6ZM18,0h-3.6v3.6h3.6V0ZM0,18h3.6v-3.6H0v3.6ZM3.6,14.4h3.6v-3.6h-3.6v3.6Z" />
                                              </svg>
                                            </i>
                                            <i className="mxd-accordion__plus">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={18}
                                                height={18}
                                                version="1.1"
                                                viewBox="0 0 18 18"
                                              >
                                                <path d="M18,7.2v3.6h-7.2v7.2h-3.6v-7.2H0v-3.6h7.2V0h3.6v7.2h7.2Z" />
                                              </svg>
                                            </i>
                                          </div>
                                        </CommonScrollAnimated>
                                        <div
                                          ref={(el) => {
                                            contentRefs.current[idx] = el;
                                          }}
                                          className="mxd-accordion__content"
                                        >
                                          <p className="t-medium mxd-accordion__text">
                                            {item.answer}
                                          </p>
                                        </div>
                                        <CommonScrollAnimated
                                          className="mxd-accordion__divider anim-uni-in-up"
                                          as="div"
                                          animation="inUp"
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </CommonLoadFade>
                              {/* Block - Accordion End */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Inner Headline v04 End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
