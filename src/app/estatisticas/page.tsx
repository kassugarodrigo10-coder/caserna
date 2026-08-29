'use client';

import { useMemo, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import Hero from '@/components/Hero';
import TurnoPills from '@/components/TurnoPills';
import CorridaPills from '@/components/CorridaPills';
import PilotChips from '@/components/PilotChips';
import { useAppState } from '@/context/AppStateContext';
import { etapas, penalidades } from '@/data/etapas';
import { computeStandings, computeStandingsGeral, pointsForEtapa, getLapStats, getEtapaSeries, type SeriePonto } from '@/lib/scoring';
import { titleCase, updatedInfoText, CATEGORIA_LABEL } from '@/lib/format';
import { PILOT_COLORS, GRID_COLOR, ACCENT_HEX } from '@/lib/chartSetup';
import '@/lib/chartSetup';

function zoomRange(values: number[]) {
  if (!values.length) return {};
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = (max - min) * 0.2 || Math.max(max * 0.05, 0.1);
  return { min: Math.max(0, min - pad), max: max + pad };
}

const NIVEL_COLOR: Record<string, string> = {
  altissimo: '#2dd4bf',
  alto: '#22c55e',
  medio: '#6b7280',
  baixo: '#ef4444',
};

export default function EstatisticasPage() {
  const { categoria, turno, corrida } = useAppState();
  const [selecionados, setSelecionados] = useState<string[] | null>(null);
  const [filtroKey, setFiltroKey] = useState(`${categoria}|${turno}`);

  const relevantes = useMemo(
    () =>
      turno === 'geral'
        ? etapas.filter((e) => e.categoria === categoria && (e.turno === 2 || e.turno === 3))
        : etapas.filter((e) => e.categoria === categoria && e.turno === Number(turno)),
    [categoria, turno]
  );

  const standings = useMemo(
    () =>
      turno === 'geral'
        ? computeStandingsGeral(etapas, categoria, penalidades)
        : computeStandings(etapas, categoria, Number(turno) as 1 | 2 | 3, penalidades),
    [categoria, turno]
  );

  // Reajusta a seleção de pilotos pro Top 6 padrão quando o filtro de categoria/turno muda
  // (ajuste de estado durante a renderização, sem efeito — evita re-render em cascata).
  const chaveAtual = `${categoria}|${turno}`;
  if (chaveAtual !== filtroKey) {
    setFiltroKey(chaveAtual);
    setSelecionados(null);
  }

  const pilotosSelecionados = selecionados ?? standings.slice(0, 6).map((r) => r.nome);

  function toggle(nome: string) {
    const atual = selecionados ?? standings.slice(0, 6).map((r) => r.nome);
    setSelecionados(atual.includes(nome) ? atual.filter((n) => n !== nome) : [...atual, nome]);
  }

  const corridasDisponiveis = useMemo(
    () => [...new Set(relevantes.map((e) => e.corrida))].sort((a, b) => a - b),
    [relevantes]
  );

  const isSingleCorrida = turno !== 'geral' && corrida !== 'all';
  const etapaAtual = isSingleCorrida ? relevantes.find((e) => e.corrida === corrida) : undefined;

  // ---- Rankings ----
  const ranking = (stat: 'vitorias' | 'poles' | 'vr' | 'podios') => {
    const max = standings.reduce((m, r) => Math.max(m, r[stat]), 0);
    const lider = max > 0 ? standings.find((r) => r[stat] === max) : undefined;
    return { lider, max };
  };
  const rVitorias = ranking('vitorias');
  const rPoles = ranking('poles');
  const rVR = ranking('vr');
  const rPodios = ranking('podios');

  // ---- Mapa de consistência ----
  const colunas = useMemo(
    () => [...relevantes].sort((a, b) => a.turno - b.turno || a.corrida - b.corrida),
    [relevantes]
  );
  const pilotosMapa = standings.map((r) => r.nome);
  const mapa = useMemo(() => {
    const grid: Record<string, Array<{ pts: number; nivel: string } | null>> = {};
    for (const nome of pilotosMapa) grid[nome] = [];
    for (const etapa of colunas) {
      const resultados = pointsForEtapa(etapa);
      const ordenado = [...resultados].sort((a, b) => b.pts - a.pts);
      const n = ordenado.length;
      const byName = new Map(resultados.map((r) => [r.nome, r]));
      for (const nome of pilotosMapa) {
        const r = byName.get(nome);
        if (!r) {
          grid[nome].push(null);
          continue;
        }
        const idx = ordenado.findIndex((x) => x.nome === nome);
        const frac = n > 1 ? idx / (n - 1) : 0;
        const nivel = frac < 0.25 ? 'altissimo' : frac < 0.5 ? 'alto' : frac < 0.75 ? 'medio' : 'baixo';
        grid[nome].push({ pts: r.pts, nivel });
      }
    }
    return grid;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colunas]);

  // ---- Telemetria (corrida específica) ----
  const lapStats = etapaAtual ? getLapStats([etapaAtual], pilotosSelecionados) : [];
  const ordemStandings = standings.map((r) => r.nome);
  const lapStatsOrdenado = [...lapStats].sort(
    (a, b) => ordemStandings.indexOf(a.nome) - ordemStandings.indexOf(b.nome)
  );
  const labelsPilotos = lapStatsOrdenado.map((s) => titleCase(s.nome));

  // ---- Evolução (geral / todas as corridas) ----
  const serie: SeriePonto[] = useMemo(() => getEtapaSeries(relevantes, categoria), [relevantes, categoria]);
  const labelsEtapas = useMemo(
    () => [...colunas].map((e) => `T${e.turno}C${e.corrida}`),
    [colunas]
  );

  function buildDatasets(metric: keyof SeriePonto) {
    return pilotosSelecionados.map((nome, i) => {
      const color = PILOT_COLORS[i % PILOT_COLORS.length];
      const data = colunas.map((e) => {
        const ponto = serie.find((s) => s.nome === nome && s.turno === e.turno && s.corrida === e.corrida);
        return ponto ? (ponto[metric] as number) : null;
      });
      return {
        label: titleCase(nome),
        data,
        borderColor: color,
        backgroundColor: color,
        tension: 0.25,
        spanGaps: true,
        pointRadius: 4,
        borderWidth: 2.5,
      };
    });
  }

  const commonLineOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: GRID_COLOR } },
      y: { grid: { color: GRID_COLOR } },
    },
  };

  return (
    <>
      <Hero
        eyebrow="ANÁLISE DE DESEMPENHO"
        title="Rankings & Consistência"
        subtitle={`Categoria ${CATEGORIA_LABEL[categoria]} · ${
          turno === 'geral' ? 'Campeonato Geral' : 'Visão do turno selecionado'
        }`}
        turno={turno}
      />

      <TurnoPills updatedInfo={updatedInfoText(turno, relevantes.length)} />
      <CorridaPills corridas={corridasDisponiveis} />

      {standings.length === 0 ? (
        <div className="empty-state">Sem etapas carregadas ainda para esta categoria/turno.</div>
      ) : (
        <>
          <div className="rank-grid">
            <RankCard titulo="Mais Vitórias" icone="🏁" r={rVitorias} />
            <RankCard titulo="Mais Poles" icone="🎯" r={rPoles} />
            <RankCard titulo="Mais Volta Rápida" icone="⏱" r={rVR} />
            <RankCard titulo="Mais Pódios (Top 6)" icone="🥉" r={rPodios} />
          </div>

          <div className="section-title" style={{ marginTop: 24 }}>
            MAPA DE CONSISTÊNCIA
          </div>
          <div className="panel" style={{ overflowX: 'auto', marginBottom: 24 }}>
            <table className="consist-table">
              <thead>
                <tr>
                  <th>Piloto</th>
                  {colunas.map((e) => (
                    <th key={`${e.turno}-${e.corrida}`}>
                      T{e.turno}C{e.corrida}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pilotosMapa.map((nome) => (
                  <tr key={nome}>
                    <td className="consist-nome">{titleCase(nome)}</td>
                    {mapa[nome]?.map((cell, i) => (
                      <td key={i}>
                        {cell ? (
                          <span className="consist-cell" style={{ background: `${NIVEL_COLOR[cell.nivel]}33`, color: NIVEL_COLOR[cell.nivel] }}>
                            {cell.pts}
                          </span>
                        ) : (
                          <span className="consist-cell consist-empty">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section-title">
            {isSingleCorrida ? `TELEMETRIA DE VOLTA — T${etapaAtual?.turno}C${etapaAtual?.corrida}` : 'EVOLUÇÃO AO LONGO DAS CORRIDAS'}
          </div>
          <PilotChips
            pilotos={ordemStandings}
            selecionados={pilotosSelecionados}
            onToggle={toggle}
          />

          {isSingleCorrida && !etapaAtual?.voltas && (
            <div className="empty-state">Sem dados de volta a volta para esta corrida.</div>
          )}

          {isSingleCorrida && etapaAtual?.voltas && (
            <div className="chart-grid">
              <div className="panel">
                <div className="chart-title">Tempo médio de volta (s)</div>
                <Bar
                  data={{
                    labels: labelsPilotos,
                    datasets: [
                      {
                        label: 'Tempo médio',
                        data: lapStatsOrdenado.map((s) => Number(s.tempoMedio.toFixed(3))),
                        backgroundColor: ACCENT_HEX[categoria],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                      x: { grid: { color: GRID_COLOR } },
                      y: { grid: { color: GRID_COLOR }, ...zoomRange(lapStatsOrdenado.map((s) => s.tempoMedio)) },
                    },
                  }}
                />
              </div>
              <div className="panel">
                <div className="chart-title">Desvio-padrão (s)</div>
                <Bar
                  data={{
                    labels: labelsPilotos,
                    datasets: [
                      { label: 'Desvio-padrão', data: lapStatsOrdenado.map((s) => Number(s.desvio.toFixed(3))), backgroundColor: '#6b7280' },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { x: { grid: { color: GRID_COLOR } }, y: { grid: { color: GRID_COLOR }, beginAtZero: true } },
                  }}
                />
              </div>
              <div className="panel">
                <div className="chart-title">Velocidade média (km/h)</div>
                <Bar
                  data={{
                    labels: labelsPilotos,
                    datasets: [
                      { label: 'Velocidade média', data: lapStatsOrdenado.map((s) => Number(s.velocidadeMedia.toFixed(1))), backgroundColor: '#22c55e' },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: { x: { grid: { color: GRID_COLOR } }, y: { grid: { color: GRID_COLOR }, beginAtZero: true } },
                  }}
                />
              </div>
              <div className="panel">
                <div className="chart-title">Melhor volta vs. tempo médio (s)</div>
                <Bar
                  data={{
                    labels: labelsPilotos,
                    datasets: [
                      { label: 'Melhor volta', data: lapStatsOrdenado.map((s) => Number(s.melhorVolta.toFixed(3))), backgroundColor: 'rgba(255,255,255,.5)' },
                      { label: 'Tempo médio', data: lapStatsOrdenado.map((s) => Number(s.tempoMedio.toFixed(3))), backgroundColor: 'rgba(255,255,255,.18)' },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: { legend: { display: true, position: 'bottom' } },
                    scales: {
                      x: { grid: { color: GRID_COLOR } },
                      y: { grid: { color: GRID_COLOR }, ...zoomRange(lapStatsOrdenado.flatMap((s) => [s.melhorVolta, s.tempoMedio])) },
                    },
                  }}
                />
              </div>
            </div>
          )}

          {!isSingleCorrida && (
            <div className="chart-grid">
              <div className="panel">
                <div className="chart-title">Posição de chegada</div>
                <Line
                  data={{ labels: labelsEtapas, datasets: buildDatasets('pos') }}
                  options={{ ...commonLineOptions, scales: { ...commonLineOptions.scales, y: { ...commonLineOptions.scales.y, reverse: true, ticks: { stepSize: 1 } } } }}
                />
              </div>
              <div className="panel">
                <div className="chart-title">Diferença de pontos pro líder da corrida</div>
                <Line data={{ labels: labelsEtapas, datasets: buildDatasets('gapLeader') }} options={commonLineOptions} />
              </div>
              <div className="panel">
                <div className="chart-title">Diferença (s) pra volta mais rápida</div>
                <Line data={{ labels: labelsEtapas, datasets: buildDatasets('lapGap') }} options={commonLineOptions} />
              </div>
              <div className="panel">
                <div className="chart-title">Pontos acumulados no campeonato</div>
                <Line data={{ labels: labelsEtapas, datasets: buildDatasets('ptsAcumulados') }} options={commonLineOptions} />
              </div>
            </div>
          )}
        </>
      )}

      <footer className="site-footer">Caserna Kart Racing · Temporada 2026</footer>
    </>
  );
}

function RankCard({
  titulo,
  icone,
  r,
}: {
  titulo: string;
  icone: string;
  r: { lider?: { nome: string }; max: number };
}) {
  return (
    <div className="rank-card panel">
      <div className="rank-ic">{icone}</div>
      <div className="rank-title">{titulo}</div>
      <div className="rank-value">{r.lider ? titleCase(r.lider.nome) : '—'}</div>
      <div className="rank-sub num">{r.max > 0 ? r.max : '—'}</div>
    </div>
  );
}
