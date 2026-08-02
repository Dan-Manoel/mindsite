"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Link from "next/link";
import Image from "next/image";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
  CommonScrollAnimatedLink,
} from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
import MxdImgAnim from "@/components/animations/MxdImgAnim";
export default function ProjectsGrid() {
  return (
    <>
      <PinnedSection
        id="works"
        blurSection
        className="mxd-section padding-top-title padding-bottom-default"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Block - Section Title v04 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title pre-grid">
                <div className="container-fluid p-0">
                  <div className="row g-0 d-flex flex-column-reverse flex-xl-row">
                    <div className="col-12 col-xl-3 mxd-grid-item">
                      <div className="mxd-section-title__data top-caption">
                        <div className="mxd-section-title__caption pre-controls">
                          <CommonAnimatedText
                            as="p"
                            className="t-bold t-large mxd-split-lines"
                            animation="splitLines"
                          >
                            Innovative design and
                            <span>cutting-edge development.</span>
                          </CommonAnimatedText>
                        </div>
                        <CommonScrollAnimated
                          className="mxd-section-title__controls anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <Link
                            className="btn btn-line btn-line-default"
                            href={`/works-default`}
                          >
                            <TextScramble className="btn-caption mxd-scramble">
                              All Works
                            </TextScramble>
                          </Link>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-1 mxd-grid-item" />
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title pre-caption">
                        <CommonAnimatedText
                          as="h2"
                          className="reveal-type"
                          animation="revealType"
                        >
                          Featured case
                          <br />
                          studies
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Section Title v04 End */}
            {/* Block - Projects Grid x3 Showcase Start */}
            <div className="mxd-block">
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
                  <div className="row g-0">
                    {/* all projects link */}
                    <div className="mxd-object-link">
                      <div className="container-fluid p-0">
                        <div className="row g-0 mxd-object-link__wrap">
                          <div className="col-12 col-md-6 col-xl-4 mxd-object-link__item justify-start">
                            <CommonScrollAnimated
                              className="mxd-object-link__object mxd-slide-object"
                              as="div"
                              animation="slideObject"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                viewBox="0 0 259 260"
                              >
                                <path d="M143.9,0v28.8h-28.8V0h28.8ZM143.9,28.8v28.8h28.8v-28.8h-28.8ZM172.7,57.6v28.8h28.8v-28.8h-28.8ZM230.2,115.2v-28.8h-28.8v28.8H0v28.8h201.4v28.8h28.8v-28.8h28.8v-28.8h-28.8ZM172.7,201.6h28.8v-28.8h-28.8v28.8ZM143.9,230.4h28.8v-28.8h-28.8v28.8ZM114.3,260h28.8v-28.8h-28.8v28.8Z" />
                              </svg>
                              {/* <Image   alt="Azurio Image"    src="/img/cursor-trail-transparent/07_trail.webp" width="400" height="480" /> */}
                            </CommonScrollAnimated>
                          </div>
                          <div className="col-12 col-md-6 col-xl-4 mxd-object-link__item justify-end">
                            <div className="mxd-object-link__content">
                              <CommonScrollAnimated
                                className="mxd-object-link__btnholder anim-uni-in-up"
                                as="div"
                                animation="inUp"
                              >
                                <Link
                                  className="btn btn-line btn-line-default"
                                  href={`/works-default`}
                                >
                                  <TextScramble className="btn-caption mxd-scramble">
                                    All Works
                                  </TextScramble>
                                </Link>
                              </CommonScrollAnimated>
                              <CommonScrollAnimatedLink
                                className="mxd-object-link__media active-cursor-permanent anim-uni-in-up"
                                data-cursor-text="All Works"
                                href={`/works-default`}
                                animation="inUp"
                              >
                                <MxdImgAnim
                                  main={
                                    <Image
                                      className="centered-y"
                                      alt="Project Preview Image"
                                      src="/img/works/800x450_all03.webp"
                                      width={800}
                                      height={450}
                                    />
                                  }
                                  absolutes={[
                                    <Image
                                      key="all02"
                                      className="centered-y"
                                      alt="Project Preview Image"
                                      src="/img/works/800x450_all02.webp"
                                      width={800}
                                      height={450}
                                    />,
                                    <Image
                                      key="all01"
                                      className="centered-y"
                                      alt="Project Preview Image"
                                      src="/img/works/800x450_all01.webp"
                                      width={800}
                                      height={450}
                                    />,
                                    <Image
                                      key="all04"
                                      className="centered-y"
                                      alt="Project Preview Image"
                                      src="/img/works/800x450_all04.webp"
                                      width={800}
                                      height={450}
                                    />,
                                    <Image
                                      key="all05"
                                      className="centered-y"
                                      alt="Project Preview Image"
                                      src="/img/works/800x450_all05.webp"
                                      width={800}
                                      height={450}
                                    />,
                                    <Image
                                      key="all06"
                                      className="centered-y"
                                      alt="Project Preview Image"
                                      src="/img/works/800x450_all06.webp"
                                      width={800}
                                      height={450}
                                    />,
                                  ]}
                                />
                              </CommonScrollAnimatedLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Projects Grid x3 Showcase End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
