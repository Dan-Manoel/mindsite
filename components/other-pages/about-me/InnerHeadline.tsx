"use client";
import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import CommonHeroTyped from "@/components/animations/CommonHeroTyped";
import TextScramble from "@/components/animations/TextScramble";
export default function InnerHeadline() {
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section loading-wrap">
          <div className="mxd-container grid-l-container">
            {/* Block - Inner Headline v01 Start */}
            <div className="mxd-block">
              <div className="inner-headline margin-bottom-subtitle">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
                      {/* breadcrumbs */}
                      <CommonLoadFade index={0}>
                        <div className="inner-headline__breadcrumbs loading-fade">
                          <div className="breadcrumbs__nav">
                            <span>
                              <Link href={`/index-personal-portfolio`}>
                                <TextScramble className="mxd-scramble">
                                  Início
                                </TextScramble>
                              </Link>
                            </span>
                            <span className="current-item">Sobre Mim </span>
                          </div>
                        </div>
                      </CommonLoadFade>
                    </div>
                    <div className="col-12">
                      {/* content */}
                      <div className="inner-headline__content has-large-title">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 col-xl-9 mxd-grid-item">
                              <CommonLoadItem index={0}>
                                <div className="inner-headline__title no-sup pre-subtitle-large loading-item">
                                  <CommonHeroTyped className="large animated-type">
                                    <b>Designer UI</b>
                                    <b>Artista 3D</b>
                                    <b>Ilustrador</b>
                                  </CommonHeroTyped>
                                </div>
                              </CommonLoadItem>
                              <div className="inner-headline__subtitle">
                                <CommonAnimatedText
                                  as="a"
                                  className="active-cursor-accent loading-split"
                                  animation="splitLinesLoad"
                                  data-cursor-text="Baixar CV"
                                  href="#0"
                                >
                                  👋 Olá! Sou Alex Walker. Sou apaixonado por
                                  {" "}
                                  <span>
                                    criar designs que contam histórias, despertam
                                    emoções e geram impacto.
                                  </span>
                                </CommonAnimatedText>
                              </div>
                            </div>
                            <div className="col-12 col-xl-3 mxd-grid-item">
                              <div className="inner-headline__tags align-end-desktop tags-large-subtitle">
                                <CommonLoadItem index={1}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Sites
                                  </TextScramble>
                                </CommonLoadItem>
                                <CommonLoadItem index={2}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Design UI/UX
                                  </TextScramble>
                                </CommonLoadItem>
                                <CommonLoadItem index={3}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Desenvolvimento
                                  </TextScramble>
                                </CommonLoadItem>
                                <CommonLoadItem index={4}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Promoções
                                  </TextScramble>
                                </CommonLoadItem>
                                <CommonLoadItem index={5}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Direção de arte
                                  </TextScramble>
                                </CommonLoadItem>
                                <CommonLoadItem index={6}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Marketing
                                  </TextScramble>
                                </CommonLoadItem>
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
            {/* Block - Inner Headline v01 End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
