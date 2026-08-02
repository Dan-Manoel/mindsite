"use client";
import Link from "next/link";
import Image from "next/image";
import CommonLandingStack, {
  CommonLandingStackCard,
  CommonLandingStackImage,
  CommonLandingStackWrapper,
} from "@/components/animations/CommonLandingStack";
import TextScramble from "@/components/animations/TextScramble";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
export default function ContentPagesStack() {
  return (
    <>
      <div className="mxd-section">
        <div className="mxd-container fullwidth-container">
          {/* Block - Content Pages Stack Start */}
          <div className="mxd-block">
            <CommonLandingStack className="mxd-demo-stack">
              {/* single card */}
              <CommonLandingStackCard index={0}>
                <div className="mxd-demo-stack__card">
                  <CommonLandingStackWrapper index={0}>
                    <div className="demo-card__wrapper">
                      <div className="container-fluid p-0 fullheight">
                        <div className="row d-flex flex-column flex-xl-row g-0 fullheight">
                          {/* content */}
                          <div className="col-12 col-xl-5 z-1 fullheight-desktop">
                            <div className="mxd-container grid-l-container fullheight-desktop">
                              <div className="demo-card__content mxd-grid-item fullheight-desktop">
                                <div className="demo-card__info">
                                  <CommonScrollAnimated
                                    className="demo-card__subtitle anim-uni-in-up"
                                    as="div"
                                    animation="inUp"
                                  >
                                    <TextScramble className="mxd-scramble">
                                      01 / Content pages
                                    </TextScramble>
                                  </CommonScrollAnimated>
                                  <div className="demo-card__title">
                                    <Link
                                      className="active-cursor-accent"
                                      data-cursor-text="See More"
                                      href={`/blog-creative`}
                                      target="_blank"
                                    >
                                      <p>Blog pages</p>
                                    </Link>
                                  </div>
                                  <div className="demo-card__tags">
                                    <div className="tags-column">
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        Creative
                                      </TextScramble>
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        Full screen
                                      </TextScramble>
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        Posts preview
                                      </TextScramble>
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        Cursor images
                                      </TextScramble>
                                    </div>
                                    <div className="tags-column">
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        Ads
                                      </TextScramble>
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        Archive
                                      </TextScramble>
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        Grid
                                      </TextScramble>
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        Posts list
                                      </TextScramble>
                                    </div>
                                  </div>
                                </div>
                                <p className="t-extra t-bold t-120 demo-card__descr">
                                  A blog that looks good, reads better,{" "}
                                  <span>
                                    and brings your stories to life beautifully.
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          {/* image */}
                          <div className="col-12 col-xl-7 z-0 flex-grow-1 fullheight-desktop">
                            <CommonLandingStackImage index={0}>
                              <div className="demo-card__image fullheight">
                                <Image
                                  className="img-01"
                                  alt="Azurio Template Sample Image"
                                  src="/img/demo/01_pages-img.webp"
                                  width={1400}
                                  height={1236}
                                />
                              </div>
                            </CommonLandingStackImage>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CommonLandingStackWrapper>
                </div>
              </CommonLandingStackCard>
              {/* single card */}
              <CommonLandingStackCard index={1}>
                <div className="mxd-demo-stack__card">
                  <CommonLandingStackWrapper index={1}>
                    <div className="demo-card__wrapper">
                      <div className="container-fluid p-0 fullheight">
                        <div className="row g-0 g-0 d-flex flex-column-reverse flex-xl-row fullheight">
                          {/* image */}
                          <div className="col-12 col-xl-7 flex-grow-1 fullheight-desktop">
                            <CommonLandingStackImage index={1}>
                              <div className="demo-card__image fullheight">
                                <Image
                                  className="img-02"
                                  alt="Azurio Template Sample Image"
                                  src="/img/demo/02_pages-img.webp"
                                  width={1400}
                                  height={1183}
                                />
                              </div>
                            </CommonLandingStackImage>
                          </div>
                          {/* content */}
                          <div className="col-12 col-xl-5 fullheight-desktop">
                            <div className="mxd-container grid-l-container fullheight-desktop">
                              <div className="demo-card__content mxd-grid-item fullheight-desktop">
                                <div className="demo-card__info">
                                  <CommonScrollAnimated
                                    className="demo-card__subtitle anim-uni-in-up"
                                    as="div"
                                    animation="inUp"
                                  >
                                    <TextScramble className="mxd-scramble">
                                      02 / Content pages
                                    </TextScramble>
                                  </CommonScrollAnimated>
                                  <div className="demo-card__title">
                                    <Link
                                      className="active-cursor-accent"
                                      data-cursor-text="See More"
                                      href={`/works-default`}
                                      target="_blank"
                                    >
                                      <p>Portfolio</p>
                                    </Link>
                                  </div>
                                  <div className="demo-card__tags">
                                    <div className="tags-column">
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        Stack cards
                                      </TextScramble>
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        zoom video
                                      </TextScramble>
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        sticky grid
                                      </TextScramble>
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        hover slideshow
                                      </TextScramble>
                                    </div>
                                    <div className="tags-column">
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        Horizontal showcase
                                      </TextScramble>
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        clip-path gallery
                                      </TextScramble>
                                      <TextScramble className="tag tag-s-mobile mxd-scramble">
                                        Cursor image
                                      </TextScramble>
                                    </div>
                                  </div>
                                </div>
                                <p className="t-extra t-bold t-120 demo-card__descr">
                                  Bring your work to life with stunning layouts{" "}
                                  <span>
                                    and brings your stories to life beautifully.
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CommonLandingStackWrapper>
                </div>
              </CommonLandingStackCard>
            </CommonLandingStack>
          </div>
          {/* Block - Content Pages Stack End */}
        </div>
      </div>
    </>
  );
}
