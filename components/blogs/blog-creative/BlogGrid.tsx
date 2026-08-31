import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import Image from "next/image";
import { CommonCardBatchAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function BlogGrid() {
  return (
    <>
      <BlurSection id="posts" className="mxd-section bg-color-base padding-bottom-tag-m">
        <div className="mxd-container grid-l-container">
          <div className="mxd-posts-area">
            <div className="mxd-posts-container fullwidth-posts-container">
              {/* Regular Posts Alt Grid Start */}
              <div className="mxd-posts-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 mxd-posts-grid__row">
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">02 de fevereiro de 2026</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Ler Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Imagem de Prévia do Blog"
                            src="/img/blog/pr-01.webp"
                            width={1170}
                            height={800}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/inovacoes-frontend`}>
                                Inovações de frontend e jornadas de usuário
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                UI/UX
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Desenvolvimento
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Insights
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">28 de janeiro de 2026</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Ler Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Imagem de Prévia do Blog"
                            src="/img/blog/pr-02.webp"
                            width={1200}
                            height={1200}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/blog-article`}>
                                Branding na criação de experiências digitais
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Conceito
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Editorial
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Evento
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">15 de janeiro de 2026</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Ler Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Imagem de Prévia do Blog"
                            src="/img/blog/pr-03.webp"
                            width={1423}
                            height={800}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/blog-article`}>
                                Projetando para o futuro dos espaços digitais
                                interativos
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Midjourney
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Notícias
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Editorial
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">03 de janeiro de 2026</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Ler Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Imagem de Prévia do Blog"
                            src="/img/blog/pr-04.webp"
                            width={896}
                            height={1152}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/blog-article`}>
                                Inovações de frontend e jornadas de usuário
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                UI/UX
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Desenvolvimento
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Insights
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">21 de dezembro de 2025</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Ler Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Imagem de Prévia do Blog"
                            src="/img/blog/pr-05.webp"
                            width={1280}
                            height={853}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/blog-article`}>
                                Branding na criação de experiências digitais
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Conceito
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Editorial
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Evento
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                    <CommonCardBatchAnimated
                      className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-posts-grid__item animate-card-3"
                      as="div"
                      columns={3}
                    >
                      <article className="mxd-post post-simple-alt">
                        <div className="post-simple-alt__date">
                          <span className="meta-date">15 de dezembro de 2025</span>
                        </div>
                        <Link
                          className="post-simple-alt__media active-cursor-permanent"
                          data-cursor-text="Ler Post"
                          href={`/blog-article`}
                        >
                          <Image
                            className=""
                            alt="Imagem de Prévia do Blog"
                            src="/img/blog/pr-06.webp"
                            width={853}
                            height={1280}
                          />
                        </Link>
                        <div className="post-simple-alt__caption">
                          <div className="post-simple-alt__title">
                            <h3>
                              <Link href={`/blog-article`}>
                                Projetando para o futuro dos espaços digitais
                                interativos
                              </Link>
                            </h3>
                          </div>
                          <div className="post-simple-alt__tags">
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Midjourney
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Notícias
                              </TextScramble>
                            </a>
                            <a href="#0" className="tag tag-s tag-medium">
                              <TextScramble className="mxd-scramble">
                                Editorial
                              </TextScramble>
                            </a>
                          </div>
                        </div>
                      </article>
                    </CommonCardBatchAnimated>
                  </div>
                </div>
              </div>
              {/* Regular Posts Alt Grid End */}
              {/* Blog Pagination Start */}
              <div className="mxd-blog-pagination pagination-fullwidth mxd-grid-item">
                <div className="mxd-blog-pagination__inner">
                  <nav className="mxd-blog-pagination__items">
                    <a
                      className="mxd-blog-pagination__item blog-pagination-control prev btn btn-line-icon btn-line-default slide-left"
                      href="#0"
                      aria-label="Página Anterior"
                    >
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 18 18"
                        >
                          <path d="M7.2,18v-3.6h3.6v3.6h-3.6ZM3.6,7.2H0v3.6h3.6v3.6h3.6v-3.6h10.8v-3.6H7.2v-3.6h-3.6s0,3.6,0,3.6ZM7.2,3.6h3.6V0h-3.6v3.6Z" />
                        </svg>
                      </i>
                      <TextScramble className="btn-caption mxd-scramble">
                        Anterior
                      </TextScramble>
                    </a>
                    <a
                      href="#0"
                      className="mxd-blog-pagination__item blog-pagination-number btn mxd-scramble"
                    >
                      <span className="btn-caption">01</span>
                    </a>
                    <a
                      href="#0"
                      className="mxd-blog-pagination__item blog-pagination-number btn mxd-scramble active"
                    >
                      <span className="btn-caption">02</span>
                    </a>
                    <a
                      href="#0"
                      className="mxd-blog-pagination__item blog-pagination-number btn mxd-scramble"
                    >
                      <span className="btn-caption">03</span>
                    </a>
                    <a
                      className="mxd-blog-pagination__item blog-pagination-control next btn btn-line-icon btn-line-default slide-right"
                      href="#0"
                      aria-label="Próxima Página"
                    >
                      <TextScramble className="btn-caption mxd-scramble">
                        Próximo
                      </TextScramble>
                      <i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.1"
                          viewBox="0 0 18 18"
                        >
                          <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                        </svg>
                      </i>
                    </a>
                  </nav>
                </div>
              </div>
              {/* Blog Pagination End */}
            </div>
          </div>
        </div>
      </BlurSection>
    </>
  );
}
