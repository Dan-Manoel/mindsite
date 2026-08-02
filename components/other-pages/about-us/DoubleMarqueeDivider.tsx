"use client";

import BlurSection from "@/components/animations/BlurSection";
import {
  initCtaMarqueeToLeft,
  initCtaMarqueeToRight,
} from "@/lib/template/ctaMarqueeEffects";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

export default function DoubleMarqueeDivider() {
  const leftTrackRef = useRef<HTMLDivElement | null>(null);
  const rightTrackRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const cleanLeft = initCtaMarqueeToLeft(leftTrackRef.current);
    const cleanRight = initCtaMarqueeToRight(rightTrackRef.current);
    return () => {
      cleanLeft();
      cleanRight();
    };
  }, []);

  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container fullwidth-container">
          {/* Block - Marquee Double Start */}
          <div className="mxd-block">
            <div className="marquee marquee-left--gsap">
              <div
                className="marquee__toleft marquee__images"
                ref={leftTrackRef}
              >
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_01.webp"
                      width={1200}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_02.webp"
                      width={1200}
                      height={685}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_03.webp"
                      width={700}
                      height={700}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_04.webp"
                      width={737}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_05.webp"
                      width={800}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_06.webp"
                      width={1200}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_07.webp"
                      width={1200}
                      height={900}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_08.webp"
                      width={737}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_09.webp"
                      width={800}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_10.webp"
                      width={1200}
                      height={873}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_11.webp"
                      width={1200}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_12.webp"
                      width={1200}
                      height={685}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_13.webp"
                      width={700}
                      height={700}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_14.webp"
                      width={737}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_15.webp"
                      width={800}
                      height={1200}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="marquee marquee-right--gsap">
              <div
                className="marquee__toright marquee__images align-start"
                ref={rightTrackRef}
              >
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_15.webp"
                      width={800}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_14.webp"
                      width={737}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_13.webp"
                      width={700}
                      height={700}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_12.webp"
                      width={1200}
                      height={685}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_11.webp"
                      width={1200}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_10.webp"
                      width={1200}
                      height={873}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_09.webp"
                      width={800}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_08.webp"
                      width={737}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_07.webp"
                      width={1200}
                      height={900}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_06.webp"
                      width={1200}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_05.webp"
                      width={800}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_04.webp"
                      width={737}
                      height={1200}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_03.webp"
                      width={700}
                      height={700}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_02.webp"
                      width={1200}
                      height={685}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item item-imageblock">
                  <div className="marquee__image">
                    <Image
                      alt="Azurio Template Image Example"
                      src="/img/cta/mar_01.webp"
                      width={1200}
                      height={1200}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Marquee Double End */}
        </div>
      </BlurSection>
    </>
  );
}
