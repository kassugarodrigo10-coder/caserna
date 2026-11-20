import type { Etapa } from '@/types';

// Turno 3, Corrida 3, Elite — Kartódromo Internacional Granja Viana, traçado 144. Última etapa
// da Temporada 2026.
// "WILLIAM"/"JÚNIOR"/"SANTOS" normalizados para os apelidos já em uso desde o Turno 2 (WILLIAN,
// JUNIOR, EDU, respectivamente).
// CAIO RODRIGUES e MARCELO RODRIGUES correram como convidados nesta prova (são pilotos da
// Graduados, confirmados na lista oficial de pilotos da Graduados desta data, mas não na lista
// da Elite) — por orientação já estabelecida do usuário, convidados não entram na etapa: foram
// removidos do resultado e todo mundo atrás deles subiu de posição, como se eles não tivessem
// corrido. Eles entram normalmente no resultado da Graduados (graduados-t3-c3.ts), onde
// "RODRIGUES" é o mesmo piloto que aqui aparece com o nome completo "MARCELO RODRIGUES".
const eliteT3C3: Etapa = {
  turno: 3,
  corrida: 3,
  tipo: 'normal',
  categoria: 'elite',
  tracado: 144,
  resultados: [
    { nome: "KASSUGA", voltas: 19, melhorVolta: 53.607, tempoTotalSeg: 1094.177 },
    { nome: "JEFFERSON MELLO", voltas: 19, melhorVolta: 53.581, tempoTotalSeg: 1094.48 },
    { nome: "ANDREOLI", voltas: 19, melhorVolta: 53.796, tempoTotalSeg: 1097.734 },
    { nome: "RICARDO MIRANDA", voltas: 19, melhorVolta: 54.039, tempoTotalSeg: 1098.603 },
    { nome: "WILLIAN", voltas: 19, melhorVolta: 53.92, tempoTotalSeg: 1101.162 },
    { nome: "JUNIOR", voltas: 19, melhorVolta: 53.97, tempoTotalSeg: 1102.661 },
    { nome: "FRANCO", voltas: 19, melhorVolta: 53.95, tempoTotalSeg: 1105.352 },
    { nome: "EDU", voltas: 19, melhorVolta: 54.238, tempoTotalSeg: 1105.462 },
    { nome: "LUIZ", voltas: 19, melhorVolta: 54.249, tempoTotalSeg: 1109.964 },
    { nome: "RODRIGO KASSUGA", voltas: 19, melhorVolta: 54.22, tempoTotalSeg: 1110.138 },
    { nome: "ADREN", voltas: 19, melhorVolta: 54.052, tempoTotalSeg: 1110.649 },
    { nome: "DRACO", voltas: 19, melhorVolta: 53.904, tempoTotalSeg: 1111.15 },
    { nome: "TURCO", voltas: 19, melhorVolta: 54.425, tempoTotalSeg: 1114.358 },
    { nome: "CAMACHO", voltas: 19, melhorVolta: 54.656, tempoTotalSeg: 1119.792 },
    { nome: "GONÇALVES", voltas: 19, melhorVolta: 54.549, tempoTotalSeg: 1124.957 },
  ],
  pole: "KASSUGA",
  voltas: {
    "KASSUGA": { tempos: [59.474, 54.237, 54.418, 54.386, 53.935, 53.966, 53.834, 53.818, 54.182, 54.53, 53.789, 53.752, 53.845, 53.787, 53.656, 53.732, 53.607, 56.115, 53.783] },
    "JEFFERSON MELLO": { tempos: [58.239, 54.984, 54.189, 54.131, 54.001, 54.465, 54.038, 54.056, 54.061, 54.584, 53.808, 53.581, 53.888, 53.873, 53.735, 53.884, 53.623, 56.381, 53.951] },
    "ANDREOLI": { tempos: [57.852, 54.536, 54.38, 54.245, 54.266, 54.471, 54.031, 54.037, 54.17, 54.624, 54.323, 54.257, 54.15, 53.977, 54.091, 53.796, 54.293, 54.126, 54.392] },
    "RICARDO MIRANDA": { tempos: [57.695, 54.577, 55.017, 54.997, 54.216, 54.167, 54.167, 54.101, 54.077, 54.039, 54.486, 54.076, 54.079, 54.045, 54.823, 54.161, 54.774, 54.8, 54.461] },
    "WILLIAN": { tempos: [59.147, 54.555, 54.225, 54.658, 54.258, 54.103, 54.168, 54.002, 53.92, 54.915, 54.939, 54.309, 54.127, 54.626, 54.878, 54.392, 54.307, 54.336, 54.513] },
    "JUNIOR": { tempos: [58.69, 55.165, 54.039, 54.558, 54.187, 54.308, 54.068, 53.97, 54.516, 54.926, 54.929, 54.322, 54.179, 54.7, 55.37, 54.552, 54.43, 55.028, 54.708] },
    "FRANCO": { tempos: [59.736, 54.539, 55.255, 54.59, 54.47, 55.734, 54.22, 54.584, 54.43, 54.346, 54.613, 54.221, 54.551, 54.276, 53.95, 54.665, 54.124, 54.737, 54.589] },
    "EDU": { tempos: [59.722, 54.945, 54.284, 54.768, 54.43, 54.686, 54.402, 54.532, 54.351, 55.075, 54.459, 54.477, 54.951, 54.255, 54.629, 54.573, 54.238, 55.223, 54.563] },
    "LUIZ": { tempos: [58.971, 54.729, 55.014, 54.819, 54.52, 55.711, 54.886, 54.402, 54.249, 54.888, 54.611, 54.806, 54.386, 54.547, 55.183, 55.826, 54.724, 54.669, 54.911] },
    "RODRIGO KASSUGA": { tempos: [61.589, 55.067, 54.633, 54.373, 54.803, 54.723, 54.807, 54.439, 54.22, 54.959, 54.742, 54.687, 54.236, 54.444, 55.174, 55.191, 55.634, 55.014, 54.318] },
    "ADREN": { tempos: [61.277, 55.763, 55.318, 55.579, 54.972, 55.193, 55.095, 55.106, 54.57, 54.846, 54.417, 54.185, 54.144, 54.079, 54.052, 54.147, 54.542, 55.396, 54.069] },
    "DRACO": { tempos: [61.565, 55.603, 55.532, 56.234, 55.087, 54.897, 55.107, 54.93, 54.457, 54.521, 54.345, 54.121, 54.257, 54.05, 54.222, 53.904, 54.221, 56.6, 54.052] },
    "TURCO": { tempos: [62.254, 55.448, 55.471, 54.989, 54.496, 54.563, 55.563, 54.765, 54.425, 54.78, 54.747, 54.577, 54.478, 55.157, 54.628, 54.738, 54.556, 54.947, 54.433] },
    "CAMACHO": { tempos: [59.831, 55.616, 55.586, 55.613, 54.971, 55.157, 55.206, 57.048, 55.034, 55.274, 54.96, 55.163, 55.136, 55.026, 54.968, 54.839, 54.656, 55.142, 55.489] },
    "GONÇALVES": { tempos: [69.266, 54.977, 55.271, 54.549, 55.08, 54.926, 55.624, 54.652, 55.08, 54.597, 54.734, 54.719, 55.189, 55.341, 55.187, 55.078, 54.931, 55.11, 55.709] },
  },
};

export default eliteT3C3;
