"use client";

import CommonAnimatedText from "@/components/animations/CommonAnimatedText";

import MxdStatsLineItem from "@/components/animations/MxdStatsLineItem";
import { softwareDevelopmentCompanyFacts } from "@/data/facts";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function StatisticsLines() {
  return (
    <>
      <div id="about" className="mxd-section padding-top-number padding-bottom-tag-m">
        <div className="mxd-container grid-l-container">
          <div className="mxd-block">
            <div className="mxd-section-title">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-4 mxd-grid-item">
                    <div className="mxd-section-title__data top-number">
                      <CommonScrollAnimated
                        className="mxd-section-title__number pre-manifest anim-uni-in-up"
                        as="div"
                        animation="inUp"
                      >
                        <TextScramble className="title-number mxd-scramble">
                          A/01
                        </TextScramble>
                      </CommonScrollAnimated>
                    </div>
                  </div>
                  <div className="col-12 col-xl-8 mxd-grid-item">
                    {/* Manifest Start */}
                    <div className="mxd-section-title__manifest title-manifest-s no-padding-mobile">
                      <Link data-cursor-text="About us" href={`/about-us`}>
                        <CommonAnimatedText
                          as="span"
                          className="manifest manifest-s mxd-split-lines active-cursor-accent"
                          animation="splitLines"
                        >
                          From pixel-perfect designs to flawless code,{" "}
                          <span>
                            every aspect of our projects is crafted with care to
                            ensure the highest standards of quality.
                          </span>
                        </CommonAnimatedText>
                      </Link>
                    </div>
                    {/* Manifest End */}
                    {/* Statistics Lines Start */}
                    <div className="mxd-stats-lines manifest-title">
                      {softwareDevelopmentCompanyFacts.map((fact) => (
                        <MxdStatsLineItem key={fact.id}>
                          <div className="mxd-stats-lines__number">
                            <p id={fact.id}>{fact.value}</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>{fact.caption}</p>
                          </div>
                        </MxdStatsLineItem>
                      ))}
                    </div>
                    {/* Statistics Lines End */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
