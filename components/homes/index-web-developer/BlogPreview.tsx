"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
export default function BlogPreview() {
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-subtitle-mobile padding-bottom-default"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v01 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 d-flex flex-column-reverse flex-xl-row">
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title">
                        <CommonAnimatedText
                          as="h2"
                          className="reveal-type"
                          animation="revealType"
                        >
                          My featured
                          <br />
                          insights
                        </CommonAnimatedText>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 mxd-grid-item">
                      <div className="mxd-section-title__data top-controls">
                        <CommonScrollAnimated
                          className="mxd-section-title__controls pre-title justify-end anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <Link
                            className="btn btn-line btn-line-default"
                            href={`/blog-standard`}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              My Blog
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v01 End */}
            {/* Block - Blog Preview Grid x3 Start */}
            <div className="mxd-block">
              <div className="mxd-blog-list">
                <Link
                  className="mxd-blog-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/blog/preview/500x500_pr01.webp"
                  data-cursor-text="Read Post"
                  href={`/blog-article`}
                >
                  <div className="mxd-blog-list__divider top" />
                  <div className="container-fluid px-0 mxd-blog-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 mxd-grid-padding">
                        <div className="mxd-blog-list__meta">
                          <span className="meta-tag comma-tag">Press</span>
                          <span className="meta-tag comma-tag">Insights</span>
                          <span className="meta-time">5 mins</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-7 mxd-grid-padding">
                        <div className="mxd-blog-list__title">
                          <p>Frontend innovations and user journeys</p>
                          <div className="mxd-blog-list__data">
                            <span className="meta-author comma-tag">
                              Alex Walker
                            </span>
                            <span className="meta-date">02 February, 2026</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-blog-list__excerpt">
                          <p className="t-medium">
                            Discover how artificial intelligence is transforming
                            artistic processes, pushing boundaries, and
                            inspiring new possibilities in digital design.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-blog-list__divider bottom" />
                </Link>
                <Link
                  className="mxd-blog-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/blog/preview/500x500_pr02.webp"
                  data-cursor-text="Read Post"
                  href={`/blog-article`}
                >
                  <div className="mxd-blog-list__divider top" />
                  <div className="container-fluid px-0 mxd-blog-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 mxd-grid-padding">
                        <div className="mxd-blog-list__meta">
                          <span className="meta-tag comma-tag">News</span>
                          <span className="meta-tag comma-tag">Insights</span>
                          <span className="meta-time">3 mins</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-7 mxd-grid-padding">
                        <div className="mxd-blog-list__title">
                          <p>
                            Elevating digital workshops with engaging design
                          </p>
                          <div className="mxd-blog-list__data">
                            <span className="meta-author comma-tag">
                              Alex Walker
                            </span>
                            <span className="meta-date">28 January, 2026</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-blog-list__excerpt">
                          <p className="t-medium">
                            Discover how artificial intelligence is transforming
                            artistic processes, pushing boundaries, and
                            inspiring new possibilities in digital design.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-blog-list__divider bottom" />
                </Link>
              </div>
            </div>
            {/* Block - Blog Preview Grid x3 End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
