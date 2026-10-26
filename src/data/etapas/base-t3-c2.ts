import type { Etapa } from '@/types';

// Turno 3, Corrida 2, Base — Kartódromo Internacional Granja Viana, traçado 101.
// Corrida invertida (grid formado pelo resultado da Corrida 1): a Tomada é só aquecimento,
// não gera pole nem define grid — pole permanece null. Dados vieram em PDF (Resultados PROVA),
// sem Tempo de voltas — por isso esta etapa não tem o campo `voltas` (volta a volta) e fica de
// fora dos gráficos de telemetria e da nota de equalização da Diretoria.
// "GUIHERME" veio só com o primeiro nome (e sem o "L") — confirmado com o usuário que é o mesmo
// GUILHERME MUNHOZ já cadastrado.
// "ALCIRIO" e "SANDRA" são pilotos novos nesta corrida — confirmado com o usuário (o Alcirio já
// corria antes da existência do site, por isso não tinha registro aqui ainda).
const baseT3C2: Etapa = {
  turno: 3,
  corrida: 2,
  tipo: 'invertida',
  categoria: 'base',
  tracado: 101,
  resultados: [
    { nome: "GUSTAVO", voltas: 17, melhorVolta: 60.486, tempoTotalSeg: 1101.32 },
    { nome: "FERNANDINHA", voltas: 17, melhorVolta: 60.726, tempoTotalSeg: 1102.995 },
    { nome: "ENRICO", voltas: 17, melhorVolta: 60.831, tempoTotalSeg: 1103.584 },
    { nome: "MESSIAS", voltas: 17, melhorVolta: 60.625, tempoTotalSeg: 1103.897 },
    { nome: "DANIEL CARVALHO", voltas: 17, melhorVolta: 61.023, tempoTotalSeg: 1116.822 },
    { nome: "LONGO", voltas: 17, melhorVolta: 61.424, tempoTotalSeg: 1117.845 },
    { nome: "ANDRÉ TORODO", voltas: 17, melhorVolta: 61.342, tempoTotalSeg: 1119.575 },
    { nome: "ERIC ROSSELL", voltas: 17, melhorVolta: 61.037, tempoTotalSeg: 1120.801 },
    { nome: "TUTO", voltas: 17, melhorVolta: 61.352, tempoTotalSeg: 1124.225 },
    { nome: "IGOR HENRIQUE", voltas: 17, melhorVolta: 61.791, tempoTotalSeg: 1133.358 },
    { nome: "TIAGO LONGO", voltas: 17, melhorVolta: 62.316, tempoTotalSeg: 1135.556 },
    { nome: "SILVA LIMA", voltas: 17, melhorVolta: 61.915, tempoTotalSeg: 1137.902 },
    { nome: "STAMATO", voltas: 17, melhorVolta: 61.701, tempoTotalSeg: 1141.004 },
    { nome: "CARNEIRO", voltas: 17, melhorVolta: 62.523, tempoTotalSeg: 1142.16 },
    { nome: "MAURICIO", voltas: 17, melhorVolta: 61.073, tempoTotalSeg: 1144.547 },
    { nome: "FALOPPA", voltas: 17, melhorVolta: 63.323, tempoTotalSeg: 1154.353 },
    { nome: "YGOR ALMEIDA", voltas: 17, melhorVolta: 62.544, tempoTotalSeg: 1158.473 },
    { nome: "RODRIGO SOUZA", voltas: 17, melhorVolta: 63.042, tempoTotalSeg: 1162.083 },
    { nome: "GUILHERME MUNHOZ", voltas: 16, melhorVolta: 64.083, tempoTotalSeg: 1117.471 },
    { nome: "SALES", voltas: 16, melhorVolta: 64.306, tempoTotalSeg: 1117.647 },
    { nome: "CLAUDIO CARVALHO", voltas: 16, melhorVolta: 64.583, tempoTotalSeg: 1131.491 },
    { nome: "MARIANO ALVES", voltas: 16, melhorVolta: 64.845, tempoTotalSeg: 1141.972 },
    { nome: "MOURA", voltas: 16, melhorVolta: 66.284, tempoTotalSeg: 1171.932 },
    { nome: "ALTAIR", voltas: 15, melhorVolta: 67.361, tempoTotalSeg: 1106.77 },
    { nome: "ALCIRIO", voltas: 15, melhorVolta: 64.451, tempoTotalSeg: 1113.343 },
    { nome: "KELLY", voltas: 14, melhorVolta: 72.594, tempoTotalSeg: 1124.499 },
    { nome: "SANDRA", voltas: 11, melhorVolta: 94.183, tempoTotalSeg: 1147.26 },
  ],
  pole: null,
};

export default baseT3C2;
