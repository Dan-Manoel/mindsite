import { redirect } from "next/navigation";
import { getClientProfileData } from "@/app/actions/portal";
import PortalProfileView from "./PortalProfileView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu Perfil & Segurança | MindSite",
  description: "Gerencie seus dados de contato, foto de perfil e senha com auditoria LGPD.",
};

export default async function PortalProfilePage() {
  let profileData;
  try {
    profileData = await getClientProfileData();
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao carregar perfil do cliente:", message);
    redirect("/login");
  }

  return <PortalProfileView initialData={profileData} />;
}
