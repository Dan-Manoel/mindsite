import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import Image from "next/image";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
} from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function TeamGrid() {
  return (
    <>
      <BlurSection className="mxd-section padding-top-title padding-bottom-tag-m">
        <div className="mxd-container grid-l-container">
          {/* Block - Section Title v02 Start */}
          <div className="mxd-block">
            <div className="mxd-section-title pre-grid">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-8 mxd-grid-item">
                    <div className="mxd-section-title__title pre-caption">
                      <CommonAnimatedText
                        as="h2"
                        className="reveal-type"
                        animation="revealType"
                      >
                        Líderes
                        <br />
                        criativos
                      </CommonAnimatedText>
                    </div>
                  </div>
                  <div className="col-12 col-xl-4 mxd-grid-item">
                    <div className="mxd-section-title__data top-controls">
                      <CommonScrollAnimated
                        className="mxd-section-title__controls anim-uni-in-up"
                        as="div"
                        animation="inUp"
                      >
                        <Link
                          className="btn btn-line btn-line-default"
                          href={`/team`}
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            Nossa Equipe
                          </TextScramble>
                        </Link>
                      </CommonScrollAnimated>
                      <div className="mxd-section-title__caption no-max-width pre-controls">
                        <CommonAnimatedText
                          as="p"
                          className="t-bold t-large mxd-split-lines"
                          animation="splitLines"
                        >
                          Especialistas técnicos dedicados a entregar{" "}
                          <span>
                            experiências digitais impecáveis e de alto desempenho.
                          </span>
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Section Title v02 End */}
          {/* Block - Team Grid x3 Start */}
          <div className="mxd-block">
            <div className="mxd-team-grid">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  {/* team item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-team-grid__item animate-card-3"
                    as="div"
                    columns={3}
                  >
                    <div className="mxd-team-grid__inner">
                      <div className="mxd-team-grid__media">
                        <div className="mxd-team-grid__photo">
                          <Image
                            alt="Azurio Template Team Member Photo"
                            src="/img/avatars/800x800_ava-05.webp"
                            width={800}
                            height={800}
                          />
                        </div>
                        <div className="mxd-team-grid__socials">
                          <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            className="tag tag-m tag-bg permanent"
                          >
                            <TextScramble className="mxd-scramble">
                              Linkedin
                            </TextScramble>
                          </a>
                          <a
                            href="https://www.behance.net/"
                            target="_blank"
                            className="tag tag-m tag-bg permanent"
                          >
                            <TextScramble className="mxd-scramble">
                              Behance
                            </TextScramble>
                          </a>
                        </div>
                      </div>
                      <div className="mxd-team-grid__caption">
                        <div className="mxd-team-grid__name">
                          <p className="project-name-m">Helen Pineapple</p>
                        </div>
                        <div className="mxd-team-grid__position">
                          <span className="tag tag-m tag-medium">
                            Co-fundadora e diretora de design
                          </span>
                        </div>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* team item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-team-grid__item animate-card-3"
                    as="div"
                    columns={3}
                  >
                    <div className="mxd-team-grid__inner">
                      <div className="mxd-team-grid__media">
                        <div className="mxd-team-grid__photo">
                          <Image
                            alt="Azurio Template Team Member Photo"
                            src="/img/avatars/800x800_ava-06.webp"
                            width={800}
                            height={800}
                          />
                        </div>
                        <div className="mxd-team-grid__socials">
                          <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            className="tag tag-m tag-bg permanent"
                          >
                            <TextScramble className="mxd-scramble">
                              Linkedin
                            </TextScramble>
                          </a>
                          <a
                            href="https://www.behance.net/"
                            target="_blank"
                            className="tag tag-m tag-bg permanent"
                          >
                            <TextScramble className="mxd-scramble">
                              Behance
                            </TextScramble>
                          </a>
                        </div>
                      </div>
                      <div className="mxd-team-grid__caption">
                        <div className="mxd-team-grid__name">
                          <p className="project-name-m">Alex Tomato</p>
                        </div>
                        <div className="mxd-team-grid__position">
                          <span className="tag tag-m tag-medium">
                            SEO, Gerente de Marca
                          </span>
                        </div>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                  {/* team item */}
                  <CommonCardBatchAnimated
                    className="col-12 col-md-6 col-xl-4 mxd-grid-item mxd-team-grid__item animate-card-3"
                    as="div"
                    columns={3}
                  >
                    <div className="mxd-team-grid__inner">
                      <div className="mxd-team-grid__media">
                        <div className="mxd-team-grid__photo">
                          <Image
                            alt="Azurio Template Team Member Photo"
                            src="/img/avatars/800x800_ava-07.webp"
                            width={800}
                            height={800}
                          />
                        </div>
                        <div className="mxd-team-grid__socials">
                          <a
                            href="https://www.linkedin.com/"
                            target="_blank"
                            className="tag tag-m tag-bg permanent"
                          >
                            <TextScramble className="mxd-scramble">
                              Linkedin
                            </TextScramble>
                          </a>
                          <a
                            href="https://www.behance.net/"
                            target="_blank"
                            className="tag tag-m tag-bg permanent"
                          >
                            <TextScramble className="mxd-scramble">
                              Behance
                            </TextScramble>
                          </a>
                        </div>
                      </div>
                      <div className="mxd-team-grid__caption">
                        <div className="mxd-team-grid__name">
                          <p className="project-name-m">Jenny Berry</p>
                        </div>
                        <div className="mxd-team-grid__position">
                          <span className="tag tag-m tag-medium">
                            Desenvolvedora Frontend
                          </span>
                        </div>
                      </div>
                    </div>
                  </CommonCardBatchAnimated>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Team Grid x3 End */}
        </div>
      </BlurSection>
    </>
  );
}
