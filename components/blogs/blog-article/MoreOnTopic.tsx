"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "next/link";
import Image from "next/image";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
} from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
export default function MoreOnTopic() {
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-subtitle-mobile padding-bottom-preview"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v03 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-subtitle-s">
                <div className="container-fluid p-0">
                  <div className="row g-0 d-flex flex-column-reverse flex-xl-row">
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title">
                        <CommonAnimatedText
                          as="h2"
                          className="reveal-type"
                          animation="revealType"
                        >
                          Mais sobre o tema
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
                            href={`/blog-standard`}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              Todos os Artigos
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v03 End */}
            {/* Block - Blog Preview Grid x3 Start */}
            <div className="mxd-block">
              <div className="mxd-blog-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 mxd-blog-grid__gallery">
                    <CommonCardBatchAnimated
                      className="col-12 col-lg-4 mxd-blog-item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <div className="mxd-blog-item__date">
                        <span className="meta-date">15 de janeiro de 2026</span>
                      </div>
                      <Link
                        className="mxd-blog-item__media active-cursor-permanent"
                        data-cursor-text="Ler Post"
                        href={`/blog-article`}
                      >
                        <Image
                          className=""
                          alt="Imagem de Prévia do Blog"
                          src="/img/blog/preview/grid-x3/pr-01.webp"
                          width={1170}
                          height={800}
                        />
                      </Link>
                      <div className="mxd-blog-item__caption">
                        <div className="mxd-blog-item__title">
                          <Link className="blog-name-m" href={`/blog-article`}>
                            Inovações de frontend e jornadas de usuário
                          </Link>
                        </div>
                        <div className="mxd-blog-item__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            UI/UX
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Desenvolvimento
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Insights
                          </TextScramble>
                        </div>
                      </div>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-lg-4 mxd-blog-item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <div className="mxd-blog-item__date">
                        <span className="meta-date">28 de janeiro de 2026</span>
                      </div>
                      <Link
                        className="mxd-blog-item__media active-cursor-permanent"
                        data-cursor-text="Ler Post"
                        href={`/blog-article`}
                      >
                        <Image
                          className=""
                          alt="Imagem de Prévia do Blog"
                          src="/img/blog/preview/grid-x3/pr-02.webp"
                          width={1200}
                          height={1200}
                        />
                      </Link>
                      <div className="mxd-blog-item__caption">
                        <div className="mxd-blog-item__title">
                          <Link className="blog-name-m" href={`/blog-article`}>
                            Branding na criação de experiências digitais
                          </Link>
                        </div>
                        <div className="mxd-blog-item__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Conceito
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Editorial
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Evento
                          </TextScramble>
                        </div>
                      </div>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-lg-4 mxd-blog-item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <div className="mxd-blog-item__date">
                        <span className="meta-date">02 de fevereiro de 2026</span>
                      </div>
                      <Link
                        className="mxd-blog-item__media active-cursor-permanent"
                        data-cursor-text="Ler Post"
                        href={`/blog-article`}
                      >
                        <Image
                          className=""
                          alt="Imagem de Prévia do Blog"
                          src="/img/blog/preview/grid-x3/pr-03.webp"
                          width={1423}
                          height={800}
                        />
                      </Link>
                      <div className="mxd-blog-item__caption">
                        <div className="mxd-blog-item__title">
                          <Link className="blog-name-m" href={`/blog-article`}>
                            Projetando para o futuro dos espaços digitais interativos
                          </Link>
                        </div>
                        <div className="mxd-blog-item__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Midjourney
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Notícias
                          </TextScramble>
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Editorial
                          </TextScramble>
                        </div>
                      </div>
                    </CommonCardBatchAnimated>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Blog Preview Grid x3 End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
