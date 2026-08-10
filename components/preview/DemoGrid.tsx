"use client";

import BlurSection from "@/components/animations/BlurSection";
import { initCtaMarqueeToRight } from "@/lib/template/ctaMarqueeEffects";
import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import { CommonCardBatchAnimated } from "@/components/animations/CommonScrollAnimated";
import TextScramble from "@/components/animations/TextScramble";
export default function DemoGrid() {
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    return initCtaMarqueeToRight(marqueeTrackRef.current);
  }, []);
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection id="demo" className="mxd-section">
          <div className="mxd-container grid-l-container">
            {/* Block - Demo Grid x2 Showcase Start */}
            <div className="mxd-block">
              <CommonLoadFade index={0}>
                <div className="mxd-demo-grid loading-fade">
                  <div className="container-fluid p-0">
                    <div className="row g-0 mxd-demo-grid__gallery">
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="Ver Demo"
                          href={`/index-branding-studio`}
                          target="_blank"
                        >
                          <Image
                            alt="MINDSITE Template Preview Image"
                            src="/img/demo/screens/01.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-01" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-branding-studio`}
                              target="_blank"
                            >
                              Estúdio de Branding
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Pilha de Cartões
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Slideshow
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Texto Dividido
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="Ver Demo"
                          href={`/index-software-development-company`}
                          target="_blank"
                        >
                          <Image
                            alt="MINDSITE Template Preview Image"
                            src="/img/demo/screens/02.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-02" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-software-development-company`}
                            >
                              Desenvolvimento de Software
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Vídeo com Zoom
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Bento
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Perspectiva
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="Ver Demo"
                          href={`/index-creative-agency`}
                          target="_blank"
                        >
                          <Image
                            alt="MINDSITE Template Preview Image"
                            src="/img/demo/screens/03.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-03" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-creative-agency`}
                            >
                              Agência Criativa
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Rastro de Cursor
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Prévia de Vídeo
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Pilha de Serviços
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="Ver Demo"
                          href={`/index-freelancer-portfolio`}
                          target="_blank"
                        >
                          <Image
                            alt="MINDSITE Template Preview Image"
                            src="/img/demo/screens/04.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-04" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-freelancer-portfolio`}
                            >
                              Portfólio Freelancer
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Cursor de Imagem
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Slides com Zoom
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Física
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="Ver Demo"
                          href={`/index-design-studio`}
                          target="_blank"
                        >
                          <Image
                            alt="MINDSITE Template Preview Image"
                            src="/img/demo/screens/05.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-05" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-design-studio`}
                            >
                              Estúdio de Design
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Slideshow com Hover
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Marquee
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Física
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="Ver Demo"
                          href={`/index-web-developer`}
                          target="_blank"
                        >
                          <Image
                            alt="MINDSITE Template Preview Image"
                            src="/img/demo/screens/06.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-06" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-web-developer`}
                            >
                              Desenvolvedor Web
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Bloco Fixo
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Slideshow
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Cursor de Imagem
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="Ver Demo"
                          href={`/index-personal-portfolio`}
                          target="_blank"
                        >
                          <Image
                            alt="MINDSITE Template Preview Image"
                            src="/img/demo/screens/07.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-07" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-personal-portfolio`}
                            >
                              Portfólio Pessoal
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Perspectiva
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Currículo
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Física
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="Ver Demo"
                          href={`/index-digital-agency`}
                          target="_blank"
                        >
                          <Image
                            alt="MINDSITE Template Preview Image"
                            src="/img/demo/screens/08.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-08" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-digital-agency`}
                            >
                              Agência Digital
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Imagens 3D
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Carrossel Tela Cheia
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Rastro de Cursor
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="Ver Demo"
                          href={`/index-web-studio`}
                          target="_blank"
                        >
                          <Image
                            alt="MINDSITE Template Preview Image"
                            src="/img/demo/screens/09.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-09" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-web-studio`}
                            >
                              Estúdio Web
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Vitrine Horizontal
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Pilha de Cartões
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Imagens no Cursor
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                      {/* demo item */}
                      <CommonCardBatchAnimated
                        className="col-12 col-md-6 mxd-demo-grid__item mxd-grid-item animate-card-2"
                        as="div"
                        columns={2}
                      >
                        <Link
                          className="mxd-demo-grid__image active-cursor-permanent"
                          data-cursor-text="Ver Demo"
                          href={`/index-digital-designer`}
                          target="_blank"
                        >
                          <Image
                            alt="MINDSITE Template Preview Image"
                            src="/img/demo/screens/10.webp"
                            width={900}
                            height={563}
                          />
                          <div className="mxd-demo-grid__screen screen-10" />
                        </Link>
                        <div className="mxd-demo-grid__caption">
                          <div className="mxd-demo-grid__name">
                            <Link
                              className="project-name-s"
                              href={`/index-digital-designer`}
                              target="_blank"
                            >
                              Designer Digital
                            </Link>
                          </div>
                          <div className="mxd-demo-grid__tags">
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Imagens com Inércia
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Vitrine em Tela Cheia
                            </TextScramble>
                            <TextScramble className="tag tag-s tag-medium mxd-scramble">
                              Revelação de Imagens
                            </TextScramble>
                          </div>
                        </div>
                      </CommonCardBatchAnimated>
                    </div>
                  </div>
                </div>
              </CommonLoadFade>
            </div>
            {/* Block - Demo Grid x2 Showcase End */}
          </div>
          <div className="mxd-container fullwidth-container">
            {/* Block - Marquee Text One Line Start */}
            <div className="mxd-block">
              <div className="mxd-demo-marquee-01">
                {/* Marquee Divider Start */}
                <div className="marquee marquee-stack marquee-right--gsap muted">
                  <div className="marquee__toright" ref={marqueeTrackRef}>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        Profissional/
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">Designer/</p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        Desenvolvedor/
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        AgênciaDigital/
                      </p>
                    </div>
                    {/* single item */}
                    <div className="marquee__item item-regular text">
                      <p className="marquee__text text-with-gliph">
                        EstúdioCriativo/
                      </p>
                    </div>
                  </div>
                </div>
                {/* Marquee Divider End */}
              </div>
            </div>
            {/* Block - Marquee Text One Line End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
