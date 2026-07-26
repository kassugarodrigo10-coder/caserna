'use client';

import { useAppState } from '@/context/AppStateContext';

export default function CorridaPills({ corridas }: { corridas: number[] }) {
  const { turno, corrida, setCorrida } = useAppState();

  if (turno === 'geral') return null;

  return (
    <div className="pill-row" style={{ marginBottom: 18 }}>
      <button
        className={`pill${corrida === 'all' ? ' active' : ''}`}
        onClick={() => setCorrida('all')}
        type="button"
      >
        Todas as corridas
      </button>
      {corridas.map((n) => (
        <button
          key={n}
          className={`pill${corrida === n ? ' active' : ''}`}
          onClick={() => setCorrida(n)}
          type="button"
        >
          Corrida {n}
        </button>
      ))}
    </div>
  );
}
