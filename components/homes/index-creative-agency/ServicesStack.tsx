"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useLayoutEffect, useRef } from "react";
import TextScramble from "@/components/animations/TextScramble";
import {
  initStackCardsEffects,
  initVelocityMarqueeRows,
  type StackCardMedia,
} from "@/lib/template/stackCardsEffects";

const MARQUEE_WORDS = [
  "Design/",
  "Desenvolvimento/",
  "Branding/",
  "eCommerce/",
  "Marketing/",
] as const;

type CreativeServiceCard = {
  key: string;
  leftTags: string[];
  rightTags: string[];
  titleLines: string[];
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  coverClassName?: string;
};

const CREATIVE_SERVICE_CARDS: CreativeServiceCard[] = [
  {
    key: "innovative-design",
    leftTags: ["UI/UX", "Web design", "Aplicativos", "Design impresso"],
    rightTags: ["Embalagem", "Design de Logo", "Animação", "Modelagem 3D"],
    titleLines: ["Design", "inovador"],
    imageSrc: "/img/services/services-stack/pr01.webp",
    imageWidth: 1920,
    imageHeight: 1180,
  },
  {
    key: "creative-development",
    leftTags: ["Frontend", "Interações", "Backend", "E-Commerce"],
    rightTags: ["Apps Mobile", "Manutenção", "Atualizações", "Suporte"],
    titleLines: ["Desenvolvimento", "criativo"],
    imageSrc: "/img/services/services-stack/pr02.webp",
    imageWidth: 1920,
    imageHeight: 1180,
  },
  {
    key: "brand-identity",
    leftTags: ["Estratégia de marca", "Design de Logo", "Guia de marca"],
    rightTags: ["Identidade visual", "Rebranding", "Suporte"],
    titleLines: ["Identidade de Marca"],
    imageSrc: "/img/services/services-stack/pr03.webp",
    imageWidth: 1920,
    imageHeight: 1180,
  },
  {
    key: "marketing-solutions",
    leftTags: ["Estratégia", "Redes sociais", "SEO"],
    rightTags: ["Otimização", "Email", "Campanhas"],
    titleLines: ["Soluções de", "Marketing"],
    imageSrc: "/img/services/services-stack/pr04.webp",
    imageWidth: 1920,
    imageHeight: 1180,
    coverClassName: "cover-darken",
  },
];

export default function ServicesStack() {
  const topRefs = useRef<HTMLDivElement[]>([]);
  const bottomRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const cardWrapperRefs = useRef<HTMLDivElement[]>([]);
  const cardDescriptionRefs = useRef<HTMLDivElement[]>([]);
  const cardTitleRefs = useRef<HTMLParagraphElement[]>([]);
  const cardCoverRefs = useRef<HTMLDivElement[]>([]);
  const cardImageWrapperRefs = useRef<HTMLDivElement[]>([]);
  const cardMediaRefs = useRef<StackCardMedia[]>([]);
  const introMarqueeRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    return initVelocityMarqueeRows(topRefs.current, bottomRefs.current);
  }, []);

  useLayoutEffect(() => {
    return initStackCardsEffects({
      cards: cardRefs.current,
      cardWrappers: cardWrapperRefs.current,
      cardDescriptions: cardDescriptionRefs.current,
      cardTitleParagraphs: cardTitleRefs.current,
      cardCovers: cardCoverRefs.current,
      cardImageWrappers: cardImageWrapperRefs.current,
      cardMedias: cardMediaRefs.current,
      introMarquee: introMarqueeRef.current,
    });
  }, []);

  return (
    <>
      <div className="mxd-section">
        <div className="mxd-container fullwidth-container">
          {/* Block - Services Stack Start */}
          <div className="mxd-block">
            <div className="mxd-stack-cards opposite">
              {CREATIVE_SERVICE_CARDS.map((card, index) => (
                <div
                  key={card.key}
                  className="mxd-stack-cards__card"
                  ref={(el) => {
                    if (!el) return;
                    cardRefs.current[index] = el;
                  }}
                >
                  {index === 0 ? (
                    <div
                      className="card__marquees"
                      ref={(el) => {
                        if (!el) return;
                        introMarqueeRef.current = el;
                      }}
                    >
                      <div className="marquee marquee-stack marquee--gsap muted-extra-opposite">
                        <div
                          className="marquee__top"
                          ref={(el) => {
                            if (!el) return;
                            topRefs.current[0] = el;
                          }}
                        >
                          {MARQUEE_WORDS.map((word) => (
                            <div
                              key={`top-0-${word}`}
                              className="marquee__item item-regular text"
                            >
                              <p className="marquee__text text-with-gliph">
                                {word}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div
                          className="marquee__bottom"
                          ref={(el) => {
                            if (!el) return;
                            bottomRefs.current[0] = el;
                          }}
                        >
                          {MARQUEE_WORDS.map((word) => (
                            <div
                              key={`bottom-0-${word}`}
                              className="marquee__item item-regular text"
                            >
                              <p className="marquee__text text-with-gliph">
                                {word}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div
                          className="marquee__top"
                          ref={(el) => {
                            if (!el) return;
                            topRefs.current[1] = el;
                          }}
                        >
                          {MARQUEE_WORDS.map((word) => (
                            <div
                              key={`top-1-${word}`}
                              className="marquee__item item-regular text"
                            >
                              <p className="marquee__text text-with-gliph">
                                {word}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div
                          className="marquee__bottom"
                          ref={(el) => {
                            if (!el) return;
                            bottomRefs.current[1] = el;
                          }}
                        >
                          {MARQUEE_WORDS.map((word) => (
                            <div
                              key={`bottom-1-${word}`}
                              className="marquee__item item-regular text"
                            >
                              <p className="marquee__text text-with-gliph">
                                {word}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div
                    className="card__wrapper"
                    ref={(el) => {
                      if (!el) return;
                      cardWrapperRefs.current[index] = el;
                    }}
                  >
                    <div className="card__content">
                      <div
                        className="card__descr"
                        ref={(el) => {
                          if (!el) return;
                          cardDescriptionRefs.current[index] = el;
                        }}
                      >
                        <div className="card__tags">
                          {card.leftTags.map((tag) => (
                            <TextScramble
                              key={`${card.key}-left-${tag}`}
                              className="tag tag-m tag-permanent mxd-scramble"
                            >
                              {tag}
                            </TextScramble>
                          ))}
                        </div>
                        <div className="card__tags desktop-right">
                          {card.rightTags.map((tag) => (
                            <TextScramble
                              key={`${card.key}-right-${tag}`}
                              className="tag tag-m tag-permanent mxd-scramble"
                            >
                              {tag}
                            </TextScramble>
                          ))}
                        </div>
                      </div>
                      <Link
                        className="card__title active-cursor-permanent"
                        data-cursor-text="Saiba Mais"
                        href="/services"
                      >
                        <p
                          className="permanent"
                          ref={(el) => {
                            if (!el) return;
                            cardTitleRefs.current[index] = el;
                          }}
                        >
                          {card.titleLines.map((line, lineIndex) => (
                            <Fragment key={`${card.key}-t-${lineIndex}`}>
                              {lineIndex > 0 ? <br /> : null}
                              {line}
                            </Fragment>
                          ))}
                        </p>
                      </Link>
                    </div>
                    <div
                      className="card__image"
                      ref={(el) => {
                        if (!el) return;
                        cardImageWrapperRefs.current[index] = el;
                      }}
                    >
                      <Image
                        className="card__media"
                        alt="Project Preview Image"
                        src={card.imageSrc}
                        width={card.imageWidth}
                        height={card.imageHeight}
                        ref={(el) => {
                          if (!el) return;
                          cardMediaRefs.current[index] = el;
                        }}
                      />
                      <div
                        className={`card__cover${card.coverClassName ? ` ${card.coverClassName}` : ""}`}
                        ref={(el) => {
                          if (!el) return;
                          cardCoverRefs.current[index] = el;
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Block - Services Stack End */}
        </div>
      </div>
    </>
  );
}
