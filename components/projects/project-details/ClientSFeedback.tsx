import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Image from "next/image";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function ClientSFeedback() {
  return (
    <>
      <BlurSection className="mxd-section padding-top-subtitle">
        <div className="mxd-container grid-l-container">
          {/* Block - Testimonials Project Start */}
          <div className="mxd-block">
            <div className="mxd-testimonials-project">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-11 mxd-grid-item mxd-testimonials-project__item">
                    <div className="mxd-testimonials-project__inner">
                      <div className="mxd-testimonials-project__subtitle pre-manifest">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          <span>/ Client&apos;s Feedback</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-testimonials-project__manifest fullwidth">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          Working with Rayo team was an absolute pleasure! They
                          took the time to understand our business needs and
                          translated them into a beautifully designed,
                          user-friendly website.
                          <span>
                            The team&apos;s attention to detail, creativity, and
                            technical expertise exceeded our expectations.
                            We&apos;ve received so much positive feedback from
                            our customers already.
                          </span>
                        </CommonAnimatedText>
                        <CommonScrollAnimated
                          className="mxd-testimonials-project__author anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <div className="mxd-testimonials-project__photo round">
                            <Image
                              alt="Azurio Template Example Image"
                              src="/img/avatars/300x300_ava-01.webp"
                              width={300}
                              height={300}
                            />
                          </div>
                          <div className="mxd-testimonials-project__data">
                            <p className="mxd-testimonials-project__name">
                              John Lemon
                            </p>
                            <p className="mxd-testimonials-project__position">
                              SEO in
                              <a href="#">
                                <TextScramble className="mxd-scramble">
                                  IB Themes
                                </TextScramble>
                              </a>
                            </p>
                          </div>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Testimonials Project End */}
        </div>
      </BlurSection>
    </>
  );
}
