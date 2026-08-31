import { Metadata } from "next";
import MoreOnTopic from "@/components/blogs/blog-article/MoreOnTopic";

export const metadata: Metadata = {
  title: "Conteúdo em breve | MindSite",
  description: "Artigo em desenvolvimento.",
};

export default function Page() {
  return (
    <div className="mxd-page-content inner-page-content">
      <section className="mxd-section padding-bottom-default pt-32 lg:pt-40 relative z-10 bg-color-base text-center" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <h1 className="text-4xl font-bold mb-4">Conteúdo em breve</h1>
        <p className="text-xl">Este artigo está sendo escrito pela nossa equipe de engenharia e estará disponível em breve.</p>
      </section>
      <MoreOnTopic />
    </div>
  );
}
