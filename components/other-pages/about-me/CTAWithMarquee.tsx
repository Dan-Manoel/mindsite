import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonGravitySection from "@/components/animations/CommonGravitySection";
import CommonGravityPermanentObjects from "@/components/animations/CommonGravityPermanentObjects";
import TextScramble from "@/components/animations/TextScramble";
export default function CTAWithMarquee() {
  return (
    <>
      <BlurSection className="mxd-section bg-color-opposite">
        <div className="mxd-container fullwidth-container">
          {/* Block - CTA with Matter.js Objects Start */}
          <div className="mxd-block">
            <CommonGravitySection>
              <div className="mxd-promo mxd-gravity-section accent">
                <div className="mxd-promo__wrap">
                  <CommonGravityPermanentObjects />
                  <div className="mxd-promo__content">
                    <CommonScrollAnimated
                      className="mxd-promo__btngroup anim-uni-in-up"
                      as="div"
                      animation="inUp"
                    >
                      <Link
                        className="btn btn-line btn-line-permanent"
                        href={`/contact`}
                      >
                        <TextScramble className="btn-caption mxd-scramble">
                          Envie uma mensagem
                        </TextScramble>
                      </Link>
                    </CommonScrollAnimated>
                    <div className="mxd-promo__caption">
                      <Link
                        className="active-cursor-permanent"
                        data-cursor-text="Contato"
                        href={`/contact`}
                      >
                        <CommonAnimatedText
                          as="h2"
                          className="mxd-split-lines permanent"
                          animation="splitLines"
                        >
                          Vamos conversar sobre o seu projeto
                        </CommonAnimatedText>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CommonGravitySection>
          </div>
          {/* Block - CTA with Matter.js Objects End */}
        </div>
      </BlurSection>
    </>
  );
}
