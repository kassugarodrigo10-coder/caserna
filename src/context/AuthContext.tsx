'use client';

import { createContext, useContext } from 'react';

/**
 * Interface estável consumida pelo Sidebar e pela rota /diretoria. A implementação
 * (AuthProvider) troca de um stub para a integração real com Supabase sem precisar
 * mudar quem consome o contexto.
 */
export interface AuthState {
  isDiretor: boolean;
  email: string | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthState>({ isDiretor: false, email: null, loading: false });

export function useAuth() {
  return useContext(AuthContext);
}
