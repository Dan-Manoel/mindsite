"use client";

import BlurSection from "@/components/animations/BlurSection";
import { initCtaMarqueeToLeft } from "@/lib/template/ctaMarqueeEffects";
import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
export default function CTAWithMarquee() {
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    return initCtaMarqueeToLeft(marqueeTrackRef.current);
  }, []);
  return (
    <>
      <BlurSection className="mxd-section bg-color-opposite">
        <div className="mxd-container fullwidth-container">
          {/* Block - CTA with Marquee Images Start */}
          <div className="mxd-block">
            <div className="mxd-promo transparent">
              <div className="mxd-promo__wrap auto-height">
                {/* content */}
                <div className="mxd-promo__content">
                  <CommonScrollAnimated
                    className="mxd-promo__btngroup anim-uni-in-up"
                    as="div"
                    animation="inUp"
                  >
                    <Link
                      className="btn btn-line btn-line-opposite"
                      href={`/contact`}
                    >
                      <TextScramble className="btn-caption mxd-scramble">
                        Write a line
                      </TextScramble>
                    </Link>
                  </CommonScrollAnimated>
                  <div className="mxd-promo__caption">
                    <Link
                      className="active-cursor-accent"
                      data-cursor-text="Contact Me"
                      href={`/contact`}
                    >
                      <CommonAnimatedText
                        as="h2"
                        className="reveal-type opposite"
                        animation="revealType"
                      >
                        Let&apos;s talk about your project
                      </CommonAnimatedText>
                    </Link>
                  </div>
                </div>
                {/* marquee */}
                <div className="mxd-promo__marquee">
                  {/* Marquee Divider Start */}
                  <div className="marquee marquee-left--gsap">
                    <div
                      className="marquee__toleft marquee__images"
                      ref={marqueeTrackRef}
                    >
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Photography
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_01.webp"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            3D Models
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_02.webp"
                            width={1200}
                            height={685}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Development
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_03.webp"
                            width={700}
                            height={700}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Illustrations
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_04.webp"
                            width={737}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Fashion
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_05.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Digital Art
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_06.webp"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Packaging
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_07.webp"
                            width={1200}
                            height={900}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Motion
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_08.webp"
                            width={737}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Illustrations
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_09.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Video Production
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_10.webp"
                            width={1200}
                            height={873}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Photography
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_01.webp"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            3D Models
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_02.webp"
                            width={1200}
                            height={685}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Development
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_03.webp"
                            width={700}
                            height={700}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Illustrations
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_04.webp"
                            width={737}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* single item */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Fashion
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt=""
                            src="/img/cta/mar_05.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Marquee Divider End */}
                </div>
              </div>
            </div>
          </div>
          {/* Block - CTA with Marquee Images End */}
        </div>
      </BlurSection>
    </>
  );
}
