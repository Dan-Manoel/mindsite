"use client";
import CommonLoadAnimation, {
  CommonLoadFade,
} from "@/components/animations/CommonLoadAnimation";
import {
  CommonScrollAnimated,
  CommonCardBatchAnimated,
} from "@/components/animations/CommonScrollAnimated";

export default function PricingCards() {
  return (
    <CommonLoadAnimation>
      <>
        {/* Espaçamento global da seção adicionado para evitar o aspecto "grudado" */}
        <div className="mxd-container grid-l-container">

          {/* Bloco de Título Dividido (Split Layout) - Referência Padrão Qualidade */}
          <div className="mxd-block" style={{ marginBottom: '5rem' }}>
            <div className="mxd-section-title">
              <div className="container-fluid p-0">
                <div className="row g-0">

                  {/* Coluna Esquerda: Título Grandão */}
                  <div className="col-12 col-xl-6 mxd-grid-item">
                    <CommonScrollAnimated className="anim-uni-in-up" as="div" animation="inUp">
                      <h2
                        className="reveal-type"
                        style={{
                          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                          fontWeight: 600,
                          letterSpacing: '-0.03em',
                          lineHeight: '1.1',
                          paddingRight: '2rem'
                        }}
                      >
                        Sustentação de
                        <br />
                        Infraestrutura
                      </h2>
                    </CommonScrollAnimated>
                  </div>

                  {/* Coluna Direita: Texto Explicativo */}
                  <div className="col-12 col-xl-6 mxd-grid-item d-flex align-items-center">
                    <CommonScrollAnimated className="anim-uni-in-up" as="div" animation="inUp">
                      <p className="t-large t-bold mxd-split-lines" style={{ opacity: 0.8, paddingTop: '1rem' }}>
                        O desenvolvimento é apenas a fundação. Após o lançamento, sua Casa Digital precisa de um ambiente de nuvem seguro e escalável para operar.
                        <span style={{ display: 'block', marginTop: '1rem', opacity: 0.7, fontWeight: 400, fontSize: '1.1rem' }}>
                          Escolha um plano de sustentação para garantir hospedagem de alta performance, e-mails corporativos e engenheiros à disposição para suporte contínuo.
                        </span>
                      </p>
                    </CommonScrollAnimated>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Block - Pricing Cards Start */}
          <div className="mxd-block">
            <CommonLoadFade index={0}>
              <div className="mxd-pricing-table loading-fade">
                <div className="container-fluid p-0">
                  <div className="row g-0">

                    {/* CARD 1: Essential */}
                    <CommonCardBatchAnimated className="col-12 col-xl-4 mxd-pricing-table__item mxd-grid-item animate-card-3" as="div" columns={3}>
                      <div className="mxd-pricing-table__inner">
                        <div className="mxd-pricing-table__bg">
                          <svg xmlns="http://www.w3.org/2000/svg" width={200} height={200} viewBox="0 0 200 200">
                            <g filter="url(#blur)"><path fill="var(--highlight)" d="M200,200c0,55.2-44.8,100-100,100S0,255.2,0,200s44.8-100,100-100,100,44.8,100,100Z" /></g>
                            <defs><filter id="blur" x={0} y={0} width={3000} height={5000} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation={60} result="effect1_foregroundBlur" /></filter></defs>
                          </svg>
                        </div>
                        <div className="mxd-pricing-table__data">
                          <div className="pricing-data__header">
                            <CommonScrollAnimated className="pricing-header__title anim-uni-in-up" as="p" animation="inUp">
                              Essential
                            </CommonScrollAnimated>
                          </div>
                          <div className="pricing-data__info">
                            <div className="pricing-data__price">
                              <CommonScrollAnimated className="pricing-data__num anim-uni-in-up" as="div" animation="inUp">
                                <span className="pricing-data__currency">R$</span><span className="pricing-data__amount">100</span><span className="pricing-data__period">/mês</span>
                              </CommonScrollAnimated>
                              <CommonScrollAnimated className="pricing-data__caption t-small t-muted t-140 anim-uni-in-up" as="p" animation="inUp">
                                Plano Mensal
                              </CommonScrollAnimated>
                            </div>
                          </div>
                        </div>
                        <div className="mxd-pricing-table__plan">
                          <div className="pricing-plan__list pt-4">
                            <CommonScrollAnimated className="anim-uni-in-up t-medium" as="p" animation="inUp">
                              Hospedagem segura do seu site, banco de dados moderno, suporte para tráfego básico de acessos, 5 caixas de e-mail corporativo e 5 chamados mensais para suporte e pequenos ajustes.
                            </CommonScrollAnimated>
                          </div>
                        </div>
                      </div>
                    </CommonCardBatchAnimated>

                    {/* CARD 2: Development */}
                    <CommonCardBatchAnimated className="col-12 col-xl-4 mxd-pricing-table__item mxd-grid-item animate-card-3" as="div" columns={3}>
                      <div className="mxd-pricing-table__inner">
                        <div className="mxd-pricing-table__bg">
                          <svg xmlns="http://www.w3.org/2000/svg" width={200} height={200} viewBox="0 0 200 200">
                            <g filter="url(#blur-2)"><path fill="var(--highlight)" d="M200,200c0,55.2-44.8,100-100,100S0,255.2,0,200s44.8-100,100-100,100,44.8,100,100Z" /></g>
                            <defs><filter id="blur-2" x={0} y={0} width={3000} height={5000} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation={60} result="effect1_foregroundBlur" /></filter></defs>
                          </svg>
                        </div>
                        <div className="mxd-pricing-table__data">
                          <div className="pricing-data__header">
                            <CommonScrollAnimated className="pricing-header__title anim-uni-in-up" as="p" animation="inUp">
                              Development
                            </CommonScrollAnimated>
                          </div>
                          <div className="pricing-data__info">
                            <div className="pricing-data__price">
                              <CommonScrollAnimated className="pricing-data__num anim-uni-in-up" as="div" animation="inUp">
                                <span className="pricing-data__currency">R$</span><span className="pricing-data__amount">300</span><span className="pricing-data__period">/mês</span>
                              </CommonScrollAnimated>
                              <CommonScrollAnimated className="pricing-data__caption t-small t-muted t-140 anim-uni-in-up" as="p" animation="inUp">
                                Plano Mensal
                              </CommonScrollAnimated>
                            </div>
                          </div>
                        </div>
                        <div className="mxd-pricing-table__plan">
                          <div className="pricing-plan__list pt-4">
                            <CommonScrollAnimated className="anim-uni-in-up t-medium" as="p" animation="inUp">
                              Hospedagem avançada com banco de dados de última geração, suporte otimizado para tráfego moderado de acessos, 15 caixas de e-mail corporativo e atendimento ágil para atualizações na interface.
                            </CommonScrollAnimated>
                          </div>
                        </div>
                      </div>
                    </CommonCardBatchAnimated>

                    {/* CARD 3: Advanced */}
                    <CommonCardBatchAnimated className="col-12 col-xl-4 mxd-pricing-table__item mxd-grid-item animate-card-3" as="div" columns={3}>
                      <div className="mxd-pricing-table__inner">
                        <div className="mxd-pricing-table__bg">
                          <svg xmlns="http://www.w3.org/2000/svg" width={200} height={200} viewBox="0 0 200 200">
                            <g filter="url(#blur-3)"><path fill="var(--highlight)" d="M200,200c0,55.2-44.8,100-100,100S0,255.2,0,200s44.8-100,100-100,100,44.8,100,100Z" /></g>
                            <defs><filter id="blur-3" x={0} y={0} width={3000} height={5000} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB"><feFlood floodOpacity={0} result="BackgroundImageFix" /><feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" /><feGaussianBlur stdDeviation={60} result="effect1_foregroundBlur" /></filter></defs>
                          </svg>
                        </div>
                        <div className="mxd-pricing-table__data">
                          <div className="pricing-data__header">
                            <CommonScrollAnimated className="pricing-header__title small no-margin anim-uni-in-up" as="p" animation="inUp">
                              Advanced
                            </CommonScrollAnimated>
                          </div>
                          <div className="pricing-data__info">
                            <div className="pricing-data__price">
                              <CommonScrollAnimated className="pricing-data__num anim-uni-in-up" as="div" animation="inUp">
                                <span className="pricing-data__currency">R$</span><span className="pricing-data__amount">700</span><span className="pricing-data__period">/mês</span>
                              </CommonScrollAnimated>
                              <CommonScrollAnimated className="pricing-data__caption t-small t-muted t-140 anim-uni-in-up" as="p" animation="inUp">
                                Plano Mensal
                              </CommonScrollAnimated>
                            </div>
                          </div>
                        </div>
                        <div className="mxd-pricing-table__plan">
                          <div className="pricing-plan__list pt-4">
                            <CommonScrollAnimated className="anim-uni-in-up t-medium" as="p" animation="inUp">
                              Hospedagem de altíssima performance estruturada para grande volume de acessos simultâneos, mais de 30 caixas de e-mail corporativo e suporte técnico prioritário para evoluções do sistema.
                            </CommonScrollAnimated>
                          </div>
                        </div>
                      </div>
                    </CommonCardBatchAnimated>

                  </div>
                </div>
              </div>
            </CommonLoadFade>

            {/* Rodapé da tabela com o dicionário de SLAs */}
            <div className="mxd-pricing-tooltip" style={{ marginTop: '30px', textAlign: 'center', opacity: 0.7 }}>
              <p className="t-small">
                <strong>Nota sobre manutenção mensal:</strong> Os SLAs de suporte cobrem desde pequenos ajustes visuais até implementações na engenharia do banco de dados, variando conforme a categoria do plano.
              </p>
            </div>

          </div>
          {/* Block - Pricing Cards End */}
        </div>
      </>
    </CommonLoadAnimation>
  );
}