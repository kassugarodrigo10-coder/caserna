import type { Etapa } from '@/types';

// Turno 3, Corrida 2, Graduados — Kartódromo Internacional Granja Viana, traçado 115.
// Corrida invertida (grid formado pelo resultado da Corrida 1): a Tomada é só aquecimento,
// não gera pole nem define grid — pole permanece null. Dados vieram em PDF (Resultados PROVA),
// sem Tempo de voltas — por isso esta etapa não tem o campo `voltas` (volta a volta) e fica de
// fora dos gráficos de telemetria e da nota de equalização da Diretoria.
// "THIAGO CLEMENTINO" é piloto novo nesta corrida — confirmado com o usuário (já corria antes
// da existência do site, por isso não tinha registro aqui ainda).
// OLIVEIRA recebeu advertência de pista (ADV / "ADVERTIDO POR LIMITE DE PISTA") — marcada como
// advertenciaPista para não poder ser descartada do Campeonato Geral. Harrison, Saito e
// Fernandes receberam só "CONE" (toque leve, sem efeito na apuração).
const graduadosT3C2: Etapa = {
  turno: 3,
  corrida: 2,
  tipo: 'invertida',
  categoria: 'graduados',
  tracado: 115,
  resultados: [
    { nome: "FREDIANI", voltas: 18, melhorVolta: 57.046, tempoTotalSeg: 1096.056 },
    { nome: "HENRIQUE MIRANDA", voltas: 18, melhorVolta: 56.762, tempoTotalSeg: 1100.372 },
    { nome: "CLAUDEMIR", voltas: 18, melhorVolta: 57.908, tempoTotalSeg: 1116.279 },
    { nome: "RONI", voltas: 18, melhorVolta: 57.831, tempoTotalSeg: 1122.049 },
    { nome: "LUCAS MELO", voltas: 18, melhorVolta: 57.739, tempoTotalSeg: 1122.377 },
    { nome: "LEO FRANCO", voltas: 18, melhorVolta: 57.552, tempoTotalSeg: 1122.719 },
    { nome: "NASCIMENTO", voltas: 18, melhorVolta: 57.449, tempoTotalSeg: 1123.078 },
    { nome: "THIAGO CLEMENTINO", voltas: 18, melhorVolta: 57.49, tempoTotalSeg: 1123.727 },
    { nome: "LUCAS MORAIS", voltas: 18, melhorVolta: 57.366, tempoTotalSeg: 1125.544 },
    { nome: "OLIVEIRA", voltas: 18, melhorVolta: 57.014, tempoTotalSeg: 1126.428, advertenciaPista: true },
    { nome: "FABIO COSTA", voltas: 18, melhorVolta: 57.919, tempoTotalSeg: 1126.688 },
    { nome: "HARRISON", voltas: 18, melhorVolta: 57.81, tempoTotalSeg: 1132.554 },
    { nome: "TIO RICK", voltas: 18, melhorVolta: 58.635, tempoTotalSeg: 1135.231 },
    { nome: "SAITO", voltas: 18, melhorVolta: 58.363, tempoTotalSeg: 1141.554 },
    { nome: "FERNANDES", voltas: 18, melhorVolta: 58.286, tempoTotalSeg: 1146.409 },
    { nome: "GUIDO", voltas: 18, melhorVolta: 58.14, tempoTotalSeg: 1146.745 },
    { nome: "ANDRADE", voltas: 11, melhorVolta: 59.291, tempoTotalSeg: 706.047 },
  ],
  pole: null,
};

export default graduadosT3C2;
