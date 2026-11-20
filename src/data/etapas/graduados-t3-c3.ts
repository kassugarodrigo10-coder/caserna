import type { Etapa } from '@/types';

// Turno 3, Corrida 3, Graduados — Kartódromo Internacional Granja Viana, traçado 144. Última
// etapa da Temporada 2026.
// "OLVIEIRA" veio com erro de digitação — confirmado com o usuário que é o mesmo OLIVEIRA já
// cadastrado.
// CAIO RODRIGUES e RODRIGUES correram normalmente aqui (são pilotos da própria Graduados,
// confirmados na lista oficial de pilotos desta corrida) — eles também correram na Elite nesta
// mesma data como convidados; ver elite-t3-c3.ts.
// FERNANDES recebeu uma advertência por limite de pista (ADV, anúncio "ADVERTIDO POR LIMITE DE
// PISTA (CONE)") — advertenciaPista: true, protege a etapa de ser descartada no geral.
// THIAGO CLEMENTINO também recebeu uma punição nesta corrida ("ADV", anúncio "ADVERTIDO POR
// ATITUDE ANTIDESPORTIVA SOBRE #29"), mas por ser uma advertência de conduta (não de limite de
// pista), não seta advertenciaPista — esse campo é especificamente para advertência de pista.
const graduadosT3C3: Etapa = {
  turno: 3,
  corrida: 3,
  tipo: 'normal',
  categoria: 'graduados',
  tracado: 144,
  resultados: [
    { nome: "FREDIANI", voltas: 19, melhorVolta: 54.163, tempoTotalSeg: 1108.353 },
    { nome: "LEO FRANCO", voltas: 19, melhorVolta: 54.105, tempoTotalSeg: 1108.817 },
    { nome: "HENRIQUE MIRANDA", voltas: 19, melhorVolta: 54.155, tempoTotalSeg: 1109.482 },
    { nome: "OLIVEIRA", voltas: 19, melhorVolta: 54.167, tempoTotalSeg: 1110.412 },
    { nome: "NASCIMENTO", voltas: 19, melhorVolta: 54.694, tempoTotalSeg: 1115.568 },
    { nome: "ANDRADE", voltas: 19, melhorVolta: 54.771, tempoTotalSeg: 1116.125 },
    { nome: "GUIDO", voltas: 19, melhorVolta: 54.753, tempoTotalSeg: 1116.528 },
    { nome: "SAITO", voltas: 19, melhorVolta: 54.511, tempoTotalSeg: 1119.304 },
    { nome: "HARRISON", voltas: 19, melhorVolta: 54.69, tempoTotalSeg: 1125.016 },
    { nome: "LUCAS MELO", voltas: 19, melhorVolta: 54.948, tempoTotalSeg: 1127.862 },
    { nome: "CAIO RODRIGUES", voltas: 19, melhorVolta: 54.629, tempoTotalSeg: 1132.416 },
    { nome: "FABIO COSTA", voltas: 19, melhorVolta: 54.819, tempoTotalSeg: 1133.583 },
    { nome: "CLAUDEMIR", voltas: 19, melhorVolta: 55.161, tempoTotalSeg: 1141.053 },
    { nome: "MACKSON OLIVEIRA", voltas: 19, melhorVolta: 55.101, tempoTotalSeg: 1141.297 },
    { nome: "RODRIGUES", voltas: 19, melhorVolta: 56.21, tempoTotalSeg: 1149.247 },
    { nome: "THIAGO CLEMENTINO", voltas: 19, melhorVolta: 55.297, tempoTotalSeg: 1155.363 },
    { nome: "FERNANDES", voltas: 19, melhorVolta: 55.512, tempoTotalSeg: 1165.11, advertenciaPista: true },
  ],
  pole: "HENRIQUE MIRANDA",
  voltas: {
    "FREDIANI": { tempos: [58.741, 55.968, 55.051, 54.617, 54.651, 54.826, 54.677, 54.607, 55.259, 54.526, 54.804, 55.213, 55.647, 54.563, 54.471, 54.317, 54.417, 54.163, 54.845] },
    "LEO FRANCO": { tempos: [59.031, 56.439, 54.695, 54.412, 54.596, 54.833, 54.937, 54.608, 55.811, 54.212, 54.461, 54.998, 55.651, 54.674, 54.417, 54.338, 54.468, 54.105, 55.138] },
    "HENRIQUE MIRANDA": { tempos: [60.533, 55.895, 55.454, 54.589, 54.315, 54.776, 54.469, 54.511, 54.856, 54.622, 55.104, 55.03, 56.178, 55.708, 54.155, 54.638, 54.365, 54.404, 54.171] },
    "OLIVEIRA": { tempos: [59.569, 56.858, 56.09, 55.326, 54.882, 54.747, 54.363, 54.94, 54.349, 54.835, 54.275, 54.167, 55.958, 55.281, 55.022, 54.539, 54.249, 54.613, 54.509] },
    "NASCIMENTO": { tempos: [59.517, 55.773, 55.536, 55.334, 54.994, 55.769, 54.915, 55.373, 55.248, 55.371, 54.912, 54.694, 54.706, 54.824, 55.554, 54.866, 55.421, 54.758, 54.694] },
    "ANDRADE": { tempos: [59.362, 56.063, 56.032, 55.144, 55.123, 55.507, 54.922, 55.326, 55.13, 55.411, 54.863, 54.844, 55.344, 55.267, 55.027, 54.815, 54.893, 54.902, 54.771] },
    "GUIDO": { tempos: [58.556, 56.09, 55.518, 55.376, 55.132, 55.206, 55.313, 54.932, 55.318, 55.321, 54.876, 54.854, 55.229, 55.438, 54.859, 55.098, 54.753, 54.827, 54.916] },
    "SAITO": { tempos: [59.702, 58.467, 55.858, 55.679, 56.027, 55.019, 54.724, 55.08, 54.883, 54.993, 55.177, 54.632, 55.345, 54.511, 54.844, 55.055, 55.236, 54.9, 55.247] },
    "HARRISON": { tempos: [58.255, 57.1, 55.464, 57.076, 56.108, 56.564, 56.863, 54.767, 55.937, 55.218, 55.197, 55.259, 54.996, 54.69, 54.988, 54.821, 55.159, 55.214, 55.226] },
    "LUCAS MELO": { tempos: [59.047, 56.124, 57.017, 56.018, 55.806, 55.738, 55.718, 55.369, 56.418, 55.659, 55.948, 54.948, 55.145, 55.236, 55.298, 55.189, 55.415, 55.215, 56.109] },
    "CAIO RODRIGUES": { tempos: [60.634, 57.544, 56.073, 56.559, 55.393, 56.256, 56.122, 56.647, 55.803, 54.629, 58.384, 55.218, 55.306, 55.496, 55.271, 55.373, 54.922, 55.488, 55.415] },
    "FABIO COSTA": { tempos: [67.095, 55.342, 55.014, 56.154, 55.365, 55.975, 55.746, 55.779, 56.244, 54.83, 59.754, 55.361, 55.3, 55.317, 55.425, 54.992, 55.429, 55.125, 54.819] },
    "CLAUDEMIR": { tempos: [59.403, 60.524, 56.204, 56.325, 55.32, 56.411, 56.068, 55.418, 55.161, 55.822, 64.13, 55.901, 55.371, 55.598, 55.904, 55.717, 55.748, 55.322, 56.825] },
    "MACKSON OLIVEIRA": { tempos: [62.697, 56.516, 57.146, 55.842, 55.734, 56.039, 55.699, 55.69, 56.681, 55.238, 63.608, 55.274, 55.95, 55.101, 55.371, 55.473, 55.79, 55.468, 56.583] },
    "RODRIGUES": { tempos: [59.589, 58.302, 56.842, 56.857, 56.513, 56.423, 56.901, 56.733, 57.055, 57.238, 57.055, 56.687, 56.278, 56.21, 57.211, 56.451, 56.891, 56.386, 57.117] },
    "THIAGO CLEMENTINO": { tempos: [61.612, 57.111, 55.569, 56.302, 55.655, 56.774, 56.691, 55.452, 55.297, 55.566, 66.07, 56.173, 55.503, 55.937, 55.727, 56.419, 56.864, 55.808, 56.234] },
    "FERNANDES": { tempos: [59.906, 56.993, 55.712, 56.493, 56.048, 56.722, 56.924, 57.371, 55.512, 55.583, 63.499, 56.16, 56.839, 56.055, 55.887, 56.487, 56.435, 56.175, 56.138] },
  },
};

export default graduadosT3C3;
