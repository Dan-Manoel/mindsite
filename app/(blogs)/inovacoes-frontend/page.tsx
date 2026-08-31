import { Metadata } from "next";
import FrontendInnovationsArticle from "@/components/blogs/frontend-innovations/FrontendInnovationsArticle";
import MoreOnTopic from "@/components/blogs/blog-article/MoreOnTopic";
import CTA from "@/components/blogs/frontend-innovations/CTA";

export const metadata: Metadata = {
  title: "Inovações de frontend e jornadas de usuário | MindSite",
  description: "Descubra como a arquitetura de renderização e o ecossistema Next.js estão redefinindo a verdadeira experiência do usuário.",
};

export default function FrontendInnovationsPage() {
  return (
    <div className="mxd-page-content inner-page-content">
      <FrontendInnovationsArticle />
      <MoreOnTopic />
      <CTA />
    </div>
  );
}