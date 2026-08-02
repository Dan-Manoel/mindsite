"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "next/link";
import Image from "next/image";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function AboutTeaser() {
  return (
    <>
      <PinnedSection blurSection className="mxd-section padding-bottom-tag-m">
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - About Teaser Start */}
            <div className="mxd-block">
              <div className="mxd-teaser">
                <div className="mxd-teaser__wrap">
                  <div className="mxd-teaser__content">
                    <CommonScrollAnimated
                      className="mxd-teaser__btngroup anim-uni-in-up"
                      as="div"
                      animation="inUp"
                    >
                      <Link
                        className="btn btn-line btn-line-default"
                        href={`/about-me`}
                      >
                        <TextScramble className="btn-caption mxd-scramble">
                          I make
                        </TextScramble>
                      </Link>
                    </CommonScrollAnimated>
                    <div className="mxd-teaser__captions">
                      {/* caption #1 */}
                      <CommonScrollAnimated
                        className="mxd-teaser__textblock slide-right-to-left"
                        as="p"
                        animation="slideRightToLeft"
                      >
                        <span className="mxd-teaser__text">Innovative</span>
                        <span className="mxd-teaser__icon">
                          <i>
                            <Image
                              alt="Azurio Icon"
                              src="/img/icons/fire.svg"
                              width={9}
                              height={9}
                            />
                          </i>
                        </span>
                        <span className="mxd-teaser__text">designs</span>
                      </CommonScrollAnimated>
                      {/* caption #2 */}
                      <CommonScrollAnimated
                        className="mxd-teaser__textblock slide-left-to-right"
                        as="p"
                        animation="slideLeftToRight"
                      >
                        <span className="mxd-teaser__text">Visuals</span>
                        <span className="mxd-teaser__text">sparking</span>
                        <span className="mxd-teaser__text">emotion</span>
                      </CommonScrollAnimated>
                      {/* caption #3 */}
                      <CommonScrollAnimated
                        className="mxd-teaser__textblock slide-right-to-left"
                        as="p"
                        animation="slideRightToLeft"
                      >
                        <span className="mxd-teaser__text">Creative</span>
                        <span className="mxd-teaser__icon">
                          <i>
                            <Image
                              alt="Azurio Icon"
                              src="/img/icons/lightning-bolt-2.svg"
                              width={9}
                              height={9}
                            />
                          </i>
                        </span>
                        <span className="mxd-teaser__text">experiences</span>
                      </CommonScrollAnimated>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - About Teaser End */}
            {/* Block - About Images Start */}
            <div className="mxd-block">
              <div className="mxd-about-images">
                <div className="mxd-about-images__wrap">
                  <div className="container-fluid p-0">
                    <div className="row g-0 d-flex justify-content-center">
                      {/* about images item */}
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-about-images__item margin-bottom-mobile justify-start">
                          <div className="mxd-about-images__inner">
                            <CommonScrollAnimated
                              className="mxd-about-images__img mxd-clip-image"
                              as="div"
                              animation="clipImage"
                            >
                              <Image
                                alt="Azurio Image"
                                src="/img/illustrations/about01.webp"
                                width={800}
                                height={534}
                              />
                            </CommonScrollAnimated>
                            <div className="mxd-about-images__descr">
                              <div className="mxd-about-images__date">
                                <TextScramble className="meta-date mxd-scramble">
                                  28 February, 2026
                                </TextScramble>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* about images item */}
                      <div className="col-12 col-xl-5 mxd-grid-item">
                        <div className="mxd-about-images__item margin-bottom-mobile">
                          <CommonScrollAnimated
                            className="mxd-about-images__img mxd-clip-image"
                            as="div"
                            animation="clipImage"
                          >
                            <Image
                              alt="Azurio Image"
                              src="/img/illustrations/about02.webp"
                              width={918}
                              height={1200}
                            />
                          </CommonScrollAnimated>
                          <div className="mxd-about-images__descr">
                            <div className="mxd-about-images__title">
                              <span className="meta-tag">
                                Working with my assistant
                              </span>
                            </div>
                            <div className="mxd-about-images__date">
                              <TextScramble className="meta-date mxd-scramble">
                                28 February, 2026
                              </TextScramble>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* about images item */}
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-about-images__item justify-end">
                          <div className="mxd-about-images__inner">
                            <CommonScrollAnimated
                              className="mxd-about-images__img mxd-clip-image"
                              as="div"
                              animation="clipImage"
                            >
                              <Image
                                alt="Azurio Image"
                                src="/img/illustrations/about03.webp"
                                width={800}
                                height={534}
                              />
                            </CommonScrollAnimated>
                            <div className="mxd-about-images__descr">
                              <div className="mxd-about-images__date">
                                <TextScramble className="meta-date mxd-scramble">
                                  28 February, 2026
                                </TextScramble>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - About Images End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
