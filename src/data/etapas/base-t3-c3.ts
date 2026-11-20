import type { Etapa } from '@/types';

// Turno 3, Corrida 3, Base — Kartódromo Internacional Granja Viana, traçado 101. Última etapa
// da Temporada 2026.
// Vários pilotos vieram com nome completo pela primeira vez — confirmado com o usuário que são
// as mesmas pessoas já cadastradas desde turnos anteriores, normalizados de volta para o nome
// já em uso: "FERNANDA MICHAELLI"→FERNANDINHA, "ENRICO PAIVA"→ENRICO, "WEVERSON CARNEIRO"→
// CARNEIRO, "MESSIAS ALVES"→MESSIAS, "LUIZ FAGNER"→FAGNER, "ALCIRIO CAVALCANTE"→ALCIRIO,
// "ALTAIR ANTONIO"→ALTAIR, "WASHINTON MARQUES" (sem o G)→WASHINGTON.
// Dois pilotos chamados "GUSTAVO AUGUSTO" correram nesta prova, com karts diferentes (#016 e
// #013). Por orientação do usuário: o do kart #016 é o GUSTAVO já cadastrado desde o Turno 2
// (mantido como "GUSTAVO"); o do kart #013 é o MUNHOZ já cadastrado desde o Turno 2 (confirmado
// com o usuário), normalizado para "MUNHOZ".
const baseT3C3: Etapa = {
  turno: 3,
  corrida: 3,
  tipo: 'normal',
  categoria: 'base',
  tracado: 101,
  resultados: [
    { nome: "ENRICO", voltas: 21, melhorVolta: 48.438, tempoTotalSeg: 1089.081 },
    { nome: "FERNANDINHA", voltas: 21, melhorVolta: 48.56, tempoTotalSeg: 1092.099 },
    { nome: "IGOR HENRIQUE", voltas: 21, melhorVolta: 48.419, tempoTotalSeg: 1094.133 },
    { nome: "LEANDRO KEMP", voltas: 21, melhorVolta: 48.728, tempoTotalSeg: 1103.575 },
    { nome: "BRUNO PAULINO", voltas: 21, melhorVolta: 49.054, tempoTotalSeg: 1111.537 },
    { nome: "CARNEIRO", voltas: 21, melhorVolta: 48.824, tempoTotalSeg: 1111.715 },
    { nome: "MESSIAS", voltas: 21, melhorVolta: 48.641, tempoTotalSeg: 1112.223 },
    { nome: "DABIEL SILVA", voltas: 21, melhorVolta: 48.7, tempoTotalSeg: 1113.128 },
    { nome: "ANDRÉ RICARDO", voltas: 21, melhorVolta: 48.975, tempoTotalSeg: 1116.743 },
    { nome: "DANIEL UBEDA", voltas: 21, melhorVolta: 48.59, tempoTotalSeg: 1117.187 },
    { nome: "GUSTAVO", voltas: 21, melhorVolta: 48.192, tempoTotalSeg: 1117.338 },
    { nome: "ERIC FARIA", voltas: 21, melhorVolta: 49.494, tempoTotalSeg: 1121.973 },
    { nome: "MUNHOZ", voltas: 21, melhorVolta: 48.833, tempoTotalSeg: 1122.524 },
    { nome: "TIAGO PAULINO", voltas: 21, melhorVolta: 49.608, tempoTotalSeg: 1127.633 },
    { nome: "YGOR HENRIQUE", voltas: 21, melhorVolta: 48.734, tempoTotalSeg: 1129.762 },
    { nome: "RODRIGO DA SILVA", voltas: 21, melhorVolta: 50.339, tempoTotalSeg: 1137.429 },
    { nome: "MATHEUS VON GAL", voltas: 21, melhorVolta: 48.99, tempoTotalSeg: 1144.036 },
    { nome: "FAGNER", voltas: 20, melhorVolta: 49.897, tempoTotalSeg: 1096.692 },
    { nome: "WADLEI DA CRUZ", voltas: 20, melhorVolta: 50.293, tempoTotalSeg: 1097.129 },
    { nome: "DANIEL BREITHAUPT", voltas: 20, melhorVolta: 50.886, tempoTotalSeg: 1100.949 },
    { nome: "CLAUDIO GUILHERME", voltas: 20, melhorVolta: 49.747, tempoTotalSeg: 1105.564 },
    { nome: "GUILHERME FRANCISCO", voltas: 20, melhorVolta: 50.783, tempoTotalSeg: 1105.755 },
    { nome: "CARLOS GUILHERME", voltas: 20, melhorVolta: 49.912, tempoTotalSeg: 1119.224 },
    { nome: "ALCIRIO", voltas: 20, melhorVolta: 50.14, tempoTotalSeg: 1121.863 },
    { nome: "MATEUS MARIANO", voltas: 20, melhorVolta: 51.297, tempoTotalSeg: 1136.055 },
    { nome: "ALTAIR", voltas: 20, melhorVolta: 51.512, tempoTotalSeg: 1139.277 },
    { nome: "WASHINGTON", voltas: 19, melhorVolta: 52.253, tempoTotalSeg: 1107.452 },
    { nome: "GABRIEL VICTOR", voltas: 19, melhorVolta: 51.347, tempoTotalSeg: 1112.773 },
  ],
  pole: "GUSTAVO",
  voltas: {
    "ENRICO": { tempos: [49.158, 48.785, 48.967, 49.05, 48.438, 48.756, 48.786, 49.231, 48.732, 49.043, 49.154, 48.908, 48.785, 48.475, 48.564, 48.877, 48.619, 49.11, 48.778, 49.369, 48.53] },
    "FERNANDINHA": { tempos: [49.283, 48.891, 48.994, 48.621, 49.033, 49.024, 48.763, 49.326, 49.281, 48.729, 49.153, 48.89, 48.56, 48.879, 48.618, 48.976, 48.714, 49.189, 48.836, 49.291, 49.096] },
    "IGOR HENRIQUE": { tempos: [50.281, 49.485, 49.286, 49.568, 49.024, 48.825, 49.273, 48.419, 49.032, 49.202, 48.567, 48.837, 48.568, 48.783, 48.556, 48.52, 48.881, 48.811, 48.732, 49.728, 49.167] },
    "LEANDRO KEMP": { tempos: [50.564, 50.325, 49.13, 49.345, 49.962, 50.639, 49.463, 50.139, 49.919, 49.335, 49.448, 49.767, 49.06, 49.165, 49.021, 49.165, 48.728, 48.852, 48.779, 49.154, 49.168] },
    "BRUNO PAULINO": { tempos: [49.864, 49.621, 49.054, 49.462, 50.482, 49.566, 49.469, 50.546, 49.576, 49.674, 49.584, 49.766, 50.989, 49.333, 49.845, 49.431, 50.093, 49.727, 50.481, 49.607, 49.708] },
    "CARNEIRO": { tempos: [49.463, 49.878, 49.373, 48.824, 49.967, 49.586, 49.304, 50.784, 49.983, 49.969, 48.883, 50.148, 50.342, 49.444, 50.251, 49.77, 49.312, 49.693, 50.483, 49.524, 49.75] },
    "MESSIAS": { tempos: [50.12, 50.995, 49.472, 49.424, 49.839, 50.073, 49.162, 48.995, 50.116, 49.806, 49.049, 49.576, 50.319, 50.276, 49.668, 49.818, 50.534, 48.641, 49.634, 49.563, 49.923] },
    "DABIEL SILVA": { tempos: [50.304, 49.839, 48.917, 49.1, 49.908, 50.718, 49.466, 50.224, 49.873, 50.521, 48.704, 49.496, 50.826, 49.439, 50.232, 50.688, 49.652, 48.7, 50.678, 49.811, 50.093] },
    "ANDRÉ RICARDO": { tempos: [50.193, 50.448, 49.258, 49.988, 50.776, 49.443, 49.398, 49.07, 49.044, 49.175, 48.975, 49.475, 50.102, 49.656, 50.291, 49.336, 50.398, 49.676, 50.885, 49.608, 54.007] },
    "DANIEL UBEDA": { tempos: [50.46, 51.474, 49.311, 50.009, 49.214, 49.829, 49.549, 49.675, 49.114, 49.269, 48.59, 49.6, 50.335, 52.808, 49.779, 49.016, 49.219, 49.554, 48.995, 49.922, 53.573] },
    "GUSTAVO": { tempos: [49.218, 48.827, 49.009, 48.771, 48.556, 48.604, 48.613, 49.483, 48.447, 48.49, 49.61, 48.535, 48.934, 48.49, 48.712, 49.148, 48.192, 49.077, 49.657, 77.336, 48.984] },
    "ERIC FARIA": { tempos: [50.777, 50.108, 49.833, 49.704, 50.328, 51.234, 49.552, 49.848, 49.965, 49.726, 50.072, 50.497, 49.549, 49.494, 49.751, 51.321, 49.916, 49.908, 50.203, 51.017, 49.654] },
    "MUNHOZ": { tempos: [49.835, 49.843, 49.623, 50.154, 59.17, 49.733, 48.833, 49.819, 56.897, 50.859, 49.157, 49.187, 50.651, 49.777, 49.339, 48.903, 49.482, 49.009, 49.079, 49.048, 50.052] },
    "TIAGO PAULINO": { tempos: [51.974, 50.733, 49.721, 50.045, 50.947, 50.232, 49.67, 49.608, 50.881, 51.1, 50.792, 51.01, 51.06, 50.817, 49.631, 49.868, 49.695, 50.676, 49.775, 49.835, 49.913] },
    "YGOR HENRIQUE": { tempos: [50.079, 50.126, 49.596, 49.48, 50.085, 50.091, 49.294, 50.726, 48.97, 49.714, 49.536, 49.25, 48.907, 69.929, 49.194, 48.971, 49.996, 49.575, 49.184, 49.839, 48.734] },
    "RODRIGO DA SILVA": { tempos: [52.341, 50.963, 50.541, 50.526, 50.341, 51.121, 50.73, 50.381, 50.485, 51.003, 50.349, 50.339, 50.458, 50.885, 50.503, 50.465, 51.149, 51.258, 50.708, 50.403, 51.993] },
    "MATHEUS VON GAL": { tempos: [49.29, 50.835, 50.226, 49.275, 49.666, 49.041, 50.153, 49.461, 49.946, 51.936, 51.29, 49.203, 49.381, 50.363, 49.697, 49.281, 49.734, 49.888, 48.99, 49.703, 50.102] },
    "FAGNER": { tempos: [53.369, 51.359, 51.199, 51.521, 52.521, 50.52, 50.589, 51.269, 49.897, 50.423, 50.545, 50.925, 52.227, 50.168, 51.99, 50.406, 50.725, 50.392, 54.671, 51.21] },
    "WADLEI DA CRUZ": { tempos: [52.047, 51.16, 51.116, 51.693, 51.131, 50.806, 51.526, 50.707, 51.764, 50.308, 50.859, 50.885, 52.094, 50.293, 51.619, 50.479, 50.713, 51.876, 53.492, 50.721] },
    "DANIEL BREITHAUPT": { tempos: [52.034, 51.858, 51.053, 51.69, 51.856, 51.288, 52.197, 51.721, 51.85, 51.418, 51.362, 51.272, 50.895, 51.443, 51.972, 51.006, 51.769, 50.886, 51.409, 51.013] },
    "CLAUDIO GUILHERME": { tempos: [53.193, 51.111, 51.445, 51.378, 51.688, 50.806, 49.747, 51.942, 50.872, 49.93, 50.973, 51.079, 51.201, 49.945, 50.871, 50.895, 54.214, 49.952, 52.389, 49.78] },
    "GUILHERME FRANCISCO": { tempos: [53.892, 51.055, 51.44, 51.005, 52.038, 51.948, 51.409, 50.923, 51.745, 52.195, 51.727, 50.909, 51.016, 53.421, 52.904, 52.155, 51.285, 51.607, 51.074, 50.783] },
    "CARLOS GUILHERME": { tempos: [51.806, 50.944, 50.795, 75.954, 51.524, 51.05, 51.739, 50.656, 50.812, 51.371, 51.141, 51.397, 54.157, 52.512, 50.653, 49.912, 50.291, 50.702, 50.136, 50.12] },
    "ALCIRIO": { tempos: [53.56, 61.859, 51.694, 54.586, 52.865, 53.557, 51.699, 50.743, 51.071, 52.562, 51.199, 51.099, 53.367, 51.582, 52.756, 50.647, 50.14, 50.489, 50.768, 51.087] },
    "MATEUS MARIANO": { tempos: [54.068, 53.078, 52.222, 51.769, 52.307, 52.705, 52.347, 52.695, 51.341, 54.462, 52.147, 52.395, 51.297, 51.932, 52.544, 64.687, 51.608, 52.49, 53.078, 51.888] },
    "ALTAIR": { tempos: [54.15, 54.555, 52.215, 54.157, 53.576, 51.972, 52.212, 52.536, 52.066, 53.465, 53.395, 51.667, 51.618, 51.512, 60.178, 52.864, 52.519, 52.852, 52.786, 55.784] },
    "WASHINGTON": { tempos: [52.668, 53.152, 52.537, 53.752, 52.253, 52.786, 52.44, 52.494, 53.297, 52.353, 52.333, 74.291, 54.317, 54.822, 54.125, 54.668, 53.699, 53.858, 54.043] },
    "GABRIEL VICTOR": { tempos: [53.899, 60.912, 52.827, 54.465, 52.75, 54.326, 55.174, 54.436, 53.042, 52.736, 53.817, 51.806, 51.367, 51.488, 53.417, 52.036, 52.248, 66.996, 51.347] },
  },
};

export default baseT3C3;
