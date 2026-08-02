"use client";

import PinnedSection from "@/components/animations/PinnedSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Image from "next/image";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function Resume() {
  return (
    <>
      <PinnedSection
        blurSection
        className="mxd-section padding-top-number padding-bottom-default"
      >
        <PinnedSection.Inner>
          <div className="mxd-container grid-l-container">
            {/* Section Title v06 Start */}
            <div className="mxd-block">
              <div className="mxd-section-title">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-xl-4 mxd-grid-item">
                      <div className="mxd-section-title__data top-number">
                        <CommonScrollAnimated
                          className="mxd-section-title__number anim-uni-in-up"
                          as="div"
                          animation="inUp"
                        >
                          <TextScramble className="title-number mxd-scramble">
                            CV/04
                          </TextScramble>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-title__title pre-caption-extra">
                        <a
                          className="active-cursor-accent"
                          data-cursor-text="Download CV"
                          href="#0"
                        >
                          <CommonAnimatedText
                            as="h2"
                            className="mxd-split-lines"
                            animation="splitLines"
                          >
                            My digital
                            <br />
                            journey
                          </CommonAnimatedText>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mxd-section-info">
                <div className="container-fluid p-0">
                  <div className="row g-0 d-flex flex-column-reverse flex-xl-row">
                    <div className="col-12 col-xl-4 mxd-grid-item" />
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-info__descr">
                        <p className="t-extra t-bold">
                          <a data-cursor-text="Download CV" href="#0">
                            <CommonAnimatedText
                              as="span"
                              className="active-cursor-accent mxd-split-lines"
                              animation="splitLines"
                            >
                              Web design is evolving rapidly, and I strive to
                              stay ahead.
                              <span>
                                Emerging tools and technologies enable me to
                                create visually stunning and seamlessly
                                functional websites.
                              </span>
                            </CommonAnimatedText>
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section Title v06 End */}
            {/* Section Subtitle v01 Start */}
            <div className="mxd-block">
              <div className="mxd-section-subtitle padding-info-top">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-xl-4 mxd-grid-item" />
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <div className="mxd-section-subtitle__tagline">
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          <span className="tag tag-m meta-tag">
                            [01] Experience
                          </span>
                        </CommonScrollAnimated>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section Subtitle v01 End */}
            {/* Block - Resume List Start */}
            <div className="mxd-block">
              <div className="mxd-resume">
                {/* resume item */}
                <div className="mxd-resume__item">
                  <div className="container-fluid px-0 mxd-resume__inner">
                    <div className="row g-0">
                      <div className="col-12 col-xl-4 mxd-grid-item">
                        <div className="mxd-resume__title">
                          <p>UI/UX designer</p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__image">
                          <Image
                            alt="Azurio Image"
                            src="/img/illustrations/resume01.webp"
                            width={1000}
                            height={455}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__link">
                          <p>
                            <a href="#0" target="_blank">
                              Moon Light
                            </a>{" "}
                            Agency
                          </p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-2 mxd-grid-item">
                        <div className="mxd-resume__date">
                          <p>2024 - now</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* resume item */}
                <div className="mxd-resume__item">
                  <div className="container-fluid px-0 mxd-resume__inner">
                    <div className="row g-0">
                      <div className="col-12 col-xl-4 mxd-grid-item">
                        <div className="mxd-resume__title">
                          <p>Branding designer</p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__image">
                          <Image
                            alt="Azurio Image"
                            src="/img/illustrations/resume02.webp"
                            width={1000}
                            height={455}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__link">
                          <p>
                            <a href="#0" target="_blank">
                              Moon Light
                            </a>{" "}
                            Agency
                          </p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-2 mxd-grid-item">
                        <div className="mxd-resume__date">
                          <p>2024 - now</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* resume item */}
                <div className="mxd-resume__item">
                  <div className="container-fluid px-0 mxd-resume__inner">
                    <div className="row g-0">
                      <div className="col-12 col-xl-4 mxd-grid-item">
                        <div className="mxd-resume__title">
                          <p>Creative director</p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__image">
                          <Image
                            alt="Azurio Image"
                            src="/img/illustrations/resume03.webp"
                            width={1000}
                            height={455}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__link">
                          <p>
                            <a href="#0" target="_blank">
                              Koob Studio
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-2 mxd-grid-item">
                        <div className="mxd-resume__date">
                          <p>2022 - 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* resume item */}
                <div className="mxd-resume__item">
                  <div className="container-fluid px-0 mxd-resume__inner">
                    <div className="row g-0">
                      <div className="col-12 col-xl-4 mxd-grid-item">
                        <div className="mxd-resume__title">
                          <p>Graphic designer</p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__image">
                          <Image
                            alt="Azurio Image"
                            src="/img/illustrations/resume04.webp"
                            width={1000}
                            height={455}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__link">
                          <p>
                            <a href="#0" target="_blank">
                              a1 creatives
                            </a>{" "}
                            Agency
                          </p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-2 mxd-grid-item">
                        <div className="mxd-resume__date">
                          <p>2019 - 2022</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* resume item */}
                <div className="mxd-resume__item">
                  <div className="container-fluid px-0 mxd-resume__inner">
                    <div className="row g-0">
                      <div className="col-12 col-xl-4 mxd-grid-item">
                        <div className="mxd-resume__title">
                          <p>Illustrator</p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__image">
                          <Image
                            alt="Azurio Image"
                            src="/img/illustrations/resume05.webp"
                            width={1000}
                            height={455}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__link">
                          <p>
                            <a href="#0" target="_blank">
                              Creative mind
                            </a>
                            Agency
                          </p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-2 mxd-grid-item">
                        <div className="mxd-resume__date">
                          <p>2017 - 2019</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Resume List End */}
            {/* Section Subtitle v01 Start */}
            <div className="mxd-block">
              <div className="mxd-section-subtitle padding-default">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-xl-4 mxd-grid-item" />
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <CommonScrollAnimated
                        className="mxd-section-subtitle__tagline anim-uni-in-up"
                        as="div"
                        animation="inUp"
                      >
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          <span className="tag tag-m meta-tag">
                            [02] Education
                          </span>
                        </CommonScrollAnimated>
                      </CommonScrollAnimated>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section Subtitle v01 End */}
            {/* Block - Resume List Start */}
            <div className="mxd-block">
              <div className="mxd-resume">
                {/* resume item */}
                <div className="mxd-resume__item">
                  <div className="container-fluid px-0 mxd-resume__inner">
                    <div className="row g-0">
                      <div className="col-12 col-xl-4 mxd-grid-item">
                        <div className="mxd-resume__title">
                          <p>UI/UX Designer</p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__image">
                          <Image
                            alt="Azurio Image"
                            src="/img/illustrations/resume08.webp"
                            width={1000}
                            height={455}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__link">
                          <p>
                            <a href="#0" target="_blank">
                              Coursera
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-2 mxd-grid-item">
                        <div className="mxd-resume__date">
                          <p>2022 - 2024</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* resume item */}
                <div className="mxd-resume__item">
                  <div className="container-fluid px-0 mxd-resume__inner">
                    <div className="row g-0">
                      <div className="col-12 col-xl-4 mxd-grid-item">
                        <div className="mxd-resume__title">
                          <p>Graphic design</p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__image">
                          <Image
                            alt="Azurio Image"
                            src="/img/illustrations/resume07.webp"
                            width={1000}
                            height={455}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__link">
                          <p>
                            <a href="#0" target="_blank">
                              California Institute of Arts
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-2 mxd-grid-item">
                        <div className="mxd-resume__date">
                          <p>2019 - 2021</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* resume item */}
                <div className="mxd-resume__item">
                  <div className="container-fluid px-0 mxd-resume__inner">
                    <div className="row g-0">
                      <div className="col-12 col-xl-4 mxd-grid-item">
                        <div className="mxd-resume__title">
                          <p>Drawing concentration</p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__image">
                          <Image
                            alt="Azurio Image"
                            src="/img/illustrations/resume06.webp"
                            width={1000}
                            height={455}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-xl-3 mxd-grid-item">
                        <div className="mxd-resume__link">
                          <p>
                            <a href="#0" target="_blank">
                              New York Academy of Art
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="col-12 col-xl-2 mxd-grid-item">
                        <div className="mxd-resume__date">
                          <p>2015 - 2016</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Resume List End */}
            {/* Section Subtitle v01 Start */}
            <div className="mxd-block">
              <div className="mxd-section-subtitle padding-default pre-grid-mobile">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-xl-4 mxd-grid-item" />
                    <div className="col-12 col-xl-8 mxd-grid-item">
                      <CommonScrollAnimated
                        className="mxd-section-subtitle__tagline anim-uni-in-up"
                        as="div"
                        animation="inUp"
                      >
                        <CommonScrollAnimated
                          className="anim-uni-in-up"
                          as="p"
                          animation="inUp"
                        >
                          <span className="tag tag-m meta-tag">
                            [03] Everyday&apos;s toolbox
                          </span>
                        </CommonScrollAnimated>
                      </CommonScrollAnimated>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Section Subtitle v01 End */}
            {/* Block Toolbox List Start */}
            <div className="mxd-block">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-4 mxd-grid-item" />
                  <div className="col-12 col-xl-4 mxd-grid-item">
                    <div className="mxd-toolbox">
                      {/* toolbox item */}
                      <div className="mxd-toolbox__item">
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-top anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                        <CommonScrollAnimated
                          className="mxd-toolbox__icon anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <Image
                            alt="Azurio Icon"
                            src="/img/tech/icon-figma.svg"
                            width={50}
                            height={40}
                          />
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__name anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <p>Figma</p>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-bottom anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                      </div>
                      {/* toolbox item */}
                      <div className="mxd-toolbox__item">
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-top anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                        <CommonScrollAnimated
                          className="mxd-toolbox__icon anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <Image
                            alt="Azurio Icon"
                            src="/img/tech/icon-photoshop.svg"
                            width={50}
                            height={40}
                          />
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__name anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <p>Adobe Photoshop</p>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-bottom anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                      </div>
                      {/* toolbox item */}
                      <div className="mxd-toolbox__item">
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-top anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                        <CommonScrollAnimated
                          className="mxd-toolbox__icon anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <Image
                            alt="Azurio Icon"
                            src="/img/tech/icon-illustrator.svg"
                            width={50}
                            height={40}
                          />
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__name anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <p>Adobe Illustrator</p>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-bottom anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                      </div>
                      {/* toolbox item */}
                      <div className="mxd-toolbox__item">
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-top anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                        <CommonScrollAnimated
                          className="mxd-toolbox__icon anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <Image
                            alt="Azurio Icon"
                            src="/img/tech/icon-sketch.svg"
                            width={50}
                            height={40}
                          />
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__name anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <p>Sketch</p>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-bottom anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-xl-4 mxd-grid-item">
                    <div className="mxd-toolbox">
                      {/* toolbox item */}
                      <div className="mxd-toolbox__item">
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-top anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                        <CommonScrollAnimated
                          className="mxd-toolbox__icon anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <Image
                            alt="Azurio Icon"
                            src="/img/tech/icon-blender.svg"
                            width={50}
                            height={40}
                          />
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__name anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <p>Blender</p>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-bottom anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                      </div>
                      {/* toolbox item */}
                      <div className="mxd-toolbox__item">
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-top anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                        <CommonScrollAnimated
                          className="mxd-toolbox__icon anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <Image
                            alt="Azurio Icon"
                            src="/img/tech/icon-midjourney.svg"
                            width={50}
                            height={40}
                          />
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__name anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <p>Midjourney</p>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-bottom anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                      </div>
                      {/* toolbox item */}
                      <div className="mxd-toolbox__item">
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-top anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                        <CommonScrollAnimated
                          className="mxd-toolbox__icon anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <Image
                            alt="Azurio Icon"
                            src="/img/tech/icon-unicorn.svg"
                            width={50}
                            height={40}
                          />
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__name anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <p>Unicorn.studio</p>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-bottom anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                      </div>
                      {/* toolbox item */}
                      <div className="mxd-toolbox__item">
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-top anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                        <CommonScrollAnimated
                          className="mxd-toolbox__icon anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <Image
                            alt="Azurio Icon"
                            src="/img/tech/icon-notion.svg"
                            width={50}
                            height={40}
                          />
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__name anim-uni-slide-down"
                          as="div"
                          animation="slideDownLine"
                        >
                          <p>Notion</p>
                        </CommonScrollAnimated>
                        <CommonScrollAnimated
                          className="mxd-toolbox__divider divider-bottom anim-uni-clip-in"
                          as="div"
                          animation="clipIn"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block Toolbox List End */}
          </div>
          <PinnedSection.Trigger />
        </PinnedSection.Inner>
      </PinnedSection>
    </>
  );
}
