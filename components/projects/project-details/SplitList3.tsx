import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
export default function SplitList3() {
  return (
    <>
      <BlurSection className="mxd-section padding-top-subtitle padding-bottom-default">
        <div className="mxd-container grid-l-container">
          {/* Block - Split List v02 Start */}
          <div className="mxd-block">
            <div className="mxd-block-split">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item manifest-item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-manifest">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          <span>/ Solution</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__manifest">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          Azurio was built using modern web technologies with a
                          focus on flexibility.
                          <span>
                            Clean React Nextjs structure, scalable CSS
                            architecture and GSAP-powered animations create
                            smooth interactions without sacrificing speed.
                          </span>
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item manifest-item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-grid">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          <span>/ Tech stack</span>
                        </CommonScrollAnimated>
                      </div>
                      {/* split data list */}
                      <div className="mxd-block-split__data">
                        {/* split data item */}
                        <div className="split-data__item">
                          <div className="split-data__divider divider-top" />
                          <div className="split-data__name">
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              HTML5 &amp; CSS3
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__descr">
                            <CommonScrollAnimated
                              className="t-medium anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              At the core of the project lies a semantic html
                              structure paired with modern css techniques.
                              Flexible layouts, responsive behavior and clean
                              styles ensure consistency across devices.
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__divider divider-bottom" />
                        </div>
                        {/* split data item */}
                        <div className="split-data__item">
                          <div className="split-data__divider divider-top" />
                          <div className="split-data__name">
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Node.js &amp; NPM
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__descr">
                            <CommonScrollAnimated
                              className="t-medium anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              A simple build environment was used to manage
                              dependencies and streamline development. Npm
                              packages support tooling, workflow automation and
                              easier project maintenance.
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__divider divider-bottom" />
                        </div>
                        {/* split data item */}
                        <div className="split-data__item">
                          <div className="split-data__divider divider-top" />
                          <div className="split-data__name">
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              GSAP
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__descr">
                            <CommonScrollAnimated
                              className="t-medium anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Animations are powered by gsap to create smooth,
                              precise motion throughout the interface.
                              Scroll-based effects and micro-interactions
                              enhance usability.
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__divider divider-bottom" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Split List v02 End */}
        </div>
      </BlurSection>
    </>
  );
}
