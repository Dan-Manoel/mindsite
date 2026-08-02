"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import Image from "next/image";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
} from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function BlogPreview() {
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-title padding-bottom-preview"
      >
        <PinnedSection.Inner>
          {/* Block - Section Title v04 Start */}
          <div className="mxd-block">
            <div className="mxd-section-title pre-subtitle-s controls-bottom-mobile">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-6 mxd-grid-item-s">
                    <div className="mxd-section-title__title pre-caption">
                      <CommonAnimatedText
                        as="h2"
                        className="mxd-split-lines"
                        animation="splitLines"
                      >
                        Últimas
                        <br />
                        notícias
                      </CommonAnimatedText>
                    </div>
                  </div>
                  <div className="col-12 col-xl-5 mxd-grid-item-s">
                    <div className="mxd-section-title__data top-controls">
                      <CommonScrollAnimated
                        className="mxd-section-title__controls anim-uni-in-up"
                        as="div"
                        animation="inUp"
                      >
                        <Link
                          className="btn btn-line btn-line-default"
                          href={`/blog-standard`}
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            Ver Artigos
                          </TextScramble>
                        </Link>
                      </CommonScrollAnimated>
                      <div className="mxd-section-title__caption pre-controls">
                        <CommonAnimatedText
                          as="p"
                          className="t-bold t-large mxd-split-lines"
                          animation="splitLines"
                        >
                          Ideias inspiradoras, insights criativos e as novidades em
                          design e tecnologia.
                          <span>
                            Impulsionando a inovação na sua jornada digital.
                          </span>
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title v04 End */}
          {/* Block - Blog Preview Grid x4 Start */}
          <div className="mxd-block">
            <div className="mxd-blog-grid">
              <div className="container-fluid p-0">
                <div className="row g-0 mxd-blog-grid__gallery">
                  {/* item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-lg-3 mxd-blog-item mxd-blog-item-s animate-card-4"
                    as="div"
                    columns={4}
                  >
                    <div className="mxd-blog-item__date">
                      <span className="meta-date">02 de Fevereiro de 2026</span>
                    </div>
                    <Link
                      className="mxd-blog-item__media active-cursor-permanent"
                      data-cursor-text="Ler Artigo"
                      href={`/blog-article`}
                    >
                      <Image
                        className=""
                        alt="Blog Preview Image"
                        src="/img/blog/preview/grid-x3/pr-01.webp"
                        width={1170}
                        height={800}
                      />
                    </Link>
                    <div className="mxd-blog-item__caption">
                      <div className="mxd-blog-item__title">
                        <Link className="blog-name-s" href={`/blog-article`}>
                          Inovações no Frontend e jornada do usuário
                        </Link>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-lg-3 mxd-blog-item mxd-blog-item-s animate-card-4"
                    as="div"
                    columns={4}
                  >
                    <div className="mxd-blog-item__date">
                      <span className="meta-date">28 de Janeiro de 2026</span>
                    </div>
                    <Link
                      className="mxd-blog-item__media active-cursor-permanent"
                      data-cursor-text="Ler Artigo"
                      href={`/blog-article`}
                    >
                      <Image
                        className=""
                        alt="Blog Preview Image"
                        src="/img/blog/preview/grid-x3/pr-02.webp"
                        width={1200}
                        height={1200}
                      />
                    </Link>
                    <div className="mxd-blog-item__caption">
                      <div className="mxd-blog-item__title">
                        <Link className="blog-name-s" href={`/blog-article`}>
                          O poder do branding em experiências digitais
                        </Link>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-lg-3 mxd-blog-item mxd-blog-item-s animate-card-4"
                    as="div"
                    columns={4}
                  >
                    <div className="mxd-blog-item__date">
                      <span className="meta-date">15 de Janeiro de 2026</span>
                    </div>
                    <Link
                      className="mxd-blog-item__media active-cursor-permanent"
                      data-cursor-text="Ler Artigo"
                      href={`/blog-article`}
                    >
                      <Image
                        className=""
                        alt="Blog Preview Image"
                        src="/img/blog/preview/grid-x3/pr-04.webp"
                        width={853}
                        height={1280}
                      />
                    </Link>
                    <div className="mxd-blog-item__caption">
                      <div className="mxd-blog-item__title">
                        <Link className="blog-name-s" href={`/blog-article`}>
                          Elevando workshops digitais com design envolvente
                        </Link>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-lg-3 mxd-blog-item mxd-blog-item-s animate-card-4"
                    as="div"
                    columns={4}
                  >
                    <div className="mxd-blog-item__date">
                      <span className="meta-date">03 de Janeiro de 2026</span>
                    </div>
                    <Link
                      className="mxd-blog-item__media active-cursor-permanent"
                      data-cursor-text="Ler Artigo"
                      href={`/blog-article`}
                    >
                      <Image
                        className=""
                        alt="Blog Preview Image"
                        src="/img/blog/preview/grid-x3/pr-03.webp"
                        width={1423}
                        height={800}
                      />
                    </Link>
                    <div className="mxd-blog-item__caption">
                      <div className="mxd-blog-item__title">
                        <Link className="blog-name-s" href={`/blog-article`}>
                          Design para o futuro dos espaços digitais interativos
                        </Link>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Blog Preview Grid x4 End */}
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
