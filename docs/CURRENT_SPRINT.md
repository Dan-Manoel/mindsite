# ⚡ MindSite SaaS — Snapshot de Arquitetura & Estado Atual

## 1. Stack & Infraestrutura Homologada
- **Framework:** Next.js 16 (App Router / Turbopack), React 19, TypeScript 5.
- **ORM & Banco:** Prisma Client 6.4.1 conectado ao PostgreSQL do Supabase via Connection Pooling (Porta 6543 / Transaction Mode) e Direct URL (Porta 5432).
- **Storage:** Supabase Storage com Buckets Privados e RLS ativa:
  - `ticket-attachments` (Privado / Signed URLs de 3600s para clientes e admin).
  - `expense-receipts` (Privado / Signed URLs de 3600s para administração).
- **Gateways & Mensageria:** 
  - Resend: Remetente oficial padronizado em `"MindSite <no-reply@mindsite.com.br>"` (domínio verificado via Resend Forge).
  - InfinitePay: Webhook em `/api/webhooks/infinitepay` para baixa idempotente de faturas.
  - Vercel Pro: Crons horários (`/api/cron/tickets-autoclose`) e diários (`/api/cron/invoices-lifecycle`) protegidos por `CRON_SECRET`.

## 2. Mapa de Diretórios e Responsabilidades
- `app/admin/dashboard/`: Painel Executivo (Visão Geral, Receita Realizada vs Projetada, Faturas, Despesas e Triagem).
- `app/portal/dashboard/`: Área Logada do Cliente (Timeline de tickets com mensagens e anexos, faturas ativas e histórico).
- `app/actions/`: Server Actions estritas ("use server") isoladas de objetos literais:
  - `contact.ts`: Envio de leads da vitrine institucional com persistência de contingência.
  - `tickets.ts`: Ciclo de chamados, controle de SLA em `WAITING_CLIENT`, anexos postergados e reabertura.
  - `expenses.ts`: Lançamento, edição, baixa com upload de comprovantes e geração de Signed URLs.
  - `admin.ts` / `adminClients.ts`: Gestão de contratos, parcelamento de setup e emissão de faturas InfinitePay.
  - `portal.ts` / `finance.ts`: Agregação concorrente (`Promise.all`) e projeção estrita (`select`) de dados do painel do cliente e analytics financeiros.
- `src/lib/mail/` & `lib/mail/`: Templates transacionais HTML responsivos com ativo único `https://mindsite.com.br/img/logo-email.png` (72x72px) e cabeçalho mobile empilhado (`.header-table` `@media max-width: 480px`):
  - Tema Claro (Clientes): `invoiceTemplate.ts`, `invoiceReminderTemplate.ts`, `newProjectTemplate.ts`, `ticketCreatedTemplate.ts`.
  - Tema Dark (MindSite / Dono): `leadTemplate.ts`, `welcomeTemplate.ts`, `adminInvoiceOverdueTemplate.ts`, `ticketNotificationTemplate.ts`.
- `lib/utils.ts`: Utilitário `parseLocalDate` (neutralizador de UTC drift/desvio de fuso).

## 3. Estado das Funcionalidades
- [x] Correção de UTC Drift em datas de vencimento de parcelas (dia 29 preservado).
- [x] Exibição de identificador oficial `[ #INV-XXXXXX ]` no painel do Administrador.
- [x] Upload postergado (deferred) em chamados e despesas (arquivos sobem apenas no clique de salvar).
- [x] Pausa automática de contagem regressiva de SLA em chamados aguardando aceite.
- [x] Auto-fechamento de chamados em 72h via Vercel Cron.
- [x] Régua automática de cobrança por e-mail (D-5, D0, D+1 e D+3) e alerta crítico no WhatsApp para inadimplência.
- [x] Gestão segura de comprovantes de despesa via Signed URLs temporárias.
- [x] Otimização de Performance da Área Logada (`/portal/dashboard` e `/admin/dashboard`):
  - **Arquivos modificados:** `lib/prisma.ts`, `app/portal/dashboard/page.tsx`, `app/actions/portal.ts`, `app/actions/admin.ts`, `app/actions/finance.ts`.
  - **Arquivos criados:** `app/portal/loading.tsx`, `app/admin/loading.tsx`, `app/portal/dashboard/loading.tsx`, `app/admin/dashboard/loading.tsx`.
  - **Melhorias implementadas:** Eliminação de waterfalls via `Promise.all`, substituição de `include` por `select` estrito com limites (`take: 20` / `take: 10`), padronização do singleton Prisma e Streaming UI com Skeletons no tema MindSite.
- [x] Padronização de Logotipo Oficial (`logo-email.png` 72x72px) e Responsividade Mobile nos Templates de E-mail (`src/lib/mail/` e `lib/mail/`):
  - **Arquivos modificados:** `lib/mail/invoiceTemplate.ts`, `src/lib/mail/invoiceReminderTemplate.ts`, `src/lib/mail/adminInvoiceOverdueTemplate.ts`, `lib/mail/ticketNotificationTemplate.ts`, `lib/mail/newProjectTemplate.ts`, `lib/mail/welcomeTemplate.ts`, `lib/mail/leadTemplate.ts`, `lib/mail/ticketCreatedTemplate.ts`, `docs/CURRENT_SPRINT.md`.
- [x] Linter e Typecheck auditados: `0 errors / 0 warnings`.

## 4. Próximas Implementações Planejadas
- Refinamento do componente visual de Receita Realizada vs Projetada no dashboard administrativo.
- Monitoramento dos logs em tempo real do webhook da InfinitePay em produção.
