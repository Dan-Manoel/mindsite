import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "../animations/CommonAnimatedText";
import {
  CommonScrollAnimated,
  CommonScrollAnimatedLink,
} from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
import FooterBackToTop from "@/components/footers/FooterBackToTop";

export default function Footer3({ name = "MINDSITE" }: { name?: string }) {
  return (
    <BlurSection as="footer" className="mxd-footer">
      <div className="mxd-container grid-l-container">
        {/* Footer Block - Navigation v1 Start */}
        <div className="mxd-block">
          <div className="mxd-footer__footer-blocks mxd-grid-item">
            <div className="footer-blocks__nav-v01">
              <ul className="footer-nav-v01">
                <li className="footer-nav-v01__item">
                  <CommonScrollAnimatedLink
                    className="anim-uni-slide-down"
                    href={`/`}
                    animation="slideDownLine"
                  >
                    <TextScramble className="mxd-scramble mxd-slide-down">
                      Início
                    </TextScramble>
                  </CommonScrollAnimatedLink>
                </li>
                <li className="footer-nav-v01__item">
                  <CommonScrollAnimatedLink
                    className="anim-uni-slide-down"
                    href={`/works-default`}
                    animation="slideDownLine"
                  >
                    <TextScramble className="mxd-scramble mxd-slide-down">
                      Projetos
                    </TextScramble>
                  </CommonScrollAnimatedLink>
                </li>
                <li className="footer-nav-v01__item">
                  <CommonScrollAnimatedLink
                    className="anim-uni-slide-down"
                    href={`/about-us`}
                    animation="slideDownLine"
                  >
                    <TextScramble className="mxd-scramble mxd-slide-down">
                      Estúdio
                    </TextScramble>
                  </CommonScrollAnimatedLink>
                </li>
                <li className="footer-nav-v01__item">
                  <CommonScrollAnimatedLink
                    className="anim-uni-slide-down"
                    href={`/services`}
                    animation="slideDownLine"
                  >
                    <TextScramble className="mxd-scramble mxd-slide-down">
                      Serviços
                    </TextScramble>
                  </CommonScrollAnimatedLink>
                </li>
                <li className="footer-nav-v01__item">
                  <CommonScrollAnimatedLink
                    className="anim-uni-slide-down"
                    href={`/contact`}
                    animation="slideDownLine"
                  >
                    <TextScramble className="mxd-scramble mxd-slide-down">
                      Contato
                    </TextScramble>
                  </CommonScrollAnimatedLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Footer Block - Navigation v1 End */}

        {/* Footer Block - Info Columns Start */}
        <div className="mxd-block">
          <div className="mxd-footer__footer-blocks">
            <div className="footer-blocks__column mxd-grid-item justify-start">
              <div className="footer-blocks__data justify-start">
                <p className="footer-data">
                  <CommonScrollAnimated
                    className="anim-uni-slide-down"
                    href="mailto:contato@mindsite.com.br?subject=Message%20from%20your%20site"
                    as="a"
                    animation="slideDownLine"
                  >
                    <TextScramble className="mxd-scramble">
                      contato@mindsite.com.br
                    </TextScramble>
                  </CommonScrollAnimated>
                </p>
                <p className="footer-data">
                  <CommonScrollAnimated
                    className="anim-uni-slide-down"
                    href="tel:+5511947675814"
                    as="a"
                    animation="slideDownLine"
                  >
                    <TextScramble className="mxd-scramble">
                      +55 11 947675814
                    </TextScramble>
                  </CommonScrollAnimated>
                </p>
                <CommonScrollAnimated
                  className="footer-data anim-uni-slide-down"
                  as="p"
                  animation="slideDownLine"
                >
                  <span>Avenida Paulista, 2537 - São Paulo-SP</span>
                </CommonScrollAnimated>
              </div>
            </div>
            <div className="footer-blocks__column mxd-grid-item justify-end">
              <div className="footer-blocks__data justify-end">
                <CommonScrollAnimated
                  className="footer-data anim-uni-slide-down"
                  as="p"
                  animation="slideDownLine"
                >
                  <span className="mxd-slide-down">
                    ©{new Date().getFullYear()}
                  </span>
                </CommonScrollAnimated>
                <CommonScrollAnimated
                  className="footer-data anim-uni-slide-down"
                  as="p"
                  animation="slideDownLine"
                >
                  <span className="mxd-slide-down">
                    Copyright MINDSITE. Todos os direitos reservados
                  </span>
                </CommonScrollAnimated>
                <CommonScrollAnimated
                  className="footer-data anim-uni-slide-down"
                  as="p"
                  animation="slideDownLine"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block - Info Columns End */}

        {/* Footer Block - Fullwidth Text Start */}
        <div className="mxd-block" style={{ paddingTop: "2.5rem" }}>
          <div 
            className="mxd-footer__fw-mark mxd-grid-item"
            style={{ overflow: "visible", paddingTop: "1.5rem" }}
          >
            <div className="fw-mark__wrap" style={{ overflow: "visible" }}>
              <div 
                className="fw-mark__content"
                style={{ lineHeight: "1.15", paddingTop: "0.5rem" }}
              >
                <CommonAnimatedText
                  as="span"
                  className="anim-uni-chars"
                  animation="animChars"
                >
                  {name}
                </CommonAnimatedText>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Block - Fullwidth Text End */}

        {/* Footer Block - Links Start */}
        <div className="mxd-block">
          <div className="mxd-footer__footer-blocks bottom-blocks">
            <div className="footer-blocks__column mxd-grid-item justify-start">
              <div className="footer-blocks__socials">
                <CommonScrollAnimated
                  className="mxd-socials-line anim-uni-fade-in"
                  as="ul"
                  animation="fadeIn"
                >
                  <li>
                    <a
                      className="mxd-socials-line__link"
                      href="https://dribbble.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TextScramble className="mxd-scramble">
                        Dribbble
                      </TextScramble>
                    </a>
                  </li>
                  <li>
                    <a
                      className="mxd-socials-line__link"
                      href="https://www.behance.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TextScramble className="mxd-scramble">
                        Behance
                      </TextScramble>
                    </a>
                  </li>
                  <li>
                    <a
                      className="mxd-socials-line__link"
                      href="https://github.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TextScramble className="mxd-scramble">
                        Github
                      </TextScramble>
                    </a>
                  </li>
                  <li>
                    <a
                      className="mxd-socials-line__link"
                      href="https://codepen.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TextScramble className="mxd-scramble">
                        Codepen
                      </TextScramble>
                    </a>
                  </li>
                  <li>
                    <a
                      className="mxd-socials-line__link"
                      href="https://www.figma.com/community"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TextScramble className="mxd-scramble">
                        Figma Community
                      </TextScramble>
                    </a>
                  </li>
                </CommonScrollAnimated>
              </div>
            </div>
            <div className="footer-blocks__column mxd-grid-item justify-end">
              <CommonScrollAnimated
                className="footer-blocks__controls anim-uni-fade-in"
                as="div"
                animation="fadeIn"
              >
                <FooterBackToTop />
              </CommonScrollAnimated>
            </div>
          </div>
        </div>
        {/* Footer Block - Links End */}
      </div>
    </BlurSection>
  );
}