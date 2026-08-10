import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Image from "next/image";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";

export default function ClientSFeedback() {
  return (
    <>
      <BlurSection className="mxd-section padding-top-subtitle">
        <div className="mxd-container grid-l-container">
          {/* Bloco - Início do Depoimento do Projeto */}
          <div className="mxd-block">
            <div className="mxd-testimonials-project">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-11 mxd-grid-item mxd-testimonials-project__item">
                    <div className="mxd-testimonials-project__inner">
                      <div className="mxd-testimonials-project__subtitle pre-manifest">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          <span>/ Feedback do Cliente</span>
                        </CommonScrollAnimated>
                      </div>
                      <div className="mxd-testimonials-project__manifest fullwidth">
                        <CommonAnimatedText
                          as="p"
                          className="manifest manifest-s mxd-split-lines"
                          animation="splitLines"
                        >
                          Trabalhar com a equipe da Rayo foi um prazer absoluto! Eles
                          dedicaram tempo para entender as necessidades do nosso negócio 
                          e as traduziram em um site lindamente desenhado e intuitivo.
                          <span>
                            A atenção aos detalhes, a criatividade e a expertise 
                            técnica da equipe superaram nossas expectativas. 
                            Já recebemos muitos feedbacks positivos dos nossos clientes.
                          </span>
                        </CommonAnimatedText>
                        <CommonScrollAnimated
                          className="mxd-testimonials-project__author anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <div className="mxd-testimonials-project__photo round">
                            <Image
                              alt="Imagem de Exemplo do Template MINDSITE"
                              src="/img/avatars/300x300_ava-01.webp"
                              width={300}
                              height={300}
                            />
                          </div>
                          <div className="mxd-testimonials-project__data">
                            <p className="mxd-testimonials-project__name">
                              John Lemon
                            </p>
                            <p className="mxd-testimonials-project__position">
                              SEO na
                              <a href="#">
                                <TextScramble className="mxd-scramble">
                                  IB Themes
                                </TextScramble>
                              </a>
                            </p>
                          </div>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Bloco - Fim do Depoimento do Projeto */}
        </div>
      </BlurSection>
    </>
  );
}