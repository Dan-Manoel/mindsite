"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import MxdStatsLineItem from "@/components/animations/MxdStatsLineItem";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function StatisticsLines() {
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-number padding-bottom-tag-m"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            <div className="mxd-block">
              <div className="mxd-section-title">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-xl-4 mxd-grid-item">
                      <div className="mxd-section-title__data top-number">
                        <CommonScrollAnimated
                          className="mxd-section-title__number pre-manifest anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <TextScramble className="title-number mxd-scramble">
                            /01
                          </TextScramble>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      {/* Manifest Start */}
                      <div className="mxd-section-title__manifest title-manifest-s no-padding-mobile">
                        <a data-cursor-text="Baixar CV" href="#0">
                          <CommonAnimatedText
                            as="span"
                            className="manifest manifest-s mxd-split-lines active-cursor-accent"
                            animation="splitLines"
                          >
                            A engenharia web moderna exige infraestruturas resilientes.
                            {" "}
                            <span>
                              Projeto sistemas escaláveis garantindo que a comunicação entre banco de dados e interface ocorra com segurança e latência mínima.
                            </span>
                          </CommonAnimatedText>
                        </a>
                      </div>
                      {/* Manifest End */}
                      {/* Statistics Lines Start */}
                      <div className="mxd-stats-lines manifest-title">
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-1">15+</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Anos de experiência em tecnologia, infraestrutura e segurança da informação.</p>
                          </div>
                        </MxdStatsLineItem>
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-2">100%</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Foco na privacidade de dados e escalabilidade desde a primeira linha de código.</p>
                          </div>
                        </MxdStatsLineItem>
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-3">50+</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Startups e ecossistemas digitais lançados com sucesso.</p>
                          </div>
                        </MxdStatsLineItem>
                        {/* statistics single item */}
                        <MxdStatsLineItem>
                          <div className="mxd-stats-lines__number">
                            <p id="stats-counter-4">99.9%</p>
                          </div>
                          <div className="mxd-stats-lines__caption">
                            <p>Uptime arquitetado para grandes players do mercado.</p>
                          </div>
                        </MxdStatsLineItem>
                      </div>
                      {/* Statistics Lines End */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
