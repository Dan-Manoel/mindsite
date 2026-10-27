import { redirect } from "next/navigation";
import { getAdminDashboardData } from "@/app/actions/admin";
import AdminDashboardView from "./AdminDashboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel Executivo | MindSite Admin",
  description: "Controle financeiro, MRR, despesas operacionais e triagem de chamados da MindSite.",
};

export default async function AdminDashboardPage() {
  let data;
  try {
    data = await getAdminDashboardData();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Acesso negado ao painel executivo:", message);
    redirect("/portal/dashboard");
  }

  return <AdminDashboardView initialData={data} />;
}
