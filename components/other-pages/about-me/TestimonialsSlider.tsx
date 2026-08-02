"use client";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TestimonialsSwiperBlock from "@/components/common/testimonials/TestimonialsSwiperBlock";
import { aboutMeTestimonialSlides } from "@/data/testimonials";
import TextScramble from "@/components/animations/TextScramble";

export default function TestimonialsSlider() {
  return (
    <>
      <BlurSection className="mxd-section padding-top-number-mobile padding-bottom-tag-m">
        <div className="mxd-container fullwidth-container">
          {/* Block - Section Title & Testimonials Slider Start */}
          <div className="mxd-block">
            <div className="">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {/* title part */}
                  <div className="col-12 col-xl-4 mxd-grid-item">
                    <div className="mxd-container no-padding-right-container">
                      <div className="mxd-section-title pre-grid-xl-mobile">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12">
                              <div className="mxd-section-title__data top-number">
                                <CommonScrollAnimated
                                  className="mxd-section-title__number anim-uni-in-up"
                                  as="div"
                                  animation="inUp"
                                >
                                  <TextScramble className="title-number mxd-scramble">
                                    /03
                                  </TextScramble>
                                </CommonScrollAnimated>
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="mxd-section-title__title">
                                <CommonAnimatedText
                                  as="h2"
                                  className="mxd-split-lines"
                                  animation="splitLines"
                                >
                                  O que dizem os clientes
                                </CommonAnimatedText>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* slider part */}
                  <div className="col-12 col-xl-8 mxd-grid-item padding-left-desktop">
                    {/* Testimonials Slider Start */}
                    <CommonScrollAnimated
                      className="testimonials-slider overflow-hidden anim-uni-in-up"
                      as="div"
                      animation="inUp"
                    >
                      <TestimonialsSwiperBlock
                        slides={aboutMeTestimonialSlides}
                      />
                    </CommonScrollAnimated>
                    {/* Testimonials Slider End */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title & Testimonials Slider End */}
        </div>
      </BlurSection>
    </>
  );
}
