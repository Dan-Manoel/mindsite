import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
export default function Process() {
  return (
    <>
      <BlurSection className="mxd-section bg-color-accent padding-top-manifest-m padding-bottom-tag-m-desktop">
        <div className="mxd-container grid-l-container">
          {/* Block - Manifest Large Start */}
          <div className="mxd-block">
            <div className="mxd-section-manifest pre-points">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 mxd-grid-item">
                    <div className="mxd-section-manifest__wrap wrap-text-m">
                      <div className="mxd-section-manifest__text manifest-text-m">
                        <Link data-cursor-text="Sobre nós" href={`/about-us`}>
                          <CommonAnimatedText
                            as="span"
                            className="manifest manifest-m manifest-accent mxd-split-lines active-cursor-permanent"
                            animation="splitLines"
                          >
                            Somos um estúdio web criativo especializado em
                            design inovador e desenvolvimento de ponta.
                            <span>
                              Ajudamos marcas a se destacarem e prosperarem no
                              cenário digital moderno.
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
                      className="mxd-process-points__divider top accent anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                    <div className="mxd-process-points__title">
                      <div className="mxd-process-points__icon accent">
                        <i className="ph ph-crosshair" />
                      </div>
                      <h4 className="accent">Estratégia</h4>
                    </div>
                    <div className="mxd-process-points__descr">
                      <p className="t-medium t-accent">
                        Planejamento estratégico profundo, compreendendo
                        seus objetivos de negócio para construir uma base sólida
                        para o projeto digital.
                      </p>
                    </div>
                    <div className="mxd-process-points__time">
                      <span className="tag tag-m tag-permanent">
                        Prazo de 1-2 semanas
                      </span>
                    </div>
                  </div>
                  {/* process item */}
                  <div className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item">
                    <CommonScrollAnimated
                      className="mxd-process-points__divider top accent anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                    <div className="mxd-process-points__title">
                      <div className="mxd-process-points__icon accent">
                        <i className="ph ph-bezier-curve" />
                      </div>
                      <h4 className="accent">Design</h4>
                    </div>
                    <div className="mxd-process-points__descr">
                      <p className="t-medium t-accent">
                        Criação de interfaces visuais imersivas e intuitivas
                        focadas na melhor experiência e usabilidade
                        para os usuários.
                      </p>
                    </div>
                    <div className="mxd-process-points__time">
                      <span className="tag tag-m tag-permanent">
                        Prazo de ~2 semanas
                      </span>
                    </div>
                  </div>
                  {/* process item */}
                  <div className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item">
                    <CommonScrollAnimated
                      className="mxd-process-points__divider top accent anim-uni-clip-in"
                      as="div"
                      animation="clipIn"
                    />
                    <div className="mxd-process-points__title">
                      <div className="mxd-process-points__icon accent">
                        <i className="ph ph-codesandbox-logo" />
                      </div>
                      <h4 className="accent">Desenvolvimento</h4>
                    </div>
                    <div className="mxd-process-points__descr">
                      <p className="t-medium t-accent">
                        Implementação com código limpo, performático e
                        escalável, utilizando as mais modernas tecnologias
                        e boas práticas do mercado.
                      </p>
                    </div>
                    <div className="mxd-process-points__time">
                      <span className="tag tag-m tag-permanent">
                        Prazo de 3-4 semanas
                      </span>
                    </div>
                    <CommonScrollAnimated
                      className="mxd-process-points__divider bottom accent anim-uni-clip-in"
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
