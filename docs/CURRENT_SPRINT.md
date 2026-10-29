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
- [x] Ajustes Estruturais e Regras de Negócio em `/portal/dashboard`, `/admin/dashboard` e `/admin/clients/[id]/edit`:
  - **Arquivos criados:** `app/portal/dashboard/FirstLoginPasswordModal.tsx`.
  - **Arquivos modificados:** `app/actions/portal.ts`, `app/portal/dashboard/PortalDashboardView.tsx`, `app/actions/admin.ts`, `app/admin/dashboard/AdminDashboardView.tsx`, `app/actions/adminClients.ts`, `app/admin/clients/[id]/edit/page.tsx`, `docs/CURRENT_SPRINT.md`.
  - **Novas Server Actions implementadas:**
    - `clientSelfIssueInvoiceAction` (`app/actions/portal.ts`): Auto-emissão de faturas pelo cliente consolidando parcelas `SCHEDULED` e mensalidade de sustentação do mês vigente na InfinitePay.
    - `createTicketForClientAction` (`app/actions/admin.ts`): Atualizada para receber `FormData` com upload postergado de múltiplos anexos em `tickets/{ticketId}/admin_{filename}`.
    - `updateProjectAction` (`app/actions/adminClients.ts`): Atualização de Nome, Domínio Oficial e Descrição de projetos do cliente.
    - `updateContractStatusAction` (`app/actions/adminClients.ts`): Pausa (`SUSPENDED`), reativação (`ACTIVE`) e encerramento (`CANCELLED` / `COMPLETED` com `endDate = new Date()`) de contratos de sustentação.
- [x] Blindagem de Connection Pool (Supavisor) e Eliminação de Queries Redundantes:
  - **Arquivos modificados/criados:** `lib/prisma.ts`, `src/lib/prisma.ts`, `app/actions/portal.ts`, `app/actions/admin.ts`, `app/actions/finance.ts`, `.env`, `.env.local`, `docs/CURRENT_SPRINT.md`.
  - **Melhorias implementadas:** Singleton estrito do Prisma Client com logs diferenciados por ambiente, redução para 4 queries cirúrgicas em `Promise.all` (1 por tabela, sem consultas duplicadas) com `.catch()` granular e ajuste de `DATABASE_URL` para `?pgbouncer=true&connection_limit=10&pool_timeout=20`.
- [x] Padronização de Fuso Horário Oficial de Brasília (`America/Sao_Paulo`) e Regra Estrita de Atraso (D+1):
  - **Arquivos modificados:** `lib/utils.ts` (espelhado em `src/lib/utils.ts`), `app/actions/portal.ts`, `app/portal/dashboard/PortalDashboardView.tsx`, `app/actions/admin.ts`, `app/admin/dashboard/AdminDashboardView.tsx`, `docs/CURRENT_SPRINT.md`.
  - **Funções canônicas implementadas:** `getBrasiliaTodayMidnight`, `toBrasiliaDateMidnight`, `isDateStrictlyOverdue` e `isDateDueToday`, garantindo que faturas e parcelas que vencem na data corrente exibam status `VENCE HOJE` / `PENDING` (com badge amarelo/âmbar `#f59e0b` tanto no card de destaque `data.activeInvoice` quanto na tabela `data.upcomingInstallments`) e só passem para `OVERDUE` / `VENCIDA (NÃO FATURADA)` a partir de 00:00:00 do dia seguinte (D+1).
- [x] Resolução Definitiva de Pool de Conexões (`P2024`), Remoção de Criação Duplicada de Usuário (`P2002`) e Blindagem Transacional InfinitePay:
  - **Arquivos modificados:** `lib/prisma.ts`, `src/lib/prisma.ts`, `app/actions/portal.ts`, `docs/CURRENT_SPRINT.md`.
  - **Correções implementadas:**
    - Remoção definitiva do bloco `prisma.user.create()` e auto-criação de projeto/fatura dentro de `getClientDashboardData` (`app/actions/portal.ts`), eliminando a colisão de chave primária `P2002: Unique constraint failed on the fields: (id)` quando ocorria instabilidade transitória de leitura.
    - Isolamento individual de `.catch()` com logs padronizados (`[Portal Error]`) nas 4 queries concorrentes de `getClientDashboardData`.
    - Blindagem da action `clientSelfIssueInvoiceAction` (`app/actions/portal.ts`) com `prisma.$transaction(..., { maxWait: 10000, timeout: 20000 })`, conversão explícita de `Decimal` para `Number` e retorno imediato completo (`invoiceId`, `invoiceNumber`, `orderNsu`, `checkoutUrl`, `pixQrCode`, `pixCopyPaste`).
- [x] Documentação Técnica Exaustiva da Área Logada (`docs/LOGGED_AREA_COMPLETE_DOCS.md`) cobrindo autenticação, banco de dados, fuso de Brasília (Regra D+1), InfinitePay, webhooks, crons, templates de e-mail, SLA de chamados, storage privado e UI/UX.
- [x] Linter e Typecheck auditados: `0 errors / 0 warnings`.

## 4. Próximas Implementações Planejadas
- Refinamento do componente visual de Receita Realizada vs Projetada no dashboard administrativo.
- Monitoramento dos logs em tempo real do webhook da InfinitePay em produção.
