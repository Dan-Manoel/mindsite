import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import MxdStatsLineItem from "@/components/animations/MxdStatsLineItem";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
export default function Approach() {
  return (
    <>
      <BlurSection className="mxd-section padding-top-subtitle padding-bottom-tag-m-subtitle">
        <div className="mxd-container grid-s-container">
          {/* Block - Split List v01 Start */}
          <div className="mxd-block">
            <div className="mxd-block-split">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-6 mxd-grid-item-s mxd-block-split__item manifest-item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-manifest">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          <span>/ Abordagem</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__manifest">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          De designs impecáveis a um código perfeito, cada
                          detalhe dos nossos projetos é elaborado com cuidado
                          para garantir os mais altos padrões de qualidade.
                          <span>
                            Acompanhamos as tendências do design, oferecendo
                            soluções modernas e de grande impacto visual para
                            destacar a sua marca.
                          </span>
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-6 mxd-grid-item-s mxd-block-split__item manifest-item">
                    <div className="mxd-block-split__inner">
                      <div className="mxd-block-split__subtitle pre-grid">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          <span>/ Números</span>
                        </CommonScrollAnimated>
                      </div>
                      {/* Statistics Lines Start */}
                      <div className="mxd-stats-lines">
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-1">50+</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Clientes satisfeitos que confiam em nosso trabalho</p>
                          </div>
                        </MxdStatsLineItem>
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-2">94%</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Clientes que retornam para novos projetos</p>
                          </div>
                        </MxdStatsLineItem>
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-3">7+</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Anos de experiência profissional</p>
                          </div>
                        </MxdStatsLineItem>
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-4">80+</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Projetos concluídos com sucesso</p>
                          </div>
                        </MxdStatsLineItem>
                      </div>
                      {/* Statistics Lines End */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Split List v01 End */}
        </div>
      </BlurSection>
    </>
  );
}
