import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import Image from "next/image";
import { CommonCardBatchAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function FeaturesCards() {
  return (
    <>
      <BlurSection className="mxd-section padding-top-title">
        <div className="mxd-container grid-s-container">
          {/* Block - Section Title v03 Start */}
          <div className="mxd-block">
            <div className="mxd-section-title landing-features-title pre-grid">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-8 mxd-grid-item-s">
                    <div className="mxd-section-title__title pre-caption">
                      <Link
                        className="active-cursor-accent"
                        data-cursor-text="See more"
                        href={`/index-branding-studio`}
                      >
                        <CommonAnimatedText
                          as="h2"
                          className="mxd-split-lines"
                          animation="splitLines"
                        >
                          Top-notch features, build for you
                        </CommonAnimatedText>
                      </Link>
                    </div>
                  </div>
                  <div className="col-12 col-xl-4 mxd-grid-item-s">
                    <div className="mxd-section-title__data top-caption">
                      <div className="mxd-section-title__caption">
                        <CommonAnimatedText
                          as="p"
                          className="t-bold t-large mxd-split-lines"
                          animation="splitLines"
                        >
                          Azurio packed with smooth animations, modern design
                          tools and clean code.{" "}
                          <span>
                            It&apos;s a flexible, future-proof template
                            that&apos;s easy to customize and a joy to use.
                          </span>
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title v03 End */}
          {/* Block - Features Cards Start */}
          <div className="mxd-block">
            <div className="mxd-niche-cards landing-features-cards">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {/* card item - high */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-niche-cards__column mxd-grid-item-s animate-card-2"
                    as="div"
                    columns={2}
                  >
                    <div className="mxd-niche-cards__item">
                      <div className="mxd-niche-cards__inner">
                        <div className="mxd-niche-cards__title">
                          <div className="mxd-niche-cards__name">
                            <p>Day / night mode</p>
                          </div>
                          <div className="mxd-niche-cards__tags">
                            <TextScramble className="tag tag-m tag-medium mxd-scramble">
                              Theme Choice
                            </TextScramble>
                            <TextScramble className="tag tag-m tag-medium mxd-scramble">
                              Interactive
                            </TextScramble>
                            <TextScramble className="tag tag-m tag-medium mxd-scramble">
                              Experience
                            </TextScramble>
                          </div>
                        </div>
                        <div className="mxd-niche-cards__descr wide">
                          <p className="t-bold t-medium">
                            Switch effortlessly between light and dark modes
                            <span>for a user-friendly experience.</span>
                          </p>
                        </div>
                        <div className="mxd-niche-cards__image absolute-desktop-bottom">
                          <Image
                            alt="Azurio Template Sample Image"
                            src="/img/demo/01_fea-img.webp"
                            width={1200}
                            height={1292}
                          />
                        </div>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* card items - rows */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-8 mxd-niche-cards__column animate-card-2"
                    as="div"
                    columns={2}
                  >
                    <div className="container-fluid p-0">
                      <div className="row g-0">
                        <div className="col-12 mxd-grid-item-s">
                          <div className="mxd-niche-cards__item">
                            <div className="mxd-niche-cards__inner fixed-height-desktop space-between-desktop">
                              <div className="mxd-niche-cards__title">
                                <div className="mxd-niche-cards__name">
                                  <p>Dynamic &amp; stylish design</p>
                                </div>
                                <div className="mxd-niche-cards__tags">
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Design
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Layouts
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Visuals
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Components
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Showcase
                                  </TextScramble>
                                </div>
                              </div>
                              <div className="mxd-niche-cards__descr wide">
                                <p className="t-bold t-medium">
                                  Modern, eye-catching layouts crafted{" "}
                                  <span>
                                    to make your brand stand out and keep
                                    visitors engaged.
                                  </span>
                                </p>
                              </div>
                              <div className="mxd-niche-cards__image absolute-desktop-full">
                                <Image
                                  alt="Azurio Template Sample Image"
                                  src="/img/demo/02_fea-img.webp"
                                  width={1320}
                                  height={800}
                                />
                                <div className="mxd-niche-cards__gradient gradient-linear" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <CommonCardBatchAnimated
                          className="col-12 col-xl-6 mxd-grid-item-s animate-card-2"
                          as="div"
                          columns={2}
                        >
                          <div className="mxd-niche-cards__item">
                            <div className="mxd-niche-cards__inner permanent fixed-height-desktop space-between-desktop">
                              <div className="mxd-niche-cards__title">
                                <div className="mxd-niche-cards__name">
                                  <p className="permanent">Code excellence</p>
                                </div>
                                <div className="mxd-niche-cards__tags">
                                  <TextScramble className="tag tag-m tag-permanent mxd-scramble">
                                    Clean
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-permanent mxd-scramble">
                                    Reliable
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-permanent mxd-scramble">
                                    Validated
                                  </TextScramble>
                                </div>
                              </div>
                              <div className="mxd-niche-cards__descr wide">
                                <p className="t-bold t-medium t-permanent">
                                  Built with clean, well-structured code{" "}
                                  <span>
                                    that&apos;s fast, secure, and easy to
                                    maintain.
                                  </span>
                                </p>
                              </div>
                              <div className="mxd-niche-cards__image absolute-desktop-full">
                                <Image
                                  alt="Azurio Template Sample Image"
                                  src="/img/demo/03_fea-img.webp"
                                  width={1200}
                                  height={974}
                                />
                                <div className="mxd-niche-cards__gradient gradient-radial" />
                              </div>
                            </div>
                          </div>
                        </CommonCardBatchAnimated>
                        <CommonCardBatchAnimated
                          className="col-12 col-xl-6 mxd-grid-item-s animate-card-2"
                          as="div"
                          columns={2}
                        >
                          <div className="mxd-niche-cards__item">
                            <div className="mxd-niche-cards__inner fixed-height-desktop space-between-desktop">
                              <div className="mxd-niche-cards__title">
                                <div className="mxd-niche-cards__name">
                                  <p>GSAP-powered animations</p>
                                </div>
                                <div className="mxd-niche-cards__tags">
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Motion
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Smooth
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Interactive
                                  </TextScramble>
                                </div>
                              </div>
                              <div className="mxd-niche-cards__descr short">
                                <p className="t-bold t-medium">
                                  Adding unique movement,{" "}
                                  <span>
                                    scroll magic, and creative depth to your
                                    pages.
                                  </span>
                                </p>
                              </div>
                              <div className="mxd-niche-cards__image absolute-desktop-aside">
                                <Image
                                  alt="Azurio Template Sample Image"
                                  src="/img/demo/04_fea-img.webp"
                                  width={800}
                                  height={927}
                                />
                              </div>
                            </div>
                          </div>
                        </CommonCardBatchAnimated>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Features Cards End */}
        </div>
      </BlurSection>
    </>
  );
}
