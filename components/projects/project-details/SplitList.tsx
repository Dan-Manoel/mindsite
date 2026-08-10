import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";

export default function SplitList() {
  return (
    <>
      <BlurSection id="overview" className="mxd-section padding-top-subtitle padding-bottom-default">
        <div className="mxd-container grid-l-container">
          {/* Bloco - Início da Lista Dividida v01 */}
          <div className="mxd-block">
            <div className="mxd-block-split">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-manifest">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          <span>/ Visão Geral</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__manifest">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          Destaque-se e expresse sua singularidade com o MINDSITE - um
                          template React Next.js vibrante e minimalista para
                          criativos, estúdios e freelancers.
                          <span>
                            Impressione os visitantes do seu site com um layout limpo,
                            estiloso e visuais deslumbrantes.
                          </span>
                        </CommonAnimatedText>
                        <CommonScrollAnimated
                          className="btn btn-default-icon btn-default-accent slide-right anim-uni-in-up"
                          href="#0"
                          as="a"
                          animation="inUp"
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            Ver ao vivo
                          </TextScramble>
                          {/* <i class="btn-icon ph-bold ph-arrow-right"></i> */}
                          <i className="btn-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                            >
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </i>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                  {/* <div class="col-12 col-xl-1"></div> */}
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-block-split__item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-grid">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          <span>/ Detalhes do Projeto</span>
                        </CommonScrollAnimated>
                      </div>
                      {/* Lista de informações divididas */}
                      <div className="mxd-block-split__info">
                        {/* Item de informação dividida */}
                        <div className="split-info__item">
                          <div className="split-info__divider divider-top" />
                          <div className="split-info__details">
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Nome:
                              <span>
                                MINDSITE - agência digital &amp; portfólio pessoal
                                Template React Next.js
                              </span>
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-info__divider divider-bottom" />
                        </div>
                        {/* Item de informação dividida */}
                        <div className="split-info__item">
                          <div className="split-info__divider divider-top" />
                          <div className="split-info__details">
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Cliente:
                              <span>IB Themes</span>
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-info__divider divider-bottom" />
                        </div>
                        {/* Item de informação dividida */}
                        <div className="split-info__item">
                          <div className="split-info__divider divider-top" />
                          <div className="split-info__details">
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Indústrias:
                              <span>Template React Next.js</span>
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-info__divider divider-bottom" />
                        </div>
                        {/* Item de informação dividida */}
                        <div className="split-info__item">
                          <div className="split-info__divider divider-top" />
                          <div className="split-info__details">
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Data:
                              <span>Outubro 2025 - Janeiro 2026</span>
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-info__divider divider-bottom" />
                        </div>
                        {/* Item de informação dividida */}
                        <div className="split-info__item">
                          <div className="split-info__divider divider-top" />
                          <div className="split-info__details">
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Página do projeto:
                              <span>
                                <a href="#0">ibthemes.dev</a>
                              </span>
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-info__divider divider-bottom" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bloco - Fim da Lista Dividida v01 */}
        </div>
      </BlurSection>
    </>
  );
}