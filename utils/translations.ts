export const translations = {
  tr: {
    title: "CALIX SANCTUS",
    subtitle: "ALGORİTMİK MİMARİ",
    tab_strategy: "STRATEJİ",
    tab_simulation: "SİMÜLASYON",
    market_sentiment: "PİYASA ALGISI",
    volatility: "VOLATİLİTE (ATR)",
    win_rate: "TAHMİNİ BAŞARI",
    signal: "SİNYAL",
    log_title: "İŞLEM GÜNLÜĞÜ",
    processing: "VERİ İŞLENİYOR...",
    engine_v2: "STRATEJİ MOTORU",
    engine_desc: "Kurumsal seviyede Pine Script v5 mimarisi.",
    auto_pilot_btn: "OTOMATİK YAPILANDIRMA",
    presets_btn: "HAZIR ŞABLONLAR",
    style_label: "TİCARET MODELİ",
    indicators_label: "TEKNİK GÖSTERGELER",
    min_indicators: "Min 2 seçim",
    risk_label: "RİSK PROFİLİ",
    backtest_period: "BACKTEST PERİYODU",
    start_date: "Başlangıç",
    end_date: "Bitiş",
    safe: "Muhafazakar",
    aggressive: "Agresif",
    notes_label: "ALGORİTMA PARAMETRELERİ (OPSİYONEL)",
    notes_placeholder: "Örn: Sadece 200 EMA üzerindeki long pozisyonları hedefle, volatilite düşükse işlem yapma...",
    generate_btn: "SİSTEMİ OLUŞTUR",
    regenerate_btn: "SİSTEMİ YENİLE",
    analyzing: "ALGORİTMA DERLENİYOR...",
    copy: "KOPYALA",
    copied: "KOPYALANDI",
    open_tv: "TRADINGVIEW'İ BAŞLAT",
    how_to: "KURULUM REHBERİ",
    status_ready: "DURUM: HAZIR",
    select_prompt: "Parametreleri belirleyin veya otomatik yapılandırmayı kullanın.",
    guide_title: "TradingView Entegrasyonu",
    step_1: "TradingView'i açın ve Pine Editor panelini genişletin.",
    step_2: "Mevcut kodları temizleyin.",
    step_3: "Calix Sanctus kodunu yapıştırın.",
    step_4: "Kaydet ve 'Grafiğe Ekle' butonuna tıklayın.",
    understood: "ANLAŞILDI",
    styles: {
      SCALP: "Yüksek Frekans / Agresif",
      SWING: "Orta Vade / Trend",
      TREND: "Uzun Vade / Güvenli",
      HFT: "Deneysel / Mikrosaniye"
    },
    presets: {
      scalp: {
        label: "SCALP (5m)",
        desc: "Hızlı işlemler, Bollinger & RSI",
        note: "STRATEJİ: 'HYPER SCALP'.\n1. ZAMAN: 5 Dakikalık (5m).\n2. İNDİKATÖRLER: Bollinger Bands (20, 2), RSI (14), EMA (200).\n3. MANTIK: Fiyat Bollinger Alt bandına değerse VE RSI < 30 ise VE Fiyat > EMA 200 ise LONG. Tam tersi için SHORT.\n4. HEDEF: Küçük ve hızlı karlar (1:1.5 R/R). Stop Loss dar tutulmalı."
      },
      swing: {
        label: "SWING (15m/4H)",
        desc: "Çoklu Zaman Dilimi, Kusursuz Giriş",
        note: "STRATEJİ: 'MÜKEMMEL SWING (GELİŞMİŞ)'.\n1. ZAMAN: Grafik 15 Dakikalık (15m). Trend Filtresi 4 Saatlik (240).\n2. İNDİKATÖRLER: EMA 50, EMA 200, RSI 14, VWAP.\n3. TREND FİLTRESİ (4H): EMA50 > EMA200 ise YÜKSELİŞ TRENDİ. \n4. LONG MANTIĞI: Trend Yukarı + Fiyat EMA50'ye YAKIN (exact touch gerekmez, %1-2 range) + RSI < 60 ve yukarı dönüyor + Fiyat > VWAP.\n5. HEDEF: İşlem sıklığını artırmak için koşulları esnet. 'Sıfır işlem' sorununu çöz.\n6. RİSK: Stop Loss = ATR x 2 veya Swing Low. Take Profit = Risk x 2."
      },
      trend: {
        label: "TREND (4H)",
        desc: "Büyük Hareketler, SuperTrend",
        note: "STRATEJİ: 'MAJOR TREND'.\n1. ZAMAN: 4 Saatlik (4H) veya Günlük (1D).\n2. İNDİKATÖRLER: SuperTrend, MACD, ADX.\n3. MANTIK: ADX > 20 (Trend Başlangıcı) iken SuperTrend BUY sinyali verirse VE MACD > Signal ise LONG.\n4. ÇIKIŞ: SuperTrend yön değiştirdiğinde veya MACD ters kestiğinde.\n5. RİSK: İz süren Stop (Trailing Stop) kullan."
      }
    },
    auto_pilot_note: "Otomatik yapılandırma seçildi."
  },
  en: {
    title: "CALIX SANCTUS",
    subtitle: "ALGORITHMIC ARCHITECT",
    tab_strategy: "STRATEGY",
    tab_simulation: "SIMULATION",
    market_sentiment: "MARKET SENTIMENT",
    volatility: "VOLATILITY (ATR)",
    win_rate: "EST. WIN RATE",
    signal: "SIGNAL",
    log_title: "EXECUTION LOG",
    processing: "PROCESSING DATA...",
    engine_v2: "STRATEGY ENGINE",
    engine_desc: "Institutional grade Pine Script v5 architecture.",
    auto_pilot_btn: "AUTO CONFIGURATION",
    presets_btn: "PRESETS",
    style_label: "TRADING MODEL",
    indicators_label: "TECHNICAL INDICATORS",
    min_indicators: "Select min 2",
    risk_label: "RISK PROFILE",
    backtest_period: "BACKTEST PERIOD",
    start_date: "Start Date",
    end_date: "End Date",
    safe: "Conservative",
    aggressive: "Aggressive",
    notes_label: "ALGORITHM PARAMETERS (OPTIONAL)",
    notes_placeholder: "Ex: Target long positions only above 200 EMA, avoid trading during low volatility...",
    generate_btn: "COMPILE SYSTEM",
    regenerate_btn: "RECOMPILE SYSTEM",
    analyzing: "COMPILING ALGORITHM...",
    copy: "COPY CODE",
    copied: "COPIED",
    open_tv: "LAUNCH TRADINGVIEW",
    how_to: "INSTALL GUIDE",
    status_ready: "STATUS: DEPLOYMENT READY",
    select_prompt: "Define parameters or initiate auto-configuration sequence.",
    guide_title: "TradingView Integration",
    step_1: "Open TradingView and expand the Pine Editor panel.",
    step_2: "Clear any existing code.",
    step_3: "Paste the Calix Sanctus source code.",
    step_4: "Save and click 'Add to Chart'.",
    understood: "ACKNOWLEDGED",
    styles: {
      SCALP: "High Frequency / Aggressive",
      SWING: "Medium Term / Trend",
      TREND: "Long Term / Safe",
      HFT: "Experimental / Microsecond"
    },
    presets: {
      scalp: {
        label: "SCALP (5m)",
        desc: "Fast executions, Bollinger & RSI",
        note: "STRATEGY: 'HYPER SCALP'.\n1. TIMEFRAME: 5 Minutes (5m).\n2. INDICATORS: Bollinger Bands (20, 2), RSI (14), EMA (200).\n3. LOGIC: LONG if Price touches Lower Band AND RSI < 30 AND Price > EMA 200. SHORT if touches Upper Band AND RSI > 70 AND Price < EMA 200.\n4. GOAL: Quick profits (1:1.5 R/R). Tight stops."
      },
      swing: {
        label: "SWING (15m/4H)",
        desc: "Multi-Timeframe, Flawless Entry",
        note: "STRATEGY: 'THE PERFECT SWING (OPTIMIZED)'.\n1. TIMEFRAME: Chart 15m. Trend Filter 4h (240).\n2. INDICATORS: EMA 50, EMA 200, RSI 14, VWAP.\n3. TREND FILTER (4H): EMA50 > EMA200 = UPTREND.\n4. LONG LOGIC: Trend Up + Price NEAR EMA50 (within 1-2% range, not exact touch) + RSI < 60 turning up + Price > VWAP.\n5. GOAL: Relax conditions slightly to ensure trades execute. Fix 'Zero Trades' issue.\n6. RISK: Stop Loss = ATR x 2 or Swing Low. TP = Risk x 2."
      },
      trend: {
        label: "TREND (4H)",
        desc: "Major Moves, SuperTrend",
        note: "STRATEGY: 'MAJOR TREND'.\n1. TIMEFRAME: 4 Hours (4H) or Daily (1D).\n2. INDICATORS: SuperTrend, MACD, ADX.\n3. LOGIC: LONG if ADX > 20 (Trend Start) AND SuperTrend is Green AND MACD > Signal.\n4. EXIT: When SuperTrend flips or MACD cross under.\n5. RISK: Use Trailing Stop."
      }
    },
    auto_pilot_note: "Auto configuration selected."
  }
};