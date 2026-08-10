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
            {/* Bloco - Início do Cabeçalho Interno v02 */}
            <div className="mxd-block loading-wrap">
              <div className="inner-headline margin-bottom-title-medium">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
                      {/* Trilha de navegação (Breadcrumbs) */}
                      <CommonLoadFade index={0}>
                        <div className="inner-headline__breadcrumbs loading-fade">
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
                      <div className="inner-headline__content has-medium-title">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 col-xl-9 mxd-grid-item">
                              <div className="inner-headline__title">
                                <CommonAnimatedText
                                  as="h1"
                                  className="medium loading-split"
                                  animation="splitLinesLoad"
                                >
                                  Onde ideias audaciosas <span>ganham forma</span>
                                </CommonAnimatedText>
                              </div>
                              {/* <div class="inner-headline__subtitle">
                              <p>Soluções criativas <span>tornadas simples</span></p>
                            </div> */}
                            </div>
                            <div className="col-12 col-xl-3 mxd-grid-item">
                              <div className="inner-headline__tags align-end-desktop tags-medium-title">
                                <CommonLoadItem index={0}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Websites
                                  </TextScramble>
                                </CommonLoadItem>
                                <CommonLoadItem index={1}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Design UI/UX
                                  </TextScramble>
                                </CommonLoadItem>
                                <CommonLoadItem index={2}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Desenvolvimento
                                  </TextScramble>
                                </CommonLoadItem>
                                <CommonLoadItem index={3}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Promoções
                                  </TextScramble>
                                </CommonLoadItem>
                                <CommonLoadItem index={4}>
                                  <TextScramble className="tag tag-m meta-tag mxd-scramble loading-item">
                                    Direção de arte
                                  </TextScramble>
                                </CommonLoadItem>
                                <CommonLoadItem index={5}>
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
            {/* Bloco - Fim do Cabeçalho Interno v02 */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}