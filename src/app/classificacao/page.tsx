'use client';

import { useMemo, useState } from 'react';
import Hero from '@/components/Hero';
import TurnoPills from '@/components/TurnoPills';
import { useAppState } from '@/context/AppStateContext';
import { etapas, penalidades } from '@/data/etapas';
import { computeStandings, computeStandingsGeral } from '@/lib/scoring';
import { titleCase, updatedInfoText, CATEGORIA_LABEL } from '@/lib/format';

export default function ClassificacaoPage() {
  const { categoria, turno } = useAppState();
  const [busca, setBusca] = useState('');

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

  const filtrados = standings.filter((r) => titleCase(r.nome).toUpperCase().includes(busca.toUpperCase()));

  return (
    <>
      <Hero
        eyebrow="TABELA COMPLETA"
        title="Classificação"
        subtitle={`Categoria ${CATEGORIA_LABEL[categoria]} · ${
          turno === 'geral' ? 'Campeonato Geral (2º e 3º turnos, com descarte)' : 'Visão do turno selecionado'
        }`}
        turno={turno}
      />

      <TurnoPills updatedInfo={updatedInfoText(turno, relevantes.length)} />

      <div className="search-row">
        <input
          type="text"
          placeholder="Buscar piloto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {standings.length === 0 ? (
        <div className="empty-state">Sem etapas carregadas ainda para esta categoria/turno.</div>
      ) : (
        <>
          <div className="ctable panel">
            <div className="crow chead">
              <span>POS</span>
              <span>PILOTO</span>
              <span>PTS</span>
              <span className="hide-mobile">PART.</span>
              <span className="hide-mobile">VIT.</span>
              <span className="hide-mobile">PÓD.</span>
              <span className="hide-mobile">POLE</span>
              <span className="hide-mobile">VR</span>
              <span className="hide-mobile">PERD.</span>
            </div>
            {filtrados.map((row) => {
              const posOriginal = standings.indexOf(row);
              return (
                <div className={`crow${posOriginal < 6 ? ' top6' : ''}`} key={row.nome}>
                  <span className="pos num">{posOriginal + 1}</span>
                  <span>
                    <div>{titleCase(row.nome)}</div>
                    {row.descartada && (
                      <div className="descarte-sub">
                        descartou T{row.descartada.turno}C{row.descartada.corrida} ({row.descartada.pts} pts)
                      </div>
                    )}
                  </span>
                  <span className="num accent-text">{row.pontos}</span>
                  <span className="num hide-mobile">{row.participacoes}</span>
                  <span className="num hide-mobile">{row.vitorias}</span>
                  <span className="num hide-mobile">{row.podios}</span>
                  <span className="num hide-mobile">{row.poles}</span>
                  <span className="num hide-mobile">{row.vr}</span>
                  <span className="num hide-mobile" style={{ color: row.perdidos ? 'var(--danger)' : 'var(--text-faint)' }}>
                    {row.perdidos ? `-${row.perdidos}` : '—'}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="updated-info" style={{ marginTop: 10 }}>
            Top 6 — linha de medalha/troféu do regulamento.
          </p>
        </>
      )}

      <footer className="site-footer">Caserna Kart Racing · Regulamento 2026 · Dados oficiais do Kartódromo Internacional Granja Viana</footer>
    </>
  );
}
