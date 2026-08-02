import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonGravitySection from "../../animations/CommonGravitySection";
import CommonGravityPortfolioObjects from "../../animations/CommonGravityPortfolioObjects";
import TextScramble from "@/components/animations/TextScramble";
export default function CTA() {
  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container fullwidth-container">
          {/* Block - CTA with Matter.js Objects Start */}
          <div className="mxd-block">
            <CommonGravitySection>
              <div className="mxd-promo mxd-gravity-section accent">
                <div className="mxd-promo__wrap">
                  <CommonGravityPortfolioObjects />
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
                          Write a line
                        </TextScramble>
                      </Link>
                    </CommonScrollAnimated>
                    <div className="mxd-promo__caption">
                      <Link
                        className="active-cursor-permanent"
                        data-cursor-text="Contact Me"
                        href={`/contact`}
                      >
                        <CommonAnimatedText
                          as="h2"
                          className="mxd-split-lines permanent"
                          animation="splitLines"
                        >
                          Let&apos;s talk about your project
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
