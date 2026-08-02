"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
export default function ServicesList() {
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-subtitle-mobile padding-bottom-default"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v01 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 d-flex flex-column-reverse flex-xl-row">
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title">
                        <CommonAnimatedText
                          as="h2"
                          className="reveal-type"
                          animation="revealType"
                        >
                          Interseção de arte &amp; tecnologia
                        </CommonAnimatedText>
                      </div>
                    </div>
                    <div className="col-12 col-xl-4 mxd-grid-item">
                      <div className="mxd-section-title__data top-controls">
                        <CommonScrollAnimated
                          className="mxd-section-title__controls pre-title justify-end anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <Link
                            className="btn btn-line btn-line-default"
                            href={`/services`}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              Todos os Serviços
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v01 End */}
            {/* Block - Services List Start */}
            <div className="mxd-block">
              <div className="mxd-services-list no-marquee">
                {/* services item */}
                <Link
                  className="mxd-services-list__item active-cursor-image-tr"
                  data-cursor-image="/img/services/500x500_s01.webp"
                  href={`/services`}
                >
                  <div className="mxd-services-list__divider top" />
                  <div className="container-fluid px-0 mxd-services-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-1 mxd-grid-padding">
                        <div className="mxd-services-list__number">
                          <span className="meta-tag">[01]</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-services-list__title">
                          <h3>Design gráfico</h3>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-services-list__descr">
                          <p className="t-medium">
                            Criamos designs visualmente atraentes que melhoram a
                            experiência do usuário. Garantimos que o visual da
                            sua marca se conecte com seu público.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-services-list__divider bottom" />
                </Link>
                {/* services item */}
                <Link
                  className="mxd-services-list__item active-cursor-image-tr"
                  data-cursor-image="/img/services/500x500_s02.webp"
                  href={`/services`}
                >
                  <div className="mxd-services-list__divider top" />
                  <div className="container-fluid px-0 mxd-services-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-1 mxd-grid-padding">
                        <div className="mxd-services-list__number">
                          <span className="meta-tag">[02]</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-services-list__title">
                          <h3>Desenvolvimento criativo</h3>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-services-list__descr">
                          <p className="t-medium">
                            Desenvolvemos sites e aplicativos de alta performance
                            usando tecnologias modernas. Nossas soluções são
                            projetadas para serem escaláveis e funcionais, com
                            desempenho ideal.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-services-list__divider bottom" />
                </Link>
                {/* services item */}
                <Link
                  className="mxd-services-list__item active-cursor-image-tr"
                  data-cursor-image="/img/services/500x500_s03.webp"
                  href={`/services`}
                >
                  <div className="mxd-services-list__divider top" />
                  <div className="container-fluid px-0 mxd-services-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-1 mxd-grid-padding">
                        <div className="mxd-services-list__number">
                          <span className="meta-tag">[03]</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-services-list__title">
                          <h3>Soluções de marketing digital</h3>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-services-list__descr">
                          <p className="t-medium">
                            SEO e marketing de conteúdo, gestão de redes sociais
                            e campanhas pagas - ajudamos você a alcançar e engajar
                            seu público-alvo de forma eficaz.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-services-list__divider bottom" />
                </Link>
                {/* services item */}
                <Link
                  className="mxd-services-list__item active-cursor-image-tr"
                  data-cursor-image="/img/services/500x500_s04.webp"
                  href={`/services`}
                >
                  <div className="mxd-services-list__divider top" />
                  <div className="container-fluid px-0 mxd-services-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-1 mxd-grid-padding">
                        <div className="mxd-services-list__number">
                          <span className="meta-tag">[04]</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-services-list__title">
                          <h3>Identidade de marca</h3>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-services-list__descr">
                          <p className="t-medium">
                            Desde a criação de logotipos até estratégias completas
                            de marca, garantimos que sua empresa se destaque com
                            uma identidade visual única e comunicação consistente
                            em todos os pontos de contato.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-services-list__divider bottom" />
                </Link>
                {/* services item */}
                <Link
                  className="mxd-services-list__item active-cursor-image-tr"
                  data-cursor-image="/img/services/500x500_s05.webp"
                  href={`/services`}
                >
                  <div className="mxd-services-list__divider top" />
                  <div className="container-fluid px-0 mxd-services-list__inner">
                    <div className="row gx-0">
                      <div className="col-12 col-xl-1 mxd-grid-padding">
                        <div className="mxd-services-list__number">
                          <span className="meta-tag">[05]</span>
                        </div>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-padding">
                        <div className="mxd-services-list__title">
                          <h3>Suporte contínuo</h3>
                        </div>
                      </div>
                      <div className="col-12 col-xl-5 mxd-grid-padding">
                        <div className="mxd-services-list__descr">
                          <p className="t-medium">
                            Dedicamos tempo para entender suas necessidades
                            exclusivas e criar soluções de design sob medida
                            para ajudar você a gerar impacto.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-services-list__divider bottom" />
                </Link>
              </div>
            </div>
            {/* Block - Services List End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
