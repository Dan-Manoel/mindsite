import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function DemoCTA() {
  return (
    <>
      <BlurSection id="purchase" className="mxd-section padding-top-title">
        <div className="mxd-container grid-l-container">
          {/* Block - Demo CTA Start */}
          <div className="mxd-block">
            <div className="mxd-demo-cta">
              <CommonScrollAnimated
                className="mxd-demo-cta__caption anim-uni-in-up"
                as="div"
                animation="inUp"
              >
                <a
                  className="active-cursor-accent"
                  data-cursor-text="Buy Now"
                  href="https://themeforest.net/item/azurio-digital-agency-personal-portfolio-nextjs-template/63087539?s_rank=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CommonAnimatedText
                    as="h2"
                    className="mxd-split-lines"
                    animation="splitLines"
                  >
                    Show your creativity and get noticed today!
                  </CommonAnimatedText>
                </a>
              </CommonScrollAnimated>
              <CommonScrollAnimated
                className="mxd-demo-cta__btn anim-uni-in-up"
                as="div"
                animation="inUp"
              >
                <a
                  className="btn btn-default-icon btn-default-icon-large btn-default-outline slide-right"
                  href="https://themeforest.net/item/azurio-digital-agency-personal-portfolio-nextjs-template/63087539?s_rank=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TextScramble className="btn-caption mxd-scramble">
                    Buy Now
                  </TextScramble>
                  {/* <i class="ph ph-shopping-cart"></i> */}
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
              </CommonScrollAnimated>
            </div>
          </div>
          {/* Block - Demo CTA End */}
        </div>
      </BlurSection>
    </>
  );
}
