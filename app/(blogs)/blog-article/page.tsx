import { Metadata } from "next";
import BlogArticle from "@/components/blogs/blog-article/BlogArticle";
import MoreOnTopic from "@/components/blogs/blog-article/MoreOnTopic";
import CTAWithMarquee from "@/components/blogs/blog-article/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Blog Article | Mindsite - Agencia digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function BlogArticlePage() {
  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <BlogArticle />
        <MoreOnTopic />
        <CTAWithMarquee />
      </div>
    </>
  );
}
