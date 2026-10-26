import type { Etapa } from '@/types';

// Turno 3, Corrida 2, Elite — Kartódromo Internacional Granja Viana, traçado 115.
// Corrida invertida (grid formado pelo resultado da Corrida 1): a Tomada é só aquecimento,
// não gera pole nem define grid — pole permanece null. Dados vieram em PDF (Resultados PROVA),
// sem Tempo de voltas — por isso esta etapa não tem o campo `voltas` (volta a volta) e fica de
// fora dos gráficos de telemetria e da nota de equalização da Diretoria.
// "SANTOS" e "WILLIAM" são o mesmo EDU e WILLIAN já cadastrados desde o Turno 2.
const eliteT3C2: Etapa = {
  turno: 3,
  corrida: 2,
  tipo: 'invertida',
  categoria: 'elite',
  tracado: 115,
  resultados: [
    { nome: "JEFFERSON MELLO", voltas: 19, melhorVolta: 56.301, tempoTotalSeg: 1114.573 },
    { nome: "EDU", voltas: 19, melhorVolta: 56.778, tempoTotalSeg: 1114.675 },
    { nome: "KASSUGA", voltas: 19, melhorVolta: 56.667, tempoTotalSeg: 1115.026 },
    { nome: "ANDREOLI", voltas: 19, melhorVolta: 56.704, tempoTotalSeg: 1115.671 },
    { nome: "RICARDO MIRANDA", voltas: 19, melhorVolta: 57.076, tempoTotalSeg: 1115.923 },
    { nome: "FRANCO", voltas: 19, melhorVolta: 56.948, tempoTotalSeg: 1123.662 },
    { nome: "CAMACHO", voltas: 19, melhorVolta: 57.422, tempoTotalSeg: 1124.98 },
    { nome: "WILLIAN", voltas: 19, melhorVolta: 56.649, tempoTotalSeg: 1125.729 },
    { nome: "LUIZ", voltas: 19, melhorVolta: 56.958, tempoTotalSeg: 1126.312 },
    { nome: "ADREN", voltas: 19, melhorVolta: 57.395, tempoTotalSeg: 1127.381 },
    { nome: "GONÇALVES", voltas: 19, melhorVolta: 57.628, tempoTotalSeg: 1129.854 },
    { nome: "JUNIOR", voltas: 19, melhorVolta: 57.273, tempoTotalSeg: 1130.498 },
    { nome: "RODRIGO KASSUGA", voltas: 19, melhorVolta: 57.444, tempoTotalSeg: 1133.845 },
    { nome: "RAMOS", voltas: 19, melhorVolta: 58.155, tempoTotalSeg: 1146.764 },
    { nome: "DRACO", voltas: 19, melhorVolta: 58.378, tempoTotalSeg: 1147.016 },
  ],
  pole: null,
};

export default eliteT3C2;
