"use server";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin, createAdminClient } from "@/lib/supabase/admin";
import { prisma } from "@/lib/prisma";
import { ContractType, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { renderWelcomeEmailHtml } from "@/lib/mail/welcomeTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ProjectInputDTO {
  id?: string;
  name: string;
  domain?: string;
  description?: string;
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
  autentiqueDocId?: string;
  projects: ProjectInputDTO[];
}

// 1. Criar Cliente com Rollback Seguro, Telemetria Ativa e Remetente Oficial Resend
export async function createClientWithProjectsAction(data: ClientDTO) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "ADMIN") {
    return { success: false, error: "Acesso não autorizado." };
  }

  // Validação matemática do setup
  for (const proj of data.projects) {
    if (proj.setupAmount > 0) {
      const sum = proj.installments.reduce((acc: number, curr: { amount: number | string }) => acc + (Number(curr.amount) || 0), 0);
      if (Math.abs(sum - proj.setupAmount) > 0.01) {
        return {
          success: false,
          error: `No projeto "${proj.name}", a soma das parcelas (R$ ${sum.toFixed(2)}) não confere com o valor total (R$ ${proj.setupAmount.toFixed(2)}).`,
        };
      }
    }
  }

  let createdAuthUserId: string | null = null;
  const rawPassword = data.password || "MindSite@2026";

  try {
    // 1. Provisão no Supabase Auth via Admin Client
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.primaryEmail,
      password: rawPassword,
      email_confirm: true,
      app_metadata: { role: "CLIENT" },
      user_metadata: {
        full_name: data.fullName,
        company_name: data.companyName,
        first_login: true,
      },
    });

    if (authError || !authData.user) {
      return { success: false, error: authError?.message || "Erro no Supabase Auth." };
    }

    createdAuthUserId = authData.user.id;
    const userId = createdAuthUserId;

    // 2. Persistência atômica no banco relacional via Prisma
    await prisma.$transaction(
      async (tx) => {
        // ATENÇÃO: User NÃO possui autentiqueDocId no create.
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
              description: proj.description || null,
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
                autentiqueDocId: data.autentiqueDocId?.trim() || null,
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
                autentiqueDocId: data.autentiqueDocId?.trim() || null,
              },
            });
          }
        }
      },
      { timeout: 15000 }
    );

    // 3. Disparo do E-mail de Boas-Vindas via Resend com Telemetria Ativa
    try {
      const primaryProject = data.projects[0];
      const planName = primaryProject?.sustainabilityPlan || "Essential";
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://mindsite.com.br";

      const benefits = [
        "Acesso à Área do Cliente para abertura e triagem de chamados",
        "Visualização de faturas e pagamentos com liquidação imediata",
        "Acompanhamento de SLAs contratuais em tempo real",
      ];

      const htmlContent = renderWelcomeEmailHtml({
        clientName: data.fullName,
        loginUrl: `${appUrl}/login`,
        userEmail: data.primaryEmail,
        temporaryPassword: rawPassword,
        projectName: primaryProject?.name || "Ambiente Digital",
        planName: planName,
        planBenefits: benefits,
      });

      console.log(`[Resend Dispatch] Enviando boas-vindas para: ${data.primaryEmail}...`);

      const emailResult = await resend.emails.send({
        from: "MindSite <contato@mindsite.com.br>",
        to: data.primaryEmail,
        subject: "Bem-vindo à MindSite — Acesso ao Portal & Projeto",
        html: htmlContent,
      });

      if (emailResult.error) {
        console.error("❌ [Resend Error]:", JSON.stringify(emailResult.error, null, 2));
      } else {
        console.log("✅ [Resend Success] E-mail despachado! ID:", emailResult.data?.id);
      }
    } catch (mailError: unknown) {
      const message = mailError instanceof Error ? mailError.message : "Erro desconhecido";
      console.error("❌ [Resend Exception]:", message);
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/clients");
    return { success: true, userId };
  } catch (err: unknown) {
    if (createdAuthUserId) {
      await supabaseAdmin.auth.admin.deleteUser(createdAuthUserId).catch(() => {});
    }
    const message = err instanceof Error ? err.message : "Erro ao cadastrar cliente";
    return { success: false, error: message };
  }
}

// 2. Buscar Lista com Serialização Limpa (Sem classes Decimal)
export async function getClientsListAction(query?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "ADMIN") {
    throw new Error("Acesso não autorizado.");
  }

  const rawClients = await prisma.user.findMany({
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
              installments: { orderBy: { scheduledDate: "asc" } },
            },
          },
        },
      },
      invoices: {
        where: { status: { in: ["PENDING", "OVERDUE"] } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Mapeia todas as instâncias de Decimal explicitamente para Number
  return rawClients.map((c) => ({
    id: c.id,
    fullName: c.fullName,
    companyName: c.companyName,
    email: c.email,
    secondaryEmail: c.secondaryEmail,
    phone: c.phone,
    document: c.document,
    address: c.address,
    projects: c.projects.map((p) => ({
      id: p.id,
      name: p.name,
      domain: p.domain,
      description: p.description,
      contracts: p.contracts.map((con) => ({
        id: con.id,
        title: con.title,
        contractType: con.contractType,
        status: con.status,
        totalAmount: Number(con.totalAmount),
        paidAmount: Number(con.paidAmount),
        autentiqueDocId: con.autentiqueDocId,
        installments: con.installments.map((ins) => ({
          id: ins.id,
          installmentNumber: ins.installmentNumber,
          amount: Number(ins.amount),
          scheduledDate: ins.scheduledDate.toISOString(),
          status: ins.status,
          description: ins.description,
        })),
      })),
    })),
    pendingInvoicesCount: c.invoices.length,
  }));
}

// 3. Buscar Cliente Único Serializado (Sem classes Decimal)
export async function getClientByIdAction(clientId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "ADMIN") {
    throw new Error("Acesso não autorizado.");
  }

  const c = await prisma.user.findUnique({
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

  if (!c) return null;

  return {
    id: c.id,
    fullName: c.fullName,
    companyName: c.companyName,
    email: c.email,
    secondaryEmail: c.secondaryEmail,
    phone: c.phone,
    document: c.document,
    address: c.address,
    autentiqueDocId: c.projects[0]?.contracts.find((con) => con.autentiqueDocId)?.autentiqueDocId || "",
    projects: c.projects.map((p) => ({
      id: p.id,
      name: p.name,
      domain: p.domain,
      description: p.description,
      contracts: p.contracts.map((con) => ({
        id: con.id,
        title: con.title,
        contractType: con.contractType,
        status: con.status,
        totalAmount: Number(con.totalAmount),
        paidAmount: Number(con.paidAmount),
        autentiqueDocId: con.autentiqueDocId,
        installments: con.installments.map((ins) => ({
          id: ins.id,
          installmentNumber: ins.installmentNumber,
          amount: Number(ins.amount),
          scheduledDate: ins.scheduledDate.toISOString(),
          status: ins.status,
          description: ins.description,
        })),
      })),
    })),
  };
}

// 4. Atualizar Dados Cadastrais com Mapeamento Fidedigno
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
        secondaryEmail: data.secondaryEmail || null,
        phone: data.phone || null,
        document: data.document || null,
        address: data.address || null,
      },
    });

    if (data.autentiqueDocId?.trim()) {
      await prisma.contract.updateMany({
        where: { userId: clientId },
        data: { autentiqueDocId: data.autentiqueDocId.trim() },
      });
    }

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/clients");
    revalidatePath(`/admin/clients/${clientId}/edit`);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return { success: false, error: message };
  }
}

// 5. Adicionar Novo Projeto a Cliente Existente
export async function addProjectToClientAction(clientId: string, proj: ProjectInputDTO) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.app_metadata?.role !== "ADMIN") {
    return { success: false, error: "Acesso não autorizado." };
  }

  try {
    await prisma.$transaction(
      async (tx) => {
        const slug = `${proj.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Math.random().toString(36).substring(7)}`;

        const createdProject = await tx.project.create({
          data: {
            name: proj.name,
            slug: slug,
            domain: proj.domain || null,
            description: proj.description || null,
            userId: clientId,
          },
        });

        if (proj.setupAmount > 0) {
          const setupContract = await tx.contract.create({
            data: {
              title: `Setup & Implantação — ${proj.name}`,
              contractType: ContractType.PROJECT_DEV,
              totalAmount: proj.setupAmount,
              userId: clientId,
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
              userId: clientId,
              projectId: createdProject.id,
            },
          });
        }
      },
      { timeout: 15000 }
    );

    revalidatePath(`/admin/clients/${clientId}/edit`);
    revalidatePath("/admin/clients");
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return { success: false, error: message };
  }
}

// 6. Baixa Manual de Parcela
export async function settleInstallmentManuallyAction(installmentId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Não autenticado." };
  }

  const role = user.app_metadata?.role || user.user_metadata?.role;
  const isDanilo = user.email === "contato@mindsite.com.br";

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

    await prisma.$transaction(async (tx) => {
      // 1. Atualizar a parcela
      await tx.contractInstallment.update({
        where: { id: installmentId },
        data: { status: "PAID" },
      });

      // 2. Incrementar o saldo pago no contrato
      await tx.contract.update({
        where: { id: installment.contractId },
        data: { paidAmount: { increment: installment.amount } },
      });

      // 3. Localizar a Invoice correspondente via invoiceItemId
      if (installment.invoiceItemId) {
        const invItem = await tx.invoiceItem.findUnique({
          where: { id: installment.invoiceItemId },
        });

        if (invItem?.invoiceId) {
          await tx.invoice.update({
            where: { id: invItem.invoiceId },
            data: {
              status: "PAID",
              paidAt: new Date(),
            },
          });
        }
      }
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/clients");
    revalidatePath("/portal/dashboard");
    return { success: true, message: "Parcela baixada com sucesso!" };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return { success: false, error: message };
  }
}

// Alias para padronização de nomenclatura
export const markInstallmentPaidAction = settleInstallmentManuallyAction;

// 7. Adicionar Parcela Avulsa a Contrato Existente
export async function addInstallmentToContractAction(
  contractId: string,
  data: { amount: number; scheduledDate: string; description?: string }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return { success: false, error: message };
  }
}

// 8. Redefinir Senha do Cliente pelo Dono
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