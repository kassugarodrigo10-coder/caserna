'use client';

import { useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import DiretoriaAuthForm from '@/components/DiretoriaAuthForm';
import PilotChips from '@/components/PilotChips';
import Hero from '@/components/Hero';
import { etapas, faltas } from '@/data/etapas';
import { computeEqualizacaoCorrida, computeEqualizacaoTemporada } from '@/lib/equalizacao';
import { titleCase } from '@/lib/format';
import type { Categoria } from '@/types';

function faltasDoPiloto(nome: string) {
  return faltas.filter((f) => f.nome === nome).length;
}

function TabelaEqualizacao({
  titulo,
  categorias,
  corridaSelecionada,
  pilotosSelecionados,
}: {
  titulo: string;
  categorias: Categoria[];
  corridaSelecionada: { turno: number; corrida: number; categoria: Categoria } | null;
  pilotosSelecionados: string[];
}) {
  const etapaFiltrada = corridaSelecionada
    ? etapas.find(
        (e) =>
          e.turno === corridaSelecionada.turno &&
          e.corrida === corridaSelecionada.corrida &&
          e.categoria === corridaSelecionada.categoria
      )
    : undefined;

  if (corridaSelecionada) {
    if (!categorias.includes(corridaSelecionada.categoria)) return null;

    const notas = (etapaFiltrada ? computeEqualizacaoCorrida(etapaFiltrada) : []).filter((n) =>
      pilotosSelecionados.includes(n.nome)
    );

    return (
      <div style={{ marginBottom: 28 }}>
        <div className="section-title">{titulo}</div>
        {notas.length === 0 ? (
          <div className="empty-state">Sem dados de volta a volta para esta corrida/categoria.</div>
        ) : (
          <div className="panel" style={{ overflowX: 'auto' }}>
            <table className="consist-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Piloto</th>
                  <th>Tempo Total</th>
                  <th>VMR</th>
                  <th>Top10 Média</th>
                  <th>Nota</th>
                  <th>Faltas</th>
                </tr>
              </thead>
              <tbody>
                {[...notas]
                  .sort((a, b) => b.nota - a.nota)
                  .map((n) => (
                    <tr key={n.nome}>
                      <td className="consist-nome">{titleCase(n.nome)}</td>
                      <td className="num">{n.tempoTotal.toFixed(3)}</td>
                      <td className="num">{n.vmr.toFixed(3)}</td>
                      <td className="num">{n.top10Media.toFixed(3)}</td>
                      <td className="num accent-text">{n.nota.toFixed(2)}</td>
                      <td className="num">{faltasDoPiloto(n.nome) || '—'}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  const temporada = computeEqualizacaoTemporada(etapas, categorias).filter((r) =>
    pilotosSelecionados.includes(r.nome)
  );

  return (
    <div style={{ marginBottom: 28 }}>
      <div className="section-title">{titulo}</div>
      {temporada.length === 0 ? (
        <div className="empty-state">Sem etapas computadas ainda para {titulo.toLowerCase()}.</div>
      ) : (
        <div className="panel" style={{ overflowX: 'auto' }}>
          <table className="consist-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Piloto</th>
                <th>Categoria</th>
                <th>T1</th>
                <th>T2</th>
                <th>T3</th>
                <th>Total</th>
                <th>Faltas</th>
              </tr>
            </thead>
            <tbody>
              {temporada.map((r) => (
                <tr key={r.nome}>
                  <td className="consist-nome">{titleCase(r.nome)}</td>
                  <td style={{ textTransform: 'capitalize' }}>{r.categoria}</td>
                  <td className="num">{r.porTurno[1] ? r.porTurno[1].toFixed(2) : '—'}</td>
                  <td className="num">{r.porTurno[2] ? r.porTurno[2].toFixed(2) : '—'}</td>
                  <td className="num">{r.porTurno[3] ? r.porTurno[3].toFixed(2) : '—'}</td>
                  <td className="num accent-text">{r.total.toFixed(2)}</td>
                  <td className="num">{faltasDoPiloto(r.nome) || '—'}</td>
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
  const [corridaKey, setCorridaKey] = useState<string | null>(null);
  const [selecionados, setSelecionados] = useState<string[] | null>(null);

  const todasEtapas = useMemo(() => [...etapas].sort((a, b) => a.turno - b.turno || a.corrida - b.corrida), []);
  const todosPilotos = useMemo(
    () => [...new Set(etapas.flatMap((e) => e.resultados.map((r) => r.nome)))],
    []
  );
  const pilotosSelecionados = selecionados ?? todosPilotos;

  function toggle(nome: string) {
    const atual = selecionados ?? todosPilotos;
    setSelecionados(atual.includes(nome) ? atual.filter((n) => n !== nome) : [...atual, nome]);
  }

  const corridaSelecionada = corridaKey
    ? (() => {
        const [turno, corrida, categoria] = corridaKey.split('|');
        return { turno: Number(turno), corrida: Number(corrida), categoria: categoria as Categoria };
      })()
    : null;

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  return (
    <>
      <Hero
        eyebrow="ÁREA RESTRITA"
        title="Diretoria"
        subtitle="Apoio à decisão de subida/descida de categoria — pontuação de equalização paralela ao campeonato oficial."
        turno="geral"
      />

      <div className="pillbar">
        <span className="updated-info">Logado como {email}</span>
        <button type="button" className="pill" onClick={handleSignOut}>
          Sair
        </button>
      </div>

      <div className="section-title">CORRIDA</div>
      <div className="pill-row" style={{ marginBottom: 18 }}>
        <button type="button" className={`pill${corridaKey === null ? ' active' : ''}`} onClick={() => setCorridaKey(null)}>
          Temporada
        </button>
        {todasEtapas.map((e) => {
          const key = `${e.turno}|${e.corrida}|${e.categoria}`;
          return (
            <button key={key} type="button" className={`pill${corridaKey === key ? ' active' : ''}`} onClick={() => setCorridaKey(key)}>
              T{e.turno}C{e.corrida} · {e.categoria}
            </button>
          );
        })}
      </div>

      <div className="section-title">PILOTOS</div>
      <PilotChips pilotos={todosPilotos} selecionados={pilotosSelecionados} onToggle={toggle} />

      <TabelaEqualizacao
        titulo="Elite + Graduados"
        categorias={['elite', 'graduados']}
        corridaSelecionada={corridaSelecionada}
        pilotosSelecionados={pilotosSelecionados}
      />
      <TabelaEqualizacao
        titulo="Base"
        categorias={['base']}
        corridaSelecionada={corridaSelecionada}
        pilotosSelecionados={pilotosSelecionados}
      />

      <footer className="site-footer">Caserna Kart Racing · Painel restrito da Diretoria</footer>
    </>
  );
}

export default function DiretoriaPage() {
  const { isDiretor, loading } = useAuth();

  if (loading) {
    return <div className="empty-state">Carregando...</div>;
  }

  if (!isDiretor) {
    return (
      <div style={{ maxWidth: 420, margin: '60px auto' }}>
        <DiretoriaAuthForm />
      </div>
    );
  }

  return <DiretoriaContent />;
}
