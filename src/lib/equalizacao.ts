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
 * Nota de equalização (0-10) de uma corrida (ou de um grupo de etapas da mesma corrida —
 * turno+corrida — quando Elite e Graduados compartilham a mesma tabela): 10 menos 1 ponto
 * por cada 1% de atraso num índice ponderado (tempo total peso 1, VMR peso 1,5, média das
 * 10 melhores voltas peso 2) em relação ao melhor entre TODOS os pilotos passados aqui.
 *
 * Passar mais de uma etapa só faz sentido quando elas são a mesma corrida (mesmo
 * turno+corrida, mesma noite/traçado) — ex.: Elite e Graduados, que correm em baterias
 * separadas mas compõem uma tabela só na Diretoria. Nesse caso a referência (o "10") é uma
 * só pra ambas as categorias, senão cada categoria vira uma escala 0-10 independente e a
 * tabela combinada compara maçãs com laranjas. Nunca misture etapas de corridas diferentes.
 *
 * O "tempo total" entra no índice como ritmo médio (tempoTotalSeg / voltas), não o tempo
 * bruto: como é uma corrida por tempo, quem larga com problema e completa menos voltas tem
 * um tempo total bem menor sem ter sido mais rápido — comparar o bruto faria esse piloto
 * parecer o melhor da corrida. O ritmo médio continua comparável independente de quantas
 * voltas cada um completou.
 */
export function computeEqualizacaoCorridas(etapas: Etapa[]): NotaCorrida[] {
  const metrics = etapas.flatMap((etapa) => {
    if (!etapa.voltas) return [];
    return etapa.resultados
      .filter((r) => etapa.voltas![r.nome] && r.voltas > 0)
      .map((r) => {
        const tempos = [...etapa.voltas![r.nome].tempos].sort((a, b) => a - b);
        const top10 = tempos.slice(0, 10);
        const top10Media = top10.length ? top10.reduce((a, b) => a + b, 0) / top10.length : r.melhorVolta;
        const ritmoMedio = r.tempoTotalSeg / r.voltas;
        return {
          etapa,
          nome: r.nome,
          tempoTotal: r.tempoTotalSeg,
          ritmoMedio,
          vmr: r.melhorVolta,
          top10Media,
        };
      });
  });

  if (!metrics.length) return [];

  const bestRitmo = Math.min(...metrics.map((m) => m.ritmoMedio));
  const bestVmr = Math.min(...metrics.map((m) => m.vmr));
  const bestTop10 = Math.min(...metrics.map((m) => m.top10Media));

  const PESO_TEMPO = 1;
  const PESO_VMR = 1.5;
  const PESO_TOP10 = 2;
  const PESO_TOTAL = PESO_TEMPO + PESO_VMR + PESO_TOP10;

  return metrics.map((m) => {
    const pctTempo = ((m.ritmoMedio - bestRitmo) / bestRitmo) * 100;
    const pctVmr = ((m.vmr - bestVmr) / bestVmr) * 100;
    const pctTop10 = ((m.top10Media - bestTop10) / bestTop10) * 100;
    const indicePonderado = (pctTempo * PESO_TEMPO + pctVmr * PESO_VMR + pctTop10 * PESO_TOP10) / PESO_TOTAL;
    const nota = Math.max(0, 10 - indicePonderado);
    return {
      turno: m.etapa.turno,
      corrida: m.etapa.corrida,
      categoria: m.etapa.categoria,
      tracado: m.etapa.tracado,
      nome: m.nome,
      tempoTotal: m.tempoTotal,
      vmr: m.vmr,
      top10Media: m.top10Media,
      nota,
    };
  });
}

/** Nota de equalização de uma única etapa — atalho pra quando não há mais de uma categoria pra combinar. */
export function computeEqualizacaoCorrida(etapa: Etapa): NotaCorrida[] {
  return computeEqualizacaoCorridas([etapa]);
}

export interface EqualizacaoPiloto {
  nome: string;
  categoria: Categoria;
  porTurno: Record<1 | 2 | 3, number>;
  total: number;
  corridas: number;
  media: number;
}

/**
 * Pontuação de equalização acumulada na temporada, quebrada por turno — soma corrida a
 * corrida. Agrupa por turno+corrida antes de pontuar (mesmo critério da visão de corrida
 * específica), pra Elite e Graduados de uma mesma noite usarem a mesma referência.
 */
export function computeEqualizacaoTemporada(etapas: Etapa[], categorias: Categoria[]): EqualizacaoPiloto[] {
  const relevantes = etapas.filter((e) => categorias.includes(e.categoria));

  const grupos = new Map<string, Etapa[]>();
  for (const e of relevantes) {
    const key = `${e.turno}|${e.corrida}`;
    const arr = grupos.get(key) ?? [];
    arr.push(e);
    grupos.set(key, arr);
  }

  const map = new Map<string, EqualizacaoPiloto>();
  for (const grupoEtapas of grupos.values()) {
    const turno = grupoEtapas[0].turno;
    for (const n of computeEqualizacaoCorridas(grupoEtapas)) {
      const row = map.get(n.nome) ?? {
        nome: n.nome,
        categoria: n.categoria,
        porTurno: { 1: 0, 2: 0, 3: 0 },
        total: 0,
        corridas: 0,
        media: 0,
      };
      row.porTurno[turno] += n.nota;
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
