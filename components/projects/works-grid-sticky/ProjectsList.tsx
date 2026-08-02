"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import TextScramble from "@/components/animations/TextScramble";
export default function ProjectsList() {
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-title padding-bottom-default"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v03 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title pre-caption">
                        <CommonAnimatedText
                          as="h2"
                          className="mxd-split-lines"
                          animation="splitLines"
                        >
                          Projects
                          <br />
                          archive
                        </CommonAnimatedText>
                      </div>
                    </div>
                    <div className="col-12 col-xl-3 mxd-grid-item">
                      <div className="mxd-section-title__data top-caption">
                        <div className="mxd-section-title__caption">
                          <CommonAnimatedText
                            as="p"
                            className="t-bold t-large mxd-split-lines"
                            animation="splitLines"
                          >
                            We helped 20+ brands, agencies and creatives to
                            <span>elevate their online presence.</span>
                          </CommonAnimatedText>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v03 End */}
            {/* Block - Projects List Start */}
            <div className="mxd-block">
              {/* projects list */}
              <div className="mxd-projects-list no-margin-bottom">
                <Link
                  className="mxd-projects-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/works/showcase-archive/500x500_pr01.webp"
                  data-cursor-text="View Work"
                  href={`/project-details`}
                >
                  <div className="mxd-projects-list__divider top" />
                  <div className="container-fluid px-0 mxd-projects-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__niche">
                          <TextScramble className="meta-niche mxd-scramble">
                            Tech
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-projects-list__title">
                          <h3>
                            Creative{" "}
                            <span>
                              studio
                              <br />
                              template
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__meta">
                          <TextScramble className="meta-tag mxd-scramble">
                            Brand
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Marketing
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Website
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__date">
                          <TextScramble className="meta-date mxd-scramble">
                            January
                          </TextScramble>
                          <TextScramble className="meta-date mxd-scramble">
                            2026
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-projects-list__divider bottom" />
                </Link>
                <Link
                  className="mxd-projects-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/works/showcase-archive/500x500_pr02.webp"
                  data-cursor-text="View Work"
                  href={`/project-details`}
                >
                  <div className="mxd-projects-list__divider top" />
                  <div className="container-fluid px-0 mxd-projects-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__niche">
                          <TextScramble className="meta-niche mxd-scramble">
                            Fashion
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-projects-list__title">
                          <h3>
                            Editorial
                            <br />
                            <span>illustrations set</span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__meta">
                          <TextScramble className="meta-tag mxd-scramble">
                            Midjourney
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Illustrations
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Design
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__date">
                          <TextScramble className="meta-date mxd-scramble">
                            November
                          </TextScramble>
                          <TextScramble className="meta-date mxd-scramble">
                            2025
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-projects-list__divider bottom" />
                </Link>
                <Link
                  className="mxd-projects-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/works/showcase-archive/500x500_pr03.webp"
                  data-cursor-text="View Work"
                  href={`/project-details`}
                >
                  <div className="mxd-projects-list__divider top" />
                  <div className="container-fluid px-0 mxd-projects-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__niche">
                          <TextScramble className="meta-niche mxd-scramble">
                            Pets
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-projects-list__title">
                          <h3>
                            Interactive{" "}
                            <span>
                              media
                              <br />
                              concept
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__meta">
                          <TextScramble className="meta-tag mxd-scramble">
                            Brand
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Social Media
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Packaging
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__date">
                          <TextScramble className="meta-date mxd-scramble">
                            October
                          </TextScramble>
                          <TextScramble className="meta-date mxd-scramble">
                            2025
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-projects-list__divider bottom" />
                </Link>
                <Link
                  className="mxd-projects-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/works/showcase-archive/500x500_pr04.webp"
                  data-cursor-text="View Work"
                  href={`/project-details`}
                >
                  <div className="mxd-projects-list__divider top" />
                  <div className="container-fluid px-0 mxd-projects-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__niche">
                          <TextScramble className="meta-niche mxd-scramble">
                            Mobile
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-projects-list__title">
                          <h3>
                            Mobile{" "}
                            <span>
                              app
                              <br />
                              design
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__meta">
                          <TextScramble className="meta-tag mxd-scramble">
                            UI/UX
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Design
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Android
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__date">
                          <TextScramble className="meta-date mxd-scramble">
                            September
                          </TextScramble>
                          <TextScramble className="meta-date mxd-scramble">
                            2025
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-projects-list__divider bottom" />
                </Link>
                <Link
                  className="mxd-projects-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/works/showcase-archive/500x500_pr05.webp"
                  data-cursor-text="View Work"
                  href={`/project-details`}
                >
                  <div className="mxd-projects-list__divider top" />
                  <div className="container-fluid px-0 mxd-projects-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__niche">
                          <TextScramble className="meta-niche mxd-scramble">
                            Pets
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-projects-list__title">
                          <h3>
                            Illustrations{" "}
                            <span>
                              set
                              <br />
                              for print
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__meta">
                          <TextScramble className="meta-tag mxd-scramble">
                            Illustration
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Design
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Packaging
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__date">
                          <TextScramble className="meta-date mxd-scramble">
                            August
                          </TextScramble>
                          <TextScramble className="meta-date mxd-scramble">
                            2025
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-projects-list__divider bottom" />
                </Link>
              </div>
            </div>
            {/* Block - Projects List End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
