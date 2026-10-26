import { redirect } from "next/navigation";
import { getAdminDashboardData } from "@/app/actions/admin";
import AdminDashboardView from "./AdminDashboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel Executivo | MindSite Admin",
  description: "Controle financeiro, MRR, despesas operacionais e triagem de chamados da MindSite.",
};

export default async function AdminDashboardPage() {
  try {
    const data = await getAdminDashboardData();
    return <AdminDashboardView initialData={data} />;
  } catch (error: any) {
    console.error("Acesso negado ao painel executivo:", error.message);
    redirect("/portal/dashboard");
  }
}
