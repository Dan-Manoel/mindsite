import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";

export default function SplitList2() {
  return (
    <>
      <BlurSection className="mxd-section padding-top-subtitle padding-bottom-default">
        <div className="mxd-container grid-l-container">
          {/* Bloco - Início da Lista Dividida v02 */}
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
                          <span>/ Desafio</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__manifest">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          O desafio era criar um template que pareça audacioso
                          e contemporâneo sem sobrecarregar o conteúdo ou a performance.
                          <span>
                            Ele precisava atender a uma ampla gama de criativos,
                            mantendo-se flexível e fácil de personalizar para
                            diferentes tipos de projetos e estilos pessoais.
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
                          <span>/ Serviços Prestados</span>
                        </CommonScrollAnimated>
                      </div>
                      {/* Lista de dados divididos */}
                      <div className="mxd-block-split__data">
                        {/* Item de dados divididos */}
                        <div className="split-data__item">
                          <div className="split-data__divider divider-top" />
                          <div className="split-data__name">
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Direção de arte
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__descr">
                            <CommonScrollAnimated
                              className="t-medium anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              As decisões visuais foram guiadas por uma forte estrutura
                              criativa construída em torno da clareza e do equilíbrio.
                              Layout, tipografia e movimento trabalham juntos para
                              criar uma experiência consistente e envolvente.
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__divider divider-bottom" />
                        </div>
                        {/* Item de dados divididos */}
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
                              O projeto baseia-se em uma identidade minimalista, porém
                              expressiva, que destaca o caráter do MINDSITE. Cores, 
                              tipografia e acentos gráficos cuidadosamente selecionados 
                              reforçam o reconhecimento e a coesão visual.
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__divider divider-bottom" />
                        </div>
                        {/* Item de dados divididos */}
                        <div className="split-data__item">
                          <div className="split-data__divider divider-top" />
                          <div className="split-data__name">
                            <CommonScrollAnimated
                              className="anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Desenvolvimento web
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__descr">
                            <CommonScrollAnimated
                              className="t-medium anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              A implementação focou em padrões modernos de front-end
                              e performance. Estrutura clara, interações suaves
                              e código limpo fornecem flexibilidade e manutenibilidade
                              a longo prazo.
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
          {/* Bloco - Fim da Lista Dividida v02 */}
        </div>
      </BlurSection>
    </>
  );
}