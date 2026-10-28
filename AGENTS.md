<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

### Protocolo Obrigatório de Atualização de Contexto
Ao finalizar com sucesso qualquer refatoração, correção de bug ou nova funcionalidade:
1. Valide que `npm run lint` e `npx tsc --noEmit` retornaram 0 erros.
2. Atualize a seção correspondente em `docs/CURRENT_SPRINT.md` registrando:
   - Arquivos modificados ou criados.
   - Novas Server Actions ou endpoints implementados.
   - Status da branch e pendências imediatas.
<!-- END:nextjs-agent-rules -->
