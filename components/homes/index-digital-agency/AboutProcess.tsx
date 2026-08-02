import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
} from "@/components/animations/CommonScrollAnimated";
export default function AboutProcess() {
  return (
    <>
      <BlurSection
        id="about"
        className="mxd-section bg-color-accent padding-top-manifest-m padding-bottom-default padding-bottom-tag-m-desktop"
      >
        <div className="mxd-container grid-l-container">
          {/* Block - Manifest Large Start */}
          <div className="mxd-block">
            <div className="mxd-section-manifest pre-points">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 mxd-grid-item">
                    <div className="mxd-section-manifest__wrap wrap-text-m">
                      <div className="mxd-section-manifest__text manifest-text-m">
                        <Link data-cursor-text="Sobre nós" href={`/about-me`}>
                          <CommonAnimatedText
                            as="span"
                            className="manifest manifest-m manifest-accent mxd-split-lines active-cursor-permanent"
                            animation="splitLines"
                          >
                            Somos uma agência digital criativa especializada em
                            design inovador e desenvolvimento de ponta.
                            <span>
                              Ajudamos empresas a se destacarem e prosperarem
                              no cenário moderno.
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
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item animate-card-3"
                    as="div"
                    columns={3}
                  >
                    <div className="mxd-process-points__divider top accent" />
                    <div className="mxd-process-points__title">
                      <div className="mxd-process-points__icon accent">
                        <i className="ph ph-crosshair" />
                      </div>
                      <p className="accent">Estratégia</p>
                    </div>
                    <div className="mxd-process-points__descr">
                      <p className="t-medium t-accent">
                        Descubra como a inteligência artificial está transformando
                        processos artísticos, expandindo limites e inspirando
                        novas possibilidades no design digital.
                      </p>
                    </div>
                    <div className="mxd-process-points__time">
                      <span className="tag tag-m tag-permanent">
                        Prazo de 1-2 semanas
                      </span>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* process item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item animate-card-3"
                    as="div"
                    columns={3}
                  >
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
                        Descubra como a inteligência artificial está transformando
                        processos artísticos, expandindo limites e inspirando
                        novas possibilidades no design digital.
                      </p>
                    </div>
                    <div className="mxd-process-points__time">
                      <span className="tag tag-m tag-permanent">
                        Prazo de ~2 semanas
                      </span>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* process item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item animate-card-3"
                    as="div"
                    columns={3}
                  >
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
                        Descubra como a inteligência artificial está transformando
                        processos artísticos, expandindo limites e inspirando
                        novas possibilidades no design digital.
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
                  </CommonCardBatchAnimated>
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
