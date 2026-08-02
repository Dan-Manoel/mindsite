import UkiyoParallax from "@/components/animations/UkiyoParallax";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import Link from "next/link";
import Image from "next/image";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
export default function SplitAboutTeam() {
  return (
    <>
      <BlurSection
        id="about-team"
        className="mxd-section bg-color-base padding-top-manifest-m"
      >
        <div className="mxd-container grid-l-container">
          {/* Block - Manifest Large Start */}
          <div className="mxd-block">
            <div className="mxd-section-manifest pre-grid-xl">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 mxd-grid-item">
                    <div className="mxd-section-manifest__wrap wrap-text-m">
                      <div className="mxd-section-manifest__text manifest-text-m">
                        <Link data-cursor-text="Sobre nós" href={`/about-us`}>
                          <CommonAnimatedText
                            as="span"
                            className="manifest manifest-m mxd-split-lines active-cursor-permanent"
                            animation="splitLines"
                          >
                            Nossa equipe é uma mistura de pensadores criativos,
                            solucionadores de problemas e entusiastas de tecnologia
                            dedicados a dar vida às suas ideias.
                            <span>
                              Juntos, criamos soluções inovadoras que
                              inspiram e trazem resultados.
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
          {/* Block - About Team Start */}
          <div className="mxd-block">
            <div className="mxd-about-team">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {/* column #01 */}
                  <div className="col-12 col-xl-6 mxd-grid-item">
                    <div className="mxd-about-team__img">
                      <UkiyoParallax
                        className="parallax-img-small"
                        scale={1.2}
                        speed={1.5}
                        externalRAF={false}
                      >
                        <Image
                          alt="MINDSITE Template Sample Image"
                          src="/img/illustrations/team01.webp"
                          width={1000}
                          height={1500}
                        />
                      </UkiyoParallax>
                    </div>
                  </div>
                  {/* column #02 */}
                  <div className="col-12 col-xl-6 mxd-grid-item">
                    <div className="mxd-about-team__data">
                      <div className="mxd-about-team__img">
                        <UkiyoParallax
                          className="parallax-img-small"
                          scale={1.2}
                          speed={1.5}
                          externalRAF={false}
                        >
                          <Image
                            alt="MINDSITE Template Sample Image"
                            src="/img/illustrations/team02.webp"
                            width={1500}
                            height={1000}
                          />
                        </UkiyoParallax>
                      </div>
                      <div className="mxd-about-team__info fullheight-xl">
                        <div className="mxd-split-descr__wrap">
                          <div className="mxd-split-descr__content margin-bottom-l">
                            <CommonAnimatedText
                              as="p"
                              className="t-bold t-large mxd-split-lines"
                              animation="splitLines"
                            >
                              Prosperamos com colaboração, criatividade e
                              inovação, trabalhando como uma equipe unida onde
                              ideias são compartilhadas abertamente e desafios
                              são superados juntos.
                              <span>
                                Com sólida experiência no ecossistema digital,
                                focamos em construir soluções rápidas,
                                escaláveis e confiáveis. Valorizamos
                                arquitetura limpa e performance, refinando
                                continuamente nossas habilidades e ferramentas
                                para estar à frente das melhores práticas do mercado.
                              </span>
                            </CommonAnimatedText>
                          </div>
                          <div className="mxd-split-descr__tags">
                            <div className="container-fluid p-0">
                              <div className="row g-0">
                                <div className="col-6 col-md-6 col-xl-4">
                                  <CommonScrollAnimated
                                    className="tag meta-tag tag-m anim-uni-in-up"
                                    as="span"
                                    animation="inUp"
                                  >
                                    <TextScramble className="mxd-scramble">
                                      Inovações
                                    </TextScramble>
                                  </CommonScrollAnimated>
                                  <CommonScrollAnimated
                                    className="tag meta-tag tag-m anim-uni-in-up"
                                    as="span"
                                    animation="inUp"
                                  >
                                    <TextScramble className="mxd-scramble">
                                      Excelência
                                    </TextScramble>
                                  </CommonScrollAnimated>
                                  <CommonScrollAnimated
                                    className="tag meta-tag tag-m anim-uni-in-up"
                                    as="span"
                                    animation="inUp"
                                  >
                                    <TextScramble className="mxd-scramble">
                                      Criatividade
                                    </TextScramble>
                                  </CommonScrollAnimated>
                                </div>
                                <div className="col-6 col-md-6 col-xl-4">
                                  <CommonScrollAnimated
                                    className="tag meta-tag tag-m anim-uni-in-up"
                                    as="span"
                                    animation="inUp"
                                  >
                                    <TextScramble className="mxd-scramble">
                                      Experiência
                                    </TextScramble>
                                  </CommonScrollAnimated>
                                  <CommonScrollAnimated
                                    className="tag meta-tag tag-m anim-uni-in-up"
                                    as="span"
                                    animation="inUp"
                                  >
                                    <TextScramble className="mxd-scramble">
                                      Competência
                                    </TextScramble>
                                  </CommonScrollAnimated>
                                  <CommonScrollAnimated
                                    className="tag meta-tag tag-m anim-uni-in-up"
                                    as="span"
                                    animation="inUp"
                                  >
                                    <TextScramble className="mxd-scramble">
                                      Paixão
                                    </TextScramble>
                                  </CommonScrollAnimated>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - About Team End */}
        </div>
      </BlurSection>
    </>
  );
}
