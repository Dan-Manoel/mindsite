import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function AboutMission() {
  return (
    <>
      <BlurSection
        id="about"
        className="mxd-section pinned-section bg-color-opposite padding-top-subtitle-mobile"
      >
        <div className="mxd-container grid-l-container">
          {/* Block - Section Title v07 Start */}
          <div className="mxd-block">
            <div className="mxd-section-title">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-5 mxd-grid-item">
                    <div className="mxd-section-title__title reverse-desktop justify-between-desktop pre-caption-extra">
                      <CommonScrollAnimated
                        className="mxd-section-title__controls pre-title anim-uni-in-up"
                        as="div"
                        animation="inUp"
                      >
                        <Link
                          className="btn btn-line btn-line-opposite"
                          href={`/about-us`}
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            O Estúdio
                          </TextScramble>
                        </Link>
                      </CommonScrollAnimated>
                      <CommonAnimatedText
                        as="h2"
                        className="opposite mxd-split-lines"
                        animation="splitLines"
                      >
                        Missão
                      </CommonAnimatedText>
                    </div>
                  </div>
                  <div className="col-12 col-xl-7 mxd-grid-item">
                    <div className="mxd-section-title__data top-caption no-padding-bottom">
                      <div className="mxd-section-title__caption fullwidth">
                        <CommonAnimatedText
                          as="p"
                          className="t-bold t-extra t-opposite mxd-split-lines"
                          animation="splitLines"
                        >
                          O web design evolui em ritmo acelerado, e me dedico
                          para estar sempre à frente. Ferramentas e tecnologias
                          modernas permitem criar sites com um visual marcante e
                          navegação intuitiva.
                          <span>
                            A união de design e engenharia nos possibilita
                            construir experiências digitais únicas, conectando
                            propósitos e transformando ideias em soluções
                            memoráveis.
                          </span>
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title v07 End */}
          {/* Block - Fullwidth Text Start */}
          <div className="mxd-block about-mission">
            <div className="fullwidth-text about-mission-text bottom-text mxd-grid-item">
              <div className="fullwidth-text__wrap">
                <div className="fullwidth-text__content base">
                  <Link
                    className="hero-10-headline__content active-cursor-accent !normal-case"
                    data-cursor-text="Fale Comigo"
                    href={`/contact`}
                    style={{
                      textTransform: "none",
                      fontSize: "clamp(3.5rem, 18vw, 28rem)",
                      lineHeight: "0.95",
                      letterSpacing: "-0.03em",
                      whiteSpace: "nowrap",
                      display: "inline-block",
                      maxWidth: "100%",
                    }}
                  >
                    <CommonAnimatedText
                      as="span"
                      className="loading-chars !normal-case"
                      animation="animCharsLoad"
                      style={{ textTransform: "none" }}
                    >
                      MINDSITE
                    </CommonAnimatedText>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Fullwidth Text End */}
        </div>
      </BlurSection>
    </>
  );
}
