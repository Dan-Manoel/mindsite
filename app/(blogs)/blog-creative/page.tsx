import { Metadata } from "next";
import InnerHeadlineArticle from "@/components/blogs/blog-creative/InnerHeadlineArticle";
import BlogGrid from "@/components/blogs/blog-creative/BlogGrid";
import CTA from "@/components/blogs/blog-creative/CTA";
export const metadata: Metadata = {
  title: "Blog Creative | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
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
