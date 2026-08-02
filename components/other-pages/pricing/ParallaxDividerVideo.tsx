import UkiyoParallax from "@/components/animations/UkiyoParallax";
import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import BlurSection from "@/components/animations/BlurSection";

export default function ParallaxDividerVideo() {
  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container fullwidth-container">
          <div className="mxd-divider">
            <div className="mxd-divider__video">
              <UkiyoParallax
                className="parallax-video"
                scale={1.4}
                speed={1.5}
                externalRAF={false}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
              >
                <AutoplayLoopVideo
                  poster="video/1280x720_video-05.webp"
                  sources={[
                    { type: "video/mp4", src: "video/1280x720_video-05.mp4" },
                    { type: "video/webm", src: "video/1280x720_video-05.webm" },
                  ]}
                />
              </UkiyoParallax>
            </div>
          </div>
        </div>
      </BlurSection>
    </>
  );
}
