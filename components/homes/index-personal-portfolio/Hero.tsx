"use client";

import Link from "next/link";
import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import PinnedSection from "@/components/animations/PinnedSection";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";

export default function Hero() {
  return (
    <CommonLoadAnimation>
      <>
        <PinnedSection className="mxd-section mxd-hero-section mxd-hero-fullheight-desktop loading-wrap">
          <PinnedSection.Inner>
            <div className="mxd-hero-10">
              <div className="mxd-hero-10__wrap">
                {/* top group */}
                <div className="mxd-hero-10__top w-full max-w-full overflow-hidden">
                  <div className="mxd-hero-10__headline mxd-grid-item w-full max-w-full overflow-hidden">
                    <div className="hero-10-headline__wrap w-full max-w-full overflow-hidden">
                      <h1 
                        className="!normal-case w-full overflow-hidden"
                        style={{ textTransform: "none" }}
                      >
                        <Link
                          className="hero-10-headline__content active-cursor-accent !normal-case"
                          data-cursor-text="Fale Comigo"
                          href={`/contact`}
                          style={{
                            textTransform: "none",
                            fontSize: "clamp(3rem, 12vw, 24rem)",
                            lineHeight: "0.95",
                            letterSpacing: "-0.03em",
                            whiteSpace: "nowrap",
                            display: "inline-block",
                            maxWidth: "100%",
                          }}
                        >
                          <CommonAnimatedText
                            as="span"
                            className="loading-chars !normal-case"
                            animation="animCharsLoad"
                            style={{ textTransform: "none" }}
                          >
                            Danilo Oliveira
                          </CommonAnimatedText>
                        </Link>
                      </h1>
                    </div>
                  </div>
                </div>

                {/* center group */}
                <div className="mxd-hero-10__center">
                  <div className="mxd-hero-10__divider" />
                  <div className="mxd-hero-10__data-wrap mxd-grid-item">
                    <CommonLoadFade index={0}>
                      <div className="mxd-hero__mark loading-fade">
                        <span className="mark-icon" />
                        <span className="mark-text">
                          Conheça o idealizador do projeto
                        </span>
                      </div>
                    </CommonLoadFade>
                    <div className="mxd-hero-10__descr">
                      <CommonAnimatedText
                        as="p"
                        className="t-bold loading-split"
                        animation="splitLinesLoad"
                      >
                        Sou Danilo Oliveira.
                        <span>
                          Sou apaixonado por criar designs que contam
                          histórias, despertam emoções e causam impacto.
                        </span>
                      </CommonAnimatedText>
                    </div>
                  </div>
                  <CommonLoadFade index={1}>
                    <div className="mxd-hero-10__media mxd-grid-item loading-fade">
                      <AutoplayLoopVideo
                        className="mxd-hero-10__video"
                        poster="video/400x225_hero-10.webp"
                        sources={[
                          {
                            type: "video/mp4",
                            src: "video/400x225_hero-10.mp4",
                          },
                          {
                            type: "video/webm",
                            src: "video/400x225_hero-10.webm",
                          },
                        ]}
                      />
                      <div className="mxd-hero-10__video-btn">
                        <Link
                          className="btn btn-default-icon-small btn-default-permanent slide-right"
                          href={`/project-details`}
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            Novo Projeto
                          </TextScramble>
                          <i className="btn-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                            >
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </i>
                        </Link>
                      </div>
                      <div className="mxd-hero-10__video-info">
                        <div className="hero-10-video__name">
                          <Link href={`/project-details`}>MINDSITE</Link>
                        </div>
                        <div className="hero-10-video__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Template
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            UI/UX
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Desenvolvimento
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </CommonLoadFade>
                  <div className="mxd-hero-10__divider divider-bottom" />
                </div>

                {/* bottom group */}
                <div className="mxd-hero-10__bottom">
                  <div className="mxd-hero-10__dataline">
                    <div className="mxd-hero-10__socials mxd-grid-item">
                      <ul className="mxd-socials-line column">
                        <CommonLoadItem index={0}>
                          <li className="loading-item">
                            <a
                              className="mxd-socials-line__link"
                              href="https://dribbble.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <TextScramble className="mxd-scramble">
                                Dribbble
                              </TextScramble>
                            </a>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={1}>
                          <li className="loading-item">
                            <a
                              className="mxd-socials-line__link"
                              href="https://www.behance.net/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <TextScramble className="mxd-scramble">
                                Behance
                              </TextScramble>
                            </a>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={2}>
                          <li className="loading-item">
                            <a
                              className="mxd-socials-line__link"
                              href="https://github.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <TextScramble className="mxd-scramble">
                                Github
                              </TextScramble>
                            </a>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={3}>
                          <li className="loading-item">
                            <a
                              className="mxd-socials-line__link"
                              href="https://codepen.io/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <TextScramble className="mxd-scramble">
                                Codepen
                              </TextScramble>
                            </a>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={4}>
                          <li className="loading-item">
                            <a
                              className="mxd-socials-line__link"
                              href="https://www.figma.com/community"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <TextScramble className="mxd-scramble">
                                Figma Community
                              </TextScramble>
                            </a>
                          </li>
                        </CommonLoadItem>
                      </ul>
                    </div>
                    <CommonLoadFade index={2}>
                      <div className="mxd-hero-10__controls mxd-grid-item loading-fade">
                        <SmoothAnchorLink
                          className="btn btn-line-icon btn-line-icon-small btn-line-default slide-down"
                          targetId="works"
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            Role para explorar
                          </TextScramble>
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                            >
                              <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z" />
                            </svg>
                          </i>
                        </SmoothAnchorLink>
                      </div>
                    </CommonLoadFade>
                  </div>
                </div>
              </div>
            </div>
            <PinnedSection.Trigger />
          </PinnedSection.Inner>
        </PinnedSection>
      </>
    </CommonLoadAnimation>
  );
}