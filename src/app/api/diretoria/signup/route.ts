import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Diretoria ainda não configurada neste deploy.' }, { status: 503 });
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
    return NextResponse.json({ error: 'Erro ao verificar autorização. Tente novamente.' }, { status: 500 });
  }

  if (!autorizado) {
    return NextResponse.json(
      { error: 'Este e-mail não está autorizado. Peça a um diretor para cadastrar seu e-mail antes de tentar de novo.' },
      { status: 403 }
    );
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { error } = await supabase.auth.signUp({ email, password: senha });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
