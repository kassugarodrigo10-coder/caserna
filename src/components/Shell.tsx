'use client';

import { useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAppState } from '@/context/AppStateContext';

const ACCENT_VARS: Record<string, string> = {
  base: '--c-base',
  graduados: '--c-grad',
  elite: '--c-elite',
};

export default function Shell({ children }: { children: React.ReactNode }) {
  const { categoria, sidebarOpen, setSidebarOpen } = useAppState();

  useEffect(() => {
    const root = document.documentElement;
    const varName = ACCENT_VARS[categoria];
    root.style.setProperty('--accent', `var(${varName})`);
    root.style.setProperty('--accent-soft', `var(${varName}-soft)`);
    root.style.setProperty('--accent-glow', `var(${varName}-glow)`);
  }, [categoria]);

  return (
    <div className="app-shell">
      <Sidebar />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <div className="topbar">
          <button className="hamburger" type="button" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <img src={`/logos/logo-${categoria}.png`} alt="Caserna Kart Racing" />
          <span style={{ width: 40 }} />
        </div>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
