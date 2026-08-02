import { Metadata } from "next";
import NotFound from "@/components/other-pages/404/NotFound";
import Footer2 from "@/components/footers/Footer2";
export const metadata: Metadata = {
  title: "404 | Azurio - Digital Agency & Portfolio NextJs Template",
  description: "Azurio - Digital Agency & Portfolio NextJs Template",
};
export default function NotFoundPage() {
  return (
    <>
      <NotFound />
      <Footer2 />
    </>
  );
}
