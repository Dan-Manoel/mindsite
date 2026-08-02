import Link from "next/link";
import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonGravitySection from "@/components/animations/CommonGravitySection";
import CommonGravityPermanentObjects from "@/components/animations/CommonGravityPermanentObjects";
import TextScramble from "@/components/animations/TextScramble";
export default function CTA() {
  return (
    <>
      <div className="mxd-section bg-color-accent">
        {/* background video */}
        <div className="mxd-background">
          <div className="mxd-background__video">
            <AutoplayLoopVideo
              className="video"
              poster="video/1920x660_cta.webp"
              sources={[
                {
                  type: "video/mp4",
                  src: "video/1920x660_cta.mp4",
                },
                {
                  type: "video/webm",
                  src: "video/1920x660_cta.webm",
                },
              ]}
            />
          </div>
          <div className="mxd-background__cover accent" />
        </div>
        <div className="mxd-container fullwidth-container">
          {/* Block - CTA with Matter.js Objects Start */}
          <div className="mxd-block">
            <CommonGravitySection>
              <div className="mxd-promo mxd-gravity-section transparent">
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
      </div>
    </>
  );
}
