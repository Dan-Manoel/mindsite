"use client";
import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";

import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";
export default function InnerHeadline() {
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section">
          <div className="mxd-container grid-l-container">
            {/* Block - Inner Headline v07 Start */}
            <div className="mxd-block loading-wrap">
              <div className="inner-headline margin-bottom-details">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
                      {/* breadcrumbs */}
                      <CommonLoadFade index={0}>
                        <div className="inner-headline__breadcrumbs loading-fade">
                          <div className="breadcrumbs__nav">
                            <span>
                              <Link href={`/works-default`}>
                                <TextScramble className="mxd-scramble">
                                  Works
                                </TextScramble>
                              </Link>
                            </span>
                            <span className="current-item">Azurio </span>
                          </div>
                        </div>
                      </CommonLoadFade>
                    </div>
                    <div className="col-12">
                      {/* content */}
                      <div className="inner-headline__content has-large-title">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 col-xl-9 mxd-grid-item">
                              <div className="inner-headline__title no-sup pre-subtitle-large">
                                <CommonAnimatedText
                                  as="h1"
                                  className="large loading-split"
                                  animation="splitLinesLoad"
                                >
                                  Azurio
                                </CommonAnimatedText>
                              </div>
                              <div className="inner-headline__subtitle">
                                <CommonAnimatedText
                                  as="p"
                                  className="loading-split"
                                  animation="splitLinesLoad"
                                >
                                  Digital agency &amp; personal portfolio
                                  <span>React Nextjs Template</span>
                                </CommonAnimatedText>
                              </div>
                              <div className="inner-headline__columns">
                                <div className="tags-column">
                                  <CommonLoadItem index={0}>
                                    <TextScramble className="tag tag-m mxd-scramble loading-item">
                                      Website
                                    </TextScramble>
                                  </CommonLoadItem>
                                  <CommonLoadItem index={1}>
                                    <TextScramble className="tag tag-m mxd-scramble loading-item">
                                      UI/UX Design
                                    </TextScramble>
                                  </CommonLoadItem>
                                  <CommonLoadItem index={2}>
                                    <TextScramble className="tag tag-m mxd-scramble loading-item">
                                      Development
                                    </TextScramble>
                                  </CommonLoadItem>
                                  <CommonLoadItem index={3}>
                                    <TextScramble className="tag tag-m mxd-scramble loading-item">
                                      Promotions
                                    </TextScramble>
                                  </CommonLoadItem>
                                </div>
                                <div className="tags-column">
                                  <CommonLoadItem index={4}>
                                    <TextScramble className="tag tag-m mxd-scramble loading-item">
                                      Branding
                                    </TextScramble>
                                  </CommonLoadItem>
                                  <CommonLoadItem index={5}>
                                    <TextScramble className="tag tag-m mxd-scramble loading-item">
                                      art Direction
                                    </TextScramble>
                                  </CommonLoadItem>
                                  <CommonLoadItem index={6}>
                                    <TextScramble className="tag tag-m mxd-scramble loading-item">
                                      Marketing
                                    </TextScramble>
                                  </CommonLoadItem>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-xl-3 mxd-grid-item">
                              <CommonLoadFade index={1}>
                                <div className="inner-headline__tags align-end-desktop tags-large-subtitle loading-fade">
                                  <SmoothAnchorLink
                                    className="btn btn-line-icon btn-line-icon-small btn-line-default slide-down"
                                    targetId="overview"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Inner Headline v07 End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
