import AutoplayLoopVideo from "@/components/media/AutoplayLoopVideo";
import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import Image from "next/image";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import { CommonCardBatchAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
import MxdImgAnim from "@/components/animations/MxdImgAnim";
export default function ProjectsGridStickyShowcase() {
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section padding-bottom-projects">
          <div className="mxd-container grid-l-container">
            {/* Block - Projects Grid Sticky Showcase Start */}
            <div className="mxd-block">
              <CommonLoadFade index={0}>
                <div className="mxd-projects-grid loading-fade">
                  <div className="container-fluid p-0">
                    <div className="row g-0 mxd-projects-grid__gallery">
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 col-xl-4 mxd-project-item animate-card-2 mxd-project-item-s mxd-project-item-sticky"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-project-item__media active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <MxdImgAnim
                            main={
                              <Image
                                className="centered-y"
                                alt="Project Preview Image"
                                src="/img/works/showcase-sticky/pr01-01.webp"
                                width={1280}
                                height={722}
                              />
                            }
                            absolutes={[
                              <Image
                                key="pr01-02"
                                className="centered-y"
                                alt="Project Preview Image"
                                src="/img/works/showcase-sticky/pr01-02.webp"
                                width={1280}
                                height={722}
                              />,
                              <Image
                                key="pr01-03"
                                className="centered-y"
                                alt="Project Preview Image"
                                src="/img/works/showcase-sticky/pr01-03.webp"
                                width={1280}
                                height={722}
                              />,
                              <Image
                                key="pr01-04"
                                className="centered-y"
                                alt="Project Preview Image"
                                src="/img/works/showcase-sticky/pr01-04.webp"
                                width={1280}
                                height={722}
                              />,
                              <Image
                                key="pr01-05"
                                className="centered-y"
                                alt="Project Preview Image"
                                src="/img/works/showcase-sticky/pr01-05.webp"
                                width={1280}
                                height={722}
                              />,
                              <Image
                                key="pr01-06"
                                className="centered-y"
                                alt="Project Preview Image"
                                src="/img/works/showcase-sticky/pr01-06.webp"
                                width={1280}
                                height={722}
                              />,
                            ]}
                          >
                            <div className="mxd-cover mxd-cover-06" />
                            <div className="mxd-project-item__logowrap">
                              <Image
                                alt="Client's Logo"
                                src="/img/works/showcase-sticky/clients/01.svg"
                                width={370}
                                height={67}
                              />
                            </div>
                          </MxdImgAnim>
                        </Link>
                        <div className="mxd-project-item__caption">
                          <div className="mxd-project-item__name">
                            <Link
                              className="project-name-s"
                              href={`/project-details`}
                            >
                              Interactive concept
                            </Link>
                          </div>
                          <div className="mxd-project-item__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              UI/UX
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Development
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Brand
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      <div className="col-12 col-xl-1 mxd-project-divider" />
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 col-xl-7 mxd-project-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-project-item__media active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <Image
                            alt="Project Preview Image"
                            src="/img/works/showcase-sticky/pr02-01.webp"
                            width={1500}
                            height={1000}
                          />
                          <div className="mxd-cover mxd-cover-06" />
                          <div className="mxd-project-item__logowrap">
                            <Image
                              alt="Client's Logo"
                              src="/img/works/showcase-sticky/clients/02.svg"
                              width={393}
                              height={49}
                            />
                          </div>
                          <div className="mxd-project-item__videowrap">
                            <AutoplayLoopVideo
                              className="mxd-project-item__video"
                              poster="video/640x360_stone-geometry-banner.webp"
                              sources={[
                                {
                                  type: "video/mp4",
                                  src: "video/640x360_stone-geometry.mp4",
                                },
                                {
                                  type: "video/webm",
                                  src: "video/640x360_stone-geometry.webm",
                                },
                              ]}
                            />
                          </div>
                        </Link>
                        <div className="mxd-project-item__caption">
                          <div className="mxd-project-item__name">
                            <Link
                              className="project-name-s"
                              href={`/project-details`}
                            >
                              Creative studio template
                            </Link>
                          </div>
                          <div className="mxd-project-item__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Brand
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Marketing
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Website
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                    </div>
                    <div className="row g-0 mxd-projects-grid__gallery">
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 col-xl-7 mxd-project-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-project-item__media active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <Image
                            alt="Project Preview Image"
                            src="/img/works/showcase-sticky/pr03-01.webp"
                            width={1500}
                            height={1125}
                          />
                          <div className="mxd-cover mxd-cover-03" />
                          <div className="mxd-project-item__logowrap">
                            <Image
                              alt="Client's Logo"
                              src="/img/works/showcase-sticky/clients/03.svg"
                              width={300}
                              height={216}
                            />
                          </div>
                          <div className="mxd-project-item__videowrap">
                            <AutoplayLoopVideo
                              className="mxd-project-item__video"
                              poster="video/640x360_bw-geometry-banner.webp"
                              sources={[
                                {
                                  type: "video/mp4",
                                  src: "video/640x360_bw-geometry.mp4",
                                },
                                {
                                  type: "video/webm",
                                  src: "video/640x360_bw-geometry.webm",
                                },
                              ]}
                            />
                          </div>
                        </Link>
                        <div className="mxd-project-item__caption">
                          <div className="mxd-project-item__name">
                            <Link
                              className="project-name-s"
                              href={`/project-details`}
                            >
                              Creative studio template
                            </Link>
                          </div>
                          <div className="mxd-project-item__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Brand
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Marketing
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Website
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      <div className="col-12 col-xl-1 mxd-project-divider" />
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 col-xl-4 mxd-project-item animate-card-2 mxd-project-item-s mxd-project-item-sticky"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-project-item__media active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <MxdImgAnim
                            main={
                              <Image
                                alt="Project Preview Image"
                                src="/img/works/showcase-grid-x3/pr02-01.webp"
                                width={1280}
                                height={843}
                              />
                            }
                            absolutes={[
                              <Image
                                key="pr02-04"
                                alt="Project Preview Image"
                                src="/img/works/showcase-grid-x3/pr02-04.webp"
                                width={1280}
                                height={843}
                              />,
                              <Image
                                key="pr02-05"
                                alt="Project Preview Image"
                                src="/img/works/showcase-grid-x3/pr02-05.webp"
                                width={1280}
                                height={843}
                              />,
                              <Image
                                key="pr02-03"
                                alt="Project Preview Image"
                                src="/img/works/showcase-grid-x3/pr02-03.webp"
                                width={1280}
                                height={843}
                              />,
                              <Image
                                key="pr02-02"
                                alt="Project Preview Image"
                                src="/img/works/showcase-grid-x3/pr02-02.webp"
                                width={1280}
                                height={843}
                              />,
                            ]}
                          >
                            <div className="mxd-cover mxd-cover-03" />
                            <div className="mxd-project-item__logowrap">
                              <Image
                                alt="Client's Logo"
                                src="/img/works/showcase-sticky/clients/04.svg"
                                width={376}
                                height={29}
                              />
                            </div>
                          </MxdImgAnim>
                        </Link>
                        <div className="mxd-project-item__caption">
                          <div className="mxd-project-item__name">
                            <Link
                              className="project-name-s"
                              href={`/project-details`}
                            >
                              Interactive concept
                            </Link>
                          </div>
                          <div className="mxd-project-item__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              UI/UX
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Development
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Brand
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                    </div>
                  </div>
                </div>
              </CommonLoadFade>
            </div>
            {/* Block - Projects Grid Sticky Showcase End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
