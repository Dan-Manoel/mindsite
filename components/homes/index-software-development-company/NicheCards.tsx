import BlurSection from "@/components/animations/BlurSection";
import Image from "next/image";
import { CommonCardBatchAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function NicheCards() {
  return (
    <>
      <BlurSection className="mxd-section padding-bottom-grid-l-to-title">
        <div className="mxd-container grid-l-container">
          {/* Block - Niche Cards Start */}
          <div className="mxd-block">
            <div className="mxd-niche-cards">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {/* card item - high */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-4 mxd-niche-cards__column mxd-grid-item animate-card-2"
                    as="div"
                    columns={2}
                  >
                    <div className="mxd-niche-cards__item">
                      <div className="mxd-niche-cards__inner">
                        <div className="mxd-niche-cards__title">
                          <div className="mxd-niche-cards__name">
                            <p>Fintech</p>
                          </div>
                          <div className="mxd-niche-cards__tags">
                            <TextScramble className="tag tag-m tag-medium mxd-scramble">
                              Frontend
                            </TextScramble>
                            <TextScramble className="tag tag-m tag-medium mxd-scramble">
                              Interactions
                            </TextScramble>
                            <TextScramble className="tag tag-m tag-medium mxd-scramble">
                              Backend
                            </TextScramble>
                          </div>
                        </div>
                        <div className="mxd-niche-cards__descr wide">
                          <p className="t-bold t-medium">
                            Innovative financial solutions, from digital banking
                            to{" "}
                            <span>
                              payment processing and investment platforms.
                            </span>
                          </p>
                        </div>
                        <div className="mxd-niche-cards__image absolute-desktop-bottom">
                          <Image
                            alt="Azurio Template Sample Image"
                            src="/img/illustrations/niche01.webp"
                            width={1200}
                            height={1611}
                          />
                        </div>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* card items - rows */}
                  <CommonCardBatchAnimated
                    className="col-12 col-xl-8 mxd-niche-cards__column animate-card-2"
                    as="div"
                    columns={2}
                  >
                    <div className="container-fluid p-0">
                      <div className="row g-0">
                        <div className="col-12 mxd-grid-item">
                          <div className="mxd-niche-cards__item">
                            <div className="mxd-niche-cards__inner fixed-height-desktop space-between-desktop">
                              <div className="mxd-niche-cards__title">
                                <div className="mxd-niche-cards__name">
                                  <p>AI-powered solutions</p>
                                </div>
                                <div className="mxd-niche-cards__tags">
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    UI/UX
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Web Design
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Packaging
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Motion
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    3D Models
                                  </TextScramble>
                                </div>
                              </div>
                              <div className="mxd-niche-cards__descr wide">
                                <p className="t-bold t-medium">
                                  Intelligent automation, predictive analytics,{" "}
                                  <span>
                                    and machine learning-driven applications.
                                  </span>
                                </p>
                              </div>
                              <div className="mxd-niche-cards__image absolute-desktop-full">
                                <Image
                                  alt="Azurio Template Sample Image"
                                  src="/img/illustrations/niche02.webp"
                                  width={1320}
                                  height={800}
                                />
                                <div className="mxd-niche-cards__gradient gradient-linear" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <CommonCardBatchAnimated
                          className="col-12 col-xl-6 mxd-grid-item animate-card-2"
                          as="div"
                          columns={2}
                        >
                          <div className="mxd-niche-cards__item">
                            <div className="mxd-niche-cards__inner permanent fixed-height-desktop space-between-desktop">
                              <div className="mxd-niche-cards__title">
                                <div className="mxd-niche-cards__name">
                                  <p className="permanent">Cybersecurity</p>
                                </div>
                                <div className="mxd-niche-cards__tags">
                                  <TextScramble className="tag tag-m tag-permanent mxd-scramble">
                                    Brand Strategy
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-permanent mxd-scramble">
                                    Logo Design
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-permanent mxd-scramble">
                                    Guidelines
                                  </TextScramble>
                                </div>
                              </div>
                              <div className="mxd-niche-cards__descr wide">
                                <p className="t-bold t-medium t-permanent">
                                  Advanced threat detection, encryption
                                  solutions,
                                  <span>and secure data protection.</span>
                                </p>
                              </div>
                              <div className="mxd-niche-cards__image absolute-desktop-full">
                                <Image
                                  alt="Azurio Template Sample Image"
                                  src="/img/illustrations/niche03.webp"
                                  width={1200}
                                  height={974}
                                />
                                <div className="mxd-niche-cards__gradient gradient-radial" />
                              </div>
                            </div>
                          </div>
                        </CommonCardBatchAnimated>
                        <CommonCardBatchAnimated
                          className="col-12 col-xl-6 mxd-grid-item animate-card-2"
                          as="div"
                          columns={2}
                        >
                          <div className="mxd-niche-cards__item">
                            <div className="mxd-niche-cards__inner fixed-height-desktop space-between-desktop">
                              <div className="mxd-niche-cards__title">
                                <div className="mxd-niche-cards__name">
                                  <p>Game Industry</p>
                                </div>
                                <div className="mxd-niche-cards__tags">
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    E-commerce
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Maintenance
                                  </TextScramble>
                                  <TextScramble className="tag tag-m tag-medium mxd-scramble">
                                    Support
                                  </TextScramble>
                                </div>
                              </div>
                              <div className="mxd-niche-cards__descr short">
                                <p className="t-bold t-medium">
                                  Immersive experiences, multiplayer platforms,
                                  <span>and game engine development.</span>
                                </p>
                              </div>
                              <div className="mxd-niche-cards__image absolute-desktop-aside">
                                <Image
                                  alt="Azurio Template Sample Image"
                                  src="/img/illustrations/niche04.webp"
                                  width={800}
                                  height={1040}
                                />
                              </div>
                            </div>
                          </div>
                        </CommonCardBatchAnimated>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Niche Cards End */}
        </div>
      </BlurSection>
    </>
  );
}
