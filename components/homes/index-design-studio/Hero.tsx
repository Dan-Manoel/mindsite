"use client";

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
        <PinnedSection className="mxd-section mxd-hero-section no-padding mxd-hero-fullheight loading-wrap">
          <PinnedSection.Inner>
            <div className="mxd-hero-06">
              <div className="mxd-hero-06__media">
                <AutoplayLoopVideo
                  id="mxd-hero-06__video"
                  className="mxd-hero-06__video"
                  poster="video/1280x720_hero-06.webp"
                  sources={[
                    { type: "video/mp4", src: "video/1280x720_hero-06.mp4" },
                    { type: "video/webm", src: "video/1280x720_hero-06.webm" },
                  ]}
                  data-poster-landscape="video/1280x720_hero-06.webp"
                  data-poster-portrait="video/720x1280_hero-06.webp"
                  data-landscape-mp4="video/1280x720_hero-06.mp4"
                  data-landscape-webm="video/1280x720_hero-06.webm"
                  data-portrait-mp4="video/720x1280_hero-06.mp4"
                  data-portrait-webm="video/720x1280_hero-06.webm"
                />
              </div>
              <div className="mxd-hero-06__wrap">
                {/* top group */}
                <div className="mxd-hero-06__top">
                  <div className="mxd-hero-06__tags">
                    <div className="tags-column">
                      <ul>
                        <CommonLoadItem index={0}>
                          <li className="loading-item">
                            <TextScramble className="tag tag-s-mobile tag-permanent-medium mxd-scramble">
                              Innovations
                            </TextScramble>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={1}>
                          <li className="loading-item">
                            <TextScramble className="tag tag-s-mobile tag-permanent-medium mxd-scramble">
                              Excellence
                            </TextScramble>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={2}>
                          <li className="loading-item">
                            <TextScramble className="tag tag-s-mobile tag-permanent-medium mxd-scramble">
                              Experience
                            </TextScramble>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={3}>
                          <li className="loading-item">
                            <TextScramble className="tag tag-s-mobile tag-permanent-medium mxd-scramble">
                              Competence
                            </TextScramble>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={4}>
                          <li className="loading-item">
                            <TextScramble className="tag tag-s-mobile tag-permanent-medium mxd-scramble">
                              Passion
                            </TextScramble>
                          </li>
                        </CommonLoadItem>
                      </ul>
                    </div>
                    <div className="tags-column">
                      <ul>
                        <CommonLoadItem index={5}>
                          <li className="loading-item">
                            <TextScramble className="tag tag-s-mobile tag-permanent-medium mxd-scramble">
                              IU/UX
                            </TextScramble>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={6}>
                          <li className="loading-item">
                            <TextScramble className="tag tag-s-mobile tag-permanent-medium mxd-scramble">
                              App design
                            </TextScramble>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={7}>
                          <li className="loading-item">
                            <TextScramble className="tag tag-s-mobile tag-permanent-medium mxd-scramble">
                              Development
                            </TextScramble>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={8}>
                          <li className="loading-item">
                            <TextScramble className="tag tag-s-mobile tag-permanent-medium mxd-scramble">
                              Branding
                            </TextScramble>
                          </li>
                        </CommonLoadItem>
                        <CommonLoadItem index={9}>
                          <li className="loading-item">
                            <TextScramble className="tag tag-s-mobile tag-permanent-medium mxd-scramble">
                              Motion
                            </TextScramble>
                          </li>
                        </CommonLoadItem>
                      </ul>
                    </div>
                  </div>
                  <div className="mxd-hero-06__headline">
                    <CommonAnimatedText
                      as="h1"
                      className="medium permanent loading-split"
                      animation="splitLinesLoad"
                    >
                      The power
                      <br />
                      of imagination
                    </CommonAnimatedText>
                  </div>
                </div>
                {/* bottom group */}
                <div className="mxd-hero-06__bottom">
                  <div className="mxd-hero-06__caption">
                    <CommonAnimatedText
                      as="p"
                      className="t-bold t-permanent loading-split"
                      animation="splitLinesLoad"
                    >
                      We are a creative design studio specializing in
                      <span>
                        innovative design and cutting-edge development
                      </span>
                    </CommonAnimatedText>
                  </div>
                  <CommonLoadFade index={0}>
                    <div className="mxd-hero-06__controls loading-fade">
                      <SmoothAnchorLink
                        className="btn btn-line-icon btn-line-permanent slide-down"
                        targetId="works"
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
          </PinnedSection.Inner>
          <PinnedSection.Trigger />
        </PinnedSection>
      </>
    </CommonLoadAnimation>
  );
}
