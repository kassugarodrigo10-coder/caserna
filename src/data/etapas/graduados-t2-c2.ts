import type { Etapa } from '@/types';

// Turno 2, Corrida 2, Graduados — Kartódromo Internacional Granja Viana, traçado 134.
// Corrida invertida (grid formado pelo resultado da Corrida 1): a Tomada é só aquecimento,
// não gera pole nem define grid — pole permanece null.
// Dados vieram em PDF (Resultados PROVA + Resultados TOMADA), sem Tempo de voltas — por isso
// esta etapa não tem o campo `voltas` (volta a volta) e fica de fora dos gráficos de telemetria
// e da nota de equalização da Diretoria, que dependem de dado volta a volta.
// "VALE" veio só com o sobrenome — confirmado anteriormente com o usuário que é o mesmo ERIKE
// VALE já cadastrado desde a Corrida 1.
const graduadosT2C2: Etapa = {
  turno: 2,
  corrida: 2,
  tipo: 'invertida',
  categoria: 'graduados',
  tracado: 134,
  resultados: [
    { nome: "TIO RICK", voltas: 28, melhorVolta: 36.653, tempoTotalSeg: 1111.44 },
    { nome: "RONI", voltas: 28, melhorVolta: 36.48, tempoTotalSeg: 1115.294 },
    { nome: "ERIKE VALE", voltas: 28, melhorVolta: 36.904, tempoTotalSeg: 1121.005 },
    { nome: "OLIVEIRA", voltas: 28, melhorVolta: 36.859, tempoTotalSeg: 1121.345 },
    { nome: "LUCAS MORAIS", voltas: 28, melhorVolta: 36.967, tempoTotalSeg: 1122.352 },
    { nome: "FERNANDES", voltas: 28, melhorVolta: 37.094, tempoTotalSeg: 1122.723 },
    { nome: "GUIDO", voltas: 28, melhorVolta: 37.278, tempoTotalSeg: 1125.919 },
    { nome: "SAITO", voltas: 28, melhorVolta: 36.991, tempoTotalSeg: 1126.634 },
    { nome: "HARRISON", voltas: 28, melhorVolta: 36.799, tempoTotalSeg: 1130.238 },
    { nome: "ANDRADE", voltas: 28, melhorVolta: 37.257, tempoTotalSeg: 1132.008 },
    { nome: "NASCIMENTO", voltas: 28, melhorVolta: 36.752, tempoTotalSeg: 1132.108 },
    { nome: "CLAUDEMIR", voltas: 28, melhorVolta: 36.679, tempoTotalSeg: 1132.505 },
    { nome: "HENRIQUE MIRANDA", voltas: 28, melhorVolta: 36.816, tempoTotalSeg: 1140.132 },
    { nome: "FABIO COSTA", voltas: 28, melhorVolta: 36.941, tempoTotalSeg: 1143.61 },
    { nome: "SANGIULIANO", voltas: 28, melhorVolta: 37.223, tempoTotalSeg: 1146.258 },
    { nome: "MACKSON OLIVEIRA", voltas: 28, melhorVolta: 37.343, tempoTotalSeg: 1146.844 },
    { nome: "SERGIO ALMEIDA", voltas: 27, melhorVolta: 36.884, tempoTotalSeg: 1111.832 },
    { nome: "LUCAS MELO", voltas: 26, melhorVolta: 37.435, tempoTotalSeg: 1127.802 },
    { nome: "DANIEL", voltas: 21, melhorVolta: 37.538, tempoTotalSeg: 940.278 },
    { nome: "LUCCHESI", voltas: 17, melhorVolta: 36.859, tempoTotalSeg: 734.349 },
  ],
  pole: null,
};

export default graduadosT2C2;
