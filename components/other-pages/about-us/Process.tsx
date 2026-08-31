import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
export default function Process() {
  return (
    <>
      <BlurSection id="process" className="mxd-section padding-top-manifest-m padding-bottom-tag-m-desktop">
        <div className="mxd-container grid-l-container">
          {/* Block - Manifest Large Start */}
          <div className="mxd-block">
            <div className="mxd-section-manifest pre-points">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 mxd-grid-item">
                    <div className="mxd-section-manifest__wrap wrap-text-m">
                      <div className="mxd-section-manifest__text manifest-text-m">
                        <Link
                          data-cursor-text="Ver Projetos"
                          href={`/works-default`}
                        >
                          <CommonAnimatedText
                            as="span"
                            className="manifest manifest-m mxd-split-lines active-cursor-accent"
                            animation="splitLines"
                          >
                            Somos um hub de especialistas independentes unindo as melhores práticas de mercado.
                            {" "}
                            <span>
                              Ajudamos empresas a estruturarem sua Casa Digital com precisão.
                            </span>
                          </CommonAnimatedText>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Manifest Large End */}
          {/* Block - Process Points Start */}
          <div className="mxd-block">
            <div className="mxd-process-points">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {/* process item */}
                  <div className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item">
                    <CommonScrollAnimated
                      className="mxd-process-points__divider top anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                    <CommonScrollAnimated
                      className="mxd-process-points__title anim-uni-in-up"
                      as="div"
                      animation="inUp"
                    >
                      <div className="mxd-process-points__icon">
                        <i className="ph ph-crosshair" />
                      </div>
                      <p>Estratégia</p>
                    </CommonScrollAnimated>
                    <div className="mxd-process-points__descr">
                      <CommonAnimatedText
                        as="p"
                        className="t-medium mxd-split-lines"
                        animation="splitLines"
                      >
                        Definição conjunta do escopo arquitetural, alinhamento rigoroso de expectativas e planejamento da fundação da sua Casa Digital.
                      </CommonAnimatedText>
                    </div>
                    <CommonScrollAnimated
                      className="mxd-process-points__time anim-uni-in-up"
                      as="div"
                      animation="inUp"
                    >
                      <span className="tag tag-m meta-time">
                        Prazo de 1 a 2 semanas
                      </span>
                    </CommonScrollAnimated>
                  </div>
                  {/* process item */}
                  <div className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item">
                    <CommonScrollAnimated
                      className="mxd-process-points__divider top anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                    <CommonScrollAnimated
                      className="mxd-process-points__title anim-uni-in-up"
                      as="div"
                      animation="inUp"
                    >
                      <div className="mxd-process-points__icon">
                        <i className="ph ph-bezier-curve" />
                      </div>
                      <p>Design</p>
                    </CommonScrollAnimated>
                    <div className="mxd-process-points__descr">
                      <CommonAnimatedText
                        as="p"
                        className="t-medium mxd-split-lines"
                        animation="splitLines"
                      >
                        Desenho estrutural das interfaces, curadoria de assets e aprovação de layouts de alta fidelidade focados em conversão.
                      </CommonAnimatedText>
                    </div>
                    <CommonScrollAnimated
                      className="mxd-process-points__time anim-uni-in-up"
                      as="div"
                      animation="inUp"
                    >
                      <span className="tag tag-m meta-time">
                        Prazo de ~2 semanas
                      </span>
                    </CommonScrollAnimated>
                  </div>
                  {/* process item */}
                  <div className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item">
                    <CommonScrollAnimated
                      className="mxd-process-points__divider top anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                    <CommonScrollAnimated
                      className="mxd-process-points__title anim-uni-in-up"
                      as="div"
                      animation="inUp"
                    >
                      <div className="mxd-process-points__icon">
                        <i className="ph ph-codesandbox-logo" />
                      </div>
                      <p>Desenvolvimento</p>
                    </CommonScrollAnimated>
                    <div className="mxd-process-points__descr">
                      <CommonAnimatedText
                        as="p"
                        className="t-medium mxd-split-lines"
                        animation="splitLines"
                      >
                        Engenharia de software aplicada com entregas em etapas, feedback contínuo e deploy escalável utilizando nossa stack padrão.
                      </CommonAnimatedText>
                    </div>
                    <CommonScrollAnimated
                      className="mxd-process-points__time anim-uni-in-up"
                      as="div"
                      animation="inUp"
                    >
                      <span className="tag tag-m meta-time">
                        Prazo de 3 a 4 semanas
                      </span>
                    </CommonScrollAnimated>
                    <CommonScrollAnimated
                      className="mxd-process-points__divider bottom anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Process Points End */}
        </div>
      </BlurSection>
    </>
  );
}
