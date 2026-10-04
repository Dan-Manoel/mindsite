import Link from "next/link";
import { notFound } from "next/navigation";
import { templatesData } from "@/data/templates";

interface PreviewProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PreviewProps) {
  const { slug } = await params;
  const template = templatesData.find((t) => t.slug === slug);
  if (!template) return { title: "Template não encontrado | Mindsite" };

  return {
    title: `Preview: ${template.title} | Mindsite`,
    description: `Demonstração ao vivo do template ${template.title}`,
  };
}

export default async function TemplatePreview({ params }: PreviewProps) {
  const { slug } = await params;
  const template = templatesData.find((t) => t.slug === slug);

  if (!template) {
    notFound();
  }

  return (
    <>
      {/* Neutralização isolada dos componentes globais do RootLayout e Estilos do Preview */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body {
              overflow: hidden !important;
              margin: 0 !important;
              padding: 0 !important;
              width: 100% !important;
              height: 100% !important;
            }

            /* Ocultação forçada de componentes globais da MindSite */
            .mxd-header,
            .mxd-menu,
            .mxd-menu__contain,
            .mxd-cursor,
            #mxd-cursor,
            .mxd-page-transition {
              display: none !important;
              visibility: hidden !important;
              pointer-events: none !important;
            }

            /* Container de tela cheia do Preview */
            .preview-root-wrapper {
              position: fixed !important;
              inset: 0 !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              width: 100vw !important;
              height: 100vh !important;
              display: flex !important;
              flex-direction: column !important;
              z-index: 99999 !important;
              background-color: #0f0f0f !important;
              color: #ffffff !important;
              margin: 0 !important;
              padding: 0 !important;
              box-sizing: border-box !important;
              font-family: var(--font-manrope, system-ui, -apple-system, sans-serif) !important;
            }

            /* TopBar de Controle */
            .preview-topbar {
              width: 100% !important;
              height: 64px !important;
              min-height: 64px !important;
              max-height: 64px !important;
              flex-shrink: 0 !important;
              background-color: #171719 !important;
              border-bottom: 1px solid #313336 !important;
              padding: 0 24px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: space-between !important;
              z-index: 50 !important;
              box-sizing: border-box !important;
            }

            .preview-left-group {
              display: flex !important;
              align-items: center !important;
              gap: 24px !important;
            }

            .preview-back-btn {
              font-size: 12px !important;
              font-family: var(--font-jetbrains-mono, monospace) !important;
              text-transform: uppercase !important;
              letter-spacing: 0.05em !important;
              color: rgba(255, 255, 255, 0.7) !important;
              text-decoration: none !important;
              display: inline-flex !important;
              align-items: center !important;
              gap: 8px !important;
              transition: color 0.2s ease !important;
              cursor: pointer !important;
            }

            .preview-back-btn:hover {
              color: #ffffff !important;
              text-decoration: none !important;
            }

            .preview-divider {
              height: 16px !important;
              width: 1px !important;
              background-color: rgba(255, 255, 255, 0.1) !important;
            }

            .preview-meta-group {
              display: flex !important;
              flex-direction: column !important;
              line-height: 1.2 !important;
            }

            .preview-category-tag {
              font-size: 10px !important;
              font-family: var(--font-jetbrains-mono, monospace) !important;
              text-transform: uppercase !important;
              letter-spacing: 0.1em !important;
              color: rgba(255, 255, 255, 0.4) !important;
              margin: 0 !important;
            }

            .preview-title-text {
              font-size: 14px !important;
              font-weight: 600 !important;
              color: #ffffff !important;
              letter-spacing: -0.01em !important;
              margin: 0 !important;
            }

            .preview-right-group {
              display: flex !important;
              align-items: center !important;
              gap: 16px !important;
            }

            .preview-cta-btn {
              display: inline-flex !important;
              align-items: center !important;
              justify-content: center !important;
              padding: 8px 20px !important;
              font-size: 12px !important;
              font-family: var(--font-jetbrains-mono, monospace) !important;
              text-transform: uppercase !important;
              letter-spacing: 0.05em !important;
              font-weight: 700 !important;
              background-color: #ffffff !important;
              color: #000000 !important;
              text-decoration: none !important;
              border-radius: 2px !important;
              box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15) !important;
              transition: background-color 0.2s ease, transform 0.1s ease !important;
              cursor: pointer !important;
            }

            .preview-cta-btn:hover {
              background-color: #e5e5e5 !important;
              color: #000000 !important;
              text-decoration: none !important;
            }

            /* Viewport Iframe Container */
            .preview-viewport-main {
              position: relative !important;
              flex: 1 1 0% !important;
              width: 100% !important;
              height: calc(100vh - 64px) !important;
              background-color: #000000 !important;
              overflow: hidden !important;
              box-sizing: border-box !important;
            }

            .preview-iframe-element {
              width: 100% !important;
              height: 100% !important;
              border: none !important;
              display: block !important;
              margin: 0 !important;
              padding: 0 !important;
            }
          `,
        }}
      />

      <div
        className="fixed inset-0 w-screen h-screen flex flex-col z-[9999] bg-[#0f0f0f] preview-root-wrapper"
        style={{
          position: "fixed",
          inset: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          zIndex: 99999,
          backgroundColor: "#0f0f0f",
        }}
      >
        {/* MindSite Preview TopBar */}
        <header
          className="w-full h-16 shrink-0 bg-[#171719] border-b border-[#313336] px-6 flex items-center justify-between z-50 preview-topbar"
          style={{
            width: "100%",
            height: "64px",
            minHeight: "64px",
            flexShrink: 0,
            backgroundColor: "#171719",
            borderBottom: "1px solid #313336",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 50,
          }}
        >
          <div
            className="flex items-center gap-6 preview-left-group"
            style={{ display: "flex", alignItems: "center", gap: "24px" }}
          >
            <Link
              className="text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white transition-colors flex items-center gap-2 preview-back-btn"
              href="/"
              style={{
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "rgba(255, 255, 255, 0.7)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>←</span> Voltar à Vitrine
            </Link>

            <div
              className="h-4 w-px bg-white/10 preview-divider"
              style={{
                height: "16px",
                width: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />

            <div
              className="flex flex-col preview-meta-group"
              style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}
            >
              <span
                className="text-[10px] font-mono uppercase tracking-widest text-white/40 preview-category-tag"
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255, 255, 255, 0.4)",
                }}
              >
                {template.category}
              </span>
              <span
                className="text-sm font-semibold text-white tracking-tight preview-title-text"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                }}
              >
                {template.title}
              </span>
            </div>
          </div>

          <div
            className="flex items-center gap-4 preview-right-group"
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <Link
              className="px-5 py-2 text-xs font-mono uppercase tracking-wider font-bold bg-white text-black hover:bg-neutral-200 transition-colors shadow-sm preview-cta-btn"
              href={`/contact?service=template&ref=${template.slug}`}
              style={{
                padding: "8px 20px",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                fontWeight: 700,
                backgroundColor: "#ffffff",
                color: "#000000",
                textDecoration: "none",
                borderRadius: "2px",
              }}
            >
              Contratar este Template
            </Link>
          </div>
        </header>

        {/* Viewport Iframe Sandbox */}
        <main
          className="relative flex-1 w-full h-[calc(100vh-64px)] bg-black overflow-hidden preview-viewport-main"
          style={{
            position: "relative",
            flex: "1 1 0%",
            width: "100%",
            height: "calc(100vh - 64px)",
            backgroundColor: "#000000",
            overflow: "hidden",
          }}
        >
          <iframe
            src={template.hostedUrl}
            title={`Preview de ${template.title}`}
            className="w-full h-full border-none block preview-iframe-element"
            loading="eager"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              display: "block",
            }}
          />
        </main>
      </div>
    </>
  );
}