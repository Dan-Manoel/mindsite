"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import MxdStatsLineItem from "@/components/animations/MxdStatsLineItem";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function StatisticsLines() {
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-number padding-bottom-tag-m"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            <div className="mxd-block">
              <div className="mxd-section-title">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-xl-3 col-xxl-4 mxd-grid-item">
                      <div className="mxd-section-title__data top-number">
                        <CommonScrollAnimated
                          className="mxd-section-title__number pre-manifest anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <TextScramble className="title-number mxd-scramble">
                            A/02
                          </TextScramble>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-1 mxd-grid-item" />
                    <div className="col-12 col-xl-8 col-xxl-7 mxd-grid-item">
                      {/* Manifest Start */}
                      <div className="mxd-section-title__manifest title-manifest-s no-padding-mobile">
                        <Link data-cursor-text="About me" href={`/about-me`}>
                          <CommonAnimatedText
                            as="span"
                            className="manifest manifest-s mxd-split-lines active-cursor-accent"
                            animation="splitLines"
                          >
                            Web design is evolving rapidly, and I strive to stay
                            ahead.
                            <span>
                              Emerging tools and technologies enable me to
                              create visually stunning and seamlessly functional
                              websites.
                            </span>
                          </CommonAnimatedText>
                        </Link>
                      </div>
                      {/* Manifest End */}
                      {/* Statistics Lines Start */}
                      <div className="mxd-stats-lines manifest-title">
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-1">40+</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Happy clients who trust my work</p>
                          </div>
                        </MxdStatsLineItem>
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-2">86%</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Clients come back for a new projects</p>
                          </div>
                        </MxdStatsLineItem>
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-3">3+</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Years of professional experience</p>
                          </div>
                        </MxdStatsLineItem>
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-4">50+</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Successfully completed projects</p>
                          </div>
                        </MxdStatsLineItem>
                      </div>
                      {/* Statistics Lines End */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
