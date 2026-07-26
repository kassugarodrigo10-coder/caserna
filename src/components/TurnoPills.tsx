'use client';

import { useAppState } from '@/context/AppStateContext';
import { TURNO_LABEL } from '@/lib/format';

const OPTIONS: Array<'1' | '2' | '3' | 'geral'> = ['1', '2', '3', 'geral'];

export default function TurnoPills({ updatedInfo }: { updatedInfo?: string }) {
  const { turno, setTurno } = useAppState();

  return (
    <div className="pillbar">
      <div className="pill-row">
        {OPTIONS.map((t) => (
          <button
            key={t}
            className={`pill${turno === t ? ' active' : ''}`}
            onClick={() => setTurno(t)}
            type="button"
          >
            {TURNO_LABEL[t]}
          </button>
        ))}
      </div>
      {updatedInfo && <div className="updated-info">{updatedInfo}</div>}
    </div>
  );
}
