import { CandleData } from '../types';

// Helper to generate random walk data mimicking crypto markets
export const generateMarketData = (count: number = 100): CandleData[] => {
  const data: CandleData[] = [];
  let currentPrice = 50000;
  let trend = 0;
  
  for (let i = 0; i < count; i++) {
    // Random walk with momentum
    trend += (Math.random() - 0.5) * 10;
    const change = (Math.random() - 0.5) * 500 + trend;
    const open = currentPrice;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * 100;
    const low = Math.min(open, close) - Math.random() * 100;
    const volume = Math.floor(Math.random() * 1000) + 100;

    // Simulated RSI (simplified)
    const rsi = 30 + Math.random() * 40 + (trend > 0 ? 10 : -10);

    // Simulated Signal
    let signal: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
    if (rsi < 30 && change > 0) signal = 'BUY';
    if (rsi > 70 && change < 0) signal = 'SELL';

    data.push({
      time: new Date(Date.now() - (count - i) * 60000 * 60).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      open,
      high,
      low,
      close,
      volume,
      rsi,
      signal
    });

    currentPrice = close;
  }
  return data;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};
