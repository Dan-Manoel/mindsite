"use client";

import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";

import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";

export default function InnerHeadline() {
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section">
          <div className="mxd-container grid-l-container">
            {/* Bloco - Início do Cabeçalho Interno v01 */}
            <div className="mxd-block loading-wrap">
              <div className="inner-headline margin-bottom-subtitle">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
                      {/* Trilha de navegação (Breadcrumbs) */}
                      <CommonLoadFade index={0}>
                        <div className="inner-headline__breadcrumbs">
                          <div className="breadcrumbs__nav">
                            <span>
                              <Link href={`/`}>
                                <TextScramble className="mxd-scramble">
                                  Início
                                </TextScramble>
                              </Link>
                            </span>
                            <span className="current-item">Trabalhos </span>
                          </div>
                        </div>
                      </CommonLoadFade>
                    </div>
                    <div className="col-12">
                      {/* Conteúdo principal */}
                      <div className="inner-headline__content has-large-title">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 col-xl-9 mxd-grid-item">
                              <div className="inner-headline__title pre-subtitle-large">
                                <CommonAnimatedText
                                  as="h1"
                                  className="large loading-split"
                                  animation="splitLinesLoad"
                                >
                                  Trabalhos<sup>(6)</sup>
                                </CommonAnimatedText>
                              </div>
                              <CommonLoadItem index={0}>
                                <div className="inner-headline__subtitle loading-item">
                                  <p>
                                    Design inovador
                                    <span>e desenvolvimento de ponta</span>
                                  </p>
                                </div>
                              </CommonLoadItem>
                            </div>
                            <div className="col-12 col-xl-3 mxd-grid-item">
                              <div className="inner-headline__tags align-end-desktop tags-large-subtitle">
                                <CommonLoadItem index={1}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Websites
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
            {/* Bloco - Fim do Cabeçalho Interno v01 */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}