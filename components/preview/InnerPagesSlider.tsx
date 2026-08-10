"use client";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import Image from "next/image";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import {
  ArrowOutIcon,
  PrevArrowIcon,
} from "@/components/common/testimonials/TestimonialSliderIcons";
import { Autoplay, Keyboard, Navigation, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TextScramble from "@/components/animations/TextScramble";

const INNER_PAGES_SLIDES = [
  {
    id: "services",
    href: "/services",
    imageSrc: "/img/demo/inner/03_services.webp",
    imageAlt: "MINDSITE Template Image - Services Page Link",
    imageWidth: 1000,
    imageHeight: 1413,
    label: "Serviços",
  },
  {
    id: "pricing",
    href: "/pricing",
    imageSrc: "/img/demo/inner/05_pricing.webp",
    imageAlt: "MINDSITE Template Image - Pricing Page Link",
    imageWidth: 1000,
    imageHeight: 1413,
    label: "Planos de Preço",
  },
  {
    id: "team",
    href: "/team",
    imageSrc: "/img/demo/inner/04_team.webp",
    imageAlt: "MINDSITE Template Image - Team Page Link",
    imageWidth: 1000,
    imageHeight: 1413,
    label: "Nossa Equipe",
  },
  {
    id: "about-me",
    href: "/about-me",
    imageSrc: "/img/demo/inner/01_about-me.webp",
    imageAlt: "MINDSITE Template Image - About Me Page Link",
    imageWidth: 1000,
    imageHeight: 1413,
    label: "Sobre Mim",
  },
  {
    id: "about-us",
    href: "/about-us",
    imageSrc: "/img/demo/inner/02_about-us.webp",
    imageAlt: "MINDSITE Template Image - About Us Page Link",
    imageWidth: 1000,
    imageHeight: 1413,
    label: "Sobre Nós",
  },
  {
    id: "404",
    href: "/404",
    imageSrc: "/img/demo/inner/08_404.webp",
    imageAlt: "MINDSITE Template Image - 404 Error Page Link",
    imageWidth: 1000,
    imageHeight: 563,
    label: "Erro 404",
  },
  {
    id: "faq",
    href: "/faq",
    imageSrc: "/img/demo/inner/06_faq.webp",
    imageAlt: "MINDSITE Template Image - FAQ Page Link",
    imageWidth: 1000,
    imageHeight: 1413,
    label: "Página de FAQ",
  },
  {
    id: "contact",
    href: "/contact",
    imageSrc: "/img/demo/inner/07_contact.webp",
    imageAlt: "MINDSITE Template Image - Contact Page Link",
    imageWidth: 1000,
    imageHeight: 1413,
    label: "Contato",
  },
] as const;

const innerPagesSwiperHostId = "inner-pages-demo-swiper-host";

/** Swiper resizes the section after init (loop clones, breakpoints, images). Refresh ST so triggers below stay accurate. */
function refreshScrollTriggersAfterLayout() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
}

const innerPagesSwiperConfig = {
  slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1600: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
  loop: true,
  parallax: true,
  autoplay: { disableOnInteraction: false, enabled: true },
  grabCursor: true,
  speed: 1200,
  centeredSlides: true,
  keyboard: { enabled: true },
  navigation: {
    nextEl: `#${innerPagesSwiperHostId} .swiper-button-next`,
    prevEl: `#${innerPagesSwiperHostId} .swiper-button-prev`,
  },
} as const;

export default function InnerPagesSlider() {
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section padding-bottom-tag-m">
          <div className="mxd-container">
            {/* Block - Components Start */}
            <div className="mxd-block">
              {/* slider main container */}
              <CommonLoadFade index={0}>
                <Swiper
                  id={innerPagesSwiperHostId}
                  {...innerPagesSwiperConfig}
                  modules={[Autoplay, Keyboard, Navigation, Parallax]}
                  className="mxd-demo-swiper mxd-grid-item loading-fade"
                  onAfterInit={refreshScrollTriggersAfterLayout}
                  onResize={refreshScrollTriggersAfterLayout}
                  onBreakpoint={refreshScrollTriggersAfterLayout}
                >
                  {INNER_PAGES_SLIDES.map((slide) => (
                    <SwiperSlide
                      key={slide.id}
                      className="mxd-demo-swiper__slide"
                    >
                      <Link
                        className="demo-swiper-slide__image"
                        href={slide.href}
                        target="_blank"
                      >
                        <Image
                          alt={slide.imageAlt}
                          src={slide.imageSrc}
                          width={slide.imageWidth}
                          height={slide.imageHeight}
                        />
                      </Link>
                      <CommonScrollAnimated
                        className="demo-swiper-slide__descr anim-uni-in-up"
                        as="div"
                        animation="inUp"
                      >
                        <Link
                          href={slide.href}
                          data-swiper-parallax-opacity={0}
                          data-swiper-parallax-y={-30}
                        >
                          <span>{slide.label}</span>
                        </Link>
                      </CommonScrollAnimated>
                    </SwiperSlide>
                  ))}

                  {/* navigation buttons */}
                  <div className="swiper-button-prev mxd-slider-btn mxd-slider-btn-prev">
                    <a
                      className="btn btn-line-icon btn-line-default slide-left"
                      href="#0"
                      aria-label="Previous Slide"
                    >
                      <i>
                        <PrevArrowIcon />
                      </i>
                      <TextScramble className="btn-caption mxd-scramble">
                        Anterior
                      </TextScramble>
                    </a>
                  </div>
                  <div className="swiper-button-next mxd-slider-btn mxd-slider-btn-next mxd-slider-btn-next-fullwidth">
                    <a
                      className="btn btn-line-icon btn-line-default slide-right"
                      href="#0"
                      aria-label="Next Slide"
                    >
                      <TextScramble className="btn-caption mxd-scramble">
                        Próximo
                      </TextScramble>
                      <i>
                        <ArrowOutIcon />
                      </i>
                    </a>
                  </div>
                </Swiper>
              </CommonLoadFade>
            </div>
            {/* Block - Components End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
