import UkiyoParallax from "@/components/animations/UkiyoParallax";
import BlurSection from "@/components/animations/BlurSection";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
export default function ParallaxDividerImage() {
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section">
          <CommonLoadFade index={0}>
            <div className="mxd-container fullwidth-container loading-fade">
              <div className="mxd-divider">
                <UkiyoParallax
                  className="mxd-divider__image divider-image-11 parallax-img"
                  scale={1.4}
                  speed={1.5}
                  externalRAF={false}
                />
              </div>
            </div>
          </CommonLoadFade>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
