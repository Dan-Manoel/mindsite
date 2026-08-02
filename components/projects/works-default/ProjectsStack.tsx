"use client";

import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import TextScramble from "@/components/animations/TextScramble";
import {
  initStackCardsEffects,
  initVelocityMarqueeRows,
  type StackCardMedia,
} from "@/lib/template/stackCardsEffects";

const MARQUEE_WORDS = [
  "Projects/",
  "Cases/",
  "Works/",
  "Editorial/",
  "Experiments/",
] as const;

const WORK_TAGS = [
  "Design",
  "Illustrations",
  "Packaging",
  "marketing",
] as const;

type VideoSources = { type: string; src: string }[];

type WorksDefaultProjectCard =
  | {
      key: string;
      title: string;
      coverClassName?: string;
      media: "video";
      poster: string;
      sources: VideoSources;
    }
  | {
      key: string;
      title: string;
      coverClassName?: string;
      media: "image";
      imageSrc: string;
      imageWidth: number;
      imageHeight: number;
    };

const WORKS_DEFAULT_PROJECT_CARDS: WorksDefaultProjectCard[] = [
  {
    key: "nft-branding",
    title: "NFT project branding",
    media: "video",
    poster: "video/1280x720_video-05.webp",
    sources: [
      { type: "video/mp4", src: "video/1280x720_video-05.mp4" },
      { type: "video/webm", src: "video/1280x720_video-05.webm" },
    ],
  },
  {
    key: "interactive-app",
    title: "Interactive app concept",
    media: "image",
    imageSrc: "/img/works/showcase-stack/pr02.webp",
    imageWidth: 2200,
    imageHeight: 1240,
  },
  {
    key: "editorial",
    title: "Editorial illustrations set",
    media: "image",
    imageSrc: "/img/works/showcase-stack/pr01.webp",
    imageWidth: 1920,
    imageHeight: 1180,
  },
  {
    key: "studio-template",
    title: "Creative studio template",
    media: "image",
    imageSrc: "/img/works/showcase-stack/pr04.webp",
    imageWidth: 1920,
    imageHeight: 1180,
    coverClassName: "cover-darken",
  },
];

export default function ProjectsStack() {
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
      <div id="portfolio" className="mxd-section">
        <div className="mxd-container fullwidth-container">
          {/* Block - Progects Stack Start */}
          <div className="mxd-block">
            <div className="mxd-stack-cards">
              {WORKS_DEFAULT_PROJECT_CARDS.map((card, index) => (
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
                      <div className="marquee marquee-stack marquee--gsap muted-extra">
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
                          {WORK_TAGS.map((tag) => (
                            <TextScramble
                              key={`${card.key}-${tag}`}
                              className="tag tag-m tag-permanent mxd-scramble"
                            >
                              {tag}
                            </TextScramble>
                          ))}
                        </div>
                        <div className="card__btngroup">
                          <Link
                            className="btn btn-line btn-line-permanent"
                            href="/project-details"
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              Know More
                            </TextScramble>
                          </Link>
                        </div>
                      </div>
                      <Link
                        className="card__title active-cursor-permanent"
                        data-cursor-text="View Work"
                        href="/project-details"
                      >
                        <p
                          className="permanent"
                          ref={(el) => {
                            if (!el) return;
                            cardTitleRefs.current[index] = el;
                          }}
                        >
                          {card.title}
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
                      {card.media === "video" ? (
                        <AutoplayLoopVideo
                          className="video card__media"
                          poster={card.poster}
                          sources={card.sources}
                          ref={(el) => {
                            if (!el) return;
                            cardMediaRefs.current[index] = el;
                          }}
                        />
                      ) : (
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
                      )}
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
          {/* Block - Progects Stack End */}
        </div>
      </div>
    </>
  );
}
