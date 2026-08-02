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
        className="mxd-section padding-top-title padding-bottom-preview"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v04 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-subtitle-s">
                <div className="container-fluid p-0">
                  <div className="row g-0 d-flex flex-column-reverse flex-xl-row">
                    <div className="col-12 col-xl-4 mxd-grid-item">
                      <div className="mxd-section-title__data top-caption">
                        <div className="mxd-section-title__caption pre-controls">
                          <CommonAnimatedText
                            as="p"
                            className="t-bold t-large mxd-split-lines"
                            animation="splitLines"
                          >
                            Inspiring ideas, creative insights, and
                            <span>the latest in design and tech.</span>
                          </CommonAnimatedText>
                        </div>
                        <CommonScrollAnimated
                          className="mxd-section-title__controls anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <Link
                            className="btn btn-line btn-line-default"
                            href={`/blog-creative`}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              News Overview
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    {/* <div class="col-12 col-xl-1 mxd-grid-item"></div> */}
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title pre-caption">
                        <CommonAnimatedText
                          as="h2"
                          className="mxd-split-lines"
                          animation="splitLines"
                        >
                          My newest
                          <br />
                          insights
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v04 End */}
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
                      className="col-12 col-lg-4 mxd-blog-item animate-card-3"
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
