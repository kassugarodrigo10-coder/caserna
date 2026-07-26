-- Execute no SQL editor do projeto Supabase (uma vez, ao configurar).
--
-- Lista de e-mails autorizados a se cadastrar como Diretoria. Sem policies de
-- select/insert públicas: só a service role (usada pela rota /api/diretoria/signup)
-- consegue ler esta tabela. Para adicionar um diretor, insira o e-mail aqui
-- (Table Editor do Supabase ou um INSERT como o de exemplo abaixo).

create table if not exists diretoria_emails_autorizados (
  email text primary key,
  criado_em timestamptz not null default now()
);

alter table diretoria_emails_autorizados enable row level security;

-- Exemplo de como o Sr. Kassuga adiciona um novo diretor (rodar no SQL editor):
-- insert into diretoria_emails_autorizados (email) values ('diretor@exemplo.com');
