import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
export default function AboutProcess() {
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
                        <Link data-cursor-text="Sobre mim" href={`/about-me`}>
                          <CommonAnimatedText
                            as="span"
                            className="manifest manifest-m manifest-accent mxd-split-lines active-cursor-permanent"
                            animation="splitLines"
                          >
                            O web design está evoluindo rapidamente, e me esforço para estar
                            sempre à frente.
                            <span>
                              Ferramentas e tecnologias modernas me permitem
                              criar sites visualmente impressionantes e com funcionalidade perfeita.
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
                      <p className="accent">Estratégia</p>
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
                      <p className="accent">Design</p>
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
                      <p className="accent">Desenvolvimento</p>
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
