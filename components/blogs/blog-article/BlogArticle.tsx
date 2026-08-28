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
export default function BlogArticle() {
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
                            <span>
                              <Link href={`/blog-standard`}>
                                <TextScramble className="mxd-scramble">
                                  Insights
                                </TextScramble>
                              </Link>
                            </span>
                            <span className="current-item">
                              Minha jornada rumo ao futuro da arte
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
                            Midjourney
                          </TextScramble>
                        </a>
                        <a href="#0">
                          <TextScramble className="tag tag-m meta-tag comma-tag mxd-scramble">
                            IA
                          </TextScramble>
                        </a>
                        <a href="#0">
                          <TextScramble className="tag tag-m meta-tag mxd-scramble">
                            Editorial
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
                        Minha jornada rumo ao futuro da arte
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
                        Como ilustrador digital, sempre fui fascinado pela
                        interseção entre arte e tecnologia.
                        <span>
                          Recentemente, decidi mergulhar no mundo da inteligência
                          artificial (IA) para ver como ela poderia me ajudar a
                          criar ilustrações comerciais de forma mais eficiente e
                          criativa.
                        </span>
                      </p>
                      <p className="mxd-article__normal">
                        A ideia de trabalhar ao lado da IA parecia ao mesmo tempo
                        empolgante e intimidadora. Será que uma máquina poderia
                        realmente auxiliar na produção de trabalhos que correspondessem
                        às nuances da criatividade humana? Com a curiosidade como guia,
                        parti para explorar as capacidades dessas ferramentas e ver como
                        elas poderiam aprimorar meu processo artístico.
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
                        A ideia era simples: ferramentas de IA como MidJourney,
                        DALL·E ou Stable Diffusion poderiam se tornar colaboradores
                        valiosos no meu processo criativo? Queria ver se essas
                        tecnologias de ponta poderiam me ajudar a produzir ilustrações
                        de alta qualidade que correspondessem às expectativas dos meus
                        clientes. Com uma mistura de entusiasmo e ceticismo, decidi
                        mergulhar de cabeça e colocar essas ferramentas à prova.
                      </p>
                    </div>
                    <div className="mxd-article__block block-quote">
                      <blockquote>
                        <p className="quote__text">
                          A IA não substituiu minha criatividade.
                          <span>
                            Ela a amplificou, desbloqueando possibilidades que eu
                            nem havia imaginado.
                          </span>
                        </p>
                        <p className="quote__cite">
                          <cite>/ Danilo Oliveira</cite>
                        </p>
                      </blockquote>
                    </div>
                    <div className="mxd-article__block">
                      <p className="mxd-article__normal">
                        No início, usar IA foi como aprender um novo idioma.
                        Experimentar com prompts e configurações foi uma mistura de
                        tentativa e erro, mas logo ficou claro que essas ferramentas
                        podem ser muito úteis. O que mais me surpreendeu foi como a IA
                        conseguia complementar meu fluxo de trabalho existente,
                        transformando ideias vagas em visuais incríveis de maneiras
                        que eu não esperava.
                      </p>
                    </div>
                    <div id="chapter-02" className="mxd-article__block">
                      <h3>O que Aprendi</h3>
                      <p className="mxd-article__normal">
                        Aqui estão as três principais descobertas que fiz durante
                        esse processo:
                      </p>
                      <ol className="article-ol">
                        <li>
                          A IA é rápida e poderosa
                          <ul className="article-ul">
                            <li>Ela gera visuais complexos em minutos.</li>
                            <li>Ótima para brainstorming rápido.</li>
                          </ul>
                        </li>
                        <li>
                          Nem sempre é perfeita
                          <ul>
                            <li>A IA tem dificuldade com consistência de estilo.</li>
                            <li>
                              Pode levar tempo para refinar os resultados e adequá-los
                              a uma visão.
                            </li>
                          </ul>
                        </li>
                        <li>
                          Levanta questões éticas
                          <ul>
                            <li>Quem é o proprietário da obra?</li>
                            <li>O conteúdo gerado por IA é realmente &quot;original&quot;?</li>
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
                            Imagem gerada por IA
                          </span>
                        </div>
                      </div>
                    </div>
                    <div id="chapter-03" className="mxd-article__block">
                      <h3>Como Usei a IA no Meu Fluxo de Trabalho</h3>
                      <p className="mxd-article__normal">
                        A IA não tomou conta do meu processo — ela se tornou parte
                        da minha caixa de ferramentas. Veja como:
                      </p>
                      <h4>Brainstorming</h4>
                      <p className="mxd-article__normal">
                        A IA gerou ideias e painéis de humor, economizando horas de
                        conceituação inicial e acelerando o processo criativo. Isso
                        permitiu mais tempo para refinar e aperfeiçoar os designs finais.
                      </p>
                      <h4>Texturas</h4>
                      <p className="mxd-article__normal">
                        A IA criou fundos e padrões intrincados, aprimorando
                        significativamente o apelo visual das ilustrações e designs.
                        Ela ofereceu estilos e elementos únicos que teriam levado
                        horas para serem criados manualmente.
                      </p>
                      <h4>Apresentações</h4>
                      <p className="mxd-article__normal">
                        A IA ajudou a visualizar ideias rapidamente para os clientes,
                        melhorando as apresentações e tornando os conceitos mais
                        tangíveis. A eficiência e a clareza proporcionadas levaram a
                        aprovações e feedbacks mais rápidos dos clientes.
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
                            Padrão gerado por IA
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
                            Imagem gerada por IA
                          </span>
                        </div>
                      </div>
                    </div>
                    <div id="chapter-04" className="mxd-article__block">
                      <h3>Os Desafios</h3>
                      <p className="mxd-article__normal">
                        <span>Controle Criativo.</span> Queria criar uma cena de
                        floresta, mas a IA ficava adicionando elementos aleatórios
                        como prédios futuristas.
                      </p>
                      <p className="mxd-article__normal">
                        <span>Consistência de Estilo.</span>
                        A IA se destaca em peças individuais, mas criar um conjunto
                        coeso para branding é complicado.
                      </p>
                      <p className="mxd-article__normal">
                        <span>Tempo Gasto em Ajustes.</span>
                        Apesar da sua velocidade, a IA ainda exigia ajustes para
                        atender às expectativas dos clientes.
                      </p>
                    </div>
                    <div id="chapter-05" className="mxd-article__block">
                      <h3>Por que Continuarei Usando IA</h3>
                      <p className="mxd-article__normal">
                        Ferramentas de IA como{" "}
                        <a
                          href="https://www.midjourney.com/home"
                          target="_blank"
                        >
                          MidJourney
                        </a>{" "}
                        e{" "}
                        <a
                          href="https://stablediffusionweb.com/"
                          target="_blank"
                        >
                          Stable Diffusion
                        </a>{" "}
                        não substituem ilustradores. Em vez disso, elas:
                      </p>
                      <ul>
                        <li>
                          Fornecem inspiração quando você enfrenta bloqueios criativos;
                        </li>
                        <li>
                          Ajudam em tarefas demoradas como a criação de texturas;
                        </li>
                        <li>
                          Ampliam os limites criativos, inspirando novos estilos e
                          técnicas.
                        </li>
                      </ul>
                    </div>
                    <div id="chapter-06" className="mxd-article__block">
                      <h3>Considerações Finais</h3>
                      <p className="mxd-article__normal">
                        A IA na ilustração não é o fim da criatividade — é o início
                        de uma nova era. Se você é um ilustrador pensando em usar IA,
                        aqui está meu conselho:
                      </p>
                      <ul>
                        <li>
                          <span>Experimente:</span>
                          Experimente diferentes ferramentas e veja o que funciona para você;
                        </li>
                        <li>
                          <span>Adapte-se:</span>
                          Use a IA para complementar suas habilidades, não para substituí-las;
                        </li>
                        <li>
                          <span>Mantenha sua Originalidade:</span>
                          Seu toque único é o que torna sua arte especial.
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
                        src="/img/avatars/300x300_ava-06.webp"
                        width={300}
                        height={300}
                      />
                    </a>
                    <div className="mxd-article-author__info">
                      <h4 className="mxd-article-author__name">
                        <a href="#0">Danilo Oliveira</a>
                        <small className="mxd-article-author__position">
                          CEO e Estrategista Digital da Mindsite
                        </small>
                      </h4>
                      <div className="mxd-article-author__socials">
                        <a
                          href="https://www.linkedin.com/in/danilo-ms-oliveira/"
                          className="tag tag-m tag-bg default"
                        >
                          <TextScramble className="mxd-scramble">
                            LinkedIn
                          </TextScramble>
                        </a>
                        <a
                          href="https://www.mindsite.com.br"
                          className="tag tag-m tag-bg default"
                        >
                          <TextScramble className="mxd-scramble">
                            Mindsite
                          </TextScramble>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mxd-article-author__quote">
                    <p className="mxd-article__normal">
                      Com anos de experiência mesclando criatividade e estratégia,
                      ela ajuda empresas a se destacarem e a se conectarem com seus
                      públicos em um nível mais profundo. Quando não está criando,
                      Johanna explora tendências emergentes em branding e compartilha
                      seus insights com a comunidade criativa.
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
                            Projetando para o futuro dos espaços digitais interativos
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
                            Dominando a arte do design web minimalista com impacto
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
                    <h3>3 Comentários</h3>
                    <div className="mxd-article-comments__list">
                      <ul className="mxd-comment__main">
                        <li className="mxd-comment">
                          <div className="mxd-comment__container">
                            <div className="mxd-comment__avatar">
                              <Image
                                alt="Avatar do Comentário"
                                src="/img/avatars/300x300_ava-03.webp"
                                width={300}
                                height={300}
                              />
                            </div>
                            <div className="mxd-comment__content">
                              <div className="mxd-comment__info">
                                <p className="mxd-comment__date">
                                  28 de janeiro de 2026
                                </p>
                                <p className="mxd-comment__name">
                                  <a href="#0">Lea Tomato</a>
                                </p>
                              </div>
                              <p className="t-medium t-160">
                                A arte gerada por IA é impressionante, mas sinto que
                                ela tira o toque humano. A ilustração é sobre expressão
                                pessoal, e nenhum algoritmo pode realmente substituir isso.
                              </p>
                              <div className="mxd-comment__reply">
                                <a
                                  className="btn btn-default-icon-small btn-default-outline slide-right"
                                  href="#0"
                                >
                                  <TextScramble className="btn-caption mxd-scramble">
                                    Responder
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
                                </a>
                              </div>
                            </div>
                          </div>
                          <ul className="mxd-comment__children">
                            <li className="mxd-comment">
                              <div className="mxd-comment__container">
                                <div className="mxd-comment__avatar">
                                  <Image
                                    alt="Avatar do Comentário"
                                    src="/img/avatars/300x300_ava-04.webp"
                                    width={300}
                                    height={300}
                                  />
                                </div>
                                <div className="mxd-comment__content">
                                  <div className="mxd-comment__info">
                                    <p className="mxd-comment__date">
                                      28 de janeiro de 2026
                                    </p>
                                    <p className="mxd-comment__name">
                                      <a href="#0">Patrick Pineapple</a>
                                    </p>
                                  </div>
                                  <p className="t-medium t-160">
                                    Entendo seu ponto, Lea, mas acho que a IA é mais
                                    uma ferramenta do que um substituto. Ela acelera
                                    os fluxos de trabalho e ajuda os artistas a
                                    experimentarem novas ideias que talvez não
                                    tivessem considerado antes.
                                  </p>
                                  <div className="mxd-comment__reply">
                                    <a
                                      className="btn btn-default-icon-small btn-default-outline slide-right"
                                      href="#0"
                                    >
                                      <TextScramble className="btn-caption mxd-scramble">
                                        Responder
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
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </li>
                        <li className="mxd-comment">
                          <div className="mxd-comment__container">
                            <div className="mxd-comment__avatar">
                              <Image
                                alt="Avatar do Comentário"
                                src="/img/avatars/300x300_ava-02.webp"
                                width={300}
                                height={300}
                              />
                            </div>
                            <div className="mxd-comment__content">
                              <div className="mxd-comment__info">
                                <p className="mxd-comment__date">
                                  01 de fevereiro de 2026
                                </p>
                                <p className="mxd-comment__name">
                                  <a href="#0">Mary Cucumber</a>
                                </p>
                              </div>
                              <p className="t-medium t-160">
                                Como designer, comecei a usar IA no meu trabalho, e
                                isso realmente me ajudou a focar mais na criatividade.
                                Ela cuida das tarefas repetitivas, então posso dedicar
                                mais tempo ao refinamento de conceitos e narrativas.
                              </p>
                              <div className="mxd-comment__reply">
                                <a
                                  className="btn btn-default-icon-small btn-default-outline slide-right"
                                  href="#0"
                                >
                                  <TextScramble className="btn-caption mxd-scramble">
                                    Responder
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
                                </a>
                              </div>
                            </div>
                          </div>
                        </li>
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
