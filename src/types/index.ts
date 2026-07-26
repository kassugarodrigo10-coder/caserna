export type Categoria = 'base' | 'graduados' | 'elite';
export type TipoCorrida = 'normal' | 'invertida';
export type Turno = 1 | 2 | 3;

export interface ResultadoPiloto {
  nome: string;
  voltas: number;
  melhorVolta: number; // segundos
  tempoTotalSeg: number;
  /** Advertência de pista aplicada pelo kartódromo nesta etapa — já refletida na posição final. */
  advertenciaPista?: boolean;
}

export interface VoltasPiloto {
  tempos: number[]; // tempo de cada volta, em segundos
  vel?: number[]; // velocidade média de cada volta, em km/h
}

export interface Etapa {
  turno: Turno;
  corrida: 1 | 2 | 3;
  tipo: TipoCorrida;
  categoria: Categoria;
  tracado?: number;
  data?: string; // ISO date
  /** Ordem de chegada oficial — nunca reordenar por tempo/volta. */
  resultados: ResultadoPiloto[];
  pole: string | null;
  voltas?: Record<string, VoltasPiloto>;
}

export interface Penalidade {
  nome: string;
  turno: Turno;
  corrida: number;
  categoria: Categoria;
  pontos: number;
  /** Contexto apenas para a Diretoria — nunca exibido nas telas públicas. */
  motivo?: string;
}

export interface Falta {
  nome: string;
  turno: Turno;
  corrida: number;
  categoria: Categoria;
}
