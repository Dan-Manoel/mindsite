import { Metadata } from "next";
import NotFound from "@/components/other-pages/404/NotFound";
import Footer2 from "@/components/footers/Footer2";
export const metadata: Metadata = {
  title: "404 | Mindsite - Agencia digital",
  description: "A infraestrutura que o seu negócio precisa para escalar. Descubra como o Mindsite otimiza seu ecossistema digital do início ao fim.",
};
export default function NotFoundPage() {
  return (
    <>
      <NotFound />
      <Footer2 />
    </>
  );
}
