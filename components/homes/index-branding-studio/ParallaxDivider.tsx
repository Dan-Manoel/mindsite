"use client";

import BlurSection from "@/components/animations/BlurSection";
import UkiyoParallax from "@/components/animations/UkiyoParallax";
import CommonAnimatedText from "../../animations/CommonAnimatedText";
import Link from "next/link";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function ParallaxDivider() {
  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container fullwidth-container">
          <div className="mxd-divider">
            {/* image */}
            <UkiyoParallax
              className="mxd-divider__image divider-image-1 parallax-img"
              scale={1.4}
              speed={1.5}
              externalRAF={false}
            >
              {/* <Image class="parallax-img" src="/img/illustrations/1920x1080_divider-01.webp" alt=""> */}
            </UkiyoParallax>
            {/* cover layer */}
            <div className="mxd-divider__cover cover-04" />
            {/* content */}
            <div className="mxd-divider__content">
              <CommonScrollAnimated
                className="mxd-divider__btngroup anim-uni-in-up"
                as="div"
                animation="inUp"
              >
                <Link
                  className="btn btn-line btn-line-permanent"
                  href={`/team`}
                >
                  <TextScramble className="btn-caption mxd-scramble">
                    Let&apos;s meet
                  </TextScramble>
                </Link>
              </CommonScrollAnimated>
              <div className="mxd-divider__caption">
                <Link
                  className="active-cursor-accent"
                  data-cursor-text="Our Team"
                  href={`/team`}
                >
                  <CommonAnimatedText
                    as="h2"
                    className="permanent mxd-split-lines"
                    animation="splitLines"
                  >
                    Small but powerful team
                  </CommonAnimatedText>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </BlurSection>
    </>
  );
}
