"use client";

import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Image from "next/image";
import TextScramble from "@/components/animations/TextScramble";
export default function TeamList() {
  return (
    <>
      <BlurSection className="mxd-section bg-color-base padding-top-title padding-bottom-tags-mobile">
        <div className="mxd-container grid-l-container">
          {/* Block - Section Title v03 Start */}
          <div className="mxd-block">
            <div className="mxd-section-title pre-grid">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-9 mxd-grid-item">
                    <div className="mxd-section-title__title pre-caption">
                      <CommonAnimatedText
                        as="h2"
                        className="reveal-type"
                        animation="revealType"
                      >
                        Sonhadores e
                        <br />
                        realizadores
                      </CommonAnimatedText>
                    </div>
                  </div>
                  <div className="col-12 col-xl-3 mxd-grid-item">
                    <div className="mxd-section-title__data top-caption">
                      <div className="mxd-section-title__caption">
                        <CommonAnimatedText
                          as="p"
                          className="t-bold t-large mxd-split-lines"
                          animation="splitLines"
                        >
                          Criativos e estrategistas unidos pela paixão{" "}
                          <span>em criar soluções digitais impactantes.</span>
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title v03 End */}
          {/* Block - Team List Start */}
          <div className="mxd-block">
            <div className="mxd-team-list">
              {/* single item */}
              <div className="mxd-team-list__item">
                <div className="container-fluid p-0 mxd-team-list__inner">
                  <div className="row g-0 d-flex flex-column flex-md-row">
                    <div className="col-12 col-md-3 mxd-grid-item order-2 order-md-1">
                      <div className="mxd-team-list__position">
                        <p>Co-fundador &amp; head de desenvolvimento</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mxd-grid-item order-1 order-md-2">
                      <div className="mxd-team-list__data">
                        <div className="mxd-team-list__photo">
                          <Image
                            alt="MINDSITE Template Sample Image"
                            src="/img/avatars/300x300_ava-04.webp"
                            width={300}
                            height={300}
                          />
                        </div>
                        <div className="mxd-team-list__name">
                          <p>Alex Berry</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mxd-grid-item order-3 order-md-3">
                      <div className="mxd-team-list__socials">
                        <ul>
                          <li>
                            <a href="https://www.linkedin.com/" target="_blank">
                              <TextScramble className="mxd-scramble">
                                Linkedin
                              </TextScramble>
                            </a>
                          </li>
                          <li>
                            <a href="https://www.facebook.com/" target="_blank">
                              <TextScramble className="mxd-scramble">
                                Facebook
                              </TextScramble>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* single item */}
              <div className="mxd-team-list__item">
                <div className="container-fluid p-0 mxd-team-list__inner">
                  <div className="row g-0 d-flex flex-column flex-md-row">
                    <div className="col-12 col-md-3 mxd-grid-item order-2 order-md-1">
                      <div className="mxd-team-list__position">
                        <p>Co-fundadora &amp; head de design</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mxd-grid-item order-1 order-md-2">
                      <div className="mxd-team-list__data">
                        <div className="mxd-team-list__photo">
                          <Image
                            alt="MINDSITE Template Sample Image"
                            src="/img/avatars/300x300_ava-06.webp"
                            width={300}
                            height={300}
                          />
                        </div>
                        <div className="mxd-team-list__name">
                          <p>Helen Lemon</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mxd-grid-item order-3 order-md-3">
                      <div className="mxd-team-list__socials">
                        <ul>
                          <li>
                            <a
                              href="https://www.instagram.com/"
                              target="_blank"
                            >
                              <TextScramble className="mxd-scramble">
                                Instagram
                              </TextScramble>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* single item */}
              <div className="mxd-team-list__item">
                <div className="container-fluid p-0 mxd-team-list__inner">
                  <div className="row g-0 d-flex flex-column flex-md-row">
                    <div className="col-12 col-md-3 mxd-grid-item order-2 order-md-1">
                      <div className="mxd-team-list__position">
                        <p>Designer Criativo</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mxd-grid-item order-1 order-md-2">
                      <div className="mxd-team-list__data">
                        <div className="mxd-team-list__photo">
                          <Image
                            alt="MINDSITE Template Sample Image"
                            src="/img/avatars/300x300_ava-02.webp"
                            width={300}
                            height={300}
                          />
                        </div>
                        <div className="mxd-team-list__name">
                          <p>Sarah Olive</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mxd-grid-item order-3 order-md-3">
                      <div className="mxd-team-list__socials">
                        <ul>
                          <li>
                            <a href="https://www.linkedin.com/" target="_blank">
                              <TextScramble className="mxd-scramble">
                                Linkedin
                              </TextScramble>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* single item */}
              <div className="mxd-team-list__item">
                <div className="container-fluid p-0 mxd-team-list__inner">
                  <div className="row g-0 d-flex flex-column flex-md-row">
                    <div className="col-12 col-md-3 mxd-grid-item order-2 order-md-1">
                      <div className="mxd-team-list__position">
                        <p>Especialista em Identidade de Marca</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mxd-grid-item order-1 order-md-2">
                      <div className="mxd-team-list__data">
                        <div className="mxd-team-list__photo">
                          <Image
                            alt="MINDSITE Template Sample Image"
                            src="/img/avatars/300x300_ava-03.webp"
                            width={300}
                            height={300}
                          />
                        </div>
                        <div className="mxd-team-list__name">
                          <p>Johanna Cherry</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mxd-grid-item order-3 order-md-3">
                      <div className="mxd-team-list__socials">
                        <ul>
                          <li>
                            <a href="https://www.linkedin.com/" target="_blank">
                              <TextScramble className="mxd-scramble">
                                Linkedin
                              </TextScramble>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* single item */}
              <div className="mxd-team-list__item">
                <div className="container-fluid p-0 mxd-team-list__inner">
                  <div className="row g-0 d-flex flex-column flex-md-row">
                    <div className="col-12 col-md-3 mxd-grid-item order-2 order-md-1">
                      <div className="mxd-team-list__position">
                        <p>Estrategista de Marketing Digital</p>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mxd-grid-item order-1 order-md-2">
                      <div className="mxd-team-list__data">
                        <div className="mxd-team-list__photo">
                          <Image
                            alt="MINDSITE Template Sample Image"
                            src="/img/avatars/300x300_ava-01.webp"
                            width={300}
                            height={300}
                          />
                        </div>
                        <div className="mxd-team-list__name">
                          <p>John Lemon</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-3 mxd-grid-item order-3 order-md-3">
                      <div className="mxd-team-list__socials">
                        <ul>
                          <li>
                            <a href="https://www.linkedin.com/" target="_blank">
                              <TextScramble className="mxd-scramble">
                                Linkedin
                              </TextScramble>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Team List End */}
        </div>
      </BlurSection>
    </>
  );
}
