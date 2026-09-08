// Estatísticas da Disputa pela Camisa Branca (Categoria Elite) do 1º Turno de 2026.
// O usuário processou e enviou só os totais de Pole/VMR/Pódios do Turno 1 (a disputa em
// si), não os arquivos brutos corrida a corrida — por isso não existe uma etapa completa
// de Turno 1 em src/data/etapas, só esses totais agregados por piloto. O Turno 1 já está
// encerrado: 3 corridas completas, das quais 2 dão pole de verdade (a Corrida 2 de cada
// turno é invertida e não gera pole, igual às demais).
export const camisaBrancaTurno1 = {
  corridasComputadas: 3,
  poleCorridasComputadas: 2,
  poles: {
    CAMACHO: 1,
    'JEFFERSON MELLO': 1,
  } as Record<string, number>,
  vr: {
    'RICARDO MIRANDA': 1,
    PASQUALOTTO: 1,
    'JEFFERSON MELLO': 1,
  } as Record<string, number>,
  podios: {
    PASQUALOTTO: 3,
    ANDREOLI: 2,
    'RICARDO MIRANDA': 2,
    LUIZ: 2,
    GONÇALVES: 2,
    CAMACHO: 2,
    KASSUGA: 1,
    GOUVÊA: 1,
    RAMOS: 1,
    'JEFFERSON MELLO': 1,
    TURCO: 1,
  } as Record<string, number>,
};
