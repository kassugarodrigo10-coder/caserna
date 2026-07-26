export interface HallOfFameEntry {
  id: string;
  nome: string;
  fotoUrl?: string;
  titulos: { label: string; ano: number }[];
}

// Vazio até Sr. Kassuga enviar as fotos e títulos reais dos Camisas Brancas desde 2022.
export const hallDaFama: HallOfFameEntry[] = [];
