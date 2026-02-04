export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  rsi: number;
  signal: 'BUY' | 'SELL' | 'HOLD';
}

export enum BotStyle {
  SCALP = 'SCALP',
  SWING = 'SWING',
  TREND = 'TREND',
  HFT = 'HFT' // Simulated High Frequency
}

export type Language = 'tr' | 'en';

export interface StrategyConfig {
  riskLevel: number; // 1-10
  indicators: string[];
  timeframe: string;
  style: BotStyle;
  lang: Language;
  startDate: string;
  endDate: string;
}

export interface GeneratedStrategy {
  code: string;
  explanation: string;
  name: string;
}