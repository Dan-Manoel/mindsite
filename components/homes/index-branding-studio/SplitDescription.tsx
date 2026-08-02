import PinnedSection, {
  PinnedSectionInner,
  PinnedSectionTrigger,
} from "@/components/animations/PinnedSection";
import CommonAnimatedText, {
  CommonAnimatedTextLink,
} from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import Image from "next/image";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function SplitDescription() {
  return (
    <>
      <PinnedSection className="mxd-section blur-section padding-top-subtitle padding-bottom-default padding-bottom-tags-mobile">
        <PinnedSectionInner>
          <div className="mxd-container grid-l-container">
            {/* Block - Manifest Large Start */}
            <div className="mxd-block">
              <div className="mxd-section-manifest pre-default">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
                      <div className="mxd-section-manifest__wrap wrap-text-m">
                        <CommonScrollAnimated
                          className="mxd-section-manifest__controls anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <Link
                            className="btn btn-line btn-line-default"
                            href="/about-us"
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              The Studio
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                        <div className="mxd-section-manifest__text manifest-text-m">
                          <CommonAnimatedTextLink
                            className="manifest manifest-l mxd-split-lines active-cursor-accent"
                            data-cursor-text="About Us"
                            href="/about-us"
                            animation="splitLines"
                          >
                            We are a creative web agency specializing in
                            innovative design and cutting-edge development.
                            <span>
                              We help businesses stand out and thrive in the
                              modern landscape.
                            </span>
                          </CommonAnimatedTextLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Manifest Large End */}
            {/* Block - Split Description Start */}
            <div className="mxd-block">
              <div className="mxd-split-descr pre-manifest-l">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-lg-6 mxd-grid-item">
                      <div className="mxd-split-descr__image">
                        <Image
                          alt="Azurio Template Example Image"
                          src="/img/illustrations/about04.webp"
                          width={1200}
                          height={800}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6 mxd-grid-item">
                      <div className="mxd-split-descr__wrap">
                        <div className="mxd-split-descr__content">
                          <CommonAnimatedText
                            as="p"
                            className="t-bold t-large mxd-split-lines"
                            animation="splitLines"
                          >
                            From pixel-perfect designs to flawless code, every
                            aspect of our projects is crafted with care to
                            ensure the highest standards of quality.
                            <span>
                              We are passionate about integrating the latest
                              technologies and trends, including interactive
                              animations and mobile-first strategies.
                            </span>
                          </CommonAnimatedText>
                        </div>
                        <div className="mxd-split-descr__tags">
                          <div className="container-fluid p-0">
                            <div className="row g-0">
                              <div className="col-12 col-md-6 col-xl-4">
                                <CommonScrollAnimated
                                  className="tag meta-tag tag-m anim-uni-in-up"
                                  as="span"
                                  animation="inUp"
                                >
                                  <TextScramble className="mxd-scramble">
                                    Innovations
                                  </TextScramble>
                                </CommonScrollAnimated>
                                <CommonScrollAnimated
                                  className="tag meta-tag tag-m anim-uni-in-up"
                                  as="span"
                                  animation="inUp"
                                >
                                  <TextScramble className="mxd-scramble">
                                    Excellence
                                  </TextScramble>
                                </CommonScrollAnimated>
                                <CommonScrollAnimated
                                  className="tag meta-tag tag-m anim-uni-in-up"
                                  as="span"
                                  animation="inUp"
                                >
                                  <TextScramble className="mxd-scramble">
                                    Creativity
                                  </TextScramble>
                                </CommonScrollAnimated>
                              </div>
                              <div className="col-12 col-md-6 col-xl-4">
                                <CommonScrollAnimated
                                  className="tag meta-tag tag-m anim-uni-in-up"
                                  as="span"
                                  animation="inUp"
                                >
                                  <TextScramble className="mxd-scramble">
                                    Experience
                                  </TextScramble>
                                </CommonScrollAnimated>
                                <CommonScrollAnimated
                                  className="tag meta-tag tag-m anim-uni-in-up"
                                  as="span"
                                  animation="inUp"
                                >
                                  <TextScramble className="mxd-scramble">
                                    Competence
                                  </TextScramble>
                                </CommonScrollAnimated>
                                <CommonScrollAnimated
                                  className="tag meta-tag tag-m anim-uni-in-up"
                                  as="span"
                                  animation="inUp"
                                >
                                  <TextScramble className="mxd-scramble">
                                    Passion
                                  </TextScramble>
                                </CommonScrollAnimated>
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
            {/* Block - Split Description End */}
          </div>
          <PinnedSectionTrigger />
        </PinnedSectionInner>
      </PinnedSection>
    </>
  );
}
