"use client";

import BlurSection from "@/components/animations/BlurSection";
import { initCtaMarqueeToRight } from "@/lib/template/ctaMarqueeEffects";
import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import { CommonCardBatchAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function DemoGrid() {
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    return initCtaMarqueeToRight(marqueeTrackRef.current);
  }, []);
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection id="demo" className="mxd-section">
          <div className="mxd-container grid-l-container">
            {/* Block - Demo Grid x2 Showcase Start */}
            <div className="mxd-block">
              <CommonLoadFade index={0}>
                <div className="mxd-demo-grid loading-fade">
                  <div className="container-fluid p-0">
                    <div className="row g-0 mxd-demo-grid__gallery">
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="View Demo"
                          href={`/index-branding-studio`}
                          target="_blank"
                        >
                          <Image
                            alt="Azurio Template Preview Image"
                            src="/img/demo/screens/01.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-01" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-branding-studio`}
                              target="_blank"
                            >
                              Branding studio
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Cards Stack
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Slideshow
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Split Text
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="View Demo"
                          href={`/index-software-development-company`}
                          target="_blank"
                        >
                          <Image
                            alt="Azurio Template Preview Image"
                            src="/img/demo/screens/02.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-02" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-software-development-company`}
                            >
                              Software development company
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Zoom Video
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Bento
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Perspective
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="View Demo"
                          href={`/index-creative-agency`}
                          target="_blank"
                        >
                          <Image
                            alt="Azurio Template Preview Image"
                            src="/img/demo/screens/03.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-03" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-creative-agency`}
                            >
                              Creative agency
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              cursor Trail
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Video Preview
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Services Stack
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="View Demo"
                          href={`/index-freelancer-portfolio`}
                          target="_blank"
                        >
                          <Image
                            alt="Azurio Template Preview Image"
                            src="/img/demo/screens/04.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-04" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-freelancer-portfolio`}
                            >
                              Freelancer portfolio
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Image Cursor
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Zoom Slides
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Phisics
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="View Demo"
                          href={`/index-design-studio`}
                          target="_blank"
                        >
                          <Image
                            alt="Azurio Template Preview Image"
                            src="/img/demo/screens/05.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-05" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-design-studio`}
                            >
                              Design studio
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Hover Slideshow
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Marquee
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Phisics
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="View Demo"
                          href={`/index-web-developer`}
                          target="_blank"
                        >
                          <Image
                            alt="Azurio Template Preview Image"
                            src="/img/demo/screens/06.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-06" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-web-developer`}
                            >
                              Web developer
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Sticky Block
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Slideshow
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Image Cursor
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="View Demo"
                          href={`/index-personal-portfolio`}
                          target="_blank"
                        >
                          <Image
                            alt="Azurio Template Preview Image"
                            src="/img/demo/screens/07.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-07" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-personal-portfolio`}
                            >
                              Personal portfolio
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Perspective
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Resume
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Phisics
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="View Demo"
                          href={`/index-digital-agency`}
                          target="_blank"
                        >
                          <Image
                            alt="Azurio Template Preview Image"
                            src="/img/demo/screens/08.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-08" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-digital-agency`}
                            >
                              Digital agency
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              3D Images
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Fullscreen Carousel
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Cursor Trail
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="View Demo"
                          href={`/index-web-studio`}
                          target="_blank"
                        >
                          <Image
                            alt="Azurio Template Preview Image"
                            src="/img/demo/screens/09.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-09" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-web-studio`}
                            >
                              Web studio
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Horizontal Showcase
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Stack Cards
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Cursor Images
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="View Demo"
                          href={`/index-digital-designer`}
                          target="_blank"
                        >
                          <Image
                            alt="Azurio Template Preview Image"
                            src="/img/demo/screens/10.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-10" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-digital-designer`}
                              target="_blank"
                            >
                              Digital designer
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Inertia images
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Fullscreen showcase
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Images reveal
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                    </div>
                  </div>
                </div>
              </CommonLoadFade>
            </div>
            {/* Block - Demo Grid x2 Showcase End */}
          </div>
          <div className="mxd-container fullwidth-container">
            {/* Block - Marquee Text One Line Start */}
            <div className="mxd-block">
              <div className="mxd-demo-marquee-01">
                {/* Marquee Divider Start */}
                <div className="marquee marquee-stack marquee-right--gsap muted">
                  <div className="marquee__toright" ref={marqueeTrackRef}>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        Freelancer/
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">Designer/</p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        Developer/
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        DigitalAgency/
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        CreativeStudio/
                      </p>
                    </div>
                  </div>
                </div>
                {/* Marquee Divider End */}
              </div>
            </div>
            {/* Block - Marquee Text One Line End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
