"use client";

import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { useStickyCaptionFlip } from "@/hooks/useStickyCaptionFlip";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export type DividerStickyCaptionProps = {
  topCtaLabel: string;
  topCtaHref: string;
  captionCursorText: string;
  captionHref: string;
  children: ReactNode;
};
export default function DividerStickyCaption({
  topCtaLabel,
  topCtaHref,
  captionCursorText,
  captionHref,
  children,
}: DividerStickyCaptionProps) {
  const captionRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const topAreaRef = useRef<HTMLDivElement | null>(null);
  const centerAreaRef = useRef<HTMLDivElement | null>(null);
  const bottomAreaRef = useRef<HTMLDivElement | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  useStickyCaptionFlip({
    captionRef,
    contentRef,
    topAreaRef,
    centerAreaRef,
    bottomAreaRef,
    scrollAreaRef,
  });
  return (
    <>
      <BlurSection className="mxd-section">
        <div className="mxd-container grid-l-container">
          {/* Divider - Sticky Caption Start */}
          <div className="mxd-dv-sticky-cap" ref={captionRef}>
            <div className="mxd-dv-sticky-cap__static">
              <div className="mxd-dv-sticky-cap__top" ref={topAreaRef}>
                <div className="mxd-dv-sticky-cap__content" ref={contentRef}>
                  <CommonScrollAnimated
                    className="mxd-dv-sticky-cap__btngroup anim-uni-in-up"
                    as="div"
                    animation="inUp"
                  >
                    <Link
                      className="btn btn-line btn-line-permanent"
                      href={topCtaHref}
                    >
                      <TextScramble className="btn-caption mxd-scramble">
                        {topCtaLabel}
                      </TextScramble>
                    </Link>
                  </CommonScrollAnimated>
                  <div className="mxd-dv-sticky-cap__caption">
                    <Link
                      className="active-cursor-accent"
                      data-cursor-text={captionCursorText}
                      href={captionHref}
                    >
                      <CommonAnimatedText
                        as="p"
                        className="mxd-dv-sticky-cap__text permanent mxd-split-lines"
                        animation="splitLines"
                      >
                        {children}
                      </CommonAnimatedText>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mxd-dv-sticky-cap__center" ref={centerAreaRef} />
              <div className="mxd-dv-sticky-cap__bottom" ref={bottomAreaRef} />
            </div>
            <div className="mxd-dv-sticky-cap__scroll" ref={scrollAreaRef}>
              <div className="scroll-images-row row-01">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-md-4" />
                    <div className="col-12 col-md-5 scroll-images-row__item">
                      <div className="scroll-images-row__obj">
                        <CommonScrollAnimated
                          className="scroll-images-row__image mxd-clip-image"
                          as="div"
                          animation="clipImage"
                        >
                          <Image
                            alt=""
                            src="/img/dividers/1200x900_row01.webp"
                            width={1200}
                            height={900}
                          />
                        </CommonScrollAnimated>
                        <div className="scroll-images-row__tags">
                          <TextScramble className="tag tag-m tag-medium mxd-scramble">
                            Branding
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-3" />
                  </div>
                </div>
              </div>
              <div className="scroll-images-row row-02">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-md-6 scroll-images-row__item">
                      <div className="scroll-images-row__obj">
                        <CommonScrollAnimated
                          className="scroll-images-row__image mxd-clip-image"
                          as="div"
                          animation="clipImage"
                        >
                          <Image
                            alt=""
                            src="/img/dividers/1200x900_row02.webp"
                            width={1200}
                            height={800}
                          />
                        </CommonScrollAnimated>
                        <div className="scroll-images-row__tags">
                          <TextScramble className="tag tag-m tag-medium mxd-scramble">
                            Illustrations
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-1" />
                    <div className="col-12 col-md-4 scroll-images-row__item">
                      <div className="scroll-images-row__obj">
                        <CommonScrollAnimated
                          className="scroll-images-row__image mxd-clip-image"
                          as="div"
                          animation="clipImage"
                        >
                          <Image
                            alt=""
                            src="/img/dividers/737x1200_row02.webp"
                            width={737}
                            height={1200}
                          />
                        </CommonScrollAnimated>
                        <div className="scroll-images-row__tags">
                          <TextScramble className="tag tag-m tag-medium mxd-scramble">
                            Photography
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-1" />
                  </div>
                </div>
              </div>
              <div className="scroll-images-row row-03">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-md-1" />
                    <div className="col-12 col-md-4 scroll-images-row__item">
                      <div className="scroll-images-row__obj">
                        <CommonScrollAnimated
                          className="scroll-images-row__image mxd-clip-image"
                          as="div"
                          animation="clipImage"
                        >
                          <Image
                            alt=""
                            src="/img/dividers/800x1200_row03.webp"
                            width={800}
                            height={1200}
                          />
                        </CommonScrollAnimated>
                        <div className="scroll-images-row__tags">
                          <TextScramble className="tag tag-m tag-medium mxd-scramble">
                            Fashion
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-1" />
                    <div className="col-12 col-md-6 scroll-images-row__item">
                      <div className="scroll-images-row__obj">
                        <CommonScrollAnimated
                          className="scroll-images-row__image mxd-clip-image"
                          as="div"
                          animation="clipImage"
                        >
                          <Image
                            alt=""
                            src="/img/dividers/1200x677_row03.webp"
                            width={1200}
                            height={677}
                          />
                        </CommonScrollAnimated>
                        <div className="scroll-images-row__tags">
                          <TextScramble className="tag tag-m tag-medium mxd-scramble">
                            Packaging
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="scroll-images-row row-04">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 col-md-3" />
                    <div className="col-12 col-md-5 scroll-images-row__item">
                      <div className="scroll-images-row__obj">
                        <CommonScrollAnimated
                          className="scroll-images-row__image mxd-clip-image"
                          as="div"
                          animation="clipImage"
                        >
                          <Image
                            alt=""
                            src="/img/dividers/1200x1200_row04.webp"
                            width={1200}
                            height={1200}
                          />
                        </CommonScrollAnimated>
                        <div className="scroll-images-row__tags">
                          <TextScramble className="tag tag-m tag-medium mxd-scramble">
                            Illustrations
                          </TextScramble>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Divider - Sticky Caption End */}
        </div>
      </BlurSection>
    </>
  );
}
