import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function SectionTitle() {
  return (
    <>
      <BlurSection className="mxd-section bg-color-base padding-top-title padding-bottom-tag-m">
        <div className="mxd-container grid-l-container">
          {/* Block - Section Title & Text Block Start */}
          <div className="mxd-block">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-6 mxd-grid-item">
                  {/* section title */}
                  <div className="mxd-section-title">
                    <div className="mxd-section-title__title pre-caption">
                      <CommonAnimatedText
                        as="h2"
                        className="mxd-split-lines"
                        animation="splitLines"
                      >
                        Bem-vindo ao nosso escritório
                      </CommonAnimatedText>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-xl-6 mxd-grid-item">
                  {/* paragraph */}
                  <div className="mxd-section-title__paragraph">
                    <CommonAnimatedText
                      as="p"
                      className="t-bold t-large mxd-split-lines"
                      animation="splitLines"
                    >
                      Ideias inspiradoras, insights criativos e o que há de
                      mais recente em design e tecnologia.
                      <span>Impulsionando a inovação para a sua jornada digital.</span>
                    </CommonAnimatedText>
                  </div>
                  {/* contact data */}
                  <div className="mxd-section-title__datalist">
                    <div className="container-fluid p-0">
                      <div className="row g-0">
                        {/* contact data item */}
                        <div className="col-12 col-md-6 col-xl-5 datalist__item">
                          <div className="datalist__title">
                            <CommonScrollAnimated
                              className="t-bold t-large anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              São Paulo
                            </CommonScrollAnimated>
                          </div>
                          <ul>
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="li"
                              animation="inUp"
                            >
                              <a
                                className="tag tag-s-mobile"
                                href="https://goo.gl/maps/nWXKpGaDPuyH6gxRA"
                                target="_blank"
                              >
                                Avenida Paulista, 2537
                                <br />
                                Bela Vista, São Paulo
                                <br />
                                01310-100
                              </a>
                            </CommonScrollAnimated>
                          </ul>
                          <ul>
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="li"
                              animation="inUp"
                            >
                              <a
                                href="tel:+12127089400"
                                className="tag tag-s-mobile"
                              >
                                <TextScramble className="mxd-scramble">
                                  +55 11 947675814
                                </TextScramble>
                              </a>
                            </CommonScrollAnimated>
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="li"
                              animation="inUp"
                            >
                              <a
                                href="mailto:contato@mindsite.com.br?subject=Mensagem%20do%20site"
                                className="tag tag-s-mobile"
                              >
                                <TextScramble className="mxd-scramble">
                                  contato@mindsite.com.br
                                </TextScramble>
                              </a>
                            </CommonScrollAnimated>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title & Text Block End */}
        </div>
      </BlurSection>
    </>
  );
}
