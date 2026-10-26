"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { prisma } from "@/lib/prisma";
import { ContractType, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface ProjectInputDTO {
  id?: string;
  name: string;
  domain?: string;
  setupAmount: number;
  installments: Array<{
    id?: string;
    amount: number;
    scheduledDate: string;
    description: string;
  }>;
  sustainabilityPlan: "NONE" | "ESSENTIAL" | "DEVELOPMENT" | "ADVANCED";
  sustainabilityStartDate?: string;
}

export interface ClientDTO {
  fullName: string;
  primaryEmail: string;
  secondaryEmail?: string;
  password?: string;
  phone?: string;
  document?: string;
  companyName?: string;
  address?: string;
  projects: ProjectInputDTO[];
}

export async function createClientWithProjectsAction(data: ClientDTO) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "ADMIN") {
    return { success: false, error: "Acesso não autorizado." };
  }

  // Validação matemática rigorosa do setup vs parcelas
  for (const proj of data.projects) {
    if (proj.setupAmount > 0) {
      const sum = proj.installments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
      if (Math.abs(sum - proj.setupAmount) > 0.01) {
        return {
          success: false,
          error: `No projeto "${proj.name}", a soma das parcelas (R$ ${sum.toFixed(2)}) não bate com o valor total (R$ ${proj.setupAmount.toFixed(2)}).`,
        };
      }
    }
  }

  const adminClient = createAdminClient();

  try {
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email: data.primaryEmail,
      password: data.password || "MindSite@2026",
      email_confirm: true,
      app_metadata: { role: "CLIENT" },
      user_metadata: {
        full_name: data.fullName,
        company_name: data.companyName,
      },
    });

    if (authError || !authData.user) {
      return { success: false, error: authError?.message || "Erro no Supabase Auth." };
    }

    const userId = authData.user.id;

    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          id: userId,
          email: data.primaryEmail,
          secondaryEmail: data.secondaryEmail || null,
          fullName: data.fullName,
          companyName: data.companyName || null,
          phone: data.phone || null,
          document: data.document || null,
          address: data.address || null,
          role: UserRole.CLIENT,
        },
      });

      for (const proj of data.projects) {
        const slug = `${proj.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Math.random().toString(36).substring(7)}`;

        const createdProject = await tx.project.create({
          data: {
            name: proj.name,
            slug: slug,
            domain: proj.domain || null,
            userId: userId,
          },
        });

        if (proj.setupAmount > 0) {
          const setupContract = await tx.contract.create({
            data: {
              title: `Setup & Implantação — ${proj.name}`,
              contractType: ContractType.PROJECT_DEV,
              totalAmount: proj.setupAmount,
              userId: userId,
              projectId: createdProject.id,
            },
          });

          for (let i = 0; i < proj.installments.length; i++) {
            const inst = proj.installments[i];
            await tx.contractInstallment.create({
              data: {
                installmentNumber: i + 1,
                amount: inst.amount,
                scheduledDate: new Date(inst.scheduledDate),
                description: inst.description || `Parcela ${i + 1}`,
                contractId: setupContract.id,
              },
            });
          }
        }

        if (proj.sustainabilityPlan !== "NONE") {
          let planPrice = 100;
          let planTitle = "Plano Essential";

          if (proj.sustainabilityPlan === "DEVELOPMENT") {
            planPrice = 300;
            planTitle = "Plano Development";
          } else if (proj.sustainabilityPlan === "ADVANCED") {
            planPrice = 700;
            planTitle = "Plano Advanced";
          }

          await tx.contract.create({
            data: {
              title: `Sustentação Mensal — ${planTitle} (${proj.name})`,
              contractType: ContractType.SUSTAINABILITY,
              totalAmount: planPrice,
              startDate: proj.sustainabilityStartDate ? new Date(proj.sustainabilityStartDate) : new Date(),
              userId: userId,
              projectId: createdProject.id,
            },
          });
        }
      }
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/clients");
    return { success: true, userId };
  } catch (err: any) {
    await adminClient.auth.admin.deleteUser(data.primaryEmail).catch(() => {});
    return { success: false, error: err.message };
  }
}

export async function getClientsListAction(query?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "ADMIN") {
    throw new Error("Acesso não autorizado.");
  }

  return await prisma.user.findMany({
    where: {
      role: UserRole.CLIENT,
      ...(query
        ? {
            OR: [
              { fullName: { contains: query, mode: "insensitive" } },
              { companyName: { contains: query, mode: "insensitive" } },
              { email: { contains: query, mode: "insensitive" } },
              { document: { contains: query, mode: "insensitive" } },
              { projects: { some: { name: { contains: query, mode: "insensitive" } } } },
            ],
          }
        : {}),
    },
    include: {
      projects: {
        include: {
          contracts: {
            include: {
              installments: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getClientByIdAction(clientId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "ADMIN") {
    throw new Error("Acesso não autorizado.");
  }

  const client = await prisma.user.findUnique({
    where: { id: clientId },
    include: {
      projects: {
        include: {
          contracts: {
            include: {
              installments: {
                orderBy: { scheduledDate: "asc" },
              },
            },
          },
        },
      },
    },
  });

  if (!client) return null;

  return {
    ...client,
    projects: client.projects.map((proj) => ({
      ...proj,
      contracts: proj.contracts.map((cont) => ({
        ...cont,
        totalAmount: Number(cont.totalAmount),
        paidAmount: Number(cont.paidAmount),
        startDate: cont.startDate.toISOString(),
        endDate: cont.endDate ? cont.endDate.toISOString() : null,
        createdAt: cont.createdAt.toISOString(),
        updatedAt: cont.updatedAt.toISOString(),
        installments: cont.installments.map((inst) => ({
          ...inst,
          amount: Number(inst.amount),
          scheduledDate: inst.scheduledDate.toISOString(),
          createdAt: inst.createdAt.toISOString(),
          updatedAt: inst.updatedAt.toISOString(),
        })),
      })),
    })),
  };
}

export async function updateClientAction(clientId: string, data: Partial<ClientDTO>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "ADMIN") {
    return { success: false, error: "Acesso não autorizado." };
  }

  try {
    await prisma.user.update({
      where: { id: clientId },
      data: {
        fullName: data.fullName,
        companyName: data.companyName,
        secondaryEmail: data.secondaryEmail,
        phone: data.phone,
        document: data.document,
        address: data.address,
      },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/clients");
    revalidatePath(`/admin/clients/${clientId}/edit`);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function resetClientPasswordAction(userId: string, newPassword: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "ADMIN") {
    return { success: false, error: "Acesso não autorizado." };
  }

  if (!newPassword || newPassword.length < 6) {
    return { success: false, error: "A senha deve ter no mínimo 6 caracteres." };
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.updateUserById(userId, {
    password: newPassword,
  });

  if (error) return { success: false, error: error.message };
  return { success: true, message: "Senha redefinida com sucesso!" };
}

export async function settleInstallmentManuallyAction(installmentId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Não autenticado." };
  }

  const role = user.app_metadata?.role || user.user_metadata?.role;
  const isDanilo = user.email === "danilo@mindsite.com.br";

  if (!isDanilo && role !== "ADMIN") {
    const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (!dbUser || dbUser.role !== "ADMIN") {
      return { success: false, error: "Acesso não autorizado." };
    }
  }

  try {
    const installment = await prisma.contractInstallment.findUnique({
      where: { id: installmentId },
      include: { contract: true },
    });

    if (!installment) {
      return { success: false, error: "Parcela não encontrada." };
    }

    await prisma.$transaction([
      // 1. Marca a parcela como PAGA
      prisma.contractInstallment.update({
        where: { id: installmentId },
        data: { status: "PAID" },
      }),
      // 2. Incrementa o montante pago no contrato correspondente
      prisma.contract.update({
        where: { id: installment.contractId },
        data: { paidAmount: { increment: installment.amount } },
      }),
    ]);

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/clients");
    return { success: true, message: "Parcela baixada com sucesso!" };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function addProjectToClientAction(
  clientId: string,
  data: { name: string; domain?: string; description?: string }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "ADMIN") {
    return { success: false, error: "Acesso não autorizado." };
  }

  if (!data.name?.trim()) {
    return { success: false, error: "Nome do projeto é obrigatório." };
  }

  try {
    const slug = `${data.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")}-${Date.now().toString().slice(-4)}`;

    const project = await prisma.project.create({
      data: {
        name: data.name.trim(),
        domain: data.domain?.trim() || null,
        description: data.description?.trim() || null,
        slug,
        userId: clientId,
        contracts: {
          create: {
            title: `Implantação ${data.name.trim()}`,
            contractType: "PROJECT_DEV",
            totalAmount: 0.0,
            paidAmount: 0.0,
            userId: clientId,
          },
        },
      },
      include: { contracts: true },
    });

    revalidatePath("/admin/clients");
    revalidatePath(`/admin/clients/${clientId}/edit`);
    revalidatePath("/admin/dashboard");
    return { success: true, project };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function addInstallmentToContractAction(
  contractId: string,
  data: { amount: number; scheduledDate: string; description?: string }
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "ADMIN") {
    return { success: false, error: "Acesso não autorizado." };
  }

  if (!data.amount || data.amount <= 0 || !data.scheduledDate) {
    return { success: false, error: "Valor e data da parcela são obrigatórios." };
  }

  try {
    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: { installments: true },
    });

    if (!contract) {
      return { success: false, error: "Contrato não encontrado." };
    }

    const nextNumber =
      (contract.installments.length > 0
        ? Math.max(...contract.installments.map((i) => i.installmentNumber))
        : 0) + 1;

    await prisma.$transaction([
      prisma.contractInstallment.create({
        data: {
          installmentNumber: nextNumber,
          amount: data.amount,
          scheduledDate: new Date(data.scheduledDate),
          description: data.description?.trim() || `Parcela ${nextNumber}`,
          status: "SCHEDULED",
          contractId,
        },
      }),
      prisma.contract.update({
        where: { id: contractId },
        data: {
          totalAmount: { increment: data.amount },
        },
      }),
    ]);

    revalidatePath("/admin/clients");
    revalidatePath(`/admin/clients/${contract.userId}/edit`);
    revalidatePath("/admin/dashboard");
    return { success: true, message: "Parcela adicionada com sucesso!" };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}