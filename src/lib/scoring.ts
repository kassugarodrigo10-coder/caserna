import type { Categoria, Etapa, Penalidade } from '@/types';

export const POINTS_TABLE: Record<number, number> = {
  1: 35, 2: 32, 3: 30, 4: 28, 5: 26, 6: 24, 7: 22, 8: 21, 9: 20, 10: 19,
  11: 18, 12: 17, 13: 16, 14: 15, 15: 14, 16: 13, 17: 12, 18: 11, 19: 10, 20: 9,
  21: 8, 22: 7, 23: 6, 24: 5, 25: 4, 26: 3, 27: 2, 28: 1,
};

export interface ResultadoComPontos {
  nome: string;
  pos: number;
  base: number;
  poleBonus: 0 | 1;
  vrBonus: 0 | 1;
  pts: number;
}

/** Converte o resultado de uma etapa (ordem de chegada) em pontos por piloto. */
export function pointsForEtapa(etapa: Etapa): ResultadoComPontos[] {
  const menorVolta = Math.min(...etapa.resultados.map((r) => r.melhorVolta));
  return etapa.resultados.map((r, idx) => {
    const pos = idx + 1;
    const base = POINTS_TABLE[pos] ?? 0;
    const poleBonus = etapa.pole === r.nome ? 1 : 0;
    const vrBonus = r.melhorVolta === menorVolta ? 1 : 0;
    return { nome: r.nome, pos, base, poleBonus, vrBonus, pts: base + poleBonus + vrBonus };
  });
}

export interface StandingRow {
  nome: string;
  pontos: number;
  participacoes: number;
  vitorias: number;
  podios: number; // Top 6
  poles: number;
  vr: number;
  perdidos: number;
  descartada?: { turno: number; corrida: number; pts: number };
}

function baseMeta() {
  return { participacoes: 0, vitorias: 0, podios: 0, poles: 0, vr: 0 };
}

/** Classificação de um turno específico (soma simples, sem descarte). */
export function computeStandings(
  etapas: Etapa[],
  categoria: Categoria,
  turno: 1 | 2 | 3,
  penalidades: Penalidade[] = []
): StandingRow[] {
  const relevantes = etapas.filter((e) => e.categoria === categoria && e.turno === turno);
  const map = new Map<string, StandingRow>();
  for (const etapa of relevantes) {
    for (const r of pointsForEtapa(etapa)) {
      const row = map.get(r.nome) ?? { nome: r.nome, pontos: 0, perdidos: 0, ...baseMeta() };
      row.participacoes++;
      if (r.pos === 1) row.vitorias++;
      if (r.pos <= 6) row.podios++;
      if (r.poleBonus) row.poles++;
      if (r.vrBonus) row.vr++;
      const pen = penalidades
        .filter((p) => p.nome === r.nome && p.turno === etapa.turno && p.corrida === etapa.corrida)
        .reduce((s, p) => s + p.pontos, 0);
      row.perdidos += pen;
      row.pontos += r.pts - pen;
      map.set(r.nome, row);
    }
  }
  return [...map.values()].sort((a, b) => b.pontos - a.pontos);
}

/** Campeonato Geral: turnos 2 e 3, 1 etapa de descarte por piloto, máx. 5 etapas contabilizadas. */
export function computeStandingsGeral(
  etapas: Etapa[],
  categoria: Categoria,
  penalidades: Penalidade[] = []
): StandingRow[] {
  const relevantes = etapas.filter((e) => e.categoria === categoria && (e.turno === 2 || e.turno === 3));

  interface EtapaPts {
    turno: number;
    corrida: number;
    pts: number;
    advertenciaPista: boolean;
  }
  const perPiloto = new Map<string, EtapaPts[]>();
  const meta = new Map<string, ReturnType<typeof baseMeta>>();
  const perdidosMap = new Map<string, number>();

  for (const etapa of relevantes) {
    for (const r of pointsForEtapa(etapa)) {
      const pen = penalidades
        .filter((p) => p.nome === r.nome && p.turno === etapa.turno && p.corrida === etapa.corrida)
        .reduce((s, p) => s + p.pontos, 0);
      const resultado = etapa.resultados.find((x) => x.nome === r.nome);

      const arr = perPiloto.get(r.nome) ?? [];
      arr.push({ turno: etapa.turno, corrida: etapa.corrida, pts: r.pts - pen, advertenciaPista: !!resultado?.advertenciaPista });
      perPiloto.set(r.nome, arr);

      const m = meta.get(r.nome) ?? baseMeta();
      m.participacoes++;
      if (r.pos === 1) m.vitorias++;
      if (r.pos <= 6) m.podios++;
      if (r.poleBonus) m.poles++;
      if (r.vrBonus) m.vr++;
      meta.set(r.nome, m);

      perdidosMap.set(r.nome, (perdidosMap.get(r.nome) ?? 0) + pen);
    }
  }

  const rows: StandingRow[] = [];
  for (const [nome, etapaPts] of perPiloto) {
    const ordenadas = [...etapaPts].sort((a, b) => b.pts - a.pts);
    let descartada: StandingRow['descartada'];
    let contadas = ordenadas;

    if (ordenadas.length > 1) {
      // Descarta a pior etapa elegível (sem advertência de pista), varrendo do fim (pior) pro começo.
      for (let i = ordenadas.length - 1; i >= 0; i--) {
        if (!ordenadas[i].advertenciaPista) {
          descartada = { turno: ordenadas[i].turno, corrida: ordenadas[i].corrida, pts: ordenadas[i].pts };
          contadas = ordenadas.filter((_, idx) => idx !== i);
          break;
        }
      }
    }
    contadas = contadas.slice(0, 5);

    const pontos = contadas.reduce((s, e) => s + e.pts, 0);
    rows.push({
      nome,
      pontos,
      perdidos: perdidosMap.get(nome) ?? 0,
      descartada,
      ...(meta.get(nome) ?? baseMeta()),
    });
  }

  return rows.sort((a, b) => b.pontos - a.pontos);
}

export interface LapStat {
  nome: string;
  tempoMedio: number;
  desvio: number;
  velocidadeMedia: number;
  melhorVolta: number;
}

/** Estatísticas de volta a volta (para os gráficos de barra de uma corrida específica). */
export function getLapStats(etapas: Etapa[], pilotos?: string[]): LapStat[] {
  const stats: LapStat[] = [];
  for (const etapa of etapas) {
    if (!etapa.voltas) continue;
    for (const [nome, v] of Object.entries(etapa.voltas)) {
      if (pilotos && !pilotos.includes(nome)) continue;
      const tempos = v.tempos;
      if (!tempos.length) continue;
      const media = tempos.reduce((a, b) => a + b, 0) / tempos.length;
      const variancia = tempos.reduce((a, b) => a + (b - media) ** 2, 0) / tempos.length;
      const desvio = Math.sqrt(variancia);
      const velocidadeMedia = v.vel && v.vel.length ? v.vel.reduce((a, b) => a + b, 0) / v.vel.length : 0;
      stats.push({ nome, tempoMedio: media, desvio, velocidadeMedia, melhorVolta: Math.min(...tempos) });
    }
  }
  return stats;
}

export interface SeriePonto {
  turno: number;
  corrida: number;
  nome: string;
  pos: number;
  pts: number;
  ptsAcumulados: number;
  gapLeader: number;
  lapGap: number;
}

/** Série etapa a etapa (para os gráficos de linha do modo Geral/Todas as corridas). */
export function getEtapaSeries(etapas: Etapa[], categoria: Categoria): SeriePonto[] {
  const relevantes = [...etapas]
    .filter((e) => e.categoria === categoria)
    .sort((a, b) => a.turno - b.turno || a.corrida - b.corrida);

  const acumulado = new Map<string, number>();
  const serie: SeriePonto[] = [];

  for (const etapa of relevantes) {
    const resultados = pointsForEtapa(etapa);
    const liderPts = Math.max(...resultados.map((r) => r.pts));
    const menorVolta = Math.min(...etapa.resultados.map((r) => r.melhorVolta));

    for (const r of resultados) {
      const anterior = acumulado.get(r.nome) ?? 0;
      const novo = anterior + r.pts;
      acumulado.set(r.nome, novo);
      const resultado = etapa.resultados.find((x) => x.nome === r.nome)!;
      serie.push({
        turno: etapa.turno,
        corrida: etapa.corrida,
        nome: r.nome,
        pos: r.pos,
        pts: r.pts,
        ptsAcumulados: novo,
        gapLeader: liderPts - r.pts,
        lapGap: resultado.melhorVolta - menorVolta,
      });
    }
  }
  return serie;
}
