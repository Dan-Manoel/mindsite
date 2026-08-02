import Link from "next/link";
import Image from "next/image";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";
export default function InnerHeadlineArticle() {
  return (
    <CommonLoadAnimation>
      <>
        <div className="mxd-section">
          <div className="mxd-container fullwidth-container">
            {/* Block - Featured Article Fullscreen Start */}
            <div className="mxd-block loading-wrap">
              <article className="mxd-post post-featured-fullscreen">
                {/* breadcrumbs block */}
                <div className="mxd-container grid-l-container">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      <div className="col-12 mxd-grid-item">
                        {/* breadcrumbs */}
                        <CommonLoadFade index={0}>
                          <div className="inner-headline__breadcrumbs loading-fade">
                            <div className="breadcrumbs__nav permanent">
                              <span>
                                <Link href={`/`}>
                                  <TextScramble className="mxd-scramble">
                                    Início
                                  </TextScramble>
                                </Link>
                              </span>
                              <span className="current-item">Insights </span>
                            </div>
                          </div>
                        </CommonLoadFade>
                      </div>
                    </div>
                  </div>
                </div>
                {/* post */}
                <div className="post-featured-fullscreen__thumb">
                  <Image
                    alt="Imagem Destaque do Post"
                    src="/img/blog/1920x1200_pf-01.webp"
                    width={1920}
                    height={1200}
                  />
                  <div className="post-featured-fullscreen__cover" />
                </div>
                <div className="post-featured-fullscreen__container">
                  <div className="mxd-container grid-l-container">
                    <div className="container-fluid p-0">
                      <div className="row g-0">
                        {/* link */}
                        <div className="col-12 mxd-grid-item">
                          <CommonLoadFade index={1}>
                            <div className="post-featured-fullscreen__link loading-fade">
                              <Link
                                className="btn btn-line btn-line-permanent"
                                href={`/blog-article`}
                              >
                                <TextScramble className="btn-caption mxd-scramble">
                                  Destaque
                                </TextScramble>
                              </Link>
                            </div>
                          </CommonLoadFade>
                        </div>
                        {/* info */}
                        <div className="col-12 col-xl-8 mxd-grid-item">
                          <Link
                            className="post-featured-fullscreen__info active-cursor-permanent"
                            data-cursor-text="Ler Post"
                            href={`/blog-article`}
                          >
                            <CommonAnimatedText
                              as="h2"
                              className="post-featured-fullscreen__title permanent loading-split"
                              animation="splitLinesLoad"
                            >
                              Minha jornada rumo ao futuro da arte
                            </CommonAnimatedText>
                            <CommonLoadItem index={0}>
                              <div className="post-featured-fullscreen__excerpt loading-item">
                                <p className="t-large t-permanent">
                                  Descubra como a inteligência artificial está
                                  transformando os processos artísticos, ampliando
                                  limites e inspirando novas possibilidades no
                                  design digital.
                                </p>
                              </div>
                            </CommonLoadItem>
                          </Link>
                        </div>
                        {/* aside */}
                        <div className="col-12 col-xl-4 mxd-grid-item">
                          <div className="post-featured-fullscreen__aside">
                            {/* meta */}
                            <div className="post-featured-fullscreen__meta">
                              <div className="post-featured-fullscreen__data">
                                <CommonLoadItem index={1}>
                                  <span className="tag tag-s-mobile tag-permanent loading-item">
                                    27 de janeiro de 2026
                                  </span>
                                </CommonLoadItem>
                                <CommonLoadItem index={2}>
                                  <span className="tag tag-s-mobile tag-permanent loading-item">
                                    5min de leitura
                                  </span>
                                </CommonLoadItem>
                              </div>
                              <div className="post-featured-fullscreen__categories">
                                <CommonLoadItem index={3}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                      Midjourney
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                                <CommonLoadItem index={4}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                      Motion
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                                <CommonLoadItem index={5}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-s-mobile tag-permanent mxd-scramble">
                                      Editorial
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                              </div>
                            </div>
                            {/* button */}
                            <CommonLoadFade index={2}>
                              <div className="post-featured-fullscreen__btngroup align-end-desktop tags-medium-title loading-fade">
                                <SmoothAnchorLink
                                  className="btn btn-line-icon btn-line-icon-small btn-line-permanent slide-down"
                                  targetId="posts"
                                >
                                  <TextScramble className="btn-caption mxd-scramble">
                                    Role para explorar
                                  </TextScramble>
                                  <i>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      version="1.1"
                                      viewBox="0 0 18 18"
                                    >
                                      <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z" />
                                    </svg>
                                  </i>
                                </SmoothAnchorLink>
                              </div>
                            </CommonLoadFade>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            {/* Block - Featured Article Fullscreen End */}
          </div>
        </div>
      </>
    </CommonLoadAnimation>
  );
}
