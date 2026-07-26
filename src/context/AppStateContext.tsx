'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Categoria } from '@/types';

export type TurnoFiltro = '1' | '2' | '3' | 'geral';

interface AppState {
  categoria: Categoria;
  setCategoria: (c: Categoria) => void;
  turno: TurnoFiltro;
  setTurno: (t: TurnoFiltro) => void;
  corrida: 'all' | number;
  setCorrida: (c: 'all' | number) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

const AppStateContext = createContext<AppState | null>(null);

const STORAGE_KEY = 'caserna-categoria';

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [categoria, setCategoriaState] = useState<Categoria>('elite');
  const [turno, setTurno] = useState<TurnoFiltro>('2');
  const [corrida, setCorrida] = useState<'all' | number>('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Lido só depois de montar (localStorage não existe no SSR) — evita mismatch de hidratação.
    const saved = window.localStorage.getItem(STORAGE_KEY) as Categoria | null;
    if (saved === 'base' || saved === 'graduados' || saved === 'elite') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCategoriaState(saved);
    }
  }, []);

  const setCategoria = useCallback((c: Categoria) => {
    setCategoriaState(c);
    window.localStorage.setItem(STORAGE_KEY, c);
  }, []);

  const handleSetTurno = useCallback((t: TurnoFiltro) => {
    setTurno(t);
    setCorrida('all');
  }, []);

  const value = useMemo(
    () => ({
      categoria,
      setCategoria,
      turno,
      setTurno: handleSetTurno,
      corrida,
      setCorrida,
      sidebarOpen,
      setSidebarOpen,
    }),
    [categoria, setCategoria, turno, handleSetTurno, corrida, sidebarOpen]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
