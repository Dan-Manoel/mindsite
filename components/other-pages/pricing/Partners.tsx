"use client";
import BlurSection from "@/components/animations/BlurSection";
import { CommonScrollAnimated } from "@/components/animations/CommonScrollAnimated";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import Image from "next/image";

export default function Partners() {
  const clients = [
    { 
      name: "Instituto Xamã", 
      src: "/img/clients/instituto-xama.webp",
      description: "Infraestrutura digital criada pixel a pixel pela MindSite."
    },
    { 
      name: "Instituto Kokopelli", 
      src: "/img/clients/instituto-kokopelli.webp",
      description: "Portal institucional e blog otimizado pela MindSite."
    },
    { 
      name: "Rei da Pimenta", 
      src: "/img/clients/rei-da-pimenta.webp",
      description: "E-commerce de alto desempenho focado em nicho específico."
    },
    { 
      name: "Dra. Frances Coller", 
      src: "/img/clients/dra-frances-coller.png",
      description: "Portfólio pessoal altamente personalizado."
    },
  ];

  return (
    <BlurSection className="mxd-section padding-top-title padding-bottom-t-medium">
      <div className="mxd-container grid-l-container">
        <div className="mxd-block">
          <div className="container-fluid p-0">
            <div className="row g-0">
              
              {/* Título - Escala tipográfica ampliada */}
              <div className="col-12 col-xl-5 mxd-grid-item">
                <div className="mxd-section-title pre-grid-xl-mobile">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      <div className="col-12">
                        <div 
                          className="mxd-section-title__title" 
                          style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}
                        >
                          <CommonAnimatedText
                            as="h2"
                            className="reveal-type"
                            animation="revealType"
                            style={{ 
                              fontSize: 'clamp(3.5rem, 6vw, 6.5rem)', 
                              lineHeight: '1.1', 
                              fontWeight: 600, 
                              letterSpacing: '-0.02em' 
                            }}
                          >
                            Ecossistemas
                            <br />
                            em Produção
                            <br />
                            ou em
                            <br />
                            Desenvolvimento.
                          </CommonAnimatedText>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lista de Clientes */}
              <div className="col-12 col-xl-7 mxd-grid-item px-xl-4">
                <div className="d-flex flex-column w-100" style={{ gap: '2.5rem', marginTop: '1rem' }}>
                  {clients.map((client, index) => (
                    <CommonScrollAnimated
                      key={index}
                      as="div"
                      animation="inUp"
                      className="d-flex align-items-center w-100 pb-4"
                      style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
                    >
                      {/* Container do Logo - Centralizado */}
                      <div 
                        className="flex-shrink-0 me-4 me-md-5 d-flex justify-content-center align-items-center" 
                        style={{ position: 'relative', width: '130px', height: '90px' }}
                      >
                        <Image
                          alt={`Logo ${client.name}`}
                          src={client.src}
                          fill
                          style={{ objectFit: 'contain', objectPosition: 'center' }}
                        />
                      </div>
                      
                      {/* Informações do Cliente */}
                      <div>
                        <h3 className="t-large mb-2" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                          {client.name}
                        </h3>
                        <p className="t-medium mb-0" style={{ opacity: 0.7 }}>
                          {client.description}
                        </p>
                      </div>
                    </CommonScrollAnimated>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </BlurSection>
  );
}