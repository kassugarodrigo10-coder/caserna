# Caserna Kart Racing

Site do campeonato Caserna Kart Racing: Painel, Classificação, Estatísticas, Disputa pela
Camisa Branca e um painel restrito para a Diretoria.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Como funciona a atualização de dados

Não existe tela de upload no site — essa foi uma decisão consciente (ver briefing do
projeto). O fluxo é:

1. Ao final de cada etapa, os arquivos brutos do kartódromo (Resultados PROVA, Resultados
   TOMADA, Tempos de volta PROVA) são enviados para o Claude.
2. Os dados são organizados em um novo arquivo dentro de `src/data/etapas/` (um arquivo por
   etapa/categoria, seguindo o formato de `src/data/etapas/elite-t2-c2.ts`) e registrados em
   `src/data/etapas.ts`.
3. Toda a lógica de pontuação (`src/lib/scoring.ts`) e as telas recalculam tudo sozinhas a
   partir desses dados — nenhuma tela precisa ser alterada quando uma etapa nova entra.
4. Um novo deploy substitui a versão publicada **no mesmo link**, sem downtime perceptível
   (a Vercel mantém a URL de produção fixa a cada novo push na branch principal).

Pontos perdidos por advertência disciplinar (`src/data/etapas.ts`, array `penalidades`) e
faltas não justificáveis (`faltas`) também são alimentados manualmente ali, sem motivo
exposto nas telas públicas — só o número de pontos descontados.

## Diretoria (login restrito)

A aba Diretoria fica **totalmente oculta e inacessível** até ser configurada: ela não aparece
no menu para ninguém, e a rota `/diretoria` mostra só um aviso enquanto o Supabase não
estiver configurado.

Fluxo depois de configurado:

- Só quem tem o e-mail cadastrado na lista de autorizados consegue criar uma conta.
- O cadastro é feito pelo próprio diretor (e-mail real + senha), com confirmação por e-mail
  de verdade (via Supabase Auth).
- Depois de confirmar o e-mail e entrar, a aba "Diretoria" passa a aparecer no menu lateral
  só para quem está logado.

### Configurar (uma vez)

1. Crie um projeto gratuito em https://supabase.com.
2. No SQL Editor do projeto, rode o conteúdo de `supabase/schema.sql` (cria a tabela de
   e-mails autorizados).
3. Copie `.env.example` para `.env.local` e preencha com as chaves do projeto (Project
   Settings → API): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `SUPABASE_SERVICE_ROLE_KEY`.
4. Adicione as mesmas 3 variáveis nas configurações do projeto na Vercel (Settings →
   Environment Variables) e faça um novo deploy.
5. Para autorizar um diretor, insira o e-mail dele na tabela `diretoria_emails_autorizados`
   (Table Editor do Supabase, ou `insert into diretoria_emails_autorizados (email) values
   ('email@exemplo.com');` no SQL Editor). Só depois disso a pessoa consegue se cadastrar.

## Estrutura do projeto

- `src/app/` — páginas (Painel, Classificação, Estatísticas, Camisa Branca, Diretoria).
- `src/data/etapas.ts` e `src/data/etapas/*.ts` — dados brutos das etapas (fonte da verdade).
- `src/lib/scoring.ts` — pontuação oficial do campeonato (regulamento 2026).
- `src/lib/equalizacao.ts` — pontuação de equalização usada só na Diretoria.
- `src/components/`, `src/context/` — UI compartilhada e estado (categoria/turno, sessão).

## Deploy

Qualquer provedor compatível com Next.js funciona; o recomendado é a Vercel (import do
repositório do GitHub, zero config). Cada push na branch de produção gera um novo deploy no
mesmo domínio.
