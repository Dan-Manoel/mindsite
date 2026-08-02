import CommonLoadAnimation, {
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";
import CommonCursorTrailTransparent, {
  CommonCursorTrailContent,
  CommonCursorTrailImage,
  CommonCursorTrailWrapper,
} from "@/components/animations/CommonCursorTrailTransparent";

export default function Hero() {
  return (
    <CommonLoadAnimation>
      <>
        <CommonCursorTrailTransparent
          as="div"
          className="mxd-section mxd-hero-section cursor-trail loading-wrap"
        >
          <CommonCursorTrailWrapper className="mxd-trail-transparent-wrapper">
            <CommonCursorTrailContent className="mxd-trail-transparent-content">
              <CommonCursorTrailImage
                index={0}
                className="mxd-trail-transparent-image"
                alt="Azurio Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/01_trail.webp"
                width={400}
                height={521}
              />
              <CommonCursorTrailImage
                index={1}
                className="mxd-trail-transparent-image"
                alt="Azurio Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/02_trail.webp"
                width={412}
                height={400}
              />
              <CommonCursorTrailImage
                index={2}
                className="mxd-trail-transparent-image"
                alt="Azurio Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/03_trail.webp"
                width={485}
                height={400}
              />
              <CommonCursorTrailImage
                index={3}
                className="mxd-trail-transparent-image"
                alt="Azurio Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/04_trail.webp"
                width={530}
                height={400}
              />
              <CommonCursorTrailImage
                index={4}
                className="mxd-trail-transparent-image"
                alt="Azurio Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/05_trail.webp"
                width={400}
                height={520}
              />
              <CommonCursorTrailImage
                index={5}
                className="mxd-trail-transparent-image"
                alt="Azurio Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/06_trail.webp"
                width={407}
                height={400}
              />
              <CommonCursorTrailImage
                index={6}
                className="mxd-trail-transparent-image"
                alt="Azurio Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/07_trail.webp"
                width={400}
                height={480}
              />
              <CommonCursorTrailImage
                index={7}
                className="mxd-trail-transparent-image"
                alt="Azurio Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/08_trail.webp"
                width={637}
                height={400}
              />
              <CommonCursorTrailImage
                index={8}
                className="mxd-trail-transparent-image"
                alt="Azurio Template Cursor Trail Image"
                src="/img/cursor-trail-transparent/09_trail.webp"
                width={400}
                height={992}
              />
            </CommonCursorTrailContent>
          </CommonCursorTrailWrapper>
          <div className="mxd-container grid-l-container">
            <div className="mxd-block">
              <div className="mxd-hero-landing">
                <div className="mxd-hero-landing__wrap">
                  <div className="mxd-hero-landing__headline mxd-grid-item">
                    <CommonLoadItem index={0}>
                      <div className="mxd-hero-landing__subtitle loading-item">
                        <SmoothAnchorLink
                          className="btn btn-line btn-line-permanent"
                          targetId="demo"
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            Next-gen template
                          </TextScramble>
                        </SmoothAnchorLink>
                      </div>
                    </CommonLoadItem>
                    <div className="mxd-hero-landing__title">
                      <SmoothAnchorLink
                        className="active-cursor-accent"
                        data-cursor-text="View Demo"
                        targetId="demo"
                      >
                        <CommonAnimatedText
                          as="h1"
                          className="medium permanent loading-split"
                          animation="splitLinesLoad"
                        >
                          Make your work stand out
                        </CommonAnimatedText>
                      </SmoothAnchorLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CommonCursorTrailTransparent>
      </>
    </CommonLoadAnimation>
  );
}
