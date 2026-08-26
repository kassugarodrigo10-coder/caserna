'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import DiretoriaAuthForm from '@/components/DiretoriaAuthForm';
import PilotChips from '@/components/PilotChips';
import { etapas, faltas } from '@/data/etapas';
import { computeEqualizacaoCorridas, computeEqualizacaoTemporada, tracadosDistintos, type NotaCorrida } from '@/lib/equalizacao';
import { titleCase, formatTempo, CATEGORIA_LABEL } from '@/lib/format';
import type { Categoria, Etapa } from '@/types';

function faltasDoPiloto(nome: string) {
  return faltas.filter((f) => f.nome === nome).length;
}

// Chave por turno+corrida (sem categoria) — Elite e Graduados da mesma noite compartilham a
// mesma corrida no filtro, mesmo sendo etapas (baterias) separadas no cadastro de dados.
function chaveCorrida(e: Etapa) {
  return `${e.turno}|${e.corrida}`;
}

function TrackFlag({ todasEtapas, etapasSelecionadas }: { todasEtapas: Etapa[]; etapasSelecionadas?: Etapa[] }) {
  if (!todasEtapas.length) return null;

  if (etapasSelecionadas?.length) {
    const [primeira] = etapasSelecionadas;
    return (
      <span className="track-flag ok">
        🏁 Mostrando só T{primeira.turno}·C{primeira.corrida} · traçado {primeira.tracado ?? '—'}
      </span>
    );
  }

  const tracados = tracadosDistintos(todasEtapas);
  return tracados.length <= 1 ? (
    <span className="track-flag ok">
      🏁 Traçado {tracados[0] ?? '—'} · {todasEtapas.length} corrida(s) na temporada
    </span>
  ) : (
    <span className="track-flag warn">⚠ {tracados.length} traçados na temporada · visão por turno abaixo</span>
  );
}

function GrupoEqualizacao({
  titulo,
  corBase,
  categorias,
  subInfo,
}: {
  titulo: string;
  corBase: string;
  categorias: Categoria[];
  subInfo?: string;
}) {
  const todasEtapas = [...etapas]
    .filter((e) => categorias.includes(e.categoria))
    .sort((a, b) => a.turno - b.turno || a.corrida - b.corrida);

  // Uma corrida (turno+corrida) pode ter uma etapa por categoria (Elite e Graduados correm em
  // baterias separadas na mesma noite) — o filtro agrupa por corrida, não por etapa individual.
  const corridas: { key: string; turno: number; corrida: number; etapas: Etapa[] }[] = [];
  for (const e of todasEtapas) {
    const key = chaveCorrida(e);
    const grupo = corridas.find((c) => c.key === key);
    if (grupo) grupo.etapas.push(e);
    else corridas.push({ key, turno: e.turno, corrida: e.corrida, etapas: [e] });
  }

  const [corridaKey, setCorridaKey] = useState<string | null>(null);
  const [selecionados, setSelecionados] = useState<string[] | null>(null);

  const corridaSelecionada = corridaKey ? corridas.find((c) => c.key === corridaKey) : undefined;

  const rankingCorrida: NotaCorrida[] = corridaSelecionada
    ? computeEqualizacaoCorridas(corridaSelecionada.etapas).sort((a, b) => b.nota - a.nota)
    : [];
  const rankingTemporada = computeEqualizacaoTemporada(todasEtapas, categorias);
  const totalRanking = corridaSelecionada ? rankingCorrida.length : rankingTemporada.length;

  const todosPilotos = [...new Set(todasEtapas.flatMap((e) => e.resultados.map((r) => r.nome)))];
  const pilotosSelecionados = selecionados ?? todosPilotos;

  function toggle(nome: string) {
    const atual = selecionados ?? todosPilotos;
    setSelecionados(atual.includes(nome) ? atual.filter((n) => n !== nome) : [...atual, nome]);
  }

  const rankingCorridaFiltrado = rankingCorrida.filter((r) => pilotosSelecionados.includes(r.nome));
  const rankingTemporadaFiltrado = rankingTemporada.filter((r) => pilotosSelecionados.includes(r.nome));

  const sub = !totalRanking
    ? 'aguardando dados'
    : corridaSelecionada
      ? `${totalRanking} pilotos · corrida isolada, sem acúmulo`
      : `${totalRanking} pilotos · ${todasEtapas.length} corrida(s) somada(s) · visão por turno`;

  return (
    <div className="panel" style={{ marginBottom: 20 }}>
      <div className="panel-head">
        <div>
          <h2 style={{ color: corBase, fontSize: 20 }}>{titulo}</h2>
          <div className="updated-info">{subInfo ?? sub}</div>
        </div>
        <TrackFlag todasEtapas={todasEtapas} etapasSelecionadas={corridaSelecionada?.etapas} />
      </div>

      {corridas.length > 0 && (
        <div className="pill-row" style={{ marginBottom: 10 }}>
          <button type="button" className={`pill${!corridaKey ? ' active' : ''}`} onClick={() => setCorridaKey(null)}>
            Temporada inteira (por turno)
          </button>
          {corridas.map((c) => (
            <button key={c.key} type="button" className={`pill${corridaKey === c.key ? ' active' : ''}`} onClick={() => setCorridaKey(corridaKey === c.key ? null : c.key)}>
              T{c.turno}·C{c.corrida} — Traçado {c.etapas[0].tracado ?? '—'}
            </button>
          ))}
        </div>
      )}

      {todosPilotos.length > 0 && (
        <PilotChips pilotos={todosPilotos} selecionados={pilotosSelecionados} onToggle={toggle} />
      )}

      {totalRanking === 0 ? (
        <div className="empty-state">Sem etapas computadas ainda para {titulo.toLowerCase()}.</div>
      ) : corridaSelecionada ? (
        <div style={{ overflowX: 'auto' }}>
          <table className="consist-table">
            <thead>
              <tr>
                <th>#</th>
                <th style={{ textAlign: 'left' }}>Piloto</th>
                <th>Categoria</th>
                <th>Faltas</th>
                <th>Tempo Total</th>
                <th>VMR</th>
                <th>Top10 (méd.)</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {rankingCorridaFiltrado.map((n, i) => (
                <tr key={n.nome}>
                  <td>
                    <span className={`rank-badge${i < 3 ? ' top' : ''}`}>{i + 1}</span>
                  </td>
                  <td className="consist-nome">{titleCase(n.nome)}</td>
                  <td>
                    <span className={`cat-badge ${n.categoria}`}>{CATEGORIA_LABEL[n.categoria]}</span>
                  </td>
                  <td className="num">{faltasDoPiloto(n.nome) || '—'}</td>
                  <td className="num">{formatTempo(n.tempoTotal)}</td>
                  <td className="num">{n.vmr.toFixed(3)}s</td>
                  <td className="num">{n.top10Media.toFixed(3)}s</td>
                  <td className="num accent-text">{n.nota.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="consist-table">
            <thead>
              <tr>
                <th>#</th>
                <th style={{ textAlign: 'left' }}>Piloto</th>
                <th>Categoria</th>
                <th>Faltas</th>
                <th>T1</th>
                <th>T2</th>
                <th>T3</th>
                <th>Part.</th>
                <th>Média/corrida</th>
                <th>Pontos acum.</th>
              </tr>
            </thead>
            <tbody>
              {rankingTemporadaFiltrado.map((r, i) => (
                <tr key={r.nome}>
                  <td>
                    <span className={`rank-badge${i < 3 ? ' top' : ''}`}>{i + 1}</span>
                  </td>
                  <td className="consist-nome">{titleCase(r.nome)}</td>
                  <td>
                    <span className={`cat-badge ${r.categoria}`}>{CATEGORIA_LABEL[r.categoria]}</span>
                  </td>
                  <td className="num">{faltasDoPiloto(r.nome) || '—'}</td>
                  <td className="num">{r.porTurno[1] ? r.porTurno[1].toFixed(2) : '—'}</td>
                  <td className="num">{r.porTurno[2] ? r.porTurno[2].toFixed(2) : '—'}</td>
                  <td className="num">{r.porTurno[3] ? r.porTurno[3].toFixed(2) : '—'}</td>
                  <td className="num">{r.corridas}</td>
                  <td className="num">{r.media.toFixed(2)}</td>
                  <td className="num accent-text">{r.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function DiretoriaContent() {
  const { email } = useAuth();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  return (
    <div className="diretoria-theme">
      <div className="hero">
        <div className="hero-checker" />
        <div className="hero-inner" style={{ alignItems: 'flex-start' }}>
          <div>
            <div className="hero-eyebrow">
              <span className="pulse-dot" />
              ITEM 4.2 DO REGULAMENTO
            </div>
            <h1>Equalização de Pilotos</h1>
            <p className="hero-sub">
              Apoio à decisão de subida/descida de categoria (Base → Graduados → Elite). A pontuação do
              campeonato é o primeiro filtro — casos óbvios praticamente se resolvem sozinhos. Para os demais,
              o índice composto abaixo compara cada piloto com os concorrentes que disputaram a mesma corrida,
              no mesmo traçado.
            </p>
          </div>
        </div>
        <div className="criteria-box">
          <div className="criteria-card">
            <div className="k">Tempo total</div>
            <div className="v">peso 1</div>
            <div className="w">soma do tempo de corrida</div>
          </div>
          <div className="criteria-card">
            <div className="k">Volta mais rápida</div>
            <div className="v">peso 1,5</div>
            <div className="w">melhor volta da etapa (VMR)</div>
          </div>
          <div className="criteria-card">
            <div className="k">10 melhores voltas</div>
            <div className="v">peso 2</div>
            <div className="w">média das 10 voltas mais rápidas</div>
          </div>
          <div className="criteria-card">
            <div className="k">Pontuação por corrida</div>
            <div className="v">0 a 10</div>
            <div className="w">10 − (atraso% × 1) · acumula na temporada</div>
          </div>
        </div>
      </div>

      <div className="pillbar">
        <span className="updated-info">Logado como {email}</span>
        <button type="button" className="pill" onClick={handleSignOut}>
          Sair
        </button>
      </div>

      <GrupoEqualizacao titulo="Elite + Graduados" corBase="var(--c-elite)" categorias={['elite', 'graduados']} />
      <GrupoEqualizacao
        titulo="Base"
        corBase="var(--c-base)"
        categorias={['base']}
        subInfo="Traçado próprio — comparado separadamente"
      />

      <p className="foot-note">
        <b>Como ler a pontuação:</b> em cada corrida, o piloto é comparado só com quem correu junto naquela
        corrida, no mesmo traçado. Quem tem o melhor desempenho combinado (tempo total, VMR e Top10, com os
        pesos acima) fica perto de <b>10</b>; os demais perdem 1 ponto pra cada 1% de atraso em relação ao
        melhor, sem passar de 0. Esses pontos <b>acumulam corrida a corrida</b>, igual à pontuação oficial do
        campeonato — mas é uma pontuação paralela, só pra acompanhar equalização. Use o filtro de corrida acima
        da tabela pra ver as métricas de uma corrida específica, sem misturar com outras; sem filtro, mostra a
        pontuação acumulada da temporada, quebrada por turno. A pontuação do campeonato continua sendo a
        checagem principal.
      </p>

      <footer className="site-footer">Caserna Kart Racing · Painel restrito da Diretoria</footer>
    </div>
  );
}

export default function DiretoriaPage() {
  const { isDiretor, loading } = useAuth();

  if (loading) {
    return <div className="empty-state">Carregando...</div>;
  }

  if (!isDiretor) {
    return (
      <div className="panel" style={{ maxWidth: 420, margin: '60px auto' }}>
        <DiretoriaAuthForm />
      </div>
    );
  }

  return <DiretoriaContent />;
}
