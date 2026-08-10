import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import Image from "next/image";
import { CommonCardBatchAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function FeaturesCards() {
  return (
    <>
      <BlurSection className="mxd-section padding-top-title">
        <div className="mxd-container grid-s-container">
          {/* Block - Section Title v03 Start */}
          <div className="mxd-block">
            <div className="mxd-section-title landing-features-title pre-grid">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-8 mxd-grid-item-s">
                    <div className="mxd-section-title__title pre-caption">
                      <Link
                        className="active-cursor-accent"
                        data-cursor-text="Ver mais"
                        href={`/index-branding-studio`}
                      >
                        <CommonAnimatedText
                          as="h2"
                          className="mxd-split-lines"
                          animation="splitLines"
                        >
                          Recursos de primeira, criados para você
                        </CommonAnimatedText>
                      </Link>
                    </div>
                  </div>
                  <div className="col-12 col-xl-4 mxd-grid-item-s">
                    <div className="mxd-section-title__data top-caption">
                      <div className="mxd-section-title__caption">
                        <CommonAnimatedText
                          as="p"
                          className="t-bold t-large mxd-split-lines"
                          animation="splitLines"
                        >
                          Desenvolvimento repleto de animações fluidas, ferramentas de design
                          moderno e código limpo.{" "}
                          <span>
                            É tecnologia flexível, preparada para o futuro,
                            fácil de personalizar e agradável de usar.
                          </span>
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title v03 End */}
          {/* Block - Features Cards Start */}
          <div className="mxd-block">
            <div className="mxd-niche-cards landing-features-cards">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {/* card item - high */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-niche-cards__column mxd-grid-item-s animate-card-2"
                    as="div"
                    columns={2}
                  >
                    <div className="mxd-niche-cards__item">
                      <div className="mxd-niche-cards__inner">
                        <div className="mxd-niche-cards__title">
                          <div className="mxd-niche-cards__name">
                            <p>Modo Dia / Noite</p>
                          </div>
                          <div className="mxd-niche-cards__tags">
                            <TextScramble className="tag tag-m tag-medium mxd-scramble">
                              Escolha de Tema
                            </TextScramble>
                            <TextScramble className="tag tag-m tag-medium mxd-scramble">
                              Interativo
                            </TextScramble>
                            <TextScramble className="tag tag-m tag-medium mxd-scramble">
                              Experiência
                            </TextScramble>
                          </div>
                        </div>
                        <div className="mxd-niche-cards__descr wide">
                          <p className="t-bold t-medium">
                            Alterne facilmente entre os modos claro e escuro
                            <span> para uma experiência ainda mais agradável.</span>
                          </p>
                        </div>
                        <div className="mxd-niche-cards__image absolute-desktop-bottom">
                          <Image
                            alt="MINDSITE Template Sample Image"
                            src="/img/demo/01_fea-img.webp"
                            width={1200}
                            height={1292}
                          />
                        </div>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* card items - rows */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-8 mxd-niche-cards__column animate-card-2"
                    as="div"
                    columns={2}
                  >
                    <div className="container-fluid p-0">
                      <div className="row g-0">
                        <div className="col-12 mxd-grid-item-s">
                          <div className="mxd-niche-cards__item">
                            <div className="mxd-niche-cards__inner fixed-height-desktop space-between-desktop">
                              <div className="mxd-niche-cards__title">
                                <div className="mxd-niche-cards__name">
                                  <p>Design dinâmico &amp; elegante</p>
                                </div>
                                <div className="mxd-niche-cards__tags">
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Design
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Layouts
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Visual
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Componentes
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Vitrine
                                  </TextScramble>
                                </div>
                              </div>
                              <div className="mxd-niche-cards__descr wide">
                                <p className="t-bold t-medium">
                                  Layouts modernos e cativantes criados{" "}
                                  <span>
                                    para destacar sua marca e manter os visitantes engajados.
                                  </span>
                                </p>
                              </div>
                              <div className="mxd-niche-cards__image absolute-desktop-full">
                                <Image
                                  alt="MINDSITE Template Sample Image"
                                  src="/img/demo/02_fea-img.webp"
                                  width={1320}
                                  height={800}
                                />
                                <div className="mxd-niche-cards__gradient gradient-linear" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <CommonCardBatchAnimated
                          className="col-12 col-xl-6 mxd-grid-item-s animate-card-2"
                          as="div"
                          columns={2}
                        >
                          <div className="mxd-niche-cards__item">
                            <div className="mxd-niche-cards__inner permanent fixed-height-desktop space-between-desktop">
                              <div className="mxd-niche-cards__title">
                                <div className="mxd-niche-cards__name">
                                  <p className="permanent">Excelência em código</p>
                                </div>
                                <div className="mxd-niche-cards__tags">
                                  <TextScramble className="tag tag-m tag-permanent mxd-scramble">
                                    Limpo
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-permanent mxd-scramble">
                                    Confiável
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-permanent mxd-scramble">
                                    Validado
                                  </TextScramble>
                                </div>
                              </div>
                              <div className="mxd-niche-cards__descr wide">
                                <p className="t-bold t-medium t-permanent">
                                  Feito com código limpo e bem estruturado{" "}
                                  <span>
                                    que é rápido, seguro e fácil de manter.
                                  </span>
                                </p>
                              </div>
                              <div className="mxd-niche-cards__image absolute-desktop-full">
                                <Image
                                  alt="MINDSITE Template Sample Image"
                                  src="/img/demo/03_fea-img.webp"
                                  width={1200}
                                  height={974}
                                />
                                <div className="mxd-niche-cards__gradient gradient-radial" />
                              </div>
                            </div>
                          </div>
                        </CommonCardBatchAnimated>
                        <CommonCardBatchAnimated
                          className="col-12 col-xl-6 mxd-grid-item-s animate-card-2"
                          as="div"
                          columns={2}
                        >
                          <div className="mxd-niche-cards__item">
                            <div className="mxd-niche-cards__inner fixed-height-desktop space-between-desktop">
                              <div className="mxd-niche-cards__title">
                                <div className="mxd-niche-cards__name">
                                  <p>Animações com GSAP</p>
                                </div>
                                <div className="mxd-niche-cards__tags">
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Movimento
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Suave
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Interativo
                                  </TextScramble>
                                </div>
                              </div>
                              <div className="mxd-niche-cards__descr short">
                                <p className="t-bold t-medium">
                                  Adicionando movimento único,{" "}
                                  <span>
                                    efeitos mágicos de rolagem e profundidade criativa às suas páginas.
                                  </span>
                                </p>
                              </div>
                              <div className="mxd-niche-cards__image absolute-desktop-aside">
                                <Image
                                  alt="MINDSITE Template Sample Image"
                                  src="/img/demo/04_fea-img.webp"
                                  width={800}
                                  height={927}
                                />
                              </div>
                            </div>
                          </div>
                        </CommonCardBatchAnimated>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Features Cards End */}
        </div>
      </BlurSection>
    </>
  );
}
