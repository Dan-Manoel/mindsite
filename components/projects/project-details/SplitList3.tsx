import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";

export default function SplitList3() {
  return (
    <>
      <BlurSection className="mxd-section padding-top-subtitle padding-bottom-default">
        <div className="mxd-container grid-l-container">
          {/* Bloco - Início da Lista Dividida v03 */}
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
                          <span>/ Solução</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-block-split__manifest">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          O MINDSITE foi construído utilizando tecnologias web modernas com foco
                          em flexibilidade.
                          <span>
                            Uma estrutura limpa em React Next.js, arquitetura CSS
                            escalável e animações impulsionadas por GSAP criam
                            interações fluidas sem sacrificar a velocidade.
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
                          <span>/ Stack Tecnológica</span>
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
                              HTML5 &amp; CSS3
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__descr">
                            <CommonScrollAnimated
                              className="t-medium anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              No núcleo do projeto reside uma estrutura HTML semântica
                              combinada com técnicas modernas de CSS.
                              Layouts flexíveis, comportamento responsivo e estilos
                              limpos garantem consistência entre os dispositivos.
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
                              Node.js &amp; NPM
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__descr">
                            <CommonScrollAnimated
                              className="t-medium anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              Um ambiente de build simplificado foi utilizado para gerenciar
                              dependências e otimizar o desenvolvimento. Os pacotes npm
                              suportam ferramentas, automação de fluxo de trabalho e
                              manutenção facilitada do projeto.
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
                              GSAP
                            </CommonScrollAnimated>
                          </div>
                          <div className="split-data__descr">
                            <CommonScrollAnimated
                              className="t-medium anim-uni-in-up"
                              as="p"
                              animation="inUp"
                            >
                              As animações são impulsionadas pelo GSAP para criar movimentos
                              suaves e precisos por toda a interface.
                              Efeitos baseados em rolagem e micro-interações
                              aprimoram a usabilidade.
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
          {/* Bloco - Fim da Lista Dividida v03 */}
        </div>
      </BlurSection>
    </>
  );
}