import { Metadata } from "next";
import InnerHeadline from "@/components/blogs/blog-standard/InnerHeadline";
import Blog from "@/components/blogs/blog-standard/Blog";
import CTAWithMarquee from "@/components/blogs/blog-standard/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Blog Standard | Mindsite - Agencia digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function BlogStandardPage() {
  return (
    <>
      <div className="mxd-page-content inner-page-content">
        <InnerHeadline />
        <Blog />
        <CTAWithMarquee />
      </div>
    </>
  );
}
