"use client";
import BlurSection from "@/components/animations/BlurSection";
import Link from "next/link";
import Image from "next/image";
import CommonLoadAnimation, {
  CommonLoadFade,
  CommonLoadItem,
} from "@/components/animations/CommonLoadAnimation";
import CommonAnimatedText from "@/components/animations/CommonAnimatedText";
import TextScramble from "@/components/animations/TextScramble";
import SmoothAnchorLink from "@/components/common/SmoothAnchorLink";

export default function FrontendInnovationsArticle() {
  return (
    <CommonLoadAnimation>
      <>
        <BlurSection className="mxd-section">
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
                              Inovações de frontend e jornadas de usuário
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
                            UI/UX
                          </TextScramble>
                        </a>
                        <a href="#0">
                          <TextScramble className="tag tag-m meta-tag comma-tag mxd-scramble">
                            Desenvolvimento
                          </TextScramble>
                        </a>
                        <a href="#0">
                          <TextScramble className="tag tag-m meta-tag mxd-scramble">
                            Insights
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
                        Inovações de frontend e jornadas de usuário
                      </CommonAnimatedText>
                    </div>
                    <CommonLoadItem index={1}>
                      <div className="mxd-article__meta loading-item">
                        <div className="mxd-article__data">
                          <span className="tag tag-m meta-tag slash-tag">
                            02 de fevereiro de 2026
                          </span>
                          <span className="tag tag-m meta-tag">6min de leitura</span>
                        </div>
                      </div>
                    </CommonLoadItem>
                  </div>
                  {/* Article Headline End */}
                  {/* Article Thumb Start */}
                  <CommonLoadItem index={2}>
                    <div className="mxd-article__thumb loading-item">
                      <Image
                        alt="Imagem do Artigo - Folha monocromática orgânica"
                        src="/img/blog/pr-01.webp"
                        width={1920}
                        height={1200}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  </CommonLoadItem>
                  {/* Article Thumb End */}
                  {/* Article Content Start */}
                  <div className="mxd-article__content">
                    <div className="mxd-article__block">
                      <p className="mxd-article__excerpt">
                        A jornada do usuário em aplicações web modernas deixou de ser apenas um fluxo de telas desenhadas no Figma. 
                        <span>
                          Hoje, a verdadeira experiência do usuário é definida na arquitetura de renderização, na latência de rede 
                          e na eficiência do código servido no client-side.
                        </span>
                      </p>
                      <p className="mxd-article__normal">
                        O design visual é apenas a camada externa de uma infraestrutura robusta. Como arquitetos de software, 
                        nosso papel é garantir que a transição entre estados, a hidratação do DOM e a comunicação com o banco de dados (como o Supabase) 
                        ocorram de forma invisível. Neste artigo, exploro como as inovações no ecossistema React e Next.js estão redefinindo o que chamamos de UI/UX.
                      </p>
                    </div>
                    <div className="mxd-article__block block-table-of-contents">
                      <p className="table-of-contents__title">
                        / Índice:
                      </p>
                      <ul className="table-of-contents__nav">
                        <li>
                          <SmoothAnchorLink targetId="chapter-01">
                            A Arquitetura como Alicerce da Jornada
                          </SmoothAnchorLink>
                        </li>
                        <li>
                          <SmoothAnchorLink targetId="chapter-02">
                            React Server Components (RSC)
                          </SmoothAnchorLink>
                        </li>
                        <li>
                          <SmoothAnchorLink targetId="chapter-03">
                            Estado Global vs. Estado de URL
                          </SmoothAnchorLink>
                        </li>
                        <li>
                          <SmoothAnchorLink targetId="chapter-04">
                            Animações e a Ilusão de Zero Latência
                          </SmoothAnchorLink>
                        </li>
                        <li>
                          <SmoothAnchorLink targetId="chapter-05">
                            Engenharia a favor do Usuário
                          </SmoothAnchorLink>
                        </li>
                      </ul>
                    </div>
                    <div id="chapter-01" className="mxd-article__block">
                      <h3>A Arquitetura como Alicerce da Jornada</h3>
                      <p className="mxd-article__normal">
                        Durante anos, Single Page Applications (SPAs) dominaram o mercado entregando navegação fluida ao custo de 
                        bundles JavaScript massivos, prejudicando o First Contentful Paint (FCP) e o SEO. 
                        Com a adoção do App Router no Next.js, deslocamos o peso da lógica para o servidor (Edge ou Node), 
                        garantindo que o navegador receba HTML pré-renderizado. Isso não é apenas uma melhoria de Core Web Vitals; é UX na sua forma mais técnica.
                      </p>
                    </div>
                    <div className="mxd-article__block block-quote">
                      <blockquote>
                        <p className="quote__text">
                          A melhor interface é aquela que o usuário não precisa esperar para usar.
                          <span>
                            Performance técnica é a métrica definitiva de UI/UX.
                          </span>
                        </p>
                        <p className="quote__cite">
                          <cite>/ Danilo Oliveira</cite>
                        </p>
                      </blockquote>
                    </div>
                    <div id="chapter-02" className="mxd-article__block">
                      <h3>React Server Components (RSC)</h3>
                      <p className="mxd-article__normal">
                        A introdução dos RSCs mudou o paradigma de hidratação. Ao renderizar componentes estáticos exclusivamente no servidor, 
                        enviamos zero JavaScript para o cliente nessas seções.
                      </p>
                      <ul className="article-ul">
                        <li><strong>Busca de Dados Nativa:</strong> Requisições ao Supabase ocorrem diretamente no backend, eliminando spinners de carregamento em cascata (waterfall requests).</li>
                        <li><strong>Segurança Embutida:</strong> Lógicas de negócios e chaves de API nunca tocam o navegador.</li>
                        <li><strong>Redução de Payload:</strong> Bibliotecas de formatação pesadas (como processamento de datas ou markdown) permanecem no servidor.</li>
                      </ul>
                    </div>
                    <div id="chapter-03" className="mxd-article__block">
                      <h3>Estado Global vs. Estado de URL</h3>
                      <p className="mxd-article__normal">
                        Uma jornada de usuário fragmentada ocorre quando o estado da aplicação se perde ao recarregar a página ou compartilhar um link. 
                        A inovação atual reside em abandonar gerenciadores de estado globais pesados (como Redux) para dados transitórios, preferindo o <strong>Estado de URL</strong> via Search Parameters.
                      </p>
                      <p className="mxd-article__normal">
                        Ao sincronizar filtros, modais e paginações diretamente na URL de forma assíncrona, não apenas permitimos o compartilhamento exato de telas, 
                        como preparamos a arquitetura para interceptações de rotas e Server Actions, mantendo o fluxo do usuário perfeitamente previsível.
                      </p>
                    </div>
                    <div className="mxd-article__block block-image">
                      <div className="block-image__container">
                        <Image
                          alt="Diagrama de fluxo de dados"
                          src="/img/blog/article/1920x1280_img-02.webp"
                          width={1920}
                          height={1280}
                        />
                        <div className="block-image__tags">
                          <span className="tag tag-m tag-bg permanent">
                            Arquitetura de Rotas Modernas
                          </span>
                        </div>
                      </div>
                    </div>
                    <div id="chapter-04" className="mxd-article__block">
                      <h3>Animações e a Ilusão de Zero Latência</h3>
                      <p className="mxd-article__normal">
                        Em ecossistemas digitais, milissegundos importam. O uso de bibliotecas de motion (como GSAP ou Framer Motion) 
                        deve ir além do apelo estético. Transições de página, carregamento otimista (Optimistic UI) em Server Actions e feedback 
                        visual imediato mascaram a latência de rede. O usuário percebe a aplicação como instantânea, mesmo enquanto o banco de dados valida operações no background.
                      </p>
                    </div>
                    <div id="chapter-05" className="mxd-article__block">
                      <h3>Engenharia a favor do Usuário</h3>
                      <p className="mxd-article__normal">
                        A interface do usuário é o produto de decisões arquitetônicas. Para construir jornadas excepcionais, 
                        devemos parar de enxergar o frontend como apenas HTML/CSS e tratá-lo como engenharia de sistemas.
                      </p>
                      <ol className="article-ol">
                        <li>Privilegie renderização no servidor (SSR/RSC) sempre que possível.</li>
                        <li>Trate a URL como a única fonte de verdade para o estado da navegação.</li>
                        <li>Utilize UI otimista para interações de banco de dados, garantindo respostas instantâneas na tela.</li>
                      </ol>
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
                        alt="Danilo Oliveira"
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
                        <a className="mxd-article-navigation__link" href="/blog-article">
                          <span>Minha jornada na arquitetura de software na era da IA</span>
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
                          <span>Branding na criação de experiências digitais</span>
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
        </BlurSection>
      </>
    </CommonLoadAnimation>
  );
}