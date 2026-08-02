import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";
export default function InnerHeadline() {
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section">
          <div className="mxd-container grid-l-container">
            {/* Block - Inner Headline v01 Start */}
            <div className="mxd-block loading-wrap">
              <div className="inner-headline margin-bottom-subtitle">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
                      {/* breadcrumbs */}
                      <CommonLoadFade index={0}>
                        <div className="inner-headline__breadcrumbs loading-fade">
                          <div className="breadcrumbs__nav">
                            <span>
                              <Link href={`/`}>
                                <TextScramble className="mxd-scramble">
                                  Início
                                </TextScramble>
                              </Link>
                            </span>
                            <span className="current-item">Insights </span>
                          </div>
                        </div>
                      </CommonLoadFade>
                    </div>
                    <div className="col-12">
                      {/* content */}
                      <div className="inner-headline__content has-large-title">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 col-xl-8 mxd-grid-item">
                              <CommonLoadItem index={0}>
                                <div className="inner-headline__title pre-subtitle-large loading-item">
                                  <h1 className="large">
                                    Diário<sup>(34)</sup>
                                  </h1>
                                </div>
                              </CommonLoadItem>
                              <CommonLoadItem index={1}>
                                <div className="inner-headline__subtitle loading-item">
                                  <p>
                                    Mergulhe nas últimas tendências, descubra
                                    insights do setor, explore conselhos práticos{" "}
                                    <span>
                                      pensados para prosperar no sempre evolutivo
                                      cenário digital.
                                    </span>
                                  </p>
                                </div>
                              </CommonLoadItem>
                            </div>
                            <div className="col-12 col-xl-4 mxd-grid-item">
                              <div className="inner-headline__tags align-end-desktop tags-large-subtitle">
                                <CommonLoadItem index={2}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-m meta-tag mxd-scramble">
                                      Midjourney
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                                <CommonLoadItem index={3}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-m meta-tag mxd-scramble">
                                      IA
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                                <CommonLoadItem index={4}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-m meta-tag mxd-scramble">
                                      Editorial
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                                <CommonLoadItem index={5}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-m meta-tag mxd-scramble">
                                      Design
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                                <CommonLoadItem index={6}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-m meta-tag mxd-scramble">
                                      Experiência Web
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                                <CommonLoadItem index={7}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-m meta-tag mxd-scramble">
                                      Branding
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                                <CommonLoadItem index={8}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-m meta-tag mxd-scramble">
                                      UI/UX
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                                <CommonLoadItem index={9}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-m meta-tag mxd-scramble">
                                      Frontend
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                                <CommonLoadItem index={10}>
                                  <a className="loading-item" href="#0">
                                    <TextScramble className="tag tag-m meta-tag mxd-scramble">
                                      Motion
                                    </TextScramble>
                                  </a>
                                </CommonLoadItem>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Inner Headline v01 End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
