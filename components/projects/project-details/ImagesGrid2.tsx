import UkiyoParallax from "@/components/animations/UkiyoParallax";
import BlurSection from "@/components/animations/BlurSection";
import Image from "next/image";
export default function ImagesGrid2() {
  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container grid-l-container">
          {/* Block - Images Grid Start */}
          <div className="mxd-block">
            <div className="mxd-images-grid">
              <div className="container-fluid p-0">
                <div className="row g-0 mxd-images-grid__gallery">
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
                          src="/img/works/project-details/details04.webp"
                          width={1280}
                          height={1280}
                        />
                      </UkiyoParallax>
                    </div>
                  </div>
                  <div className="col-12 col-xl-6 mxd-grid-item mxd-images-grid__item">
                    <div className="mxd-images-grid__inner">
                      <Image
                        className="transparent"
                        alt="Azurio Template Sample Image"
                        src="/img/works/project-details/details05.webp"
                        width={985}
                        height={1280}
                      />
                    </div>
                  </div>
                </div>
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
                          src="/img/works/project-details/details06.webp"
                          width={1920}
                          height={1440}
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
