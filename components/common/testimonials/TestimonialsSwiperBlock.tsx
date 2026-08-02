"use client";

import { CommonCardBatchAnimated } from "@/components/animations/CommonScrollAnimated";
import type { TestimonialSliderSlide } from "@/types/testimonials";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialSliderCard from "./TestimonialSliderCard";
import { ArrowOutIcon, PrevArrowIcon } from "./TestimonialSliderIcons";
import TextScramble from "@/components/animations/TextScramble";

const swiperOptions = {
  slidesPerView: "auto" as const,
  grabCursor: true,
  spaceBetween: 30,
  autoplay: true,
  delay: 3000,
  speed: 1000,
  loop: true,
  parallax: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction" as const,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

type Props = {
  slides: TestimonialSliderSlide[];
};

export default function TestimonialsSwiperBlock({ slides }: Props) {
  return (
    <>
      <Swiper
        {...swiperOptions}
        modules={[Autoplay, Navigation, Pagination]}
        className="swiper-testimonials"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="swiper-slide">
            <TestimonialSliderCard slide={slide} />
          </SwiperSlide>
        ))}

        <CommonCardBatchAnimated
          className="swiper-button-prev mxd-slider-btn mxd-slider-btn-prev animate-card-2"
          as="div"
          columns={2}
        >
          <a
            className="btn btn-line-icon btn-line-default slide-left"
            href="#0"
          >
            <i>
              <PrevArrowIcon />
            </i>
            <TextScramble className="btn-caption mxd-scramble">
              Anterior
            </TextScramble>
          </a>
        </CommonCardBatchAnimated>
        <CommonCardBatchAnimated
          className="swiper-button-next mxd-slider-btn mxd-slider-btn-next animate-card-2"
          as="div"
          columns={2}
        >
          <a
            className="btn btn-line-icon btn-line-default slide-right"
            href="#0"
          >
            <TextScramble className="btn-caption mxd-scramble">
              Próximo
            </TextScramble>
            <i>
              <ArrowOutIcon />
            </i>
          </a>
        </CommonCardBatchAnimated>
      </Swiper>
      <div className="testimonials-slider__shadow" />
    </>
  );
}
