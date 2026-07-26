import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';

// Importante: a resposta desta rota é sempre a mesma (ok:true) pra e-mails autorizados e não
// autorizados — só quem está na tabela diretoria_emails_autorizados de fato ganha uma conta
// e recebe o e-mail de confirmação do Supabase. Isso evita que a tela de cadastro (agora
// visível pra qualquer visitante) denuncie a existência da lista de autorizados.
export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Cadastro indisponível no momento.' }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  const senha = typeof body?.senha === 'string' ? body.senha : '';

  if (!email || senha.length < 8) {
    return NextResponse.json(
      { error: 'Informe um e-mail válido e uma senha com pelo menos 8 caracteres.' },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  const { data: autorizado, error: erroConsulta } = await admin
    .from('diretoria_emails_autorizados')
    .select('email')
    .eq('email', email)
    .maybeSingle();

  if (erroConsulta) {
    return NextResponse.json({ error: 'Erro ao processar o cadastro. Tente novamente.' }, { status: 500 });
  }

  if (autorizado) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    // Erros específicos do Supabase (ex.: "já cadastrado") são ignorados de propósito — não
    // devem vazar pra resposta, senão dá pra descobrir por tentativa quem está autorizado.
    await supabase.auth.signUp({ email, password: senha });
  }

  return NextResponse.json({ ok: true });
}
