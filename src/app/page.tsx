'use client';

import { useMemo } from 'react';
import Hero from '@/components/Hero';
import TurnoPills from '@/components/TurnoPills';
import { useAppState } from '@/context/AppStateContext';
import { etapas, penalidades } from '@/data/etapas';
import { computeStandings, computeStandingsGeral } from '@/lib/scoring';
import { titleCase, updatedInfoText, CATEGORIA_LABEL } from '@/lib/format';

export default function PainelPage() {
  const { categoria, turno } = useAppState();

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

  const top6 = standings.slice(0, 6);
  const lider = standings[0];
  const vantagem = lider ? lider.pontos - (standings[1]?.pontos ?? lider.pontos) : 0;
  const corteTop6 = standings[5]?.pontos;

  return (
    <>
      <Hero
        eyebrow="RESULTADOS EM TEMPO REAL"
        title="Painel do Campeonato"
        subtitle={`Categoria ${CATEGORIA_LABEL[categoria]} · ${
          turno === 'geral' ? 'Campeonato Geral (2º e 3º turnos, com descarte)' : 'Visão do turno selecionado'
        }`}
        turno={turno}
      />

      <TurnoPills updatedInfo={updatedInfoText(turno, relevantes.length)} />

      {standings.length === 0 ? (
        <div className="empty-state">Sem etapas carregadas ainda para esta categoria/turno.</div>
      ) : (
        <>
          <div className="destaque panel" style={{ marginBottom: 20 }}>
            <div className="destaque-photo">
              <div className="destaque-name">{titleCase(lider.nome)}</div>
              <div className="destaque-tag">LÍDER · {CATEGORIA_LABEL[categoria].toUpperCase()}</div>
            </div>
            <div className="destaque-info">
              <div className="destaque-row">
                <span>PONTOS</span>
                <strong className="num">{lider.pontos}</strong>
              </div>
              <div className="destaque-row">
                <span>VITÓRIAS</span>
                <strong className="num">{lider.vitorias}</strong>
              </div>
              <div className="destaque-row">
                <span>PÓDIOS</span>
                <strong className="num">{lider.podios}</strong>
              </div>
              <div className="destaque-row">
                <span>VANTAGEM P/ 2º</span>
                <strong className="num">{vantagem}</strong>
              </div>
            </div>
          </div>

          <div className="section-title">VISÃO GERAL DO TURNO</div>
          <div className="kpi-grid">
            <div className="kpi-tile">
              <div className="kpi-label">Pilotos ativos</div>
              <div className="kpi-value num">{standings.length}</div>
            </div>
            <div className="kpi-tile">
              <div className="kpi-label">Líder</div>
              <div className="kpi-value">{titleCase(lider.nome)}</div>
              <div className="kpi-sub num">{lider.pontos} pts</div>
            </div>
            <div className="kpi-tile">
              <div className="kpi-label">Vantagem do líder</div>
              <div className="kpi-value num">{vantagem} pts</div>
            </div>
            <div className="kpi-tile">
              <div className="kpi-label">Corte Top 6</div>
              <div className="kpi-value num">{corteTop6 ?? '—'} pts</div>
            </div>
          </div>

          <div className="section-title" style={{ marginTop: 24 }}>
            TOP 6 — {CATEGORIA_LABEL[categoria].toUpperCase()}
          </div>
          <div className="standings panel">
            <div className="srow shead">
              <span>POS</span>
              <span>PILOTO</span>
              <span>PART.</span>
              <span>VIT.</span>
              <span>PTS</span>
            </div>
            {top6.map((row, idx) => (
              <div className="srow" key={row.nome}>
                <span className="pos num">{idx + 1}</span>
                <span>
                  {titleCase(row.nome)}
                  {(row.poles > 0 || row.vr > 0) && (
                    <span className="badges">
                      {row.poles > 0 && <span className="badge">POLE×{row.poles}</span>}
                      {row.vr > 0 && <span className="badge">VR×{row.vr}</span>}
                    </span>
                  )}
                </span>
                <span className="num">{row.participacoes}</span>
                <span className="num">{row.vitorias}</span>
                <span className="num accent-text">{row.pontos}</span>
              </div>
            ))}
          </div>
          <p className="updated-info" style={{ marginTop: 10 }}>
            Veja a classificação completa na aba Classificação.
          </p>
        </>
      )}

      <footer className="site-footer">Caserna Kart Racing · Temporada 2026</footer>
    </>
  );
}
