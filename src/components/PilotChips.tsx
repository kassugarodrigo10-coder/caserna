'use client';

import { titleCase } from '@/lib/format';

export default function PilotChips({
  pilotos,
  selecionados,
  onToggle,
}: {
  pilotos: string[];
  selecionados: string[];
  onToggle: (nome: string) => void;
}) {
  return (
    <div className="chip-row">
      {pilotos.map((nome) => (
        <button
          key={nome}
          type="button"
          className={`pilot-chip${selecionados.includes(nome) ? ' on' : ''}`}
          onClick={() => onToggle(nome)}
        >
          {titleCase(nome)}
        </button>
      ))}
    </div>
  );
}
