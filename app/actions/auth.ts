"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function signInWithEmail(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = (formData.get("redirectTo") as string) || "/portal/dashboard";

  if (!email || !password) {
    return { error: "Preencha o e-mail e a senha." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "Credenciais inválidas. Verifique seu e-mail e senha." };
  }

  if (data.user) {
    // Sincroniza usuário na tabela relacional Prisma (Postgres)
    const role = (data.user.app_metadata?.role as any) || "CLIENT";
    
    await prisma.user.upsert({
      where: { id: data.user.id },
      update: { email: data.user.email! },
      create: {
        id: data.user.id,
        email: data.user.email!,
        fullName: data.user.user_metadata?.full_name || null,
        role: role,
      },
    });

    if (role === "ADMIN") {
      redirect("/admin/dashboard");
    }
  }

  redirect(redirectTo);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}