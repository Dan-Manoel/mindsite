import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import CommonLoadAnimation, {
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
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
          className="mxd-section mxd-hero-section no-padding-desktop mxd-hero-special cursor-trail-transparent loading-wrap"
        >
          {/* Effect - Cursor Trail Transparent Start */}
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
          {/* Effect - Cursor Trail Transparent End */}
          <div className="mxd-hero-05">
            <div className="mxd-hero-05__wrap">
              {/* top group */}
              <div className="mxd-hero-05__top">
                <div className="mxd-hero-05__headline">
                  <CommonAnimatedText
                    as="h1"
                    className="loading-split"
                    animation="splitLinesLoad"
                  >
                    Unlock
                    <small>your brand&apos;s personality</small>
                  </CommonAnimatedText>
                </div>
              </div>
              {/* bottom group */}
              <div className="mxd-hero-05__bottom">
                <div className="mxd-hero-05__dataline">
                  <CommonLoadItem index={0}>
                    <div className="hero-05-dataline__socials loading-item">
                      <ul className="mxd-socials-line">
                        <li>
                          <a
                            className="mxd-socials-line__link"
                            href="https://www.instagram.com/"
                            target="_blank"
                          >
                            <TextScramble className="mxd-scramble">
                              @azurioagency
                            </TextScramble>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </CommonLoadItem>
                  <CommonLoadItem index={1}>
                    <p className="hero-05-dataline__caption loading-item">
                      Creative Development Agency
                    </p>
                  </CommonLoadItem>
                  <CommonLoadItem index={2}>
                    <div className="hero-05-dataline__controls loading-item">
                      <SmoothAnchorLink
                        className="btn btn-line-icon btn-line-icon-small btn-line-default slide-down"
                        targetId="about"
                      >
                        <TextScramble className="btn-caption mxd-scramble">
                          Scroll to explore
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
                  </CommonLoadItem>
                </div>
              </div>
            </div>
          </div>
        </CommonCursorTrailTransparent>
      </>
    </CommonLoadAnimation>
  );
}
