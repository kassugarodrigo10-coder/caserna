'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { etapas, penalidades } from '@/data/etapas';
import { hallDaFama, type ConquistaTipo } from '@/data/hallDaFama';
import { camisaBrancaTurno1 } from '@/data/camisaBrancaTurno1';
import { computeStandingsGeral, type StandingRow } from '@/lib/scoring';
import { titleCase } from '@/lib/format';
import { IconCampeao, IconPole, IconVmr, IconPodio, IconCrown } from '@/components/CamisaBrancaIcons';

// Temporada tem 3 turnos de 3 corridas cada. A Corrida 2 de cada turno é invertida e não
// gera pole — por isso o total de corridas "com pole" é menor que o total geral.
const TOTAL_CORRIDAS_ANO = 9;
const TOTAL_CORRIDAS_COM_POLE_ANO = 6;

interface RankedItem {
  nome: string;
  valor: number;
}

/** Soma os totais já computados (turno 2/3) aos totais manuais do Turno 1 desta disputa. */
function mergeComTurno1(standings: StandingRow[], key: 'poles' | 'vr' | 'podios', turno1: Record<string, number>): RankedItem[] {
  const totais = new Map<string, number>();
  for (const [nome, n] of Object.entries(turno1)) totais.set(nome, n);
  for (const r of standings) totais.set(r.nome, (totais.get(r.nome) ?? 0) + r[key]);
  return [...totais.entries()]
    .map(([nome, valor]) => ({ nome, valor }))
    .filter((it) => it.valor > 0)
    .sort((a, b) => b.valor - a.valor);
}

interface Corte {
  vivos: RankedItem[];
  eliminados: number;
  max: number;
}

/** Corte por chance matemática: só sobrevive quem ainda pode alcançar o líder com as corridas restantes. */
function aplicarCorte(itens: RankedItem[], corridasRestantes: number, valorPorCorrida: number): Corte {
  const max = itens[0]?.valor ?? 0;
  if (max === 0) return { vivos: [], eliminados: 0, max: 0 };
  const limite = corridasRestantes * valorPorCorrida;
  const vivos = itens.filter((it) => max - it.valor <= limite);
  return { vivos, eliminados: itens.length - vivos.length, max };
}

const BADGES: { tipo: ConquistaTipo; label: string; Icon: (props: { className?: string }) => ReactNode }[] = [
  { tipo: 'campeao', label: 'Campeão', Icon: IconCampeao },
  { tipo: 'pole', label: 'Pole', Icon: IconPole },
  { tipo: 'vmr', label: 'VMR', Icon: IconVmr },
  { tipo: 'podio', label: 'Pódio', Icon: IconPodio },
];

function CorteCard({
  title,
  icon,
  itens,
  max,
  eliminados,
  corridasRestantes,
  notaExtra = '',
  notaSufixo = '',
}: {
  title: string;
  icon: ReactNode;
  itens: RankedItem[];
  max: number;
  eliminados: number;
  corridasRestantes: number;
  notaExtra?: string;
  notaSufixo?: string;
}) {
  return (
    <div className="cb-card panel">
      <div className="cb-card-title">
        {icon} {title}
      </div>
      <div className="cb-remaining-note">
        {corridasRestantes > 0
          ? `falta ${corridasRestantes} corrida${corridasRestantes === 1 ? '' : 's'}${notaExtra} no ano${notaSufixo}`
          : `todas as corridas do ano já entraram na conta${notaSufixo}`}
      </div>
      {itens.length === 0 ? (
        <div className="cb-empty">—</div>
      ) : (
        itens.map((it) => (
          <div className={`cb-row${it.valor === max ? ' leader' : ''}`} key={it.nome}>
            <span className="cb-medal">{it.valor === max && <IconCrown className="cb-crown" />}</span>
            <span className="cb-name">
              {titleCase(it.nome)}
              {it.valor !== max && eliminados > 0 && <span className="cb-gap-tag"> (−{max - it.valor})</span>}
            </span>
            <span className="cb-count num">{it.valor}</span>
          </div>
        ))
      )}
      {eliminados > 0 && (
        <div className="cb-eliminated-summary">
          +{eliminados} piloto{eliminados === 1 ? '' : 's'} sem chance matemática de alcançar a liderança
        </div>
      )}
    </div>
  );
}

export default function CamisaBrancaPage() {
  const standings = useMemo(() => computeStandingsGeral(etapas, 'elite', penalidades), []);

  const corridasElite23 = etapas.filter((e) => e.categoria === 'elite' && (e.turno === 2 || e.turno === 3));
  const corridasComputadas = camisaBrancaTurno1.corridasComputadas + corridasElite23.length;
  const corridasComPoleComputadas =
    camisaBrancaTurno1.poleCorridasComputadas + corridasElite23.filter((e) => e.tipo === 'normal').length;
  const corridasRestantes = Math.max(0, TOTAL_CORRIDAS_ANO - corridasComputadas);
  const corridasComPoleRestantes = Math.max(0, TOTAL_CORRIDAS_COM_POLE_ANO - corridasComPoleComputadas);

  const campeaoTop6 = standings.filter((r) => r.pontos > 0).slice(0, 6);
  const campeaoMax = campeaoTop6[0]?.pontos ?? 0;

  const poleCorte = aplicarCorte(mergeComTurno1(standings, 'poles', camisaBrancaTurno1.poles), corridasComPoleRestantes, 1);
  const vrCorte = aplicarCorte(mergeComTurno1(standings, 'vr', camisaBrancaTurno1.vr), corridasRestantes, 1);
  const podiosCorte = aplicarCorte(mergeComTurno1(standings, 'podios', camisaBrancaTurno1.podios), corridasRestantes, 1);

  const lideres: Record<string, number> = {};
  const registrarLideres = (itens: RankedItem[], max: number) => {
    if (max <= 0) return;
    for (const it of itens) if (it.valor === max) lideres[it.nome] = (lideres[it.nome] ?? 0) + 1;
  };
  registrarLideres(
    campeaoTop6.map((r) => ({ nome: r.nome, valor: r.pontos })),
    campeaoMax
  );
  registrarLideres(poleCorte.vivos, poleCorte.max);
  registrarLideres(vrCorte.vivos, vrCorte.max);
  registrarLideres(podiosCorte.vivos, podiosCorte.max);

  const multiplos = Object.entries(lideres)
    .filter(([, n]) => n > 1)
    .sort((a, b) => b[1] - a[1]);

  const semDados = standings.length === 0 && corridasComputadas === 0;

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
            <p className="hero-sub">Pole, Volta Mais Rápida e Pódios, sempre Elite, sempre Campeonato Geral.</p>
          </div>
        </div>
      </div>

      <p className="updated-info" style={{ marginBottom: 20 }}>
        {semDados ? 'Nenhuma corrida computada ainda' : `${corridasComputadas} de ${TOTAL_CORRIDAS_ANO} corridas do ano computadas`}
      </p>

      {semDados ? (
        <div className="empty-state">Sem etapas Elite carregadas ainda.</div>
      ) : (
        <>
          <div className="cb-grid">
            <div className="cb-card panel">
              <div className="cb-card-title">
                <IconCampeao className="cb-card-ic" /> Campeão Elite
              </div>
              <div className="cb-remaining-note">sempre Top 6 · sem corte matemático</div>
              {campeaoTop6.length === 0 ? (
                <div className="cb-empty">—</div>
              ) : (
                campeaoTop6.map((r) => (
                  <div className={`cb-row${r.pontos === campeaoMax ? ' leader' : ''}`} key={r.nome}>
                    <span className="cb-medal">{r.pontos === campeaoMax && <IconCrown className="cb-crown" />}</span>
                    <span className="cb-name">{titleCase(r.nome)}</span>
                    <span className="cb-count num">{r.pontos}</span>
                  </div>
                ))
              )}
            </div>

            <CorteCard
              title="Pole Position"
              icon={<IconPole className="cb-card-ic" />}
              itens={poleCorte.vivos}
              max={poleCorte.max}
              eliminados={poleCorte.eliminados}
              corridasRestantes={corridasComPoleRestantes}
              notaExtra=" com pole"
            />
            <CorteCard
              title="Volta Mais Rápida"
              icon={<IconVmr className="cb-card-ic" />}
              itens={vrCorte.vivos}
              max={vrCorte.max}
              eliminados={vrCorte.eliminados}
              corridasRestantes={corridasRestantes}
            />
            <CorteCard
              title="Pódios (Top 6)"
              icon={<IconPodio className="cb-card-ic" />}
              itens={podiosCorte.vivos}
              max={podiosCorte.max}
              eliminados={podiosCorte.eliminados}
              corridasRestantes={corridasRestantes}
            />
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
              <div className="hof-photo-wrap">
                <div className="hof-photo-placeholder">👤</div>
              </div>
              <div className="hof-name">Nome do Piloto</div>
              <div className="hof-tag">4x Camisa Branca</div>
              <div className="hof-badges">
                <span className="hof-badge">
                  <IconCampeao className="hof-badge-ic" />
                  1x Campeão
                </span>
                <span className="hof-badge">
                  <IconPole className="hof-badge-ic" />
                  1x Pole
                </span>
              </div>
            </div>
          ) : (
            hallDaFama.map((entry) => {
              const contagem: Record<ConquistaTipo, number> = { campeao: 0, pole: 0, vmr: 0, podio: 0 };
              for (const ano of entry.anos) for (const c of ano.conquistas) contagem[c]++;
              const totalConquistas = entry.anos.reduce((s, a) => s + a.conquistas.length, 0);
              const anosOrdenados = [...entry.anos].sort((a, b) => a.ano - b.ano);
              return (
                <div className="hof-card" key={entry.id}>
                  <div className="hof-photo-wrap">
                    {entry.fotoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={entry.fotoUrl} alt={titleCase(entry.nome)} />
                    ) : (
                      <div className="hof-photo-placeholder">👤</div>
                    )}
                  </div>
                  <div className="hof-name">{titleCase(entry.nome)}</div>
                  <div className="hof-tag">{totalConquistas}x Camisa Branca</div>
                  <div className="hof-badges">
                    {BADGES.filter((b) => contagem[b.tipo] > 0).map((b) => (
                      <span className="hof-badge" key={b.tipo}>
                        <b.Icon className="hof-badge-ic" />
                        {contagem[b.tipo]}x {b.label}
                      </span>
                    ))}
                  </div>
                  <div className="hof-years">
                    {anosOrdenados.map((a) => (
                      <div className="hof-year-row" key={a.ano}>
                        <b>{a.ano}</b>
                        <span className="hof-year-icons">
                          {a.conquistas.map((c, i) => {
                            const { Icon } = BADGES.find((b) => b.tipo === c)!;
                            return <Icon className="hof-year-ic" key={i} />;
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
        {hallDaFama.length === 0 && (
          <div className="hof-note">Assim que chegarem as fotos e os títulos reais, este card vira a lista completa de campeões.</div>
        )}
      </div>

      <footer className="site-footer">Caserna Kart Racing · Disputa pela Camisa Branca · Desde 2022</footer>
    </div>
  );
}
