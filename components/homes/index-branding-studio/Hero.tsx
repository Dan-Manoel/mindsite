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

export default function Hero() {
  return (
    <CommonLoadAnimation>
      <>
        <PinnedSection className="mxd-section mxd-hero-section no-padding mxd-hero-fullheight-desktop loading-wrap">
          <PinnedSection.Inner>
            <div className="mxd-hero-01">
              <div className="mxd-hero-01__cover" />
              <div className="mxd-hero-01__wrap">
                {/* top group */}
                <div className="mxd-hero-01__top">
                  <div className="mxd-hero-01__data-wrap">
                    <div className="mxd-hero-01__data-tags">
                      <div className="tags-column">
                        <ul>
                          <CommonLoadItem index={0}>
                            <li className="loading-item">
                              <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                Inovação
                              </TextScramble>
                            </li>
                          </CommonLoadItem>
                          <CommonLoadItem index={1}>
                            <li className="loading-item">
                              <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                Excelência
                              </TextScramble>
                            </li>
                          </CommonLoadItem>
                          <CommonLoadItem index={2}>
                            <li className="loading-item">
                              <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                Experiência
                              </TextScramble>
                            </li>
                          </CommonLoadItem>
                          <CommonLoadItem index={3}>
                            <li className="loading-item">
                              <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                Competência
                              </TextScramble>
                            </li>
                          </CommonLoadItem>
                          <CommonLoadItem index={4}>
                            <li className="loading-item">
                              <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                Paixão
                              </TextScramble>
                            </li>
                          </CommonLoadItem>
                        </ul>
                      </div>
                      <div className="tags-column">
                        <ul>
                          <CommonLoadItem index={5}>
                            <li className="loading-item">
                              <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                UI/UX
                              </TextScramble>
                            </li>
                          </CommonLoadItem>
                          <CommonLoadItem index={6}>
                            <li className="loading-item">
                              <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                Design de App
                              </TextScramble>
                            </li>
                          </CommonLoadItem>
                          <CommonLoadItem index={7}>
                            <li className="loading-item">
                              <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                Desenvolvimento
                              </TextScramble>
                            </li>
                          </CommonLoadItem>
                          <CommonLoadItem index={8}>
                            <li className="loading-item">
                              <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                Branding
                              </TextScramble>
                            </li>
                          </CommonLoadItem>
                          <CommonLoadItem index={9}>
                            <li className="loading-item">
                              <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                Animação
                              </TextScramble>
                            </li>
                          </CommonLoadItem>
                        </ul>
                      </div>
                    </div>
                    <div className="mxd-hero-01__data-contact">
                      <ul>
                        <CommonLoadItem index={10}>
                          <li className="loading-item">
                            <a
                              href="tel:+12127089400"
                              className="tag tag-s-mobile"
                            >
                              <TextScramble className="mxd-scramble">
                                +55 11 947675814
                              </TextScramble>
                            </a>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={11}>
                          <li className="loading-item">
                            <a
                              href="https://www.instagram.com/"
                              target="_blank"
                              className="tag tag-s-mobile"
                            >
                              <TextScramble className="mxd-scramble">
                                @MINDSITEagency
                              </TextScramble>
                            </a>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={12}>
                          <li className="loading-item">
                            <a
                              href="mailto:ola@mindsite.com.br?subject=Message%20from%20your%20site"
                              className="tag tag-s-mobile"
                            >
                              <TextScramble className="mxd-scramble">
                                ola@mindsite.com.br
                              </TextScramble>
                            </a>
                          </li>
                        </CommonLoadItem>
                      </ul>
                    </div>
                  </div>
                  <CommonLoadFade index={0}>
                    <div className="mxd-hero-01__video-wrap loading-fade">
                      {/* <Image   alt="Hero Placeholder"    src="/img/hero/1000x750_h02.webp" width="1000" height="750" /> */}
                      <AutoplayLoopVideo
                        className="mxd-hero-01__video"
                        poster="video/360x225_hero-01.webp"
                        sources={[
                          {
                            type: "video/mp4",
                            src: "video/360x225_hero-01.mp4",
                          },
                          {
                            type: "video/webm",
                            src: "video/360x225_hero-01.webm",
                          },
                        ]}
                      />
                      <div className="mxd-hero-01__video-btn">
                        <Link
                          className="btn btn-default-icon-small btn-default-permanent slide-right"
                          href={`/project-details`}
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            Novo Case
                          </TextScramble>
                          {/* <i class="btn-icon ph-bold ph-arrow-right"></i> */}
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
                    </div>
                  </CommonLoadFade>
                </div>
                {/* bottom group */}
                <div className="mxd-hero-01__bottom">
                  <div className="mxd-hero-01__caption">
                    <div className="fullwidth-text">
                      <div className="fullwidth-text__wrap">
                        <Link
                          className="fullwidth-text__content permanent active-cursor-accent"
                          data-cursor-text="Vamos Conversar"
                          href={`/contact`}
                        >
                          <CommonAnimatedText
                            as="span"
                            className="loading-chars"
                            animation="animCharsLoad"
                          >
                            MINDSITE
                          </CommonAnimatedText>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PinnedSection.Inner>
          <PinnedSection.Trigger />
        </PinnedSection>
      </>
    </CommonLoadAnimation>
  );
}
