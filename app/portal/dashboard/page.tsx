import { redirect } from "next/navigation";
import { getClientDashboardData } from "@/app/actions/portal";
import { createClient } from "@/lib/supabase/server";
import PortalDashboardView from "./PortalDashboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Área do Cliente | MindSite",
  description: "Gerencie chamados técnicos com SLA e faturas do seu projeto.",
};

export default async function ClientDashboardPage() {
  let isFirstLogin = false;
  let data;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    isFirstLogin = !!user?.user_metadata?.first_login;

    data = await getClientDashboardData();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao carregar área do cliente:", message);
    redirect("/login");
  }

  return <PortalDashboardView data={data} isFirstLogin={isFirstLogin} />;
}