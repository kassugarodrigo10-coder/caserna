'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import DiretoriaAuthForm from './DiretoriaAuthForm';

function PersonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function AccountButton() {
  const { isDiretor, email } = useAuth();
  const [open, setOpen] = useState(false);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        className={`account-btn${isDiretor ? ' on' : ''}`}
        onClick={() => setOpen(true)}
        title={isDiretor ? `Logado como ${email}` : 'Acesso restrito'}
        aria-label="Acesso restrito"
      >
        <PersonIcon />
      </button>

      {open && (
        <div className="modal-overlay" onClick={() => setOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setOpen(false)} aria-label="Fechar">
              ✕
            </button>
            {isDiretor ? (
              <div>
                <div className="section-title" style={{ marginBottom: 4 }}>
                  ACESSO RESTRITO
                </div>
                <h2 style={{ fontSize: 20, marginBottom: 10 }}>Sessão ativa</h2>
                <p style={{ color: 'var(--text-dim)', fontSize: 13.5, marginBottom: 18 }}>Logado como {email}.</p>
                <button type="button" className="pill active" onClick={handleSignOut}>
                  Sair
                </button>
              </div>
            ) : (
              <DiretoriaAuthForm />
            )}
          </div>
        </div>
      )}
    </>
  );
}
