import { redirect } from "next/navigation";
import { getClientDashboardData } from "@/app/actions/portal";
import PortalDashboardView from "./PortalDashboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Área do Cliente | MindSite",
  description: "Gerencie chamados técnicos com SLA e faturas do seu projeto.",
};

export default async function ClientDashboardPage() {
  try {
    const data = await getClientDashboardData();
    return <PortalDashboardView data={data} />;
  } catch (error: any) {
    console.error("Erro ao carregar área do cliente:", error.message);
    redirect("/login");
  }
}