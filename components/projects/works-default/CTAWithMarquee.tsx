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
          {/* Bloco - Início da Chamada para Ação com Marquee */}
          <div className="mxd-block">
            <div className="mxd-promo transparent">
              <div className="mxd-promo__wrap auto-height">
                {/* Conteúdo */}
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
                        Escreva uma linha
                      </TextScramble>
                    </Link>
                  </CommonScrollAnimated>
                  <div className="mxd-promo__caption">
                    <Link
                      className="active-cursor-accent"
                      data-cursor-text="Fale Conosco"
                      href={`/contact`}
                    >
                      <CommonAnimatedText
                        as="h2"
                        className="reveal-type opposite"
                        animation="revealType"
                      >
                        Vamos conversar sobre o seu projeto
                      </CommonAnimatedText>
                    </Link>
                  </div>
                </div>
                {/* Marquee */}
                <div className="mxd-promo__marquee">
                  {/* Início do Divisor Marquee */}
                  <div className="marquee marquee-left--gsap">
                    <div
                      className="marquee__toleft marquee__images"
                      ref={marqueeTrackRef}
                    >
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Fotografia
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Fotografia"
                            src="/img/cta/mar_01.webp"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Modelos 3D
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Modelos 3D"
                            src="/img/cta/mar_02.webp"
                            width={1200}
                            height={685}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Desenvolvimento
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Desenvolvimento"
                            src="/img/cta/mar_03.webp"
                            width={700}
                            height={700}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Ilustrações
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Ilustrações"
                            src="/img/cta/mar_04.webp"
                            width={737}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Moda
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Moda"
                            src="/img/cta/mar_05.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Arte Digital
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Arte Digital"
                            src="/img/cta/mar_06.webp"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Embalagem
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Embalagem"
                            src="/img/cta/mar_07.webp"
                            width={1200}
                            height={900}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Motion
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Motion"
                            src="/img/cta/mar_08.webp"
                            width={737}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Ilustrações
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Ilustrações"
                            src="/img/cta/mar_09.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Produção de Vídeo
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Produção de Vídeo"
                            src="/img/cta/mar_10.webp"
                            width={1200}
                            height={873}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Fotografia
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Fotografia"
                            src="/img/cta/mar_01.webp"
                            width={1200}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Modelos 3D
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Modelos 3D"
                            src="/img/cta/mar_02.webp"
                            width={1200}
                            height={685}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Desenvolvimento
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Desenvolvimento"
                            src="/img/cta/mar_03.webp"
                            width={700}
                            height={700}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Ilustrações
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Ilustrações"
                            src="/img/cta/mar_04.webp"
                            width={737}
                            height={1200}
                          />
                        </div>
                      </div>
                      {/* Item Único */}
                      <div className="marquee__item item-imageblock">
                        <div className="marquee__tags">
                          <TextScramble className="tag tag-s tag-medium mxd-scramble">
                            Moda
                          </TextScramble>
                        </div>
                        <div className="marquee__image">
                          <Image
                            alt="Moda"
                            src="/img/cta/mar_05.webp"
                            width={800}
                            height={1200}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Fim do Divisor Marquee */}
                </div>
              </div>
            </div>
          </div>
          {/* Bloco - Fim da Chamada para Ação com Marquee */}
        </div>
      </BlurSection>
    </>
  );
}