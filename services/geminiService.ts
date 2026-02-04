import { GoogleGenAI, Type } from "@google/genai";
import { StrategyConfig, GeneratedStrategy } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Calix Sanctus", an elite algorithmic trading architect and Pine Script v5 expert.
Your mission is to engineer FLAWLESS, institutional-grade trading strategies for TradingView.

CRITICAL LOGIC RULES (STRICT ENFORCEMENT):
1. **Sequential Trades Only:** 
   - You MUST check \`strategy.position_size == 0\` before any Entry. 
   - You MUST check \`strategy.position_size != 0\` before any Exit.
   - DO NOT allow multiple entries in the same direction (Pyramiding = 0).
   - A sequence MUST BE: LONG -> LONG EXIT -> SHORT -> SHORT EXIT.
2. **Visual Clarity:**
   - ONLY plot shapes/labels when a trade is actually executed. 
   - Do not spam the chart with signals on every bar.
   - Use \`style=shape.labelup\` with text="LONG" and \`style=shape.labeldown\` with text="EXIT".
3. **Multi-Timeframe Logic (MTF):**
   - If the user requests a higher timeframe filter (e.g., 4H Trend on a 15m Chart), you MUST use \`request.security\`.
   - Correct Pattern: \`trendEMA = request.security(syminfo.tickerid, "240", ta.ema(close, 200))\`.
   - Prevent Repainting: Use \`barmerge.lookahead_on\` carefully or default behavior.

STRICT CODING STANDARDS:
1. **Version:** Always start with \`//@version=5\`.
2. **Type Safety (Fix Common Errors):** 
   - \`ta.supertrend(factor, atrPeriod)\`: 'factor' is FLOAT, 'atrPeriod' is INT. 
   - Ensure \`input.int\` is used for lengths/periods. 
   - Ensure \`input.float\` is used for multipliers.
3. **Strategy Declaration:** Always use \`strategy(..., overlay=true, initial_capital=10000, currency=currency.USD, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=10)\`.
4. **Risk Management:** ALWAYS include adjustable Stop Loss and Take Profit inputs.
5. **Backtest Range:** ALWAYS include "Backtest Period" inputs (Start Date, End Date) to filter the trade execution window.
   - **CRITICAL:** Ensure that if the user does NOT change the default input dates, the strategy still executes. Default the logic to allow trades if \`time\` is greater than a default timestamp (e.g., year 2000) if inputs are tricky.

DEBUGGING ZERO TRADES:
- Ensure your logic does NOT create mutually exclusive conditions (e.g., RSI > 70 AND RSI < 30 at the same time).
- If using multiple indicators, ensure they have a reasonable probability of aligning.
- If the strategy yields 0 trades in backtest, it is a failure. Prioritize executability over perfection.

Tone: Professional, Concise, Technical, High-End Financial.
`;

export const generatePineScript = async (config: StrategyConfig, userNotes: string): Promise<GeneratedStrategy> => {
  const languagePrompt = config.lang === 'tr' ? 'Turkish' : 'English';
  
  const prompt = `
    Generate a professional "Calix Sanctus" trading strategy for TradingView Pine Script v5.
    
    Language Requirement: The 'explanation' field and the 'name' field MUST be in ${languagePrompt}. The code comments should be in English (standard).

    Parameters:
    - Trading Style: ${config.style}
    - Risk Appetite (1-10): ${config.riskLevel}
    - Timeframe: ${config.timeframe}
    - Core Indicators: ${config.indicators.join(', ')}
    - Backtest Date Range: ${config.startDate} to ${config.endDate}
    - User Constraints: ${userNotes}

    SPECIFIC REQUIREMENTS:
    1. **One Trade at a Time:** The logic MUST prevent entering a Long if we are already Long. Use \`strategy.position_size == 0\` logic.
    2. **Clear Exits:** Define clear Stop Loss (SL) and Take Profit (TP) based on ATR or Percent.
    3. **Visuals:** Plot a GREEN label "LONG" below bar on entry, and a RED label "EXIT" above bar on exit.
    4. **Type Fix:** Ensure \`ta.supertrend\` receives (float, int). 
    5. **Backtest Configuration:** 
       - Initial capital $10,000. 
       - Include inputs for "Start Date" and "End Date". 
       - **IMPORTANT:** Set the DEFAULT values for these inputs to \`timestamp("${config.startDate} 00:00")\` and \`timestamp("${config.endDate} 23:59")\`.
       - Wrap trading logic in \`if (time >= startDate and time <= endDate)\`.
    6. **The Perfect Trade Logic:** 
       - If specific MTF rules are provided in 'User Constraints', prioritize them.
       - Synthesize a "Holy Grail" setup: Combine Trend (SuperTrend/EMA) + Momentum (RSI/MACD) + Volatility (ATR/ADX). 
       - **CONFIRMATION IS KEY:** Only enter when multiple indicators align perfectly (Confluence).
       - Optimization Goal: Maximize Profit Factor (> 2.0) and Minimize Drawdown.
       - **Avoid Zero Trades:** Ensure entry conditions are not impossible. E.g. for Swing, allow slight deviations.
    
    Response JSON Schema:
    {
      "name": "Strategy Name (Professional & Mystical)",
      "code": "Full Pine Script Code",
      "explanation": "Detailed technical explanation of the strategy logic in ${languagePrompt}."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            code: { type: Type.STRING },
            explanation: { type: Type.STRING },
          },
          required: ["name", "code", "explanation"],
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeneratedStrategy;
  } catch (error) {
    console.error("Strategy generation error:", error);
    throw new Error(config.lang === 'tr' ? "Algoritma derleme hatası." : "Algorithm compilation error.");
  }
};