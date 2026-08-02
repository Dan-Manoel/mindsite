import UkiyoParallax from "@/components/animations/UkiyoParallax";
import BlurSection from "@/components/animations/BlurSection";
export default function ParallaxDividerImage2() {
  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container fullwidth-container">
          <div className="mxd-divider">
            <UkiyoParallax
              className="mxd-divider__image divider-image-10 parallax-img"
              scale={1.4}
              speed={1.5}
              externalRAF={false}
            />
          </div>
        </div>
      </BlurSection>
    </>
  );
}
