import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

ChartJS.defaults.color = '#8891a3';
ChartJS.defaults.font.family = "'Inter', system-ui, sans-serif";

export const PILOT_COLORS = [
  '#e8b923', '#4a90e2', '#22c55e', '#e5484d', '#a855f7', '#f97316',
  '#2dd4bf', '#ec4899', '#84cc16', '#64748b', '#eab308', '#06b6d4', '#f43f5e',
];

export const GRID_COLOR = 'rgba(255,255,255,.06)';

export const ACCENT_HEX: Record<string, string> = {
  base: '#d9773c',
  graduados: '#4a90e2',
  elite: '#e8b923',
};
