import type { Categoria, Etapa, Turno } from '@/types';

export interface NotaCorrida {
  turno: Turno;
  corrida: number;
  categoria: Categoria;
  tracado?: number;
  nome: string;
  tempoTotal: number;
  vmr: number;
  top10Media: number;
  nota: number;
}

/**
 * Nota de equalização (0-10) de uma corrida isolada: 10 menos 1 ponto por cada 1% de
 * atraso num índice ponderado (tempo total peso 1, VMR peso 1,5, média das 10 melhores
 * voltas peso 2) em relação ao melhor da própria corrida. Nunca mistura corridas diferentes.
 */
export function computeEqualizacaoCorrida(etapa: Etapa): NotaCorrida[] {
  if (!etapa.voltas) return [];

  const metrics = etapa.resultados
    .filter((r) => etapa.voltas![r.nome])
    .map((r) => {
      const tempos = [...etapa.voltas![r.nome].tempos].sort((a, b) => a - b);
      const top10 = tempos.slice(0, 10);
      const top10Media = top10.length ? top10.reduce((a, b) => a + b, 0) / top10.length : r.melhorVolta;
      return { nome: r.nome, tempoTotal: r.tempoTotalSeg, vmr: r.melhorVolta, top10Media };
    });

  if (!metrics.length) return [];

  const bestTempoTotal = Math.min(...metrics.map((m) => m.tempoTotal));
  const bestVmr = Math.min(...metrics.map((m) => m.vmr));
  const bestTop10 = Math.min(...metrics.map((m) => m.top10Media));

  const PESO_TEMPO = 1;
  const PESO_VMR = 1.5;
  const PESO_TOP10 = 2;
  const PESO_TOTAL = PESO_TEMPO + PESO_VMR + PESO_TOP10;

  return metrics.map((m) => {
    const pctTempo = ((m.tempoTotal - bestTempoTotal) / bestTempoTotal) * 100;
    const pctVmr = ((m.vmr - bestVmr) / bestVmr) * 100;
    const pctTop10 = ((m.top10Media - bestTop10) / bestTop10) * 100;
    const indicePonderado = (pctTempo * PESO_TEMPO + pctVmr * PESO_VMR + pctTop10 * PESO_TOP10) / PESO_TOTAL;
    const nota = Math.max(0, 10 - indicePonderado);
    return {
      turno: etapa.turno,
      corrida: etapa.corrida,
      categoria: etapa.categoria,
      tracado: etapa.tracado,
      nome: m.nome,
      tempoTotal: m.tempoTotal,
      vmr: m.vmr,
      top10Media: m.top10Media,
      nota,
    };
  });
}

export interface EqualizacaoPiloto {
  nome: string;
  categoria: Categoria;
  porTurno: Record<1 | 2 | 3, number>;
  total: number;
  corridas: number;
  media: number;
}

/** Pontuação de equalização acumulada na temporada, quebrada por turno — soma corrida a corrida. */
export function computeEqualizacaoTemporada(etapas: Etapa[], categorias: Categoria[]): EqualizacaoPiloto[] {
  const relevantes = etapas.filter((e) => categorias.includes(e.categoria));
  const map = new Map<string, EqualizacaoPiloto>();

  for (const etapa of relevantes) {
    for (const n of computeEqualizacaoCorrida(etapa)) {
      const row = map.get(n.nome) ?? {
        nome: n.nome,
        categoria: n.categoria,
        porTurno: { 1: 0, 2: 0, 3: 0 },
        total: 0,
        corridas: 0,
        media: 0,
      };
      row.porTurno[etapa.turno] += n.nota;
      row.total += n.nota;
      row.corridas += 1;
      map.set(n.nome, row);
    }
  }

  return [...map.values()]
    .map((r) => ({ ...r, media: r.total / r.corridas }))
    .sort((a, b) => b.total - a.total);
}

/** Traçados distintos usados por um conjunto de etapas — usado pro aviso de consistência do traçado. */
export function tracadosDistintos(etapas: Etapa[]): number[] {
  return [...new Set(etapas.map((e) => e.tracado).filter((t): t is number => t != null))];
}
