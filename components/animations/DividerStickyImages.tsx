"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useStickyMediaSection } from "@/hooks/useStickyMediaSection";
import TextScramble from "@/components/animations/TextScramble";

export type DividerStickyImagesProps = {
  ctaHref: string;
  ctaLabel: string;
};

export default function DividerStickyImages({
  ctaHref,
  ctaLabel,
}: DividerStickyImagesProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const overflowRefs = useRef<HTMLDivElement[]>([]);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const numberBlockRef = useRef<HTMLParagraphElement | null>(null);
  const counterCurrentRef = useRef<HTMLSpanElement | null>(null);
  const counterTotalRef = useRef<HTMLSpanElement | null>(null);
  const btnHolderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<HTMLImageElement[]>([]);

  useStickyMediaSection({
    sectionRef,
    stickyRef,
    overflowRefs,
    titleRefs,
    numberBlockRef,
    counterCurrentRef,
    counterTotalRef,
    btnHolderRef,
    progressRef,
    imageRefs,
  });

  return (
    <>
      <div className="mxd-section">
        <div className="mxd-dv-sticky-img" ref={sectionRef}>
          <div className="mxd-dv-sticky-img__sticky" ref={stickyRef}>
            <div className="mxd-dv-sticky-img__progress" ref={progressRef} />
            <div className="mxd-dv-sticky-img__images">
              <div className="images__list">
                <div className="images__listitem">
                  <div
                    className="images__overflow"
                    ref={(el) => {
                      if (!el) return;
                      overflowRefs.current[0] = el;
                    }}
                  >
                    <div className="mxd-cover mxd-cover-06" />
                    <Image
                      className="images__img"
                      alt="Image"
                      src="/img/dividers/1920x1200_dv01.webp"
                      width={1920}
                      height={1200}
                      ref={(el) => {
                        if (!el) return;
                        imageRefs.current[0] = el;
                      }}
                    />
                  </div>
                </div>
                <div className="images__listitem">
                  <div
                    className="images__overflow"
                    ref={(el) => {
                      if (!el) return;
                      overflowRefs.current[1] = el;
                    }}
                  >
                    <div className="mxd-cover mxd-cover-06" />
                    <Image
                      className="images__img"
                      alt="Image"
                      src="/img/dividers/1920x1200_dv02.webp"
                      width={1920}
                      height={1200}
                      ref={(el) => {
                        if (!el) return;
                        imageRefs.current[1] = el;
                      }}
                    />
                  </div>
                </div>
                <div className="images__listitem">
                  <div
                    className="images__overflow"
                    ref={(el) => {
                      if (!el) return;
                      overflowRefs.current[2] = el;
                    }}
                  >
                    <div className="mxd-cover mxd-cover-06" />
                    <Image
                      className="images__img"
                      alt="Image"
                      src="/img/dividers/1920x1200_dv03.webp"
                      width={1920}
                      height={1200}
                      ref={(el) => {
                        if (!el) return;
                        imageRefs.current[2] = el;
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mxd-dv-sticky-img__content">
              <p className="mxd-dv-sticky-img__number" ref={numberBlockRef}>
                <span className="number__current" ref={counterCurrentRef}>
                  01
                </span>
                &nbsp;/&nbsp;
                <span className="number__total" ref={counterTotalRef}>
                  03
                </span>
              </p>
              <div className="mxd-dv-sticky-img__titlewrap">
                <div className="mxd-dv-sticky-img__titlelist">
                  <div className="mxd-dv-sticky-img__titleitem">
                    <h2
                      className="permanent"
                      ref={(el) => {
                        if (!el) return;
                        titleRefs.current[0] = el;
                      }}
                    >
                      Strategy
                    </h2>
                  </div>
                  <div className="mxd-dv-sticky-img__titleitem">
                    <h2
                      className="permanent"
                      ref={(el) => {
                        if (!el) return;
                        titleRefs.current[1] = el;
                      }}
                    >
                      Design
                    </h2>
                  </div>
                  <div className="mxd-dv-sticky-img__titleitem">
                    <h2
                      className="permanent"
                      ref={(el) => {
                        if (!el) return;
                        titleRefs.current[2] = el;
                      }}
                    >
                      Development
                    </h2>
                  </div>
                </div>
              </div>
              <div className="mxd-dv-sticky-img__btnholder" ref={btnHolderRef}>
                <Link
                  className="btn btn-line btn-line-permanent"
                  href={ctaHref}
                >
                  <TextScramble className="btn-caption mxd-scramble">
                    {ctaLabel}
                  </TextScramble>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
