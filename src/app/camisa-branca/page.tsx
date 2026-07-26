'use client';

import { useMemo } from 'react';
import { etapas, penalidades } from '@/data/etapas';
import { hallDaFama } from '@/data/hallDaFama';
import { computeStandingsGeral } from '@/lib/scoring';
import { titleCase } from '@/lib/format';

const METRICAS = [
  { key: 'pontos', title: 'Campeão Elite', ic: '🏆' },
  { key: 'poles', title: 'Pole Position', ic: '🏁' },
  { key: 'vr', title: 'Volta Mais Rápida', ic: '⏱' },
  { key: 'podios', title: 'Pódios (Top 6)', ic: '🥉' },
] as const;

export default function CamisaBrancaPage() {
  const standings = useMemo(() => computeStandingsGeral(etapas, 'elite', penalidades), []);
  const totalCorridas = etapas.filter((e) => e.categoria === 'elite' && (e.turno === 2 || e.turno === 3)).length;

  const lideres: Record<string, number> = {};
  const ranks = METRICAS.map((m) => {
    const ordenado = [...standings].filter((r) => r[m.key] > 0).sort((a, b) => b[m.key] - a[m.key]);
    const max = ordenado[0]?.[m.key] ?? 0;
    if (max > 0) {
      for (const r of ordenado) {
        if (r[m.key] === max) lideres[r.nome] = (lideres[r.nome] ?? 0) + 1;
      }
    }
    return { ...m, top5: ordenado.slice(0, 5), max };
  });

  const multiplos = Object.entries(lideres)
    .filter(([, n]) => n > 1)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="cb-page">
      <div className="hero cb-hero">
        <div className="hero-checker" />
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">
              <span className="pulse-dot" />
              DISPUTA ESPECIAL · ELITE
            </div>
            <h1>Camisa Branca</h1>
            <p className="hero-sub">Quatro categorias de destaque, sempre Elite, sempre Campeonato Geral.</p>
          </div>
        </div>
      </div>

      <p className="updated-info" style={{ marginBottom: 20 }}>
        {standings.length ? `${totalCorridas} de 6 corridas computadas (2º+3º turno)` : 'Nenhuma etapa computada ainda'}
      </p>

      {standings.length === 0 ? (
        <div className="empty-state">Sem etapas Elite carregadas ainda.</div>
      ) : (
        <>
          <div className="cb-grid">
            {ranks.map((m) => (
              <div className="cb-card panel" key={m.key}>
                <div className="cb-card-title">
                  <span>{m.ic}</span> {m.title}
                </div>
                {m.top5.length === 0 ? (
                  <div className="cb-empty">—</div>
                ) : (
                  m.top5.map((r, idx) => (
                    <div className={`cb-row${idx === 0 ? ' leader' : ''}`} key={r.nome}>
                      <span className="cb-medal">{idx === 0 ? '♛' : idx + 1}</span>
                      <span className="cb-name">{titleCase(r.nome)}</span>
                      <span className="cb-count num">{r[m.key]}</span>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>

          {multiplos.length > 0 && (
            <div className="cb-prestige">
              ⭐{' '}
              {multiplos
                .map(([nome, n]) => `${titleCase(nome)} lidera ${n} categorias — ${n === 3 ? 'triplamente' : 'duplamente'} prestigiado`)
                .join(' · ')}
            </div>
          )}
        </>
      )}

      <div className="hof-section">
        <div className="hof-heading">
          <div className="hof-heading-eyebrow">HONRA AO MÉRITO</div>
          <h2>Hall da Fama</h2>
          <div className="hof-heading-sub">Os Camisas Brancas de cada temporada, desde 2022.</div>
        </div>
        <div className="hof-grid">
          {hallDaFama.length === 0 ? (
            <div className="hof-card">
              <div className="hof-example-tag">EXEMPLO DE LAYOUT</div>
              <div className="hof-photo">
                <span className="hof-photo-ic">👤</span>
              </div>
              <div className="hof-name">Nome do Piloto</div>
              <div className="hof-titles">
                <span className="hof-title-tag">Camisa Branca 2022</span>
                <span className="hof-title-tag">Pole 2022</span>
                <span className="hof-title-tag">VMR 2023</span>
                <span className="hof-title-tag">Campeão Elite 2023</span>
              </div>
            </div>
          ) : (
            hallDaFama.map((entry) => (
              <div className="hof-card" key={entry.id}>
                <div className="hof-photo">
                  {entry.fotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={entry.fotoUrl} alt={entry.nome} />
                  ) : (
                    <span className="hof-photo-ic">👤</span>
                  )}
                </div>
                <div className="hof-name">{titleCase(entry.nome)}</div>
                <div className="hof-titles">
                  {entry.titulos.map((t, i) => (
                    <span className="hof-title-tag" key={i}>
                      {t.label} {t.ano}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="hof-note">Assim que chegarem as fotos e os títulos reais, este card vira a lista completa de campeões.</div>
      </div>

      <footer className="site-footer">Caserna Kart Racing · Disputa pela Camisa Branca · Desde 2022</footer>
    </div>
  );
}
