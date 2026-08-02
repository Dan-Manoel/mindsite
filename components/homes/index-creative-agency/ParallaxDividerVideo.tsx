import UkiyoParallax from "@/components/animations/UkiyoParallax";
import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";

export default function ParallaxDividerVideo() {
  return (
    <CommonLoadAnimation>
      <>
        <div className="mxd-section">
          <div className="mxd-container fullwidth-container">
            <CommonLoadFade index={0}>
              <div className="mxd-divider loading-fade">
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
                      poster="video/1280x720_stone-geometry-banner.webp"
                      sources={[
                        {
                          type: "video/mp4",
                          src: "/video/1280x720_stone-geometry.mp4",
                        },
                        {
                          type: "video/webm",
                          src: "/video/1280x720_stone-geometry.webm",
                        },
                      ]}
                    />
                  </UkiyoParallax>
                </div>
              </div>
            </CommonLoadFade>
          </div>
        </div>
      </>
    </CommonLoadAnimation>
  );
}
