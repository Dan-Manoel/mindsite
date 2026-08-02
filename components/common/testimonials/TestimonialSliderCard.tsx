import Image from "next/image";
import type { TestimonialSliderSlide } from "@/types/testimonials";
import { ArrowOutIcon, QuoteIcon } from "./TestimonialSliderIcons";
import TextScramble from "@/components/animations/TextScramble";

type Props = {
  slide: TestimonialSliderSlide;
};

export default function TestimonialSliderCard({ slide }: Props) {
  return (
    <div className="mxd-testimonials-card slider-card fullheight">
      <div className="mxd-testimonials-card__content">
        <div className="mxd-testimonials-card__controls">
          <div className="mxd-testimonials-card__quote">
            <QuoteIcon />
          </div>
          <div className="mxd-testimonials-card__btngroup">
            <a
              className="btn btn-line-icon btn-line-icon-small btn-line-default slide-right"
              href="#0"
            >
              <TextScramble className="btn-caption mxd-scramble">
                Página do Projeto
              </TextScramble>
              <i>
                <ArrowOutIcon />
              </i>
            </a>
          </div>
        </div>
        <p className="mxd-testimonials-card__descr">
          {slide.descriptionLead}
          <span>{slide.descriptionSpan}</span>
        </p>
      </div>
      <div className="mxd-testimonials-card__author">
        <div className="mxd-testimonials-card__photo">
          <Image
            alt={slide.photoAlt}
            src={slide.photoSrc}
            width={300}
            height={300}
          />
        </div>
        <div className="mxd-testimonials-card__data">
          <p className="mxd-testimonials-card__name">{slide.name}</p>
          <p className="mxd-testimonials-card__position">
            {slide.rolePrefix}{" "}
            <a href="#">
              <TextScramble className="mxd-scramble">
                {slide.companyName}
              </TextScramble>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
