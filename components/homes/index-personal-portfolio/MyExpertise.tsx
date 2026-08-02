"use client";

import { useRef } from "react";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import Image from "next/image";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
import usePerspectiveListAnimation from "@/hooks/usePerspectiveListAnimation";
import { personalPortfolioExpertiseCapabilities } from "@/data/services";

export default function MyExpertise() {
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const innerRefs = useRef<Array<HTMLDivElement | null>>([]);

  usePerspectiveListAnimation({ itemRefs, innerRefs });

  return (
    <>
      <BlurSection className="mxd-section padding-top-number padding-bottom-default">
        <div className="mxd-container grid-l-container">
          {/* Block - Section Title v05 Start */}
          <div className="mxd-block">
            <div className="mxd-section-title pre-grid">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-3 mxd-grid-item">
                    <div className="mxd-section-title__data top-number">
                      <CommonScrollAnimated
                        className="mxd-section-title__number anim-uni-in-up"
                        as="div"
                        animation="inUp"
                      >
                        <TextScramble className="title-number mxd-scramble">
                          E/03
                        </TextScramble>
                      </CommonScrollAnimated>
                    </div>
                  </div>
                  <div className="col-12 col-xl-1 mxd-grid-item" />
                  <div className="col-12 col-xl-8 mxd-grid-item">
                    <div className="mxd-section-title__title">
                      <Link
                        className="active-cursor-accent"
                        data-cursor-text="I do best"
                        href={`/services`}
                      >
                        <CommonAnimatedText
                          as="h2"
                          className="mxd-split-lines"
                          animation="splitLines"
                        >
                          My expertise
                        </CommonAnimatedText>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title v05 End */}
          {/* Block - Our Capabilities List Start */}
          <div className="mxd-block">
            <div className="mxd-cpb-list mxd-perspective-list">
              {personalPortfolioExpertiseCapabilities.map((item, index) => (
                <div
                  key={`${item.number}-${item.name}`}
                  className="mxd-cpb-list__item mxd-perspective-list__item"
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                >
                  <div className="mxd-cpb-list__divider top" />
                  <div
                    className="mxd-cpb-list__inner mxd-perspective-list__inner"
                    ref={(element) => {
                      innerRefs.current[index] = element;
                    }}
                  >
                    <div className="container-fluid p-0">
                      <div className="row g-0">
                        <div className="col-12 col-xl-4 mxd-grid-item mxd-cpb-list__title">
                          <div className="mxd-cpb-list__number">
                            <span className="meta-tag">{item.number}</span>
                          </div>
                          <p className="mxd-cpb-list__name">{item.name}</p>
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-cpb-list__image">
                          <Image
                            alt="Azurio Services Image"
                            src={item.imageSrc}
                            width={1200}
                            height={980}
                          />
                        </div>
                        <div className="col-12 col-md-6 col-xl-4 mxd-cpb-list__data">
                          <div className="mxd-cpb-list__descr mxd-grid-item">
                            <p className="t-large t-bold">
                              {item.descriptionLead}{" "}
                              <span>{item.descriptionHighlight}</span>
                            </p>
                          </div>
                          <div className="mxd-cpb-list__tags">
                            <div className="container-fluid p-0">
                              <div className="row g-0">
                                <div className="col-6 mxd-grid-item mxd-cpb-list__meta">
                                  {item.tagsLeft.map((tag) => (
                                    <TextScramble
                                      key={`${item.number}-left-${tag}`}
                                      className="meta-tag mxd-scramble"
                                    >
                                      {tag}
                                    </TextScramble>
                                  ))}
                                </div>
                                <div className="col-6 mxd-grid-item mxd-cpb-list__meta">
                                  {item.tagsRight.map((tag) => (
                                    <TextScramble
                                      key={`${item.number}-right-${tag}`}
                                      className="meta-tag mxd-scramble"
                                    >
                                      {tag}
                                    </TextScramble>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-cpb-list__divider bottom" />
                </div>
              ))}
            </div>
          </div>
          {/* Block - Our Capabilities List End */}
        </div>
      </BlurSection>
    </>
  );
}
