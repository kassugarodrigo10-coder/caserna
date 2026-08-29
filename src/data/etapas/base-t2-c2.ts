import type { Etapa } from '@/types';

// Turno 2, Corrida 2, Base — Kartódromo Internacional Granja Viana, traçado 134.
// Corrida invertida (grid formado pelo resultado da Corrida 1): a Tomada é só aquecimento,
// não gera pole nem define grid — pole permanece null.
// Dados vieram em PDF (Resultados PROVA + Resultados TOMADA), sem Tempo de voltas — por isso
// esta etapa não tem o campo `voltas` (volta a volta) e fica de fora dos gráficos de telemetria
// e da nota de equalização da Diretoria, que dependem de dado volta a volta.
// "ANDRE TODORO" veio sem acento e com as letras trocadas — mantida a grafia já usada desde a
// Corrida 1 (ANDRÉ TORODO).
const baseT2C2: Etapa = {
  turno: 2,
  corrida: 2,
  tipo: 'invertida',
  categoria: 'base',
  tracado: 134,
  resultados: [
    { nome: "GUSTAVO", voltas: 27, melhorVolta: 37.057, tempoTotalSeg: 1080.305 },
    { nome: "IGOR", voltas: 27, melhorVolta: 36.803, tempoTotalSeg: 1084.907 },
    { nome: "MESSIAS", voltas: 27, melhorVolta: 37.29, tempoTotalSeg: 1090.397 },
    { nome: "SANTANA", voltas: 27, melhorVolta: 37.257, tempoTotalSeg: 1090.679 },
    { nome: "MUNHOZ", voltas: 27, melhorVolta: 37.314, tempoTotalSeg: 1094.912 },
    { nome: "STAMATO", voltas: 27, melhorVolta: 37.526, tempoTotalSeg: 1095.326 },
    { nome: "DANIEL CARVALHO", voltas: 27, melhorVolta: 37.628, tempoTotalSeg: 1099.02 },
    { nome: "ANDRÉ TORODO", voltas: 27, melhorVolta: 37.388, tempoTotalSeg: 1099.998 },
    { nome: "ERIC ROSSELL", voltas: 27, melhorVolta: 37.26, tempoTotalSeg: 1100.663 },
    { nome: "MAURICIO", voltas: 27, melhorVolta: 37.042, tempoTotalSeg: 1101.183 },
    { nome: "NECO", voltas: 27, melhorVolta: 37.492, tempoTotalSeg: 1104.218 },
    { nome: "TUTO", voltas: 27, melhorVolta: 38.129, tempoTotalSeg: 1115.237 },
    { nome: "F. MOREIRA", voltas: 26, melhorVolta: 37.59, tempoTotalSeg: 1085.895 },
    { nome: "TIAGO LONGO", voltas: 26, melhorVolta: 38.27, tempoTotalSeg: 1091.819 },
    { nome: "CLAUDIO CARVALHO", voltas: 26, melhorVolta: 38.249, tempoTotalSeg: 1092.249 },
    { nome: "LONGO", voltas: 26, melhorVolta: 37.72, tempoTotalSeg: 1097.583 },
    { nome: "RODRIGO SOUZA", voltas: 26, melhorVolta: 38.495, tempoTotalSeg: 1100.525 },
    { nome: "FAGNER", voltas: 26, melhorVolta: 37.217, tempoTotalSeg: 1100.946 },
    { nome: "DINHO", voltas: 26, melhorVolta: 38.395, tempoTotalSeg: 1112.75 },
    { nome: "FERNANDINHA", voltas: 26, melhorVolta: 37.363, tempoTotalSeg: 1119.109 },
    { nome: "SALES", voltas: 25, melhorVolta: 39.574, tempoTotalSeg: 1094.793 },
    { nome: "GUILHERME MUNHOZ", voltas: 25, melhorVolta: 38.55, tempoTotalSeg: 1116.375 },
    { nome: "WASHINGTON", voltas: 24, melhorVolta: 40.315, tempoTotalSeg: 1087.513 },
  ],
  pole: null,
};

export default baseT2C2;
