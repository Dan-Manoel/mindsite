"use client";

import Link from "next/link";
import Image from "next/image";
import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import PinnedSection from "@/components/animations/PinnedSection";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";

export default function Hero() {
  return (
    <CommonLoadAnimation>
      <>
        <PinnedSection className="mxd-section mxd-hero-section no-padding mxd-hero-fullheight-desktop loading-wrap">
          <PinnedSection.Inner>
            <div className="mxd-hero-09">
              <div className="mxd-hero-09__background">
                <AutoplayLoopVideo
                  className="mxd-hero-09__video"
                  poster="video/1280x720_hero-09.webp"
                  sources={[
                    { type: "video/mp4", src: "video/1280x720_hero-09.mp4" },
                    { type: "video/webm", src: "video/1280x720_hero-09.webm" },
                  ]}
                />
              </div>
              <div className="mxd-hero-09__cover" />
              <div className="mxd-hero-09__wrap">
                {/* top group */}
                <div className="mxd-hero-09__top">
                  <div className="mxd-hero-09__headline mxd-grid-item">
                    <CommonAnimatedText
                      as="h1"
                      className="loading-chars"
                      animation="animCharsLoad"
                    >
                      Alex Walker
                    </CommonAnimatedText>
                  </div>
                  <div className="mxd-hero-09__divider" />
                </div>
                {/* center group */}
                <div className="mxd-hero-09__center">
                  <div className="mxd-hero-09__data mxd-grid-item">
                    <CommonLoadFade index={0}>
                      <div className="mxd-hero__mark permanent loading-fade">
                        <span className="mark-icon" />
                        <span className="mark-text">
                          Available for freelance
                        </span>
                      </div>
                    </CommonLoadFade>
                    <div className="mxd-hero-09__descr">
                      <CommonAnimatedText
                        as="p"
                        className="t-bold t-permanent loading-split"
                        animation="splitLinesLoad"
                      >
                        I am Alex Walker.
                        <span>
                          I am passionate about crafting designs that tell
                          stories, spark emotions, and make an impact.
                        </span>
                      </CommonAnimatedText>
                    </div>
                  </div>
                  <CommonLoadFade index={1}>
                    <div className="mxd-hero-09__media mxd-grid-item loading-fade">
                      <Image
                        className="mxd-hero-09__image"
                        alt="Hero Video Placeholder"
                        src="/img/hero/1280x800_h01.webp"
                        width={1280}
                        height={800}
                        priority
                      />

                      <div className="mxd-hero-09__media-btn">
                        <Link
                          className="btn btn-default-icon-small btn-default-permanent slide-right"
                          href={`/project-details`}
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            New Case
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
                <div className="mxd-hero-09__bottom">
                  <CommonLoadFade index={2}>
                    <div className="mxd-hero-09__controls mxd-grid-item loading-fade">
                      <SmoothAnchorLink
                        className="btn btn-line-icon btn-line-permanent slide-down"
                        targetId="about"
                      >
                        <TextScramble className="btn-caption mxd-scramble">
                          Scroll to explore
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
            <PinnedSection.Trigger />
          </PinnedSection.Inner>
        </PinnedSection>
      </>
    </CommonLoadAnimation>
  );
}
