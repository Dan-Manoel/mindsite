"use client";

import Link from "next/link";
import Image from "next/image";
import PinnedSection from "@/components/animations/PinnedSection";
import { initCtaMarqueeToRight } from "@/lib/template/ctaMarqueeEffects";
import { useLayoutEffect, useRef } from "react";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";

export default function Hero() {
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    return initCtaMarqueeToRight(marqueeTrackRef.current);
  }, []);

  return (
    <CommonLoadAnimation>
      <>
        <PinnedSection className="mxd-section mxd-hero-section no-padding mxd-hero-fullheight-desktop loading-wrap">
          <PinnedSection.Inner>
            <div className="mxd-hero-08">
              <div className="mxd-hero-08__wrap">
                {/* top group */}
                <div className="mxd-hero-08__top">
                  <div className="mxd-hero-08__marquee">
                    <div className="marquee marquee-right--gsap">
                      <div
                        className="marquee__toright marquee__images align-center"
                        ref={marqueeTrackRef}
                      >
                        {/* single item */}
                        <Link
                          className="marquee__item item-hero active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <div className="marquee__image">
                            <Image
                              alt="Azurio Template Image Example"
                              src="/img/cta/mar_15.webp"
                              width={800}
                              height={1200}
                              priority
                            />
                          </div>
                        </Link>
                        {/* single item */}
                        <Link
                          className="marquee__item item-hero active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <div className="marquee__image">
                            <Image
                              alt="Azurio Template Image Example"
                              src="/img/cta/mar_14.webp"
                              width={737}
                              height={1200}
                            />
                          </div>
                        </Link>
                        {/* single item */}
                        <Link
                          className="marquee__item item-hero active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <div className="marquee__image">
                            <Image
                              alt="Azurio Template Image Example"
                              src="/img/cta/mar_13.webp"
                              width={700}
                              height={700}
                            />
                          </div>
                        </Link>
                        {/* single item */}
                        <Link
                          className="marquee__item item-hero active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <div className="marquee__image">
                            <Image
                              alt="Azurio Template Image Example"
                              src="/img/cta/mar_12.webp"
                              width={1200}
                              height={685}
                            />
                          </div>
                        </Link>
                        {/* single item */}
                        <Link
                          className="marquee__item item-hero active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <div className="marquee__image">
                            <Image
                              alt="Azurio Template Image Example"
                              src="/img/cta/mar_11.webp"
                              width={1200}
                              height={1200}
                            />
                          </div>
                        </Link>
                        {/* single item */}
                        <Link
                          className="marquee__item item-hero active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <div className="marquee__image">
                            <Image
                              alt="Azurio Template Image Example"
                              src="/img/cta/mar_10.webp"
                              width={1200}
                              height={873}
                            />
                          </div>
                        </Link>
                        {/* single item */}
                        <Link
                          className="marquee__item item-hero active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <div className="marquee__image">
                            <Image
                              alt="Azurio Template Image Example"
                              src="/img/cta/mar_09.webp"
                              width={800}
                              height={1200}
                            />
                          </div>
                        </Link>
                        {/* single item */}
                        <Link
                          className="marquee__item item-hero active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <div className="marquee__image">
                            <Image
                              alt="Azurio Template Image Example"
                              src="/img/cta/mar_08.webp"
                              width={737}
                              height={1200}
                            />
                          </div>
                        </Link>
                        {/* single item */}
                        <Link
                          className="marquee__item item-hero active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <div className="marquee__image">
                            <Image
                              alt="Azurio Template Image Example"
                              src="/img/cta/mar_07.webp"
                              width={1200}
                              height={900}
                            />
                          </div>
                        </Link>
                        {/* single item */}
                        <Link
                          className="marquee__item item-hero active-cursor-permanent"
                          data-cursor-text="View Work"
                          href={`/project-details`}
                        >
                          <div className="marquee__image">
                            <Image
                              alt="Azurio Template Image Example"
                              src="/img/cta/mar_06.webp"
                              width={1200}
                              height={1200}
                            />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* bottom group */}
                <div className="mxd-hero-08__bottom">
                  <div className="mxd-hero-08__content mxd-grid-item">
                    <div className="mxd-hero-08__data">
                      <CommonLoadFade index={0}>
                        <div className="mxd-hero__mark loading-fade">
                          <span className="mark-icon" />
                          <span className="mark-text">
                            Available for freelance
                          </span>
                        </div>
                      </CommonLoadFade>
                      <div className="mxd-hero-08__descr">
                        <CommonAnimatedText
                          as="p"
                          className="t-bold t-large loading-split"
                          animation="splitLinesLoad"
                        >
                          I am Alex Walker.
                          <span>
                            I&apos;m passionate about crafting designs that tell
                            stories, spark emotions, and make an impact.
                          </span>
                        </CommonAnimatedText>
                      </div>
                    </div>
                    <div className="mxd-hero-08__socials">
                      <ul className="mxd-socials-line column">
                        <li>
                          <CommonLoadItem index={0}>
                            <a
                              className="mxd-socials-line__link loading-item"
                              href="https://dribbble.com/"
                              target="_blank"
                            >
                              <TextScramble className="mxd-scramble">
                                Dribbble
                              </TextScramble>
                            </a>
                          </CommonLoadItem>
                        </li>
                        <li>
                          <CommonLoadItem index={1}>
                            <a
                              className="mxd-socials-line__link loading-item"
                              href="https://www.behance.net/"
                              target="_blank"
                            >
                              <TextScramble className="mxd-scramble">
                                Behance
                              </TextScramble>
                            </a>
                          </CommonLoadItem>
                        </li>
                        <li>
                          <CommonLoadItem index={2}>
                            <a
                              className="mxd-socials-line__link loading-item"
                              href="https://github.com/"
                              target="_blank"
                            >
                              <TextScramble className="mxd-scramble">
                                Github
                              </TextScramble>
                            </a>
                          </CommonLoadItem>
                        </li>
                        <li>
                          <CommonLoadItem index={3}>
                            <a
                              className="mxd-socials-line__link loading-item"
                              href="https://codepen.io/"
                              target="_blank"
                            >
                              <TextScramble className="mxd-scramble">
                                Codepen
                              </TextScramble>
                            </a>
                          </CommonLoadItem>
                        </li>
                        <li>
                          <CommonLoadItem index={4}>
                            <a
                              className="mxd-socials-line__link loading-item"
                              href="https://www.figma.com/community"
                              target="_blank"
                            >
                              <TextScramble className="mxd-scramble">
                                Figma Community
                              </TextScramble>
                            </a>
                          </CommonLoadItem>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <CommonLoadItem index={5}>
                    <div className="mxd-hero-08__controls mxd-grid-item loading-item">
                      <SmoothAnchorLink
                        className="btn btn-line-icon btn-line-icon-small btn-line-default slide-down"
                        targetId="works"
                      >
                        <TextScramble className="btn-caption mxd-scramble">
                          Scroll to explore
                        </TextScramble>
                        <i>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            viewBox="0 0 18 18"
                          >
                            <path d="M18,10.8h-3.6v-3.6h3.6v3.6ZM7.2,14.4v3.6h3.6v-3.6h3.6v-3.6h-3.6V0h-3.6v10.8h-3.6v3.6s3.6,0,3.6,0ZM3.6,10.8v-3.6H0v3.6h3.6Z" />
                          </svg>
                        </i>
                      </SmoothAnchorLink>
                    </div>
                  </CommonLoadItem>
                </div>
              </div>
            </div>
            <PinnedSection.Trigger />
          </PinnedSection.Inner>
        </PinnedSection>
      </>
    </CommonLoadAnimation>
  );
}
