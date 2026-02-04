import React, { useState, useRef, useEffect } from 'react';
import { StrategyConfig, BotStyle, GeneratedStrategy, Language } from '../types';
import { generatePineScript } from '../services/geminiService';
import { Loader2, Copy, CheckCircle, Code, Cpu, HelpCircle, X, ExternalLink, RefreshCw, Wand2, ArrowRight, Info, Calendar, ChevronDown, Zap, TrendingUp, BarChart2 } from 'lucide-react';
import { translations } from '../utils/translations';

interface Props {
  lang: Language;
}

const INDICATOR_DETAILS: Record<string, { label: string; desc: { en: string; tr: string } }> = {
  'SuperTrend': { 
    label: 'SuperTrend', 
    desc: { en: "Trend-following indicator based on ATR. Great for trailing stops.", tr: "ATR tabanlı trend takipçisi. İz süren stoplar için ideal." } 
  },
  'RSI': { 
    label: 'RSI', 
    desc: { en: "Measures speed/change of price movements. Identifies overbought/oversold levels.", tr: "Fiyat hareketlerinin hızını ölçer. Aşırı alım/satım bölgelerini gösterir." } 
  },
  'MACD': { 
    label: 'MACD', 
    desc: { en: "Trend-following momentum indicator showing relationship between two EMAs.", tr: "İki EMA arasındaki ilişkiyi gösteren trend takipçisi momentum indikatörü." } 
  },
  'EMA Cross': { 
    label: 'EMA Cross', 
    desc: { en: "Classic strategy trading the crossover of fast and slow moving averages.", tr: "Hızlı ve yavaş hareketli ortalamaların kesişimini kullanan klasik strateji." } 
  },
  'Bollinger': { 
    label: 'Bollinger', 
    desc: { en: "Volatility bands placed above and below a moving average.", tr: "Hareketli ortalamanın altında ve üstünde yer alan volatilite bantları." } 
  },
  'ATR': { 
    label: 'ATR', 
    desc: { en: "Measures market volatility. Essential for calculating dynamic Stop Loss.", tr: "Piyasa volatilitesini ölçer. Dinamik Stop Loss hesaplaması için kritiktir." } 
  },
  'VWAP': { 
    label: 'VWAP', 
    desc: { en: "Volume Weighted Average Price. Institutional benchmark for intraday value.", tr: "Hacim Ağırlıklı Ortalama Fiyat. Gün içi değer için kurumsal referans." } 
  },
  'Stoch': { 
    label: 'Stoch', 
    desc: { en: "Stochastic Oscillator. Compares closing price to a price range.", tr: "Stokastik Osilatör. Kapanış fiyatını bir fiyat aralığı ile karşılaştırır." } 
  },
  'Stoch RSI': { 
    label: 'Stoch RSI', 
    desc: { en: "Applies Stochastic formula to RSI values. Higher sensitivity.", tr: "RSI değerlerine Stokastik formülü uygular. Daha yüksek hassasiyet sağlar." } 
  },
  'ADX': { 
    label: 'ADX', 
    desc: { en: "Average Directional Index. Quantifies trend strength regardless of direction.", tr: "Ortalama Yönsel Endeks. Yönden bağımsız olarak trendin gücünü ölçer." } 
  },
  'Ichimoku Cloud': { 
    label: 'Ichimoku', 
    desc: { en: "Comprehensive system defining support, resistance, trend direction, and momentum.", tr: "Destek, direnç, trend yönü ve momentumu tanımlayan kapsamlı sistem." } 
  },
};

const PineScriptGenerator: React.FC<Props> = ({ lang }) => {
  const t = translations[lang];
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedStrategy | null>(null);
  const [userNotes, setUserNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const [config, setConfig] = useState<StrategyConfig>({
    riskLevel: 5,
    indicators: ['RSI', 'MACD', 'SuperTrend'],
    timeframe: '15m',
    style: BotStyle.SCALP,
    lang: lang,
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  // Update config lang when prop changes
  useEffect(() => {
    setConfig(prev => ({ ...prev, lang }));
  }, [lang]);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowPresets(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const generated = await generatePineScript({ ...config, lang }, userNotes);
      setResult(generated);
    } catch (e) {
      alert((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result?.code) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLaunch = () => {
    if (result?.code) {
      navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      window.open('https://www.tradingview.com/chart/', '_blank');
    }
  };

  const applyPreset = (type: 'SCALP' | 'SWING' | 'TREND') => {
    const p = t.presets;
    
    // Calculate dates
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    if (type === 'SCALP') {
      setConfig({
        ...config,
        riskLevel: 8,
        indicators: ['Bollinger', 'RSI'],
        timeframe: '5m',
        style: BotStyle.SCALP,
        startDate: thirtyDaysAgo,
        endDate: today
      });
      setUserNotes(p.scalp.note);
    } else if (type === 'SWING') {
      // The "Perfect Strategy" - Needs more data for 4H/15M confluence
      setConfig({
        ...config,
        riskLevel: 5,
        indicators: ['EMA Cross', 'RSI', 'VWAP'],
        timeframe: '15m',
        style: BotStyle.SWING,
        startDate: ninetyDaysAgo, // 3 months history
        endDate: today
      });
      setUserNotes(p.swing.note);
    } else if (type === 'TREND') {
      setConfig({
        ...config,
        riskLevel: 3,
        indicators: ['SuperTrend', 'MACD', 'ADX'],
        timeframe: '4h',
        style: BotStyle.TREND,
        startDate: ninetyDaysAgo, // 3 months history
        endDate: today
      });
      setUserNotes(p.trend.note);
    }
    setShowPresets(false);
  };

  const toggleIndicator = (ind: string) => {
    setConfig(prev => {
      const exists = prev.indicators.includes(ind);
      if (exists) return { ...prev, indicators: prev.indicators.filter(i => i !== ind) };
      return { ...prev, indicators: [...prev.indicators, ind] };
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full relative font-sans">
      {/* Guide Modal */}
      {showGuide && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 rounded-xl">
          <div className="bg-sanctus-panel border border-sanctus-border rounded-xl p-8 max-w-md w-full relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowGuide(false)} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ExternalLink size={20} className="text-sanctus-accent"/>
              {t.guide_title}
            </h3>
            <ol className="space-y-6 text-sm text-gray-400 font-mono">
              <li className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded border border-sanctus-accent text-sanctus-accent font-bold flex items-center justify-center text-xs">1</span>
                <p>{t.step_1}</p>
              </li>
              <li className="flex gap-4 items-start">
                 <span className="flex-shrink-0 w-6 h-6 rounded border border-sanctus-accent text-sanctus-accent font-bold flex items-center justify-center text-xs">2</span>
                 <p>{t.step_2}</p>
              </li>
              <li className="flex gap-4 items-start">
                 <span className="flex-shrink-0 w-6 h-6 rounded border border-sanctus-accent text-sanctus-accent font-bold flex items-center justify-center text-xs">3</span>
                 <p>{t.step_3}</p>
              </li>
              <li className="flex gap-4 items-start">
                 <span className="flex-shrink-0 w-6 h-6 rounded border border-sanctus-accent text-sanctus-accent font-bold flex items-center justify-center text-xs">4</span>
                 <p>{t.step_4}</p>
              </li>
            </ol>
            <button 
              onClick={() => setShowGuide(false)} 
              className="mt-8 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded font-mono text-sm tracking-wider transition-colors border border-white/10"
            >
              {t.understood}
            </button>
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="bg-sanctus-panel p-6 rounded-lg border border-sanctus-border flex flex-col gap-8 shadow-2xl">
        <div className="flex justify-between items-start border-b border-sanctus-border pb-4 relative">
          <div>
            <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2 tracking-wide">
              <Cpu size={18} className="text-sanctus-accent" />
              {t.engine_v2}
            </h2>
            <p className="text-gray-500 text-xs font-mono">{t.engine_desc}</p>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowPresets(!showPresets)}
              className="group flex items-center gap-2 px-3 py-1.5 bg-sanctus-accent/10 hover:bg-sanctus-accent/20 text-sanctus-accent text-xs font-bold rounded border border-sanctus-accent/20 transition-all shadow-[0_0_10px_rgba(212,175,55,0.1)] hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <Wand2 size={14} className="group-hover:rotate-12 transition-transform" />
              {t.presets_btn}
              <ChevronDown size={14} className={`transition-transform duration-200 ${showPresets ? 'rotate-180' : ''}`} />
            </button>

            {showPresets && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-[#0a0a0a] border border-sanctus-border rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-1 flex flex-col gap-1">
                  <button 
                    onClick={() => applyPreset('SCALP')}
                    className="flex items-start gap-3 p-3 hover:bg-white/5 rounded text-left transition-colors group"
                  >
                    <div className="p-1.5 bg-yellow-500/10 rounded text-yellow-500 group-hover:bg-yellow-500/20">
                      <Zap size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-200">{t.presets.scalp.label}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{t.presets.scalp.desc}</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => applyPreset('SWING')}
                    className="flex items-start gap-3 p-3 hover:bg-white/5 rounded text-left transition-colors group"
                  >
                    <div className="p-1.5 bg-blue-500/10 rounded text-blue-500 group-hover:bg-blue-500/20">
                      <BarChart2 size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-200">{t.presets.swing.label}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{t.presets.swing.desc}</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => applyPreset('TREND')}
                    className="flex items-start gap-3 p-3 hover:bg-white/5 rounded text-left transition-colors group"
                  >
                    <div className="p-1.5 bg-green-500/10 rounded text-green-500 group-hover:bg-green-500/20">
                      <TrendingUp size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-200">{t.presets.trend.label}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{t.presets.trend.desc}</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Style Selector */}
        <div>
          <label className="block text-xs font-mono text-gray-500 mb-3 tracking-widest">{t.style_label}</label>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(BotStyle).map((style) => (
              <button
                key={style}
                onClick={() => setConfig({ ...config, style })}
                className={`p-3 rounded text-left border transition-all flex flex-col relative overflow-hidden ${
                  config.style === style 
                  ? 'bg-sanctus-accent/10 border-sanctus-accent text-white' 
                  : 'bg-black/20 text-gray-500 border-sanctus-border hover:border-gray-600'
                }`}
              >
                <span className="text-xs font-bold font-mono z-10">{style}</span>
                <span className="text-[10px] opacity-60 mt-1 z-10">
                  {t.styles[style]}
                </span>
                {config.style === style && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-sanctus-accent/10 blur-xl rounded-full -mr-8 -mt-8"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div>
          <div className="flex justify-between items-center mb-3">
             <label className="block text-xs font-mono text-gray-500 tracking-widest">{t.indicators_label}</label>
             <span className="text-[10px] text-gray-600 border border-sanctus-border px-2 py-0.5 rounded">{t.min_indicators}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(INDICATOR_DETAILS).map(([key, details]) => (
              <div key={key} className="relative group">
                <button
                  onClick={() => toggleIndicator(key)}
                  className={`px-4 py-2 rounded text-xs font-mono border transition-all flex items-center gap-2 ${
                    config.indicators.includes(key)
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-transparent text-gray-500 border-sanctus-border hover:border-gray-500 hover:text-gray-300'
                  }`}
                >
                  {details.label}
                </button>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#1a1d21] border border-sanctus-border rounded shadow-xl z-20 hidden group-hover:block pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                   <p className="text-[10px] text-gray-300 text-center leading-relaxed">
                     {details.desc[lang]}
                   </p>
                   <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-[#1a1d21]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Slider */}
        <div>
           <div className="flex justify-between mb-3">
             <label className="text-xs font-mono text-gray-500 tracking-widest">{t.risk_label}</label>
             <span className="text-xs font-bold text-sanctus-accent">{config.riskLevel}/10</span>
           </div>
           <div className="relative h-1 bg-sanctus-border rounded w-full">
              <div 
                className="absolute h-full bg-sanctus-accent rounded" 
                style={{width: `${config.riskLevel * 10}%`}}
              ></div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={config.riskLevel}
                onChange={(e) => setConfig({...config, riskLevel: parseInt(e.target.value)})}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
           </div>
           <div className="flex justify-between text-[10px] text-gray-600 mt-2 font-mono">
             <span>{t.safe}</span>
             <span>{t.aggressive}</span>
           </div>
        </div>

        {/* Backtest Period */}
        <div>
           <div className="flex justify-between mb-3">
             <label className="text-xs font-mono text-gray-500 tracking-widest">{t.backtest_period}</label>
             <Calendar size={12} className="text-gray-500"/>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                 <label className="text-[10px] font-mono text-gray-600">{t.start_date}</label>
                 <input 
                   type="date" 
                   value={config.startDate}
                   onChange={(e) => setConfig({...config, startDate: e.target.value})}
                   className="bg-[#080808] border border-sanctus-border rounded p-2 text-xs text-gray-300 focus:border-sanctus-accent focus:outline-none font-mono placeholder:text-gray-700"
                   style={{ colorScheme: 'dark' }}
                 />
              </div>
              <div className="flex flex-col gap-1">
                 <label className="text-[10px] font-mono text-gray-600">{t.end_date}</label>
                 <input 
                   type="date" 
                   value={config.endDate}
                   onChange={(e) => setConfig({...config, endDate: e.target.value})}
                   className="bg-[#080808] border border-sanctus-border rounded p-2 text-xs text-gray-300 focus:border-sanctus-accent focus:outline-none font-mono placeholder:text-gray-700"
                   style={{ colorScheme: 'dark' }}
                 />
              </div>
           </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-mono text-gray-500 mb-3 tracking-widest">{t.notes_label}</label>
          <textarea
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder={t.notes_placeholder}
            className="w-full bg-[#080808] border border-sanctus-border rounded p-3 text-sm text-gray-300 focus:border-sanctus-accent focus:outline-none h-24 resize-none placeholder:text-gray-700 font-mono"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-auto w-full py-4 bg-white text-black font-bold text-sm tracking-widest rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              {t.analyzing}
            </>
          ) : (
            <>
               {result ? <RefreshCw size={16} /> : <ArrowRight size={16} />}
               {result ? t.regenerate_btn : t.generate_btn}
            </>
          )}
        </button>
      </div>

      {/* Result Section */}
      <div ref={resultRef} className="bg-sanctus-panel p-1 rounded-lg border border-sanctus-border flex flex-col h-full overflow-hidden relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
        
        {!result && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-gray-700 p-8">
            <Code size={48} className="mb-6 opacity-20" />
            <p className="text-center font-mono text-sm tracking-wider">
              {t.select_prompt}
            </p>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 bg-sanctus-panel z-10 flex flex-col items-center justify-center gap-6">
             <div className="w-12 h-12 border-2 border-sanctus-accent border-t-transparent rounded-full animate-spin"></div>
             <div className="text-sanctus-accent font-mono text-xs tracking-[0.2em] animate-pulse text-center">
               CALIX SANCTUS AI<br/>PROCESSING
             </div>
          </div>
        )}

        {result && (
          <div className="flex flex-col h-full animate-in fade-in duration-500 bg-[#080808] rounded m-1 border border-sanctus-border/50">
            <div className="flex justify-between items-center p-4 border-b border-sanctus-border/50 bg-sanctus-panel/50">
              <div>
                 <h3 className="text-sm font-bold text-white tracking-wide">{result.name}</h3>
                 <span className="text-[10px] font-mono text-sanctus-success flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 bg-sanctus-success rounded-full animate-pulse"></div>
                    {t.status_ready}
                 </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowGuide(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-transparent hover:bg-white/5 rounded border border-gray-700 text-[10px] font-mono transition-colors text-gray-400 hover:text-white"
                >
                  <HelpCircle size={12} />
                  {t.how_to}
                </button>
                <button 
                  onClick={handleLaunch}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 rounded border border-blue-500/30 text-[10px] font-mono transition-colors text-blue-400"
                >
                  <ExternalLink size={12} />
                  {t.open_tv}
                </button>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-3 py-1.5 bg-sanctus-accent/10 hover:bg-sanctus-accent/20 rounded border border-sanctus-accent/30 text-[10px] font-mono transition-colors text-sanctus-accent"
                >
                  {copied ? <CheckCircle size={12}/> : <Copy size={12}/>}
                  {copied ? t.copied : t.copy}
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4 font-mono text-[11px] text-gray-400 custom-scrollbar">
              <pre className="whitespace-pre-wrap leading-relaxed">{result.code}</pre>
            </div>

            <div className="p-4 bg-sanctus-panel border-t border-sanctus-border">
              <div className="flex items-start gap-3">
                 <div className="mt-1 min-w-[3px] h-3 bg-sanctus-accent"></div>
                 <p className="text-xs text-gray-300 leading-relaxed">{result.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PineScriptGenerator;