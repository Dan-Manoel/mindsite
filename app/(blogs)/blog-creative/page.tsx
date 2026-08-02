import { Metadata } from "next";
import InnerHeadlineArticle from "@/components/blogs/blog-creative/InnerHeadlineArticle";
import BlogGrid from "@/components/blogs/blog-creative/BlogGrid";
import CTA from "@/components/blogs/blog-creative/CTA";
export const metadata: Metadata = {
  title: "Blog Creative | Mindsite - Agencia digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function BlogCreativePage() {
  return (
    <>
      <>
        <InnerHeadlineArticle />
        <BlogGrid />
        <CTA />
      </>
    </>
  );
}
