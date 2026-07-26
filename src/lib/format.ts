/** Capitaliza um nome mantendo palavras curtas (≤2 letras) em caixa alta, ex: "DA", "DE". */
export function titleCase(nome: string): string {
  return nome
    .split(' ')
    .map((w) => (w.length <= 2 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
    .join(' ');
}

export function formatTempo(segundos: number): string {
  const min = Math.floor(segundos / 60);
  const sec = (segundos - min * 60).toFixed(3);
  return min > 0 ? `${min}:${sec.padStart(6, '0')}` : sec;
}

export const CATEGORIA_LABEL: Record<string, string> = {
  base: 'Base',
  graduados: 'Graduados',
  elite: 'Elite',
};

export const TURNO_LABEL: Record<string, string> = {
  '1': '1º Turno',
  '2': '2º Turno',
  '3': '3º Turno',
  geral: 'Campeonato Geral',
};

export function updatedInfoText(turno: string, count: number): string {
  if (turno === 'geral') {
    return `${count} de 6 corridas computadas (2º+3º turno) · 1 descarte por piloto`;
  }
  return `${count} de 3 corridas computadas neste turno`;
}
