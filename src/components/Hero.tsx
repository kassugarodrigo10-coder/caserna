'use client';

import RpmGauge from './RpmGauge';
import type { TurnoFiltro } from '@/context/AppStateContext';

export default function Hero({
  eyebrow,
  title,
  subtitle,
  turno,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  turno: TurnoFiltro;
}) {
  return (
    <div className="hero">
      <div className="hero-checker" />
      <div className="hero-inner">
        <div>
          <div className="hero-eyebrow">
            <span className="pulse-dot" />
            {eyebrow}
          </div>
          <h1>{title}</h1>
          <p className="hero-sub">{subtitle}</p>
        </div>
        <RpmGauge label={turno === 'geral' ? 'GER' : `T${turno}`} />
      </div>
    </div>
  );
}
