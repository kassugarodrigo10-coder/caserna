'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppState } from '@/context/AppStateContext';
import { useAuth } from '@/context/AuthContext';
import AccountButton from './AccountButton';
import type { Categoria } from '@/types';

const CATEGORIAS: Array<{ value: Categoria; label: string }> = [
  { value: 'base', label: 'Base' },
  { value: 'graduados', label: 'Graduados' },
  { value: 'elite', label: 'Elite' },
];

const MENU = [
  { href: '/', label: 'Painel', icon: '▤' },
  { href: '/classificacao', label: 'Classificação', icon: '🏆' },
  { href: '/estatisticas', label: 'Estatísticas', icon: '📊' },
];

export default function Sidebar() {
  const { categoria, setCategoria, sidebarOpen, setSidebarOpen } = useAppState();
  const { isDiretor } = useAuth();
  const pathname = usePathname();

  return (
    <>
      <aside className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <AccountButton />
        <div className="brand">
          {CATEGORIAS.map((c) => (
            <img
              key={c.value}
              src={`/logos/logo-${c.value}.png`}
              alt={`Caserna Kart Racing — ${c.label}`}
              className={categoria === c.value ? 'active' : ''}
            />
          ))}
        </div>

        <div className="cat-group">
          <div className="cat-label">Categoria</div>
          <div className="cat-pills">
            {CATEGORIAS.map((c) => (
              <button
                key={c.value}
                type="button"
                data-cat={c.value}
                className={`cat-pill${categoria === c.value ? ' active' : ''}`}
                onClick={() => setCategoria(c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-label" style={{ margin: '0 16px 4px' }}>
          Principal
        </div>
        <nav className="menu">
          {MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`menu-item${pathname === item.href ? ' active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="ic">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="special-block">
          <div className="menu-label">Disputa especial</div>
          <Link
            href="/camisa-branca"
            className={`menu-item${pathname === '/camisa-branca' ? ' active' : ''}`}
            onClick={() => setSidebarOpen(false)}
            style={{ justifyContent: 'space-between' }}
          >
            <span>
              <span className="ic">🎽</span>
              Camisa Branca
            </span>
            <span className="tag">ELITE</span>
          </Link>
        </div>

        {isDiretor && (
          <div className="special-block">
            <div className="menu-label">Acesso restrito</div>
            <Link href="/diretoria" className="diretoria-item" onClick={() => setSidebarOpen(false)}>
              <span className="ic">⚖️</span>
              Diretoria
              <span className="tag">EQUALIZAÇÃO</span>
            </Link>
          </div>
        )}

        <div className="sidebar-footer">Caserna Kart Racing · Temporada 2026</div>
      </aside>

      <div className={`overlay${sidebarOpen ? ' show' : ''}`} onClick={() => setSidebarOpen(false)} />
    </>
  );
}
