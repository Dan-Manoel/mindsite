import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import Image from "next/image";
import TextScramble from "@/components/animations/TextScramble";
import FooterBackToTop from "@/components/footers/FooterBackToTop";
import {
  CommonScrollAnimated,
  CommonScrollAnimatedLink,
} from "@/components/animations/CommonScrollAnimated";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";
import {
  footer1BackgroundImages,
  footer1ForegroundImages,
  footer1NavColumns,
  footer1PromoItems,
} from "@/data/footer";

const navLinkClass = "anim-uni-slide-down";

export default function Footer1() {
  return (
    <BlurSection as="footer" className="mxd-demo-footer">
      {/* Footer Block - Background Start */}
      <div className="mxd-demo-footer__background">
        {footer1BackgroundImages.map((layer) => (
          <div key={layer.src} className={layer.wrapperClass}>
            <Image
              alt={layer.alt}
              src={layer.src}
              width={layer.width}
              height={layer.height}
            />
          </div>
        ))}
      </div>
      {/* Footer Block - Background End */}
      <div className="mxd-container grid-l-container">
        {/* Footer Block - Navigation Start */}
        <div className="mxd-block">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-12 col-xxl-3 mxd-demo-footer__item mxd-grid-item">
                <CommonScrollAnimated
                  className="mxd-demo-footer__logo anim-uni-in-up"
                  as="div"
                  animation="inUp"
                >
                  <Link className="mxd-logo" href={`/`}>
                    {/* logo icon */}
                    <svg
                      className="mxd-logo__image"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 42.4 36"
                    >
                      <path d="M25.8,13.8h2.8v5.5h-2.8v-5.5ZM13.8,16.6v2.8h2.8v-5.5h-2.8v2.8ZM32.2,0v2.8h-2.8V0h2.8ZM26.7,5.5h2.8v-2.8h-2.8v2.8ZM21.2,5.5h-5.5v2.8h11.1v-2.8h-5.5ZM12.8,2.8v2.8h2.8v-2.8h-2.8ZM10.1,0v2.8h2.8V0h-2.8ZM7.3,5.5v5.5h2.8V2.8h-2.8v2.8ZM4.5,13.8v2.8H0v2.8h2.8v2.8H0v2.8h2.8v11.1h2.8v-8.3h5.5v-2.8h-5.5v-8.3h1.9v-5.5h-2.9v2.8ZM35,5.5v-2.8h-2.8v8.3h2.8v-5.5ZM42.4,19.4v-2.8h-4.7v-5.5h-2.8v5.5h1.9v8.3h-5.5v2.8h5.5v8.3h2.8v-11.1h2.8v-2.8h-2.8v-2.8h2.8Z" />
                    </svg>
                    {/* logo text */}
                    <div className="mxd-logo__text">
                      <TextScramble className="mxd-scramble">
                        Azurio
                      </TextScramble>
                      <TextScramble className="mxd-scramble">
                        Template
                      </TextScramble>
                    </div>
                  </Link>
                </CommonScrollAnimated>
                <div className="mxd-demo-footer__slogan">
                  <CommonAnimatedText
                    as="p"
                    className="t-bold t-large t-120 mxd-split-lines-reverse"
                    animation="splitLinesReverse"
                  >
                    New Azurio template is here!
                    <span>
                      Showcase your projects, services and expertise with
                      impact.
                    </span>
                  </CommonAnimatedText>
                </div>
                <CommonScrollAnimated
                  className="mxd-demo-footer__btn anim-uni-in-up"
                  as="div"
                  animation="inUp"
                >
                  <a
                    className="btn btn-default-icon-small btn-default-fullwidth-mobile btn-default-accent slide-right"
                    href="https://themeforest.net/item/azurio-digital-agency-personal-portfolio-nextjs-template/63087539?s_rank=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TextScramble className="btn-caption mxd-scramble">
                      Buy Now
                    </TextScramble>
                    {/* <i class="btn-icon ph-bold ph-arrow-right"></i> */}
                    <i className="btn-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 18 18"
                      >
                        <path d="M3.1,15.6h2.4v2.4h-2.4v-2.4ZM10.2,18h2.4v-2.4h-2.4v2.4ZM14.9,4.7H5.5V0H.8v2.4h2.4v11.8h9.4v-2.4h-7.1v-4.7h9.4v2.4h2.4v-4.7h-2.4ZM12.5,11.8h2.4v-2.4h-2.4v2.4Z" />
                      </svg>
                    </i>
                  </a>
                  <SmoothAnchorLink
                    className="btn btn-default-icon-small btn-default-fullwidth-mobile btn-default-outline slide-right-up"
                    targetId="demo"
                  >
                    <TextScramble className="btn-caption mxd-scramble">
                      Demo
                    </TextScramble>
                    {/* <i class="btn-icon ph-bold ph-arrow-right"></i> */}
                    <i className="btn-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        viewBox="0 0 18 18"
                      >
                        <path d="M18,0v14.4h-3.6v-7.2h-3.6v-3.6H3.6V0h14.4ZM7.2,10.8h3.6v-3.6h-3.6s0,3.6,0,3.6ZM3.6,14.4h3.6v-3.6h-3.6v3.6ZM0,18h3.6v-3.6H0v3.6Z" />
                      </svg>
                    </i>
                  </SmoothAnchorLink>
                </CommonScrollAnimated>
              </div>
              <div className="col-12 col-xxl-6 mxd-demo-footer__item">
                <nav className="mxd-demo-footer__nav">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      {footer1NavColumns.map((column, columnIndex) => (
                        <div
                          key={`footer-nav-col-${columnIndex}`}
                          className={column.className}
                        >
                          {column.blocks.map((block) => (
                            <div
                              key={block.title}
                              className="mxd-demo-footer-nav__block"
                            >
                              <div className="mxd-footer-nav02__title">
                                <CommonScrollAnimated
                                  className="footer-data anim-uni-slide-down"
                                  as="p"
                                  animation="slideDownLine"
                                >
                                  <span>{block.title}</span>
                                </CommonScrollAnimated>
                              </div>
                              <div className="mxd-footer-nav02__list small">
                                <ul>
                                  {block.links.map((link) => (
                                    <li key={`${block.title}-${link.href}`}>
                                      <CommonScrollAnimatedLink
                                        className={navLinkClass}
                                        href={link.href}
                                        animation="slideDownLine"
                                      >
                                        <span>{link.label}</span>
                                      </CommonScrollAnimatedLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
              <div className="col-12 col-xxl-3 mxd-demo-footer__item mxd-grid-item">
                <div className="mxd-demo-footer__promo">
                  <div className="mxd-footer-nav02__block">
                    <div className="mxd-footer-nav02__title">
                      <CommonScrollAnimated
                        className="footer-data anim-uni-slide-down"
                        as="p"
                        animation="slideDownLine"
                      >
                        <span>/ More by IB Themes</span>
                      </CommonScrollAnimated>
                    </div>
                    <div className="mxd-footer-nav02__list">
                      <div className="mxd-footer-promo__list">
                        {footer1PromoItems.map((item) => (
                          <a
                            key={item.iconSrc}
                            className="mxd-footer-promo__item"
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              className="mxd-footer-promo__icon"
                              alt={item.iconAlt}
                              src={item.iconSrc}
                              width={item.iconWidth}
                              height={item.iconHeight}
                            />
                            <CommonAnimatedText
                              as="p"
                              className="t-medium t-bold mxd-footer-promo__link mxd-split-lines-reverse"
                              animation="splitLinesReverse"
                            >
                              {item.textLead}
                              <span>{item.textSpan}</span>
                            </CommonAnimatedText>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block - Navigation End */}
        {/* Footer Block - Controls Start */}
        <div className="mxd-block">
          <div className="container-fluid p-0">
            <div className="row g-0">
              {/* <div class="col-12 col-xl-6 mxd-footer__item"></div> */}
              <div className="col-12 mxd-footer__item mxd-grid-item">
                <div className="mxd-footer__controls-middle controls-landing caption-small">
                  <CommonScrollAnimated
                    className="anim-uni-slide-down"
                    as="div"
                    animation="slideDownLine"
                  >
                    <FooterBackToTop />
                  </CommonScrollAnimated>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block - Controls End */}
        {/* Footer Block - Fullwidth Text Start */}
        <div className="mxd-block">
          <div className="mxd-footer__fw-mark mxd-grid-item">
            <CommonScrollAnimated
              className="mxd-footer__planet01 anim-uni-in-up"
              as="div"
              animation="inUp"
            >
              <Image
                className="mxd-move-slow"
                alt="Azurio Footer Decoration Image"
                src="/img/demo/planet-01.webp"
                width={400}
                height={404}
              />
            </CommonScrollAnimated>
            <div className="fw-mark__wrap">
              <a
                className="fw-mark__content small justify-content-center"
                href="https://themeforest.net/user/ib-themes"
                aria-label="IB Themes Portfolio"
                target="_blank"
              >
                <CommonAnimatedText
                  as="span"
                  className="anim-uni-chars"
                  animation="animChars"
                >
                  IBThemes
                </CommonAnimatedText>
              </a>
            </div>
            <CommonScrollAnimated
              className="mxd-footer__planet02 anim-uni-in-up"
              as="div"
              animation="inUp"
            >
              <Image
                className="mxd-move"
                alt="Azurio Footer Decoration Image"
                src="/img/demo/planet-02.webp"
                width={250}
                height={255}
              />
            </CommonScrollAnimated>
          </div>
        </div>
        {/* Footer Block - Fullwidth Text End */}
      </div>
      {/* Footer Block - Foreground Start */}
      <div className="mxd-demo-footer__foreground">
        {footer1ForegroundImages.map((layer) => (
          <div key={layer.src} className={layer.wrapperClass}>
            <Image
              alt={layer.alt}
              src={layer.src}
              width={layer.width}
              height={layer.height}
            />
          </div>
        ))}
      </div>
      {/* Footer Block - Foreground End */}
      <div className="mxd-container grid-l-container">
        {/* Footer Block - Data Start */}
        <div className="mxd-block">
          <div className="mxd-footer__data caption-small">
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-12 col-xl-4 col-xxl-6 mxd-footer__item mxd-grid-item">
                  <CommonScrollAnimated
                    className="mxd-footer__data-item anim-uni-fade-in"
                    as="div"
                    animation="fadeIn"
                  >
                    <p className="footer-data bright">
                      <span>Copyright Azurio. All rights reserved</span>
                    </p>
                  </CommonScrollAnimated>
                </div>
                <div className="col-12 col-xl-8 col-xxl-6 mxd-footer__item">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      <div className="col-12 col-xl-6 mxd-grid-item">
                        <CommonScrollAnimated
                          className="mxd-footer__data-item anim-uni-fade-in"
                          as="div"
                          animation="fadeIn"
                        >
                          <p className="footer-data bright">
                            <span>
                              React Nextjs Template by&nbsp;
                              <a
                                href="https://themeforest.net/user/ib-themes"
                                target="_blank"
                              >
                                <TextScramble className="mxd-scramble">
                                  IB Themes
                                </TextScramble>
                              </a>
                            </span>
                          </p>
                        </CommonScrollAnimated>
                      </div>
                      <div className="col-12 col-xl-6 mxd-grid-item">
                        <CommonScrollAnimated
                          className="mxd-footer__data-item anim-uni-fade-in justify-end"
                          as="div"
                          animation="fadeIn"
                        >
                          <p className="footer-data bright">
                            <span>©{new Date().getFullYear()}</span>
                          </p>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block - Data End */}
      </div>
    </BlurSection>
  );
}
