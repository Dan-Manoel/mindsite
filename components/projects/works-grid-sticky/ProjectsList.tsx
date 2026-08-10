"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import TextScramble from "@/components/animations/TextScramble";

export default function ProjectsList() {
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-title padding-bottom-default"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Bloco - Início do Título da Seção v03 */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title pre-caption">
                        <CommonAnimatedText
                          as="h2"
                          className="mxd-split-lines"
                          animation="splitLines"
                        >
                          Arquivo de
                          <br />
                          projetos
                        </CommonAnimatedText>
                      </div>
                    </div>
                    <div className="col-12 col-xl-3 mxd-grid-item">
                      <div className="mxd-section-title__data top-caption">
                        <div className="mxd-section-title__caption">
                          <CommonAnimatedText
                            as="p"
                            className="t-bold t-large mxd-split-lines"
                            animation="splitLines"
                          >
                            Ajudamos mais de 20 marcas, agências e criativos a
                            <span>elevarem sua presença online.</span>
                          </CommonAnimatedText>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Bloco - Fim do Título da Seção v03 */}
            
            {/* Bloco - Início da Lista de Projetos */}
            <div className="mxd-block">
              {/* Lista de projetos */}
              <div className="mxd-projects-list no-margin-bottom">
                <Link
                  className="mxd-projects-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/works/showcase-archive/500x500_pr01.webp"
                  data-cursor-text="Ver Trabalho"
                  href={`/project-details`}
                >
                  <div className="mxd-projects-list__divider top" />
                  <div className="container-fluid px-0 mxd-projects-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__niche">
                          <TextScramble className="meta-niche mxd-scramble">
                            Tech
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-projects-list__title">
                          <h3>
                            Template para{" "}
                            <span>
                              estúdio
                              <br />
                              criativo
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__meta">
                          <TextScramble className="meta-tag mxd-scramble">
                            Brand
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Marketing
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Website
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__date">
                          <TextScramble className="meta-date mxd-scramble">
                            Janeiro
                          </TextScramble>
                          <TextScramble className="meta-date mxd-scramble">
                            2026
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-projects-list__divider bottom" />
                </Link>

                <Link
                  className="mxd-projects-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/works/showcase-archive/500x500_pr02.webp"
                  data-cursor-text="Ver Trabalho"
                  href={`/project-details`}
                >
                  <div className="mxd-projects-list__divider top" />
                  <div className="container-fluid px-0 mxd-projects-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__niche">
                          <TextScramble className="meta-niche mxd-scramble">
                            Moda
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-projects-list__title">
                          <h3>
                            Conjunto de ilustrações
                            <br />
                            <span>editoriais</span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__meta">
                          <TextScramble className="meta-tag mxd-scramble">
                            Midjourney
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Ilustrações
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Design
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__date">
                          <TextScramble className="meta-date mxd-scramble">
                            Novembro
                          </TextScramble>
                          <TextScramble className="meta-date mxd-scramble">
                            2025
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-projects-list__divider bottom" />
                </Link>

                <Link
                  className="mxd-projects-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/works/showcase-archive/500x500_pr03.webp"
                  data-cursor-text="Ver Trabalho"
                  href={`/project-details`}
                >
                  <div className="mxd-projects-list__divider top" />
                  <div className="container-fluid px-0 mxd-projects-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__niche">
                          <TextScramble className="meta-niche mxd-scramble">
                            Pets
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-projects-list__title">
                          <h3>
                            Conceito de mídia{" "}
                            <span>
                              interativa
                              <br />
                              digital
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__meta">
                          <TextScramble className="meta-tag mxd-scramble">
                            Brand
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Social Media
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Packaging
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__date">
                          <TextScramble className="meta-date mxd-scramble">
                            Outubro
                          </TextScramble>
                          <TextScramble className="meta-date mxd-scramble">
                            2025
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-projects-list__divider bottom" />
                </Link>

                <Link
                  className="mxd-projects-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/works/showcase-archive/500x500_pr04.webp"
                  data-cursor-text="Ver Trabalho"
                  href={`/project-details`}
                >
                  <div className="mxd-projects-list__divider top" />
                  <div className="container-fluid px-0 mxd-projects-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__niche">
                          <TextScramble className="meta-niche mxd-scramble">
                            Mobile
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-projects-list__title">
                          <h3>
                            Design de{" "}
                            <span>
                              aplicativo
                              <br />
                              mobile
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__meta">
                          <TextScramble className="meta-tag mxd-scramble">
                            UI/UX
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Design
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Android
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__date">
                          <TextScramble className="meta-date mxd-scramble">
                            Setembro
                          </TextScramble>
                          <TextScramble className="meta-date mxd-scramble">
                            2025
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-projects-list__divider bottom" />
                </Link>

                <Link
                  className="mxd-projects-list__item active-cursor-image active-cursor-permanent"
                  data-cursor-image="/img/works/showcase-archive/500x500_pr05.webp"
                  data-cursor-text="Ver Trabalho"
                  href={`/project-details`}
                >
                  <div className="mxd-projects-list__divider top" />
                  <div className="container-fluid px-0 mxd-projects-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__niche">
                          <TextScramble className="meta-niche mxd-scramble">
                            Pets
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-projects-list__title">
                          <h3>
                            Conjunto de ilustrações{" "}
                            <span>
                              para impressão
                              <br />
                              gráfica
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__meta">
                          <TextScramble className="meta-tag mxd-scramble">
                            Illustration
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Design
                          </TextScramble>
                          <TextScramble className="meta-tag mxd-scramble">
                            Packaging
                          </TextScramble>
                        </div>
                      </div>
                      <div className="col-6 col-md-6 col-xl-2 mxd-grid-padding">
                        <div className="mxd-projects-list__date">
                          <TextScramble className="meta-date mxd-scramble">
                            Agosto
                          </TextScramble>
                          <TextScramble className="meta-date mxd-scramble">
                            2025
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-projects-list__divider bottom" />
                </Link>
              </div>
            </div>
            {/* Bloco - Fim da Lista de Projetos */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}