"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";

export default function BlogArticle() {
  // Força a engine do GSAP a recalcular as posições de gatilho após a renderização do componente.
  // Isso previne que o "MoreOnTopic" perca as referências de altura e oculte os cards subitamente.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250); 
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <CommonLoadAnimation>
      <>
        {/* Substituição tática de BlurSection por uma <section> semântica.
            Restaura o fluxo natural do DOM, eliminando a sobreposição de parallax.
            As classes pt-32 lg:pt-40 resolvem a colisão com o Header de navegação. */}
        <section className="mxd-section padding-bottom-default pt-32 lg:pt-40 relative z-10 bg-color-base">
          <div className="mxd-container grid-l-container">
            {/* Block - Inner Headline Breadcrumbs Start */}
            <div className="mxd-block">
              <div className="inner-headline">
                <div className="container-fluid p-0">
                  <div className="row g-0">
                    <div className="col-12 mxd-grid-item">
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
                            <span>
                              <Link href={`/blog-standard`}>
                                <TextScramble className="mxd-scramble">
                                  Insights
                                </TextScramble>
                              </Link>
                            </span>
                            <span className="current-item">
                              Minha jornada com IA no desenvolvimento
                            </span>
                          </div>
                        </div>
                      </CommonLoadFade>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Block - Inner Headline Breadcrumbs End */}
            <div className="mxd-article-area">
              {/* Article Container Start */}
              <div className="mxd-article-container mxd-grid-item">
                {/* Article Start */}
                <div className="mxd-article loading-wrap">
                  {/* Article Headline Start */}
                  <div className="mxd-article__headline">
                    <CommonLoadItem index={0}>
                      <div className="mxd-article__tags loading-item">
                        <a href="#0">
                          <TextScramble className="tag tag-m meta-tag comma-tag mxd-scramble">
                            Gemini
                          </TextScramble>
                        </a>
                        <a href="#0">
                          <TextScramble className="tag tag-m meta-tag comma-tag mxd-scramble">
                            IA
                          </TextScramble>
                        </a>
                        <a href="#0">
                          <TextScramble className="tag tag-m meta-tag mxd-scramble">
                            Engenharia
                          </TextScramble>
                        </a>
                      </div>
                    </CommonLoadItem>
                    <div className="mxd-article__title">
                      <CommonAnimatedText
                        as="h2"
                        className="small loading-split"
                        animation="splitLinesLoad"
                      >
                        Minha jornada na arquitetura de software na era da IA
                      </CommonAnimatedText>
                    </div>
                    <CommonLoadItem index={1}>
                      <div className="mxd-article__meta loading-item">
                        <div className="mxd-article__data">
                          <span className="tag tag-m meta-tag slash-tag">
                            06 de janeiro de 2026
                          </span>
                          <span className="tag tag-m meta-tag">5min de leitura</span>
                        </div>
                      </div>
                    </CommonLoadItem>
                  </div>
                  {/* Article Headline End */}
                  {/* Article Thumb Start */}
                  <CommonLoadItem index={2}>
                    <div className="mxd-article__thumb loading-item">
                      <Image
                        alt="Imagem do Artigo"
                        src="/img/blog/article/1920x1200_ar-01.webp"
                        width={1920}
                        height={1200}
                      />
                    </div>
                  </CommonLoadItem>
                  {/* Article Thumb End */}
                  {/* Article Content Start */}
                  <div className="mxd-article__content">
                    <div className="mxd-article__block">
                      <p className="mxd-article__excerpt">
                        Como desenvolvedor e arquiteto de software, sempre fui fascinado pela
                        interseção entre lógica estrutural e eficiência de código.
                        <span>
                          Recentemente, decidi integrar a inteligência
                          artificial (IA) na minha stack para ver como ela poderia otimizar a
                          criação de ecossistemas web e SaaS de alta performance.
                        </span>
                      </p>
                      <p className="mxd-article__normal">
                        A ideia de programar lado a lado com uma IA parecia promissora, mas gerava dúvidas. 
                        Será que um modelo de linguagem poderia realmente auxiliar na produção de arquiteturas complexas 
                        sem comprometer a segurança e as melhores práticas? Com pragmatismo, 
                        parti para explorar as capacidades dessas ferramentas no meu fluxo de CI/CD e estruturação de código.
                      </p>
                    </div>
                    <div className="mxd-article__block block-table-of-contents">
                      <p className="table-of-contents__title">
                        / Índice:
                      </p>
                      <ul className="table-of-contents__nav">
                        <li>
                          <SmoothAnchorLink targetId="chapter-01">
                            O Experimento Começa
                          </SmoothAnchorLink>
                        </li>
                        <li>
                          <SmoothAnchorLink targetId="chapter-02">
                            O que Aprendi
                          </SmoothAnchorLink>
                        </li>
                        <li>
                          <SmoothAnchorLink targetId="chapter-03">
                            Como Usei a IA no Meu Fluxo de Trabalho
                          </SmoothAnchorLink>
                        </li>
                        <li>
                          <SmoothAnchorLink targetId="chapter-04">
                            Os Desafios
                          </SmoothAnchorLink>
                        </li>
                        <li>
                          <SmoothAnchorLink targetId="chapter-05">
                            Por que Continuarei Usando IA
                          </SmoothAnchorLink>
                        </li>
                        <li>
                          <SmoothAnchorLink targetId="chapter-06">
                            Considerações Finais
                          </SmoothAnchorLink>
                        </li>
                      </ul>
                    </div>
                    <div id="chapter-01" className="mxd-article__block">
                      <h3>O Experimento Começa</h3>
                      <p className="mxd-article__normal">
                        A premissa era clara: ferramentas de IA como o Google Gemini 
                        poderiam se tornar engenheiros auxiliares valiosos no meu repositório? 
                        Queria testar se essa tecnologia poderia me ajudar a produzir lógicas de backend 
                        e componentes React com mais velocidade, mantendo a qualidade exigida em infraestruturas modernas.
                      </p>
                    </div>
                    <div className="mxd-article__block block-quote">
                      <blockquote>
                        <p className="quote__text">
                          A IA não substituiu minha lógica de programação.
                          <span>
                            Ela a otimizou, eliminando horas de digitação e permitindo focar na arquitetura.
                          </span>
                        </p>
                        <p className="quote__cite">
                          <cite>/ Danilo Oliveira</cite>
                        </p>
                      </blockquote>
                    </div>
                    <div className="mxd-article__block">
                      <p className="mxd-article__normal">
                        No início, fazer engenharia de prompt foi como debugar uma nova linguagem.
                        Experimentar contextos e restrições foi uma mistura de
                        tentativa e erro. O que mais me surpreendeu foi como a IA
                        conseguia complementar meu fluxo, transformando ideias abstratas de banco de dados 
                        em schemas estruturados em segundos.
                      </p>
                    </div>
                    <div id="chapter-02" className="mxd-article__block">
                      <h3>O que Aprendi</h3>
                      <p className="mxd-article__normal">
                        Aqui estão as três principais descobertas que fiz durante
                        esse processo de desenvolvimento:
                      </p>
                      <ol className="article-ol">
                        <li>
                          A IA refatora com velocidade
                          <ul className="article-ul">
                            <li>Ela converte códigos legados em sintaxe moderna quase instantaneamente.</li>
                            <li>É uma ferramenta excelente para escrever testes unitários.</li>
                          </ul>
                        </li>
                        <li>
                          Alucinações de Código acontecem
                          <ul>
                            <li>A IA pode inventar bibliotecas ou métodos que não existem.</li>
                            <li>
                              A revisão humana estrita (code review) é inegociável antes de qualquer deploy.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Arquitetura ainda é humana
                          <ul>
                            <li>A IA escreve a função, mas quem decide onde ela roda (Edge, Server, Client) é você.</li>
                            <li>Decisões de segurança de infraestrutura requerem discernimento humano.</li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                    <div className="mxd-article__block block-image">
                      <div className="block-image__container">
                        <Image
                          alt="Imagem do Artigo"
                          src="/img/blog/article/1920x1280_img-01.webp"
                          width={1920}
                          height={1280}
                        />
                        <div className="block-image__tags">
                          <span className="tag tag-m tag-bg permanent">
                            Código assistido por IA
                          </span>
                        </div>
                      </div>
                    </div>
                    <div id="chapter-03" className="mxd-article__block">
                      <h3>Como Usei a IA no Meu Fluxo de Trabalho</h3>
                      <p className="mxd-article__normal">
                        A IA não assumiu a engenharia do projeto — ela se integrou ao meu terminal. Veja como:
                      </p>
                      <h4>Brainstorming de Estruturas</h4>
                      <p className="mxd-article__normal">
                        Utilizo a IA para mapear relacionamentos em bancos de dados relacionais e modelar 
                        APIs RESTful ou GraphQL. Isso economiza horas de planejamento inicial no desenvolvimento de um SaaS.
                      </p>
                      <h4>Geração de Código Boilerplate</h4>
                      <p className="mxd-article__normal">
                        A IA ajuda na criação de blocos de código repetitivos (como tipagens TypeScript extensas ou configurações de formulários) que levariam horas de digitação, 
                        deixando apenas as decisões de arquitetura e lógica de negócios para eu decidir.
                      </p>
                      <h4>Segurança e Infraestrutura</h4>
                      <p className="mxd-article__normal">
                        Ao configurar integrações de autenticação e comunicação com servidores, 
                        uso a IA como um revisor secundário para identificar possíveis gargalos de vulnerabilidade 
                        antes de enviar o código para produção.
                      </p>
                    </div>
                    <div className="mxd-article__block block-image">
                      <div className="block-image__container">
                        <Image
                          alt="Imagem do Artigo"
                          src="/img/blog/article/1200x1200_img-01.webp"
                          width={1200}
                          height={1200}
                        />
                        <div className="block-image__tags">
                          <span className="tag tag-m tag-bg permanent">
                            Deploy Estruturado
                          </span>
                        </div>
                      </div>
                      <div className="block-image__container">
                        <Image
                          alt="Imagem do Artigo"
                          src="/img/blog/article/1200x1200_img-02.webp"
                          width={1200}
                          height={1200}
                        />
                        <div className="block-image__tags">
                          <span className="tag tag-m tag-bg permanent">
                            Lógica Algorítmica
                          </span>
                        </div>
                      </div>
                    </div>
                    <div id="chapter-04" className="mxd-article__block">
                      <h3>Os Desafios</h3>
                      <p className="mxd-article__normal">
                        <span>Perda de Contexto.</span> Em bases de código muito grandes, a IA 
                        pode perder o fio da meada e sugerir lógicas que quebram outros componentes do sistema.
                      </p>
                      <p className="mxd-article__normal">
                        <span>Dependências Obsoletas.</span>
                        Às vezes, a sugestão de código inclui pacotes npm descontinuados ou métodos desatualizados.
                      </p>
                      <p className="mxd-article__normal">
                        <span>Otimização Cega.</span>
                        A ferramenta prioriza o funcionamento em detrimento da performance de renderização se você não for perfeitamente claro no prompt.
                      </p>
                    </div>
                    <div id="chapter-05" className="mxd-article__block">
                      <h3>Por que Continuarei Usando IA</h3>
                      <p className="mxd-article__normal">
                        Ferramentas como o{" "}
                        <a
                          href="https://gemini.google.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Google Gemini
                        </a>{" "}
                        não substituem desenvolvedores seniores. Em vez disso, elas:
                      </p>
                      <ul>
                        <li>
                          Aceleram a resolução de bugs complexos fornecendo perspectivas diferentes;
                        </li>
                        <li>
                          Ajudam a automatizar a escrita de documentação técnica;
                        </li>
                        <li>
                          Permitem escalar o desenvolvimento de produtos, entregando mais valor em menos sprints.
                        </li>
                      </ul>
                    </div>
                    <div id="chapter-06" className="mxd-article__block">
                      <h3>Considerações Finais</h3>
                      <p className="mxd-article__normal">
                        A IA na engenharia de software não é o fim da programação — é a evolução das nossas ferramentas. 
                        Se você desenvolve e quer integrar IA na sua stack, aqui está meu conselho:
                      </p>
                      <ul>
                        <li>
                          <span>Seja Específico:</span>
                          Bons prompts geram bom código. Defina a stack (ex: Next.js App Router, Tailwind) na solicitação;
                        </li>
                        <li>
                          <span>Revise Tudo:</span>
                          Nunca faça commit de um código gerado por IA que você não entenda completamente;
                        </li>
                        <li>
                          <span>Foque na Arquitetura:</span>
                          Deixe a máquina digitar a sintaxe. Gaste seu tempo projetando sistemas robustos e seguros.
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Article Content End */}
                </div>
                {/* Article End */}
                {/* Article Author Start */}
                <div className="mxd-article-author">
                  <div className="mxd-article-author__data">
                    <a className="mxd-article-author__avatar" href="#0">
                      <Image
                        alt="Avatar"
                        src="/img/avatars/300x300_ava-06.jpeg"
                        width={300}
                        height={300}
                      />
                    </a>
                    <div className="mxd-article-author__info">
                      <h4 className="mxd-article-author__name">
                        <a href="#0">Danilo Oliveira</a>
                        <small className="mxd-article-author__position">
                          CEO e Arquiteto de Software da MindSite
                        </small>
                      </h4>
                      <div className="mxd-article-author__socials">
                        <a
                          href="https://www.linkedin.com/in/danilo-ms-oliveira/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tag tag-m tag-bg default"
                        >
                          <TextScramble className="mxd-scramble">
                            LinkedIn
                          </TextScramble>
                        </a>
                        <a
                          href="https://www.mindsite.com.br"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tag tag-m tag-bg default"
                        >
                          <TextScramble className="mxd-scramble">
                            MindSite
                          </TextScramble>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-article-author__quote">
                    <p className="mxd-article__normal">
                      Com vasta experiência mesclando código sólido e arquitetura de sistemas, 
                      Danilo constrói ecossistemas digitais escaláveis que impulsionam negócios. 
                      Quando não está no terminal, ele pesquisa infraestruturas modernas e compartilha 
                      insights sobre desenvolvimento de alta performance.
                    </p>
                  </div>
                </div>
                {/* Article Author End */}
                {/* Article Navigation Start */}
                <div className="mxd-article-navigation">
                  <div className="container-fluid p-0">
                    <div className="row g-0">
                      <div className="col-6 mxd-article-navigation__navitem left">
                        <a
                          className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-left"
                          href="#0"
                          aria-label="Artigo Anterior"
                        >
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                            >
                              <path d="M7.2,18v-3.6h3.6v3.6h-3.6ZM3.6,7.2H0v3.6h3.6v3.6h3.6v-3.6h10.8v-3.6H7.2v-3.6h-3.6s0,3.6,0,3.6ZM7.2,3.6h3.6V0h-3.6v3.6Z" />
                            </svg>
                          </i>
                          <TextScramble className="btn-caption mxd-scramble">
                            Anterior
                          </TextScramble>
                        </a>
                        <a className="mxd-article-navigation__link" href="#0">
                          <span>
                            Projetando infraestruturas escaláveis com Next.js
                          </span>
                        </a>
                      </div>
                      <div className="col-6 mxd-article-navigation__navitem right">
                        <a
                          className="btn btn-line-icon btn-line-icon-small btn-line-medium slide-right"
                          href="#0"
                          aria-label="Próximo Artigo"
                        >
                          <TextScramble className="btn-caption mxd-scramble">
                            Próximo
                          </TextScramble>
                          <i>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              viewBox="0 0 18 18"
                            >
                              <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                            </svg>
                          </i>
                        </a>
                        <a className="mxd-article-navigation__link" href="#0">
                          <span>
                            Dominando a gestão de estado e banco de dados em aplicações modernas
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Article Navigation End */}
                {/* Article Comments Start */}
                <div className="mxd-article-comments">
                  <div className="mxd-article-comments__container">
                    <h3>0 Comentários</h3>
                    <div className="mxd-article-comments__list">
                      <ul className="mxd-comment__main">
                        {/* Comentários dinâmicos via Supabase serão renderizados aqui */}
                      </ul>
                    </div>
                  </div>
                  <div className="mxd-article-comments__respond">
                    <h3>O que você acha?</h3>
                    <p className="mxd-article__normal">
                      Por favor, deixe uma resposta. Seu endereço de e-mail não será
                      publicado. Campos obrigatórios estão marcados com *
                    </p>
                    <div className="comments-respond__form">
                      <form
                        className="form"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div className="container-fluid p-0">
                          <div className="row gx-5 comments-respond__row">
                            <div className="col-12 col-md-6 mxd-grid-item no-margin">
                              <input
                                type="text"
                                name="Name"
                                placeholder="Seu nome*"
                                required
                              />
                            </div>
                            <div className="col-12 col-md-6 mxd-grid-item no-margin">
                              <input
                                type="text"
                                name="Company"
                                placeholder="Seu e-mail*"
                              />
                            </div>
                            <div className="col-12 mxd-grid-item">
                              <textarea
                                name="Message"
                                placeholder="Mensagem*"
                                required
                                defaultValue={""}
                              />
                            </div>
                            <div className="col-12 mxd-grid-item">
                              <button
                                className="btn btn-default-icon btn-default-accent slide-right"
                                type="submit"
                              >
                                <TextScramble className="btn-caption mxd-scramble">
                                  Publicar Comentário
                                </TextScramble>
                                <i className="btn-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.1"
                                    viewBox="0 0 18 18"
                                  >
                                    <path d="M10.8,0v3.6h-3.6V0h3.6ZM14.4,10.8h3.6v-3.6h-3.6v-3.6h-3.6v3.6H0v3.6h10.8v3.6h3.6v-3.6ZM10.8,14.4h-3.6v3.6h3.6v-3.6Z" />
                                  </svg>
                                </i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Article Comments End */}
              </div>
              {/* Article Container End */}
            </div>
          </div>
        </section>
      </>
    </CommonLoadAnimation>
  );
}