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
    question: "Quais serviços vocês oferecem?",
    answer:
      "Oferecemos uma gama completa de soluções digitais, incluindo design e desenvolvimento de sites, branding, marketing digital, soluções de e-commerce, SEO, criação de conteúdo e suporte contínuo. Se você precisa de um novo site, uma reformulação de marca ou uma estratégia de marketing digital, nossa equipe está preparada para ajudar sua empresa a crescer online.",
  },
  {
    question: "Quanto tempo leva um projeto?",
    answer:
      "Os prazos variam de acordo com a complexidade do projeto. Um site simples pode levar algumas semanas, enquanto uma identidade visual completa ou um projeto de desenvolvimento personalizado pode levar alguns meses. Definimos prazos claros e mantemos você atualizado em cada etapa.",
  },
  {
    question: "Vocês trabalham com empresas de todos os tamanhos?",
    answer:
      "Sim! Colaboramos com startups, pequenas empresas e grandes corporações em vários setores. Independentemente do tamanho ou estágio da sua empresa, adaptamos nossos serviços para atender às suas necessidades e objetivos específicos.",
  },
  {
    question: "Vocês podem reformular meu site atual?",
    answer:
      "Com certeza. Somos especializados em reformulações de sites para melhorar a experiência do usuário, modernizar sua marca e otimizar o desempenho. Trabalharemos com você para entender sua visão e objetivos de negócios, transformando seu site atual em um ativo digital poderoso.",
  },
  {
    question: "Vocês podem ajudar a melhorar o ranqueamento do meu site nos motores de busca?",
    answer:
      "Nossos especialistas em SEO utilizam estratégias comprovadas, incluindo pesquisa de palavras-chave, otimização on-page, link building e criação de conteúdo para aumentar a visibilidade e o ranqueamento do seu site no Google e outros motores de busca.",
  },
  {
    question: "Vocês oferecem suporte e manutenção contínuos?",
    answer:
      "Sim! Oferecemos manutenção contínua de sites, monitoramento de desempenho e suporte de marketing digital para garantir que sua presença online permaneça eficiente e atualizada. Nossos pacotes de suporte podem ser personalizados de acordo com suas necessidades.",
  },
  {
    question: "Como começamos?",
    answer:
      "Começar é fácil! Basta entrar em contato conosco pelo nosso site ou nos ligar. Agendaremos uma chamada inicial para discutir seus objetivos, desafios e requisitos do projeto. A partir daí, enviaremos uma proposta com nossa abordagem recomendada, prazos e próximos passos.",
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
