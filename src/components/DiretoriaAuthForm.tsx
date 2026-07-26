'use client';

import { useState } from 'react';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

export default function DiretoriaAuthForm() {
  const configured = isSupabaseConfigured();
  const [modo, setModo] = useState<'entrar' | 'cadastrar'>('entrar');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setMensagem(null);
    setCarregando(true);

    try {
      if (modo === 'entrar') {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) setErro('E-mail ou senha inválidos.');
      } else {
        const res = await fetch('/api/diretoria/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErro(data.error ?? 'Não foi possível concluir o cadastro. Tente novamente mais tarde.');
        } else {
          // Mensagem sempre igual, autorizado ou não — não dá pra saber pela resposta se o
          // e-mail está liberado.
          setMensagem('Se o cadastro for aprovado, você vai receber um e-mail de confirmação em instantes.');
        }
      }
    } finally {
      setCarregando(false);
    }
  }

  if (!configured) {
    return (
      <div className="diretoria-auth">
        <div className="section-title" style={{ marginBottom: 4 }}>ACESSO RESTRITO</div>
        <h2 style={{ fontSize: 22, marginBottom: 8 }}>Diretoria</h2>
        <p style={{ color: 'var(--text-dim)', fontSize: 13.5 }}>
          O login da Diretoria ainda não foi configurado neste deploy. Configure as variáveis de ambiente do
          Supabase (veja o README) para habilitar o cadastro dos diretores.
        </p>
      </div>
    );
  }

  return (
    <div className="diretoria-auth panel">
      <div className="section-title" style={{ marginBottom: 4 }}>ACESSO RESTRITO</div>
      <h2 style={{ fontSize: 22, marginBottom: 8 }}>Diretoria</h2>
      <p style={{ color: 'var(--text-dim)', fontSize: 13.5, marginBottom: 20 }}>
        Área exclusiva da diretoria. Diretores autorizados se cadastram com o e-mail real; os pilotos não têm
        acesso a esta aba.
      </p>

      <div className="pill-row" style={{ marginBottom: 18 }}>
        <button type="button" className={`pill${modo === 'entrar' ? ' active' : ''}`} onClick={() => setModo('entrar')}>
          Entrar
        </button>
        <button
          type="button"
          className={`pill${modo === 'cadastrar' ? ' active' : ''}`}
          onClick={() => setModo('cadastrar')}
        >
          Cadastrar
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          required
          placeholder="seu-email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          required
          minLength={8}
          placeholder="Senha (mínimo 8 caracteres)"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={inputStyle}
        />
        {erro && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{erro}</div>}
        {mensagem && <div style={{ color: 'var(--accent)', fontSize: 13 }}>{mensagem}</div>}
        <button type="submit" className="pill active" disabled={carregando} style={{ marginTop: 4 }}>
          {carregando ? 'Aguarde...' : modo === 'entrar' ? 'Entrar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: 'var(--panel-2)',
  border: '1px solid var(--line)',
  borderRadius: 10,
  padding: '12px 14px',
  color: 'var(--text)',
  fontSize: 14.5,
};
