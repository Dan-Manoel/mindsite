"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import TextScramble from "@/components/animations/TextScramble";
import CommonServicesStack, {
  ServicesStackSlot,
} from "@/components/animations/CommonServicesStack";

const IMG_W = 1200;
const IMG_H = 1300;
const IMG_ALT = "Azurio Template Sample Image";

type Card = {
  subtitle: string;
  title: string;
  tagCols: [string[], string[]];
  image: string;
  descrClass: string;
  descr: ReactNode;
};

const CARDS: Card[] = [
  {
    subtitle: "01 / Serviços",
    title: "Design inovador",
    tagCols: [
      ["UI/UX", "Web design", "Aplicativos", "Design impresso"],
      ["Embalagens", "Motion Design", "Modelos 3D"],
    ],
    image: "/img/services/services-stack/s01.webp",
    descrClass: "t-large t-bold services-card__descr",
    descr: (
      <>
        Criamos designs visualmente atraentes que aprimoram a experiência do
        usuário.
        <span>
          Desde o design de UI/UX até sites incríveis, aplicativos móveis e
          materiais impressos, garantimos que a identidade visual da sua marca
          se conecte com o seu público.
        </span>
      </>
    ),
  },
  {
    subtitle: "02 / Serviços",
    title: "Desenvolvimento criativo",
    tagCols: [
      ["Frontend", "Interações", "Backend", "E-Commerce"],
      ["Aplicativos móveis", "Manutenção", "Suporte"],
    ],
    image: "/img/services/services-stack/s02.webp",
    descrClass: "t-bold t-large services-card__descr",
    descr: (
      <>
        Desenvolvemos sites e aplicativos de alto desempenho utilizando
        tecnologias modernas.
        <span>
          Nossas soluções são projetadas para serem escaláveis e funcionais,
          oferecendo a melhor performance.
        </span>
      </>
    ),
  },
  {
    subtitle: "03 / Serviços",
    title: "Identidade de Marca",
    tagCols: [
      ["Estratégia de marca", "Design de logo", "Diretrizes"],
      ["Identidade visual", "Rebranding"],
    ],
    image: "/img/services/services-stack/s03.webp",
    descrClass: "t-bold t-large services-card__descr",
    descr: (
      <>
        Do design do logo a estratégias de marca completas, garantimos que o seu
        negócio se destaque com uma{" "}
        <span>
          identidade visual única e comunicação consistente em todos os
          pontos de contato.
        </span>
      </>
    ),
  },
  {
    subtitle: "04 / Serviços",
    title: "Soluções de marketing",
    tagCols: [
      ["Estratégia", "Redes sociais", "Otimização de SEO"],
      ["E-mail marketing", "Campanhas"],
    ],
    image: "/img/services/services-stack/s04.webp",
    descrClass: "t-bold t-large services-card__descr",
    descr: (
      <>
        Desenvolvemos e executamos estratégias digitais de marketing
        personalizadas.
        <span>
          SEO e marketing de conteúdo, gestão de redes sociais e campanhas
          pagas — ajudamos você a alcançar e engajar seu público-alvo com
          eficácia.
        </span>
      </>
    ),
  },
];

function Tag({ children }: { children: string }) {
  return (
    <TextScramble className="tag tag-s-mobile mxd-scramble">
      {children}
    </TextScramble>
  );
}

function ServiceCard({ card, index }: { card: Card; index: number }) {
  const [colA, colB] = card.tagCols;
  return (
    <ServicesStackSlot part="card" index={index}>
      <div className="mxd-stack-services__card">
        <ServicesStackSlot part="wrapper" index={index}>
          <div className="services-card__wrapper">
            <div className="services-card__content">
              <div className="services-card__info">
                <div className="services-card__subtitle">
                  <Tag>{card.subtitle}</Tag>
                </div>
                <div className="services-card__title">
                  <ServicesStackSlot part="title" index={index}>
                    <div className="services-card__title-text">
                      {card.title}
                    </div>
                  </ServicesStackSlot>
                </div>
                <ServicesStackSlot part="tags" index={index}>
                  <div className="services-card__tags">
                    <div className="tags-column">
                      {colA.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                    <div className="tags-column">
                      {colB.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </div>
                </ServicesStackSlot>
              </div>
              <ServicesStackSlot part="descr" index={index}>
                <div className={card.descrClass}>{card.descr}</div>
              </ServicesStackSlot>
            </div>
            <ServicesStackSlot part="image" index={index}>
              <div className="services-card__image">
                <Image
                  src={card.image}
                  width={IMG_W}
                  height={IMG_H}
                  alt={IMG_ALT}
                />
                <div className="services-card__cover" />
              </div>
            </ServicesStackSlot>
          </div>
        </ServicesStackSlot>
      </div>
    </ServicesStackSlot>
  );
}

export default function ServicesDescriptionStack() {
  return (
    <div id="services" className="mxd-section">
      <div className="mxd-container fullwidth-container">
        <div className="mxd-block">
          <CommonServicesStack className="mxd-stack-services">
            {CARDS.map((card, index) => (
              <ServiceCard key={card.subtitle} card={card} index={index} />
            ))}
          </CommonServicesStack>
        </div>
      </div>
    </div>
  );
}
