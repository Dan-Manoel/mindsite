"use client";

import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import Image from "next/image";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";
export default function Blog() {
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section padding-bottom-default">
          <div className="mxd-container grid-l-container">
            <CommonLoadFade index={0}>
              <div className="mxd-posts-area loading-fade">
                {/* Posts Container Start */}
                <div className="mxd-posts-container mxd-grid-item">
                  {/* Featured Post Start */}
                  <article className="mxd-post post-featured">
                    <Link
                      className="post-featured__container active-cursor-permanent"
                      data-cursor-text="Ler Post"
                      href={`/blog-article`}
                    >
                      <div className="post-featured__thumb">
                        <Image
                          alt="Imagem Destaque do Post"
                          src="/img/blog/1400x900_pf-01.webp"
                          width={1400}
                          height={900}
                        />
                        <div className="post-featured__cover" />
                      </div>
                      <div className="post-featured__content">
                        <div className="post-featured__meta">
                          <div className="post-featured__data">
                            <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                              06 de janeiro de 2026
                            </TextScramble>
                            <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                              5min de leitura
                            </TextScramble>
                          </div>
                          <div className="post-featured__categories">
                            <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                              Gemini
                            </TextScramble>
                            <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                              IA
                            </TextScramble>
                            <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                              Engenharia
                            </TextScramble>
                          </div>
                        </div>
                        <div className="post-featured__info">
                          <h2 className="post-featured__title permanent">
                            Minha jornada na arquitetura de software na era da IA
                          </h2>
                          <div className="post-featured__excerpt">
                            <p className="t-medium t-permanent">
                              Descubra como a inteligência artificial está
                              transformando os processos artísticos, ampliando
                              limites e inspirando novas possibilidades no
                              design digital.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                  {/* Featured Post End */}
                  {/* Regular Posts Group Start */}
                  <div className="mxd-posts-list">
                    {/* simple post */}
                    <article className="mxd-post post-simple">
                      <div className="post-simple__divider top" />
                      <Link
                        className="post-simple__container active-cursor-image active-cursor-permanent"
                        data-cursor-image="/img/blog/preview/500x500_pr01.webp"
                        data-cursor-text="Ler Post"
                        href={`/inovacoes-frontend`}
                      >
                        <div className="container-fluid px-0 post-simple__inner">
                          <div className="row gx-0">
                            <div className="col-12">
                              <div className="post-simple__meta">
                                <span className="meta-tag comma-tag">
                                  Imprensa
                                </span>
                                <span className="meta-tag comma-tag">
                                  Insights
                                </span>
                                <span className="meta-time">5 min</span>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-7">
                              <div className="post-simple__title">
                                <h3>Inovações de frontend e jornadas de usuário</h3>
                                <div className="post-simple__data">
                                  <span className="meta-author comma-tag">
                                    Danilo Oliveira
                                  </span>
                                  <span className="meta-date">
                                    02 de fevereiro de 2026
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-5">
                              <div className="post-simple__excerpt">
                                <p className="t-medium">
                                  Descubra como a inteligência artificial está
                                  transformando os processos artísticos, ampliando
                                  limites e inspirando novas possibilidades no
                                  design digital.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="post-simple__divider bottom" />
                    </article>
                    {/* simple post */}
                    <article className="mxd-post post-simple">
                      <div className="post-simple__divider top" />
                      <Link
                        className="post-simple__container active-cursor-image active-cursor-permanent"
                        data-cursor-image="/img/blog/preview/500x500_pr02.webp"
                        data-cursor-text="Ler Post"
                        href={`/elevando-workshops`}
                      >
                        <div className="container-fluid px-0 post-simple__inner">
                          <div className="row gx-0">
                            <div className="col-12">
                              <div className="post-simple__meta">
                                <span className="meta-tag comma-tag">Notícias</span>
                                <span className="meta-tag comma-tag">
                                  Insights
                                </span>
                                <span className="meta-time">3 min</span>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-7">
                              <div className="post-simple__title">
                                <h3>
                                  Elevando workshops digitais com design envolvente
                                </h3>
                                <div className="post-simple__data">
                                  <span className="meta-author comma-tag">
                                    Jenny Pineapple
                                  </span>
                                  <span className="meta-date">
                                    28 de janeiro de 2026
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-5">
                              <div className="post-simple__excerpt">
                                <p className="t-medium">
                                  Descubra como a inteligência artificial está
                                  transformando os processos artísticos, ampliando
                                  limites e inspirando novas possibilidades no
                                  design digital.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="post-simple__divider bottom" />
                    </article>
                    {/* simple post */}
                    <article className="mxd-post post-simple">
                      <div className="post-simple__divider top" />
                      <Link
                        className="post-simple__container active-cursor-image active-cursor-permanent"
                        data-cursor-image="/img/blog/preview/500x500_pr03.webp"
                        data-cursor-text="Ler Post"
                        href={`/mundos-3d`}
                      >
                        <div className="container-fluid px-0 post-simple__inner">
                          <div className="row gx-0">
                            <div className="col-12">
                              <div className="post-simple__meta">
                                <span className="meta-tag comma-tag">3D</span>
                                <span className="meta-tag comma-tag">
                                  Design
                                </span>
                                <span className="meta-tag comma-tag">
                                  Workshop Digital
                                </span>
                                <span className="meta-time">5 min</span>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-7">
                              <div className="post-simple__title">
                                <h3>
                                  Criando mundos 3D imersivos com ferramentas modernas
                                </h3>
                                <div className="post-simple__data">
                                  <span className="meta-author comma-tag">
                                    John Lemon
                                  </span>
                                  <span className="meta-date">
                                    15 de janeiro de 2026
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-5">
                              <div className="post-simple__excerpt">
                                <p className="t-medium">
                                  Descubra como a inteligência artificial está
                                  transformando os processos artísticos, ampliando
                                  limites e inspirando novas possibilidades no
                                  design digital.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="post-simple__divider bottom" />
                    </article>
                    {/* simple post */}
                    <article className="mxd-post post-simple">
                      <div className="post-simple__divider top" />
                      <Link
                        className="post-simple__container active-cursor-image active-cursor-permanent"
                        data-cursor-image="/img/blog/preview/500x500_pr04.webp"
                        data-cursor-text="Ler Post"
                        href={`/design-em-motion`}
                      >
                        <div className="container-fluid px-0 post-simple__inner">
                          <div className="row gx-0">
                            <div className="col-12">
                              <div className="post-simple__meta">
                                <span className="meta-tag comma-tag">
                                  Design em Motion
                                </span>
                                <span className="meta-tag comma-tag">
                                  Workshop
                                </span>
                                <span className="meta-time">3 min</span>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-7">
                              <div className="post-simple__title">
                                <h3>
                                  Dando vida a ideias com design em motion
                                </h3>
                                <div className="post-simple__data">
                                  <span className="meta-author comma-tag">
                                    Jenny Pineapple
                                  </span>
                                  <span className="meta-date">
                                    03 de janeiro de 2026
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-5">
                              <div className="post-simple__excerpt">
                                <p className="t-medium">
                                  Descubra como a inteligência artificial está
                                  transformando os processos artísticos, ampliando
                                  limites e inspirando novas possibilidades no
                                  design digital.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="post-simple__divider bottom" />
                    </article>
                    {/* simple post */}
                    <article className="mxd-post post-simple">
                      <div className="post-simple__divider top" />
                      <Link
                        className="post-simple__container active-cursor-image active-cursor-permanent"
                        data-cursor-image="/img/blog/preview/500x500_pr05.webp"
                        data-cursor-text="Ler Post"
                        href={`/web-design-minimalista`}
                      >
                        <div className="container-fluid px-0 post-simple__inner">
                          <div className="row gx-0">
                            <div className="col-12">
                              <div className="post-simple__meta">
                                <span className="meta-tag comma-tag">
                                  Web Design
                                </span>
                                <span className="meta-tag comma-tag">
                                  Branding
                                </span>
                                <span className="meta-tag comma-tag">UI</span>
                                <span className="meta-time">7 min</span>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-7">
                              <div className="post-simple__title">
                                <h3>
                                  Dominando a arte do web design minimalista
                                </h3>
                                <div className="post-simple__data">
                                  <span className="meta-author comma-tag">
                                    John Lemon
                                  </span>
                                  <span className="meta-date">
                                    21 de dezembro de 2025
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-xxl-5">
                              <div className="post-simple__excerpt">
                                <p className="t-medium">
                                  Descubra como a inteligência artificial está
                                  transformando os processos artísticos, ampliando
                                  limites e inspirando novas possibilidades no
                                  design digital.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                      <div className="post-simple__divider bottom" />
                    </article>
                  </div>
                  {/* Regular Posts Group End */}
                  {/* Blog Pagination Start */}
                  <div className="mxd-blog-pagination">
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
                {/* Posts Container End */}
                {/* Sidebar Start */}
                <div className="mxd-sidebar mxd-grid-item">
                  {/* search widget */}
                  <div className="mxd-sidebar__widget widget-search">
                    <div className="widget-search__form">
                      <form
                        className="form search-form"
                        action="#"
                        method="get"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <input
                          id="search"
                          type="search"
                          name="search"
                          placeholder="Pesquisar"
                        />
                        <button
                          className="btn btn-form no-scale btn-absolute-right btn-line-medium"
                          type="submit"
                          aria-label="Pesquisar"
                        >
                          <i className="ph ph-magnifying-glass" />
                        </button>
                      </form>
                    </div>
                  </div>
                  {/* categories widget */}
                  <div className="mxd-sidebar__widget">
                    <div className="widget__title">
                      <p>/ Descobrir</p>
                    </div>
                    <ul className="widget__categories">
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Design
                          <span>07</span>
                        </a>
                      </li>
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Desenvolvimento
                          <span>10</span>
                        </a>
                      </li>
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Marketing Digital
                          <span>05</span>
                        </a>
                      </li>
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Tecnologia
                          <span>12</span>
                        </a>
                      </li>
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Estudos de Caso
                          <span>05</span>
                        </a>
                      </li>
                      <li className="categories__item">
                        <a href="#0" className="categories__link">
                          Tendências
                          <span>03</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* recent posts */}
                  <div className="mxd-sidebar__widget">
                    <div className="widget__title">
                      <p>/ Últimas publicações</p>
                    </div>
                    <ul className="widget__recent-posts">
                      <li className="recent-post__item">
                        <div className="recent-post__thumb">
                          <Link href={`/inovacoes-frontend`}>
                            <Image
                              alt="Prévia da Publicação Recente"
                              src="/img/blog/300x300_rp-01.webp"
                              width={300}
                              height={300}
                            />
                          </Link>
                        </div>
                        <div className="recent-post__content">
                          <div className="recent-post__meta">
                            <a href="#0">
                              <TextScramble className="meta-tag tag-s comma-tag mxd-scramble">
                                Imprensa
                              </TextScramble>
                            </a>
                            <a href="#0">
                              <TextScramble className="meta-tag tag-s comma-tag mxd-scramble">
                                Insights
                              </TextScramble>
                            </a>
                          </div>
                          <div className="recent-post__title">
                            <Link href={`/inovacoes-frontend`}>
                              Inovações de frontend e
                              <span>jornadas de usuário</span>
                            </Link>
                          </div>
                        </div>
                      </li>
                      <li className="recent-post__item">
                        <div className="recent-post__thumb">
                          <Link href={`/blog-article`}>
                            <Image
                              alt="Prévia da Publicação Recente"
                              src="/img/blog/300x300_rp-02.webp"
                              width={300}
                              height={300}
                            />
                          </Link>
                        </div>
                        <div className="recent-post__content">
                          <div className="recent-post__meta">
                            <a href="#0">
                              <TextScramble className="meta-tag tag-s comma-tag mxd-scramble">
                                Notícias
                              </TextScramble>
                            </a>
                            <a href="#0">
                              <TextScramble className="meta-tag tag-s comma-tag mxd-scramble">
                                Tech
                              </TextScramble>
                            </a>
                          </div>
                          <div className="recent-post__title">
                            <Link href={`/blog-article`}>
                              Minha jornada na arquitetura de
                              <span>software na era da IA</span>
                            </Link>
                          </div>
                        </div>
                      </li>
                      <li className="recent-post__item">
                        <div className="recent-post__thumb">
                          <Link href={`/elevando-workshops`}>
                            <Image
                              alt="Prévia da Publicação Recente"
                              src="/img/blog/300x300_rp-03.webp"
                              width={300}
                              height={300}
                            />
                          </Link>
                        </div>
                        <div className="recent-post__content">
                          <div className="recent-post__meta">
                            <a href="#0">
                              <TextScramble className="meta-tag tag-s comma-tag mxd-scramble">
                                Arte 3D
                              </TextScramble>
                            </a>
                            <a href="#0">
                              <TextScramble className="meta-tag tag-s mxd-scramble">
                                Motion
                              </TextScramble>
                            </a>
                          </div>
                          <div className="recent-post__title">
                            <Link href={`/elevando-workshops`}>
                              Elevando workshops digitais
                              <span>com design envolvente</span>
                            </Link>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* ad */}
                  <div className="mxd-sidebar__widget widget-ad">
                    <a className="widget__image" href="#0" target="_blank">
                      <Image
                        alt="Imagem do Anúncio"
                        src="/img/blog/1200x1320_ad-01.webp"
                        width={1200}
                        height={1320}
                      />
                    </a>
                    <div className="widget__tags">
                      <span className="tag tag-m tag-bg permanent">
                        Patrocinado
                      </span>
                    </div>
                  </div>
                  {/* about widget */}
                  <div className="mxd-sidebar__widget bg-base-tint radius-m widget-about">
                    <div className="widget__title">
                      <p>/ Sobre</p>
                    </div>
                    <div className="widget__descr">
                      <p className="t-small">
                        Mergulhe nas últimas tendências,{" "}
                        <span>
                          descubra insights valiosos do setor e explore conselhos
                          práticos.
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* socials */}
                  <div className="mxd-sidebar__widget bg-base-tint radius-m widget-socials">
                    <div className="widget__title">
                      <p>/ Ecossistema</p>
                    </div>
                    <div className="widget__social-links-small">
                      {/* item */}
                      <div className="social-links-small__item">
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href="https://vercel.com/"
                          target="_blank"
                        >
                          <p className="social-links-small__title">Vercel</p>
                          <div className="social-links-small__icon">
                            <i>
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                enableBackground="new 0 0 18 18"
                                xmlSpace="preserve"
                              >
                                <path
                                  d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                                />
                              </svg>
                            </i>
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                      {/* item */}
                      <div className="social-links-small__item">
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href="https://supabase.com/"
                          target="_blank"
                        >
                          <p className="social-links-small__title">Supabase</p>
                          <div className="social-links-small__icon">
                            <i>
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                enableBackground="new 0 0 18 18"
                                xmlSpace="preserve"
                              >
                                <path
                                  d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                                />
                              </svg>
                            </i>
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                      {/* item */}
                      <div className="social-links-small__item">
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href="https://github.com/"
                          target="_blank"
                        >
                          <p className="social-links-small__title">GitHub</p>
                          <div className="social-links-small__icon">
                            <i>
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                enableBackground="new 0 0 18 18"
                                xmlSpace="preserve"
                              >
                                <path
                                  d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                                />
                              </svg>
                            </i>
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                      {/* item */}
                      <div className="social-links-small__item">
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href="https://www.figma.com/community"
                          target="_blank"
                        >
                          <p className="social-links-small__title">Figma Community</p>
                          <div className="social-links-small__icon">
                            <i>
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                enableBackground="new 0 0 18 18"
                                xmlSpace="preserve"
                              >
                                <path
                                  d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                                />
                              </svg>
                            </i>
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                      {/* item */}
                      <div className="social-links-small__item">
                        <div className="social-links-small__divider" />
                        <a
                          className="social-links-small__link"
                          href="https://react.dev/"
                          target="_blank"
                        >
                          <p className="social-links-small__title">
                            React
                          </p>
                          <div className="social-links-small__icon">
                            <i>
                              <svg
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 18 18"
                                enableBackground="new 0 0 18 18"
                                xmlSpace="preserve"
                              >
                                <path
                                  d="M18,0v14.4h-3.6V7.2h-3.6V3.6H3.6V0H18z M7.2,10.8h3.6V7.2H7.2C7.2,7.2,7.2,10.8,7.2,10.8z M3.6,14.4h3.6v-3.6H3.6V14.4z
                            M0,18h3.6v-3.6H0V18z"
                                />
                              </svg>
                            </i>
                          </div>
                        </a>
                        <div className="social-links-small__divider" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sidebar End */}
              </div>
            </CommonLoadFade>
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
