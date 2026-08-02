import { Metadata } from "next";
import BlogArticle from "@/components/blogs/blog-article/BlogArticle";
import MoreOnTopic from "@/components/blogs/blog-article/MoreOnTopic";
import CTAWithMarquee from "@/components/blogs/blog-article/CTAWithMarquee";
export const metadata: Metadata = {
  title: "Blog Article | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
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
