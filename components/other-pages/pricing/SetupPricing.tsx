"use client";
import BlurSection from "@/components/animations/BlurSection";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import Link from "next/link";
import TextScramble from "@/components/animations/TextScramble";

export default function SetupPricing() {
  return (
    <>
      <BlurSection id="setup-pricing" className="mxd-section padding-top-manifest-m padding-bottom-tag-m-desktop">
        <div className="mxd-container grid-l-container">
          {/* Block - Manifest Large Start */}
          <div className="mxd-block">
            <div className="mxd-section-manifest pre-points">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 mxd-grid-item">
                    <div className="mxd-section-manifest__wrap wrap-text-m">
                      <div className="mxd-section-manifest__text manifest-text-m">
                        <CommonAnimatedText
                          as="span"
                          className="manifest manifest-m mxd-split-lines"
                          animation="splitLines"
                        >
                          Custo de Setup e Implantação
                          {" "}
                          <span>
                            Projetos modulares criados para performar desde o primeiro dia.
                          </span>
                        </CommonAnimatedText>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Manifest Large End */}
          {/* Block - Process Points Start */}
          <div className="mxd-block">
            <div className="mxd-process-points">
              <div className="container-fluid p-0">
                <div className="row g-0">
                  <div className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item d-flex flex-column">
                    <CommonScrollAnimated className="mxd-process-points__divider top anim-uni-clip-in" as="div" animation="clipIn" />
                    <CommonScrollAnimated className="mxd-process-points__title anim-uni-in-up" as="div" animation="inUp">
                      <div className="mxd-process-points__icon">
                        <i className="ph ph-layout" />
                      </div>
                      <p>Templates</p>
                    </CommonScrollAnimated>
                    <div className="mxd-process-points__descr flex-grow-1">
                      <CommonAnimatedText as="p" className="t-medium mxd-split-lines" animation="splitLines">
                        Escolha um dos layouts de alta conversão disponíveis na nossa vitrine. O desenvolvimento é rápido e ágil: através de uma dinâmica simples de troca de mídias e textos, entregamos sua página customizada em tempo recorde, exatamente conforme o esperado.
                      </CommonAnimatedText>
                    </div>
                    <CommonScrollAnimated className="mxd-process-points__time anim-uni-in-up mt-4" as="div" animation="inUp">
                      <span className="tag tag-m meta-time mb-4">A partir de R$ 1.000,00</span>
                      <Link className="btn btn-default-icon btn-default-outline btn-default-fullwidth slide-right" href={`/contact`}>
                        <TextScramble className="btn-caption mxd-scramble">Iniciar Projeto</TextScramble>
                        <i className="btn-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                            <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                          </svg>
                        </i>
                      </Link>
                    </CommonScrollAnimated>
                  </div>
                  <div className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item d-flex flex-column">
                    <CommonScrollAnimated className="mxd-process-points__divider top anim-uni-clip-in" as="div" animation="clipIn" />
                    <CommonScrollAnimated className="mxd-process-points__title anim-uni-in-up" as="div" animation="inUp">
                      <div className="mxd-process-points__icon">
                        <i className="ph ph-code" />
                      </div>
                      <p>Personalizado</p>
                    </CommonScrollAnimated>
                    <div className="mxd-process-points__descr flex-grow-1">
                      <CommonAnimatedText as="p" className="t-medium mxd-split-lines" animation="splitLines">
                        Criado pixel a pixel para a sua marca. Desenvolvemos landing pages de alta conversão prontas para campanhas de tráfego pago, CTAs estratégicos e um painel intuitivo para você gerenciar seu conteúdo com total liberdade.
                      </CommonAnimatedText>
                    </div>
                    <CommonScrollAnimated className="mxd-process-points__time anim-uni-in-up mt-4" as="div" animation="inUp">
                      <span className="tag tag-m meta-time mb-4">A partir de R$ 5.000,00</span>
                      <Link className="btn btn-default-icon btn-default-outline btn-default-fullwidth slide-right" href={`/contact`}>
                        <TextScramble className="btn-caption mxd-scramble">Iniciar Projeto</TextScramble>
                        <i className="btn-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                            <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                          </svg>
                        </i>
                      </Link>
                    </CommonScrollAnimated>
                  </div>
                  <div className="col-12 col-xl-4 mxd-process-points__item mxd-grid-item d-flex flex-column">
                    <CommonScrollAnimated className="mxd-process-points__divider top anim-uni-clip-in" as="div" animation="clipIn" />
                    <CommonScrollAnimated className="mxd-process-points__title anim-uni-in-up" as="div" animation="inUp">
                      <div className="mxd-process-points__icon">
                        <i className="ph ph-rocket" />
                      </div>
                      <p>SaaS e Portais</p>
                    </CommonScrollAnimated>
                    <div className="mxd-process-points__descr flex-grow-1">
                      <CommonAnimatedText as="p" className="t-medium mxd-split-lines" animation="splitLines">
                        Um ecossistema digital robusto e escalável. Entregamos um painel administrativo completo onde você acessa com usuário e senha para gerenciar sua agenda, eventos, artigos no blog e administrar usuários. Autonomia total.
                      </CommonAnimatedText>
                    </div>
                    <CommonScrollAnimated className="mxd-process-points__time anim-uni-in-up mt-4" as="div" animation="inUp">
                      <span className="tag tag-m meta-time mb-4">A partir de R$ 9.000,00</span>
                      <Link className="btn btn-default-icon btn-default-outline btn-default-fullwidth slide-right" href={`/contact`}>
                        <TextScramble className="btn-caption mxd-scramble">Iniciar Projeto</TextScramble>
                        <i className="btn-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 18 18">
                            <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                          </svg>
                        </i>
                      </Link>
                    </CommonScrollAnimated>
                    <CommonScrollAnimated className="mxd-process-points__divider bottom anim-uni-clip-in" as="div" animation="clipIn" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Block - Process Points End */}
        </div>
      </BlurSection>
    </>
  );
}