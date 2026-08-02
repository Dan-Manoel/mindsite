import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
export default function SplitList2() {
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
                          <span>/ Challenge</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__manifest">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          The challenge was to create a template that feels bold
                          and contemporary without overwhelming content or
                          performance.
                          <span>
                            It needed to serve a wide range of creatives while
                            remaining flexible and easy to customize for
                            different project types and personal styles.
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
                          <span>/ Provided Services</span>
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
                              Art direction
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__descr">
                            <CommonScrollAnimated
                              className="t-medium anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Visual decisions were guided by a strong creative
                              framework built around clarity and balance.
                              Layout, typography, and motion work together to
                              create a consistent and engaging experience.
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
                              Branding
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__descr">
                            <CommonScrollAnimated
                              className="t-medium anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              The project relies on a minimal yet expressive
                              identity that highlights Azurio&apos;s character.
                              Carefully selected colors, type, and graphic
                              accents reinforce recognition and visual cohesion.
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
                              Web development
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__descr">
                            <CommonScrollAnimated
                              className="t-medium anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Implementation focused on modern front-end
                              standards and performance. Clear structure, smooth
                              interactions and clean code provide flexibility
                              and long-term maintainability.
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
