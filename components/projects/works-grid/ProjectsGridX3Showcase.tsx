"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import Link from "next/link";
import Image from "next/image";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import { CommonCardBatchAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
import MxdImgAnim from "@/components/animations/MxdImgAnim";
export default function ProjectsGridX3Showcase() {
  return (
    <CommonLoadAnimation>
      <>
        <PinnedSection
          blurSection
          className="mxd-section padding-bottom-projects"
        >
          <PinnedSection.Inner>
            <div className="mxd-container grid-l-container">
              {/* Block - Projects Grid x3 Showcase Start */}
              <CommonLoadFade index={0}>
                <div className="mxd-block loading-fade">
                  <div className="mxd-projects-grid">
                    <div className="container-fluid p-0">
                      <div className="row g-0 mxd-projects-grid__gallery">
                        <CommonCardBatchAnimated
                          className="col-12 col-md-6 col-xl-4 mxd-project-item animate-card-3"
                          as="div"
                          columns={3}
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
                                  src="/img/works/showcase-grid-x3/pr01-01.webp"
                                  width={853}
                                  height={1280}
                                />
                              }
                              absolutes={[
                                <Image
                                  key="pr01-05"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr01-05.webp"
                                  width={853}
                                  height={1280}
                                />,
                                <Image
                                  key="pr01-04"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr01-04.webp"
                                  width={853}
                                  height={1280}
                                />,
                                <Image
                                  key="pr01-03"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr01-03.webp"
                                  width={853}
                                  height={1280}
                                />,
                                <Image
                                  key="pr01-02"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr01-02.webp"
                                  width={853}
                                  height={1280}
                                />,
                              ]}
                            />
                          </Link>
                          <div className="mxd-project-item__caption">
                            <div className="mxd-project-item__name">
                              <Link
                                className="project-name-s"
                                href={`/project-details`}
                              >
                                Illustrations set
                              </Link>
                            </div>
                            <div className="mxd-project-item__tags">
                              <TextScramble className="tag tag-s tag-medium mxd-scramble">
                                Design
                              </TextScramble>
                              <TextScramble className="tag tag-s tag-medium mxd-scramble">
                                Illustrations
                              </TextScramble>
                              <TextScramble className="tag tag-s tag-medium mxd-scramble">
                                Packaging
                              </TextScramble>
                              <TextScramble className="tag tag-s tag-medium mxd-scramble">
                                Marketing
                              </TextScramble>
                            </div>
                          </div>
                        </CommonCardBatchAnimated>
                        <CommonCardBatchAnimated
                          className="col-12 col-md-6 col-xl-4 mxd-project-item animate-card-3"
                          as="div"
                          columns={3}
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
                            />
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
                        <CommonCardBatchAnimated
                          className="col-12 col-md-6 col-xl-4 mxd-project-item animate-card-3"
                          as="div"
                          columns={3}
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
                                  src="/img/works/showcase-grid-x3/pr03-01.webp"
                                  width={1280}
                                  height={1280}
                                />
                              }
                              absolutes={[
                                <Image
                                  key="pr03-06"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr03-06.webp"
                                  width={1280}
                                  height={1280}
                                />,
                                <Image
                                  key="pr03-02"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr03-02.webp"
                                  width={1280}
                                  height={1280}
                                />,
                                <Image
                                  key="pr03-05"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr03-05.webp"
                                  width={1280}
                                  height={1280}
                                />,
                                <Image
                                  key="pr03-04"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr03-04.webp"
                                  width={1280}
                                  height={1280}
                                />,
                                <Image
                                  key="pr03-03"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr03-03.webp"
                                  width={1280}
                                  height={1280}
                                />,
                              ]}
                            />
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
                        <CommonCardBatchAnimated
                          className="col-12 col-md-6 col-xl-4 mxd-project-item animate-card-3"
                          as="div"
                          columns={3}
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
                                  src="/img/works/showcase-grid-x3/pr04-01.webp"
                                  width={1280}
                                  height={853}
                                />
                              }
                              absolutes={[
                                <Image
                                  key="pr04-02"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr04-02.webp"
                                  width={1280}
                                  height={853}
                                />,
                                <Image
                                  key="pr04-03"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr04-03.webp"
                                  width={1280}
                                  height={853}
                                />,
                                <Image
                                  key="pr04-04"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr04-04.webp"
                                  width={1280}
                                  height={853}
                                />,
                                <Image
                                  key="pr04-05"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr04-05.webp"
                                  width={1280}
                                  height={853}
                                />,
                                <Image
                                  key="pr04-06"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr04-06.webp"
                                  width={1280}
                                  height={853}
                                />,
                                <Image
                                  key="pr04-07"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr04-07.webp"
                                  width={1280}
                                  height={853}
                                />,
                              ]}
                            />
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
                        <CommonCardBatchAnimated
                          className="col-12 col-md-6 col-xl-4 mxd-project-item animate-card-3"
                          as="div"
                          columns={3}
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
                                  src="/img/works/showcase-grid-x3/pr05-01.webp"
                                  width={853}
                                  height={1280}
                                />
                              }
                              absolutes={[
                                <Image
                                  key="pr05-04"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr05-04.webp"
                                  width={853}
                                  height={1280}
                                />,
                                <Image
                                  key="pr05-05"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr05-05.webp"
                                  width={853}
                                  height={1280}
                                />,
                                <Image
                                  key="pr05-06"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr05-06.webp"
                                  width={853}
                                  height={1280}
                                />,
                                <Image
                                  key="pr05-03"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr05-03.webp"
                                  width={853}
                                  height={1280}
                                />,
                                <Image
                                  key="pr05-02"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr05-02.webp"
                                  width={853}
                                  height={1280}
                                />,
                              ]}
                            />
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
                        <CommonCardBatchAnimated
                          className="col-12 col-md-6 col-xl-4 mxd-project-item animate-card-3"
                          as="div"
                          columns={3}
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
                                  src="/img/works/showcase-grid-x3/pr06-01.webp"
                                  width={1280}
                                  height={1280}
                                />
                              }
                              absolutes={[
                                <Image
                                  key="pr06-07"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr06-07.webp"
                                  width={1280}
                                  height={1280}
                                />,
                                <Image
                                  key="pr06-06"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr06-06.webp"
                                  width={1280}
                                  height={1280}
                                />,
                                <Image
                                  key="pr06-05"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr06-05.webp"
                                  width={1280}
                                  height={1280}
                                />,
                                <Image
                                  key="pr06-04"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr06-04.webp"
                                  width={1280}
                                  height={1280}
                                />,
                                <Image
                                  key="pr06-03"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr06-03.webp"
                                  width={1280}
                                  height={1280}
                                />,
                                <Image
                                  key="pr06-02"
                                  alt="Project Preview Image"
                                  src="/img/works/showcase-grid-x3/pr06-02.webp"
                                  width={1280}
                                  height={1280}
                                />,
                              ]}
                            />
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
                    </div>
                  </div>
                </div>
              </CommonLoadFade>
              {/* Block - Projects Grid x3 Showcase End */}
            </div>
            <PinnedSection.Trigger />
          </PinnedSection.Inner>
        </PinnedSection>
      </>
    </CommonLoadAnimation>
  );
}
