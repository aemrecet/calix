import React, { useState, useEffect } from 'react';
import ChartDisplay from './components/ChartDisplay';
import PineScriptGenerator from './components/PineScriptGenerator';
import { generateMarketData } from './utils/indicators';
import { CandleData, Language } from './types';
import { translations } from './utils/translations';
import { Activity, Terminal, Zap, TrendingUp, BarChart2, Hexagon, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'generator'>('generator');
  const [marketData, setMarketData] = useState<CandleData[]>([]);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang];

  useEffect(() => {
    // Check for API key presence
    if (!process.env.API_KEY) {
      setApiKeyMissing(true);
    }
    // Initial mock data
    setMarketData(generateMarketData(50));
    
    // Live update simulation
    const interval = setInterval(() => {
      setMarketData(prev => {
        const last = prev[prev.length - 1];
        const newData = generateMarketData(2); 
        const stitched = { 
            ...newData[0], 
            open: last.close, 
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
        return [...prev.slice(1), stitched];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'tr' : 'en');
  };

  if (apiKeyMissing) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white p-4 font-mono">
        <div className="bg-sanctus-panel border border-red-900/50 p-8 max-w-md text-center">
          <Activity size={48} className="mx-auto mb-4 text-red-700" />
          <h1 className="text-xl font-bold mb-2 tracking-widest text-red-500">SYSTEM HALTED</h1>
          <p className="text-gray-500 text-xs mb-6">
            CRITICAL ERROR: MISSING `process.env.API_KEY`.<br/>
            ACCESS DENIED.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sanctus-bg text-gray-300 font-sans selection:bg-sanctus-accent selection:text-black">
      {/* Professional Header */}
      <header className="border-b border-sanctus-border bg-sanctus-bg sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 flex items-center justify-center">
               <Hexagon size={28} className="text-sanctus-accent" strokeWidth={1.5} />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold tracking-[0.2em] text-white leading-none">
                CALIX SANCTUS
              </h1>
              <p className="text-[9px] text-sanctus-accent font-mono tracking-widest mt-1 opacity-80">
                {t.subtitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('generator')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider transition-all border-b-2 ${
                  activeTab === 'generator' 
                  ? 'border-sanctus-accent text-white' 
                  : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {t.tab_strategy}
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wider transition-all border-b-2 ${
                  activeTab === 'dashboard' 
                  ? 'border-sanctus-accent text-white' 
                  : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {t.tab_simulation}
              </button>
            </nav>

            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-sanctus-border text-[10px] font-mono hover:bg-white/5 transition-colors"
            >
              <Globe size={12} className="text-sanctus-accent"/>
              <span className="text-gray-400">{lang === 'en' ? 'EN' : 'TR'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'dashboard' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: t.market_sentiment, val: 'BULLISH', color: 'text-sanctus-success', icon: TrendingUp },
                { label: t.volatility, val: '42.5', color: 'text-blue-400', icon: Activity },
                { label: t.win_rate, val: '87.4%', color: 'text-sanctus-accent', icon: Zap },
                { label: t.signal, val: 'STRONG BUY', color: 'text-sanctus-success', icon: Terminal },
              ].map((m, i) => (
                <div key={i} className="bg-sanctus-panel border border-sanctus-border p-5 rounded-lg flex items-center justify-between shadow-sm">
                  <div>
                    <p className="text-[9px] font-mono text-gray-500 uppercase mb-1 tracking-widest">{m.label}</p>
                    <p className={`text-lg font-bold font-mono ${m.color}`}>{m.val}</p>
                  </div>
                  <m.icon className="text-gray-700" size={20} />
                </div>
              ))}
            </div>

            <ChartDisplay data={marketData} lang={lang} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="col-span-2 bg-sanctus-panel border border-sanctus-border rounded-lg p-6">
                  <h3 className="text-white font-mono text-xs font-bold mb-4 flex items-center gap-2 tracking-widest border-b border-sanctus-border pb-2">
                    <Terminal size={14} className="text-sanctus-accent" />
                    {t.log_title}
                  </h3>
                  <div className="space-y-3 font-mono text-[10px] max-h-48 overflow-y-auto custom-scrollbar">
                    {[...Array(6)].map((_, i) => (
                       <div key={i} className="flex justify-between items-center opacity-80 hover:opacity-100 transition-opacity">
                          <span className="text-gray-600 w-20">{new Date().toLocaleTimeString()}</span>
                          <span className={i % 2 === 0 ? "text-sanctus-success" : "text-sanctus-danger"}>
                            {i % 2 === 0 ? "LONG ENTRY @ 94,230" : "STOP LOSS TRIGGERED"}
                          </span>
                          <span className="text-gray-500">Vol: {1200 + i * 50}</span>
                       </div>
                    ))}
                  </div>
               </div>
               <div className="bg-[#080808] border border-sanctus-border rounded-lg p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-sanctus-accent/5"></div>
                  <div className="w-16 h-16 rounded-full border border-sanctus-border flex items-center justify-center mb-4 relative z-10 bg-sanctus-panel">
                    <Hexagon size={32} className="text-white animate-pulse" strokeWidth={1} />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1 z-10 tracking-wider">CALIX SANCTUS</h3>
                  <p className="text-[10px] text-gray-500 font-mono z-10">{t.processing}</p>
               </div>
            </div>
          </div>
        ) : (
          <div className="h-[calc(100vh-140px)] animate-in fade-in slide-in-from-bottom-2 duration-500">
            <PineScriptGenerator lang={lang} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;