import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar, Line } from 'recharts';
import { CandleData, Language } from '../types';
import { translations } from '../utils/translations';

interface ChartDisplayProps {
  data: CandleData[];
  lang: Language;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-sanctus-panel border border-sanctus-border p-3 rounded shadow-xl text-xs font-mono">
        <p className="text-gray-500 mb-2 border-b border-gray-800 pb-1">{label}</p>
        <p className="text-sanctus-success">Close: ${payload[0].value.toFixed(2)}</p>
        <p className="text-sanctus-accent">RSI: {payload[1].value.toFixed(1)}</p>
        <p className="text-gray-400 mt-1">Vol: {payload[2].value}</p>
      </div>
    );
  }
  return null;
};

const ChartDisplay: React.FC<ChartDisplayProps> = ({ data, lang }) => {
  const t = translations[lang];

  return (
    <div className="w-full h-[400px] bg-sanctus-panel rounded-lg p-1 shadow-2xl border border-sanctus-border">
      <div className="h-full bg-[#080808] rounded p-4 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-300 font-mono text-xs font-bold flex items-center gap-2 tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-sanctus-success animate-pulse"></span>
            CALIX SANCTUS LIVE
          </h3>
          <div className="flex gap-1 text-[10px] font-mono text-gray-500">
            <span className="px-2 py-0.5 border border-sanctus-border rounded bg-sanctus-panel">BTC/USDT</span>
            <span className="px-2 py-0.5 border border-sanctus-border rounded bg-sanctus-panel">1H</span>
          </div>
        </div>
        
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} opacity={0.4} />
              <XAxis 
                dataKey="time" 
                stroke="#374151" 
                tick={{fontSize: 9, fill: '#6b7280', fontFamily: 'monospace'}} 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                yAxisId="price" 
                orientation="right" 
                stroke="#374151" 
                tick={{fontSize: 9, fill: '#6b7280', fontFamily: 'monospace'}} 
                domain={['auto', 'auto']}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                yAxisId="rsi" 
                orientation="left" 
                domain={[0, 100]} 
                hide
              />
              <YAxis yAxisId="vol" hide domain={[0, 5000]} />
              
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#374151', strokeWidth: 1 }} />
              
              <Area 
                yAxisId="price"
                type="monotone" 
                dataKey="close" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorPrice)" 
                strokeWidth={1.5}
              />
              
              <Line 
                yAxisId="rsi"
                type="monotone" 
                dataKey="rsi" 
                stroke="#d4af37" 
                strokeWidth={1} 
                dot={false}
                opacity={0.6}
              />

              <Bar 
                yAxisId="vol"
                dataKey="volume" 
                fill="#374151" 
                opacity={0.3} 
                barSize={4}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartDisplay;