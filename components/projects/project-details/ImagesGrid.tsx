import UkiyoParallax from "@/components/animations/UkiyoParallax";
import BlurSection from "@/components/animations/BlurSection";
import Image from "next/image";
export default function ImagesGrid() {
  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container grid-l-container">
          {/* Block - Images Grid Start */}
          <div className="mxd-block">
            <div className="mxd-images-grid">
              <div className="container-fluid p-0">
                <div className="row g-0 mxd-images-grid__gallery">
                  <div className="col-12 mxd-grid-item mxd-images-grid__item wide">
                    <div className="mxd-images-grid__inner">
                      <UkiyoParallax
                        className="parallax-img-small"
                        scale={1.2}
                        speed={1.5}
                        externalRAF={false}
                      >
                        <Image
                          alt="Azurio Template Sample Image"
                          src="/img/works/project-details/details01.webp"
                          width={1920}
                          height={1200}
                        />
                      </UkiyoParallax>
                    </div>
                  </div>
                </div>
                <div className="row g-0 mxd-images-grid__gallery">
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-images-grid__item">
                    <div className="mxd-images-grid__inner">
                      <Image
                        className="transparent"
                        alt="Azurio Template Sample Image"
                        src="/img/works/project-details/details02.webp"
                        width={800}
                        height={710}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-images-grid__item">
                    <div className="mxd-images-grid__inner">
                      <UkiyoParallax
                        className="parallax-img-small"
                        scale={1.2}
                        speed={1.5}
                        externalRAF={false}
                      >
                        <Image
                          alt="Azurio Template Sample Image"
                          src="/img/works/project-details/details03.webp"
                          width={1280}
                          height={960}
                        />
                      </UkiyoParallax>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Images Grid End */}
        </div>
      </BlurSection>
    </>
  );
}
