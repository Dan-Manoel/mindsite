"use client";

import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import {
  initCtaMarqueeToLeft,
  initCtaMarqueeToRight,
} from "@/lib/template/ctaMarqueeEffects";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
export default function Components() {
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
          {/* Block - Components Start */}
          <div className="mxd-block">
            {/* marquee top to left */}
            <div className="marquee marquee-components-top marquee-left--gsap">
              <div
                className="marquee__toleft marquee__images"
                ref={leftTrackRef}
              >
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-01.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-02.webp"
                      width={600}
                      height={375}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-03.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-04.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-05.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-06.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-07.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-08.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* block title */}
            <div className="mxd-demo-components">
              <div className="mxd-demo-components__wrap">
                <CommonScrollAnimated
                  className="mxd-demo-components__object obj-01 anim-uni-in-up"
                  as="div"
                  animation="inUp"
                >
                  <Image
                    className="mxd-move-slow"
                    alt="MINDSITE Template Decorative Image"
                    src="/img/demo/01_comp-img.webp"
                    width={600}
                    height={251}
                  />
                </CommonScrollAnimated>
                <CommonScrollAnimated
                  className="mxd-demo-components__object obj-02 anim-uni-in-up"
                  as="div"
                  animation="inUp"
                >
                  <Image
                    className="mxd-move-slow"
                    alt="MINDSITE Template Decorative Image"
                    src="/img/demo/02_comp-img.webp"
                    width={485}
                    height={203}
                  />
                </CommonScrollAnimated>
                <CommonScrollAnimated
                  className="mxd-demo-components__title anim-uni-in-up"
                  as="div"
                  animation="inUp"
                >
                  <CommonAnimatedText
                    as="h2"
                    className="mxd-split-lines"
                    animation="splitLines"
                  >
                    Engenharia
                    <br />
                    Modular
                  </CommonAnimatedText>
                </CommonScrollAnimated>
              </div>
              <div className="mxd-demo-components__tags">
                <div className="tags-column">
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    Arquitetura Escalável
                  </CommonScrollAnimated>
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    Performance Extrema
                  </CommonScrollAnimated>
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    Código Modular
                  </CommonScrollAnimated>
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    Componentes Isolados
                  </CommonScrollAnimated>
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    Animações Nativas
                  </CommonScrollAnimated>
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    Integração Contínua
                  </CommonScrollAnimated>
                </div>
                <div className="tags-column">
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    Otimização de Render
                  </CommonScrollAnimated>
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    Acessibilidade
                  </CommonScrollAnimated>
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    Padrões W3C
                  </CommonScrollAnimated>
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    Clean Code
                  </CommonScrollAnimated>
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    Lógica de UI
                  </CommonScrollAnimated>
                  <CommonScrollAnimated
                    className="tag tag-s tag-medium mxd-scramble anim-uni-in-up"
                    as="span"
                    animation="inUp"
                  >
                    APIs Resilientes
                  </CommonScrollAnimated>
                </div>
              </div>
            </div>
            {/* marquee bottom to right */}
            <div className="marquee marquee-components-bottom marquee-right--gsap">
              <div
                className="marquee__toright marquee__images"
                ref={rightTrackRef}
              >
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-09.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-10.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-11.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-12.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-13.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-14.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-15.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
                {/* single item */}
                <div className="marquee__item">
                  <div className="marquee__component">
                    <Image
                      alt="MINDSITE Template Image Example"
                      src="/img/demo/components/cmp-16.webp"
                      width={640}
                      height={400}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Components End */}
        </div>
      </BlurSection>
    </>
  );
}
