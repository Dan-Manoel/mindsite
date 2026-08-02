"use client";

import Link from "next/link";

import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";
import CommonHeroVideoScale, {
  CommonHeroVideoScaleTarget,
  CommonHeroVideoScaleWrapper,
} from "@/components/animations/CommonHeroVideoScale";

export default function Hero() {
  return (
    <CommonLoadAnimation>
      <CommonHeroVideoScale>
        <div className="mxd-section mxd-hero-section no-padding loading-wrap">
          {/* fullscreen hero */}
          <div className="mxd-hero-03">
            <div className="mxd-hero-03__headline">
              <Link
                className="active-cursor-accent"
                data-cursor-text="Let's Chat"
                href={`/contact`}
              >
                <CommonAnimatedText
                  as="h1"
                  className="permanent loading-split"
                  animation="splitLinesLoad"
                >
                  Innovative software development company
                </CommonAnimatedText>
              </Link>
              <div className="mxd-hero-media__small">
                <CommonHeroVideoScaleWrapper index={0}>
                  <div className="mxd-hero-media__wrapper">
                    <CommonHeroVideoScaleTarget>
                      <div className="mxd-hero-media__scaling-media">
                        <AutoplayLoopVideo
                          className="scaling-media__video"
                          poster="video/1280x720_hero-03.webp"
                          sources={[
                            {
                              src: "video/1280x720_hero-03.mp4",
                              type: "video/mp4",
                            },
                            {
                              src: "video/1280x720_hero-03.webm",
                              type: "video/webm",
                            },
                          ]}
                        />
                      </div>
                    </CommonHeroVideoScaleTarget>
                  </div>
                </CommonHeroVideoScaleWrapper>
              </div>
            </div>
            {/* control left */}
            <CommonLoadItem index={0}>
              <div className="mxd-hero-03__control-left loading-item">
                <Link
                  className="btn btn-line btn-line-small btn-line-medium"
                  href={`/about-us`}
                >
                  <TextScramble className="btn-caption mxd-scramble">
                    Studio
                  </TextScramble>
                </Link>
              </div>
            </CommonLoadItem>
            {/* control right */}
            <CommonLoadItem index={1}>
              <div className="mxd-hero-03__control-right loading-item">
                <Link
                  className="btn btn-line btn-line-small btn-line-medium"
                  href={`/works-default`}
                >
                  <TextScramble className="btn-caption mxd-scramble">
                    Works
                  </TextScramble>
                </Link>
              </div>
            </CommonLoadItem>
            {/* bottom group */}
            <div className="mxd-hero-03__bottom">
              <CommonLoadFade index={0}>
                <div className="mxd-hero-03__dataline loading-fade">
                  <div className="mxd-hero-03__socials mxd-grid-item">
                    <ul className="mxd-socials-line">
                      <li>
                        <a
                          className="mxd-socials-line__link"
                          href="https://dribbble.com/"
                          target="_blank"
                        >
                          <TextScramble className="mxd-scramble">
                            Dribbble
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          className="mxd-socials-line__link"
                          href="https://www.behance.net/"
                          target="_blank"
                        >
                          <TextScramble className="mxd-scramble">
                            Behance
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          className="mxd-socials-line__link"
                          href="https://github.com/"
                          target="_blank"
                        >
                          <TextScramble className="mxd-scramble">
                            Github
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          className="mxd-socials-line__link"
                          href="https://codepen.io/"
                          target="_blank"
                        >
                          <TextScramble className="mxd-scramble">
                            Codepen
                          </TextScramble>
                        </a>
                      </li>
                      <li>
                        <a
                          className="mxd-socials-line__link"
                          href="https://www.figma.com/community"
                          target="_blank"
                        >
                          <TextScramble className="mxd-scramble">
                            Figma Community
                          </TextScramble>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="mxd-hero-03__controls mxd-grid-item">
                    <SmoothAnchorLink
                      className="btn btn-line-icon btn-line-default slide-down"
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
                </div>
              </CommonLoadFade>
            </div>
          </div>
          {/* media large container */}
          <div className="mxd-hero-media">
            <div className="mxd-hero-media__contain">
              <div className="mxd-hero-media__large">
                <CommonHeroVideoScaleWrapper index={1}>
                  <div className="mxd-hero-media__wrapper" />
                </CommonHeroVideoScaleWrapper>
                <div className="mxd-hero-media__placeholder" />
              </div>
            </div>
          </div>
        </div>
      </CommonHeroVideoScale>
    </CommonLoadAnimation>
  );
}
