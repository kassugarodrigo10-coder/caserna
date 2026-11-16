'use client';

import { useSyncExternalStore } from 'react';

interface CalEvento {
  id: string;
  nome: string;
  data: string; // ISO yyyy-mm-dd
}

// Encerramento da Temporada 2026 — some do painel sozinho assim que a data passar.
const ULTIMA_ETAPA_2026: CalEvento = { id: 'ultima-etapa-2026', nome: 'Última Etapa da Temporada 2026', data: '2026-11-19' };
const CONFRATERNIZACAO_2026: CalEvento = { id: 'confraternizacao-2026', nome: 'Confraternização 2026', data: '2026-11-28' };

const PRE_TEMPORADA_2027: CalEvento[] = [
  { id: 'pre-temp-1', nome: 'Pré-temporada 1', data: '2027-01-27' },
  { id: 'pre-temp-2', nome: 'Pré-temporada 2', data: '2027-02-24' },
];

interface Etapa2027 {
  numero: number;
  data: string;
  mes: string;
  turno: 1 | 2 | 3;
}

// Agenda Caserna SP 2027 — enviada pela Diretoria.
const ETAPAS_2027: Etapa2027[] = [
  { numero: 1, data: '2027-03-17', mes: 'Março', turno: 1 },
  { numero: 2, data: '2027-04-14', mes: 'Abril', turno: 1 },
  { numero: 3, data: '2027-05-19', mes: 'Maio', turno: 1 },
  { numero: 4, data: '2027-06-16', mes: 'Junho', turno: 2 },
  { numero: 5, data: '2027-07-21', mes: 'Julho', turno: 2 },
  { numero: 6, data: '2027-08-18', mes: 'Agosto', turno: 2 },
  { numero: 7, data: '2027-09-22', mes: 'Setembro', turno: 3 },
  { numero: 8, data: '2027-10-20', mes: 'Outubro', turno: 3 },
  { numero: 9, data: '2027-11-17', mes: 'Novembro', turno: 3 },
];

const TURNOS: { turno: 1 | 2 | 3; range: string }[] = [
  { turno: 1, range: 'Março · Abril · Maio' },
  { turno: 2, range: 'Junho · Julho · Agosto' },
  { turno: 3, range: 'Setembro · Outubro · Novembro' },
];

const WEEKDAYS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const MONTHS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatLongDate(d: Date): string {
  return `${WEEKDAYS[d.getDay()]}, ${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`;
}

function subscribeHoje() {
  return () => {};
}

function getHojeSnapshot(): number {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
}

function getHojeServerSnapshot(): number | null {
  return null;
}

export default function CalendarioPage() {
  // Data de hoje só existe no cliente — useSyncExternalStore lê o relógio do navegador sem
  // descompasso entre o HTML do servidor e o cálculo real (próximo evento, dias restantes).
  const hojeTs = useSyncExternalStore(subscribeHoje, getHojeSnapshot, getHojeServerSnapshot);
  const hoje = hojeTs !== null ? new Date(hojeTs) : null;

  const todosEventos = [
    ULTIMA_ETAPA_2026,
    CONFRATERNIZACAO_2026,
    ...PRE_TEMPORADA_2027,
    ...ETAPAS_2027.map((e) => ({ id: `etapa-${e.numero}`, nome: `Etapa ${e.numero}`, data: e.data })),
  ].sort((a, b) => (a.data < b.data ? -1 : 1));

  const proximo = hoje ? todosEventos.find((e) => parseLocalDate(e.data) >= hoje) : undefined;
  const diasRestantes =
    proximo && hoje ? Math.round((parseLocalDate(proximo.data).getTime() - hoje.getTime()) / 86400000) : null;

  const fechamento2026 = [ULTIMA_ETAPA_2026, CONFRATERNIZACAO_2026];
  const fechamentoVisivel = hoje ? fechamento2026.filter((e) => parseLocalDate(e.data) >= hoje) : fechamento2026;

  const preTemporadaVisivel = hoje
    ? PRE_TEMPORADA_2027.filter((e) => parseLocalDate(e.data) >= hoje)
    : PRE_TEMPORADA_2027;

  return (
    <>
      <div className="hero">
        <div className="hero-checker" />
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">
              <span className="pulse-dot" />
              TEMPORADA 2027
            </div>
            <h1>Calendário</h1>
            <p className="hero-sub">Agenda Caserna São Paulo 2027.</p>
          </div>
        </div>
      </div>

      <div className="panel cal-next">
        <div className="cal-next-count num">
          {diasRestantes !== null ? diasRestantes : '—'}
          <span>DIAS</span>
        </div>
        <div className="cal-next-info">
          <div className="cal-next-label">Próximo evento</div>
          <div className="cal-next-name">{proximo ? proximo.nome : hoje ? 'Temporada concluída' : '—'}</div>
          <div className="cal-next-date">{proximo ? formatLongDate(parseLocalDate(proximo.data)) : ''}</div>
        </div>
      </div>

      {fechamentoVisivel.length > 0 && (
        <>
          <div className="section-title" style={{ marginTop: 28 }}>
            FECHANDO A TEMPORADA 2026
          </div>
          <div className="cal-closing-grid">
            {fechamentoVisivel.map((e) => {
              const d = parseLocalDate(e.data);
              const isSocial = e.id === 'confraternizacao-2026';
              return (
                <div key={e.id} className={`cal-closing-card panel ${isSocial ? 'social' : 'race'}`}>
                  <span className="tag cal-closing-tag">{isSocial ? 'CONFRATERNIZAÇÃO' : 'ÚLTIMA ETAPA'}</span>
                  <div className="cal-day num">
                    {String(d.getDate()).padStart(2, '0')}
                    <span>/{String(d.getMonth() + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="cal-meta">{WEEKDAYS[d.getDay()]}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="section-title" style={{ marginTop: 28 }}>
        PRÉ-TEMPORADA
      </div>
      {preTemporadaVisivel.length > 0 ? (
        <div className="cal-pretemp-grid">
          {preTemporadaVisivel.map((e, i) => {
            const d = parseLocalDate(e.data);
            return (
              <div key={e.id} className="cal-pretemp-card panel">
                <div className="cal-day cal-day-dim num">
                  {String(d.getDate()).padStart(2, '0')}
                  <span>/{String(d.getMonth() + 1).padStart(2, '0')}</span>
                </div>
                <div>
                  <div className="cal-pretemp-tag">PRÉ-TEMPORADA {i + 1}</div>
                  <div className="cal-meta">{WEEKDAYS[d.getDay()]} · 2027</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">As pré-temporadas já aconteceram.</div>
      )}

      <div className="section-title" style={{ marginTop: 28 }}>
        TEMPORADA 2027
      </div>
      {TURNOS.map(({ turno, range }) => (
        <div className="cal-turno-block" key={turno}>
          <div className="cal-turno-head">
            <span className="cal-turno-num">{turno}</span>
            <span className="cal-turno-title">Turno {turno}</span>
            <span className="cal-turno-line" />
            <span className="cal-turno-range">{range}</span>
          </div>
          <div className="cal-etapa-grid">
            {ETAPAS_2027.filter((e) => e.turno === turno).map((e) => {
              const d = parseLocalDate(e.data);
              return (
                <div key={e.numero} className="cal-etapa-card panel">
                  <span className="tag cal-etapa-tag">ETAPA {e.numero}</span>
                  <div className="cal-day num">{String(d.getDate()).padStart(2, '0')}</div>
                  <div className="cal-month">{e.mes}</div>
                  <div className="cal-wk">{WEEKDAYS[d.getDay()]}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <footer className="site-footer">Caserna Kart Racing · Temporada 2027</footer>
    </>
  );
}
