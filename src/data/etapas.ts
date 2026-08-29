import type { Etapa, Penalidade, Falta } from '@/types';
import eliteT2C2 from './etapas/elite-t2-c2';
import baseT2C1 from './etapas/base-t2-c1';
import graduadosT2C1 from './etapas/graduados-t2-c1';
import eliteT2C1 from './etapas/elite-t2-c1';
import baseT2C3 from './etapas/base-t2-c3';
import graduadosT2C3 from './etapas/graduados-t2-c3';
import eliteT2C3 from './etapas/elite-t2-c3';

// Toda nova etapa entra aqui como um novo item deste array — nenhuma tela precisa mudar.
export const etapas: Etapa[] = [
  eliteT2C2,
  baseT2C1,
  graduadosT2C1,
  eliteT2C1,
  baseT2C3,
  graduadosT2C3,
  eliteT2C3,
];

// Pontos perdidos por ocorrência disciplinar da organização do Caserna (não a ADV de pista,
// essa já vem refletida na posição final do resultado). Alimentado manualmente por Sr. Kassuga,
// sem motivo exposto nas telas públicas.
export const penalidades: Penalidade[] = [];

// Faltas não justificáveis — usadas só como coluna de contexto na Diretoria, não como corte.
export const faltas: Falta[] = [];
