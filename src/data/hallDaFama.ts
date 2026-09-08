export type ConquistaTipo = 'campeao' | 'pole' | 'vmr' | 'podio';

export interface HallOfFameAno {
  ano: number;
  conquistas: ConquistaTipo[];
}

export interface HallOfFameEntry {
  id: string;
  nome: string;
  fotoUrl?: string;
  anos: HallOfFameAno[];
}

export const hallDaFama: HallOfFameEntry[] = [
  {
    id: 'kassuga',
    nome: 'KASSUGA',
    fotoUrl: '/hof/kassuga.jpg',
    anos: [
      { ano: 2022, conquistas: ['campeao', 'pole'] },
      { ano: 2023, conquistas: ['campeao', 'pole', 'vmr', 'podio'] },
      { ano: 2024, conquistas: ['campeao'] },
      { ano: 2025, conquistas: ['podio'] },
    ],
  },
  {
    id: 'junior',
    nome: 'JUNIOR',
    fotoUrl: '/hof/junior.jpg',
    anos: [{ ano: 2022, conquistas: ['podio'] }],
  },
  {
    id: 'jefferson-mello',
    nome: 'JEFFERSON MELLO',
    fotoUrl: '/hof/jefferson-mello.jpg',
    anos: [
      { ano: 2022, conquistas: ['vmr'] },
      { ano: 2024, conquistas: ['pole'] },
      { ano: 2025, conquistas: ['campeao'] },
    ],
  },
  {
    id: 'andreoli',
    nome: 'ANDREOLI',
    fotoUrl: '/hof/andreoli.jpg',
    anos: [{ ano: 2025, conquistas: ['vmr'] }],
  },
];
