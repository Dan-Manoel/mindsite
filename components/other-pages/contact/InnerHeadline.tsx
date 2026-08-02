"use client";

import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import CommonLoadAnimation, { CommonLoadFade } from "@/components/animations/CommonLoadAnimation";
import TextScramble from "@/components/animations/TextScramble";
import ContactForm from "@/components/other-pages/contact/ContactForm";
export default function InnerHeadline() {
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section">
          <div className="mxd-container grid-l-container">
            {/* Block - Inner Headline v05 Start */}
            <div className="mxd-block loading-wrap">
              <div className="inner-headline">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
                      {/* breadcrumbs */}
                      <CommonLoadFade index={0}>
                        <div className="inner-headline__breadcrumbs loading-fade">
                          <div className="breadcrumbs__nav">
                            <span>
                              <Link href={`/`}>
                                <TextScramble className="mxd-scramble">
                                  Início
                                </TextScramble>
                              </Link>
                            </span>
                            <span className="current-item">Contato </span>
                          </div>
                        </div>
                      </CommonLoadFade>
                    </div>
                    <div className="col-12">
                      {/* content */}
                      <div className="inner-headline__content has-medium-title">
                        <div className="container-fluid p-0">
                          <div className="row g-0">
                            <div className="col-12 col-xl-6 mxd-grid-item">
                              <div className="inner-headline__title">
                                <CommonAnimatedText
                                  as="h1"
                                  className="medium loading-split"
                                  animation="splitLinesLoad"
                                >
                                  Vamos fazer acontecer
                                </CommonAnimatedText>
                              </div>
                              {/* <div class="inner-headline__subtitle">
                              <p>Everything <span>you need to know</span></p>
                            </div> */}
                            </div>
                            <div className="col-12 col-xl-6">
                              {/* split header caption */}
                              <div className="inner-headline__caption split-caption-title pre-form">
                                <div className="mxd-grid-item">
                                  <CommonAnimatedText
                                    as="p"
                                    className="t-bold t-large loading-split"
                                    animation="splitLinesLoad"
                                  >
                                    Tem dúvidas? Nós temos as respostas! Aqui, você
                                    encontrará informações claras e precisas{" "}
                                    <span>
                                      sobre nossos serviços, processo e o que esperar
                                      ao trabalhar conosco. Se precisar de mais detalhes,
                                      entre em contato!
                                    </span>
                                  </CommonAnimatedText>
                                </div>
                              </div>
                              <ContactForm />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Inner Headline v05 End */}
            {/* Block - Fullwidth Text Start */}
            <div className="mxd-block">
              <div className="fullwidth-text headline-email-text bottom-text-small mxd-grid-item">
                <div className="fullwidth-text__wrap">
                  <a
                    className="fullwidth-text__content small accent active-cursor"
                    data-cursor-text="Vamos conversar"
                    href="mailto:ola@mindsite.com.br?subject=Mensagem%20do%20site"
                    aria-label="Send email to ola@mindsite.com.br"
                  >
                    <CommonAnimatedText
                      as="span"
                      className="anim-uni-chars"
                      animation="animChars"
                    >
                      ola@mindsite.com.br
                    </CommonAnimatedText>
                  </a>
                </div>
              </div>
            </div>
            {/* Block - Fullwidth Text End */}
          </div>
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}
