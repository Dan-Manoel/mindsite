"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import Image from "next/image";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
} from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function BlogPreview() {
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-number padding-bottom-preview"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v05 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-subtitle-s controls-bottom-mobile">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-xl-4 mxd-grid-item">
                      <div className="mxd-section-title__data top-number">
                        <CommonScrollAnimated
                          className="mxd-section-title__number anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <TextScramble className="title-number mxd-scramble">
                            I/05
                          </TextScramble>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-6 mxd-grid-item">
                      <div className="mxd-section-title__title pre-controls-mobile">
                        <Link
                          className="active-cursor-accent"
                          data-cursor-text="More Posts"
                          href={`/blog-standard`}
                        >
                          <CommonAnimatedText
                            as="h2"
                            className="mxd-split-lines"
                            animation="splitLines"
                          >
                            Recent
                            <br />
                            insights
                          </CommonAnimatedText>
                        </Link>
                      </div>
                    </div>
                    <div className="col-12 col-xl-2 mxd-grid-item">
                      <div className="mxd-section-title__data top-controls">
                        <CommonScrollAnimated
                          className="mxd-section-title__controls justify-end anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <Link
                            className="btn btn-line btn-line-default"
                            href={`/blog-standard`}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              News Overview
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v05 End */}
            {/* Block - Blog Preview Grid x3 Start */}
            <div className="mxd-block">
              <div className="mxd-blog-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 mxd-blog-grid__gallery">
                    <CommonCardBatchAnimated
                      className="col-12 col-lg-4 mxd-blog-item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <div className="mxd-blog-item__date">
                        <span className="meta-date">02 February, 2026</span>
                      </div>
                      <Link
                        className="mxd-blog-item__media active-cursor-permanent"
                        data-cursor-text="Read Post"
                        href={`/blog-article`}
                      >
                        <Image
                          className=""
                          alt="Blog Preview Image"
                          src="/img/blog/preview/grid-x3/pr-01.webp"
                          width={1170}
                          height={800}
                        />
                      </Link>
                      <div className="mxd-blog-item__caption">
                        <div className="mxd-blog-item__title">
                          <Link className="blog-name-m" href={`/blog-article`}>
                            Frontend innovations and user journeys
                          </Link>
                        </div>
                        <div className="mxd-blog-item__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            UI/UX
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Development
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Insights
                          </TextScramble>
                        </div>
                      </div>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-lg-4 mxd-blog-item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <div className="mxd-blog-item__date">
                        <span className="meta-date">28 January, 2026</span>
                      </div>
                      <Link
                        className="mxd-blog-item__media active-cursor-permanent"
                        data-cursor-text="Read Post"
                        href={`/blog-article`}
                      >
                        <Image
                          className=""
                          alt="Blog Preview Image"
                          src="/img/blog/preview/grid-x3/pr-02.webp"
                          width={1200}
                          height={1200}
                        />
                      </Link>
                      <div className="mxd-blog-item__caption">
                        <div className="mxd-blog-item__title">
                          <Link className="blog-name-m" href={`/blog-article`}>
                            Branding in creating digital experiences
                          </Link>
                        </div>
                        <div className="mxd-blog-item__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Concept
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Editorial
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Event
                          </TextScramble>
                        </div>
                      </div>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-lg-4 mxd-blog-item has-margin-bottom animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <div className="mxd-blog-item__date">
                        <span className="meta-date">15 January, 2026</span>
                      </div>
                      <Link
                        className="mxd-blog-item__media active-cursor-permanent"
                        data-cursor-text="Read Post"
                        href={`/blog-article`}
                      >
                        <Image
                          className=""
                          alt="Blog Preview Image"
                          src="/img/blog/preview/grid-x3/pr-03.webp"
                          width={1423}
                          height={800}
                        />
                      </Link>
                      <div className="mxd-blog-item__caption">
                        <div className="mxd-blog-item__title">
                          <Link className="blog-name-m" href={`/blog-article`}>
                            Designing for the future of interactive digital
                            spaces
                          </Link>
                        </div>
                        <div className="mxd-blog-item__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Midjourney
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            News
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Editorial
                          </TextScramble>
                        </div>
                      </div>
                    </CommonCardBatchAnimated>
                  </div>
                </div>
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
