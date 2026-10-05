import React, { useState } from 'react';
import { ArrowUpRight, Maximize2, Sliders, ChevronRight } from 'lucide-react';
import { CandleData } from '../types/market';

interface HeroSectionProps {
  candles: CandleData[];
  activeSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  onOpenSupercharts: () => void;
  onOpenSpaceStory: () => void;
  onOpenOrderModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  candles,
  activeSymbol,
  onSelectSymbol,
  onOpenSupercharts,
  onOpenSpaceStory,
  onOpenOrderModal
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '1Y'>('1D');
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(null);
  const [showIndicators, setShowIndicators] = useState(false);

  // Latest candle details
  const latestCandle = hoveredCandle || (candles.length > 0 ? candles[candles.length - 1] : {
    open: 231.40,
    high: 235.10,
    low: 230.85,
    close: 234.80,
    time: '16:00',
    volume: 54200000,
    timestamp: Date.now()
  });

  const priceChange = latestCandle.close - latestCandle.open;
  const priceChangePct = (priceChange / latestCandle.open) * 100;
  const isPositive = priceChange >= 0;

  // Symbols available for quick preview
  const previewSymbols = ['AAPL', 'BTCUSD', 'NVDA', 'TSLA', 'SPX'];

  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden grid-lines">
      {/* Atmospheric glow in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2962FF]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-6 z-10">
        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
          Where the world does markets
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-[#787B86] max-w-2xl mx-auto font-normal">
          Join 100 million traders and investors taking the future into their own hands.
        </p>

        {/* Primary CTA Buttons */}
        <div className="pt-2 flex flex-col items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenSupercharts}
              className="inline-flex items-center justify-center h-14 px-8 text-base font-bold text-black bg-white rounded-full hover:bg-gray-100 hover:scale-[1.02] transition-all shadow-xl shadow-white/5 active:scale-95 cursor-pointer"
            >
              Get started for free
            </button>
            <button
              onClick={onOpenOrderModal}
              className="inline-flex items-center justify-center h-14 px-7 text-sm font-semibold text-white bg-[#1E222D] border border-[#2A2E39] rounded-full hover:border-[#363A45] hover:bg-[#2A2E39] transition-all cursor-pointer"
            >
              Practice Paper Trading
            </button>
          </div>
          <span className="mt-3 text-xs sm:text-sm text-[#787B86] tracking-wide">
            $0 forever, no credit card needed
          </span>
        </div>

        {/* Space Story Badge Pill (Direct reference feature) */}
        <div className="pt-6">
          <button
            onClick={onOpenSpaceStory}
            className="inline-flex items-center space-x-3.5 px-4 py-2 rounded-full bg-[#181a20] border border-[#2A2E39] hover:border-[#363A45] hover:bg-[#1E222D] transition-all group cursor-pointer text-left"
          >
            {/* Scott "Kidd" Poteet Portrait Indicator */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#2A2E39] flex items-center justify-center border border-[#363A45]">
              <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
              </svg>
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-[#F0F3FA] group-hover:text-[#2962FF] flex items-center gap-1 transition-colors">
                See our space story
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
              <div className="text-[#787B86] text-[11px]">With astronaut Scott "Kidd" Poteet</div>
            </div>
          </button>
        </div>
      </div>

      {/* Chart Interface Teaser Frame */}
      <div className="mt-12 w-full max-w-6xl mx-auto px-2">
        <div className="rounded-2xl border border-[#2A2E39] bg-[#131722] shadow-2xl overflow-hidden text-left">
          {/* Mock TradingView Chart Toolbar */}
          <div className="h-11 border-b border-[#2A2E39] bg-[#181a20] px-3 sm:px-4 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto py-1">
              {/* Symbol selector dropdown/buttons */}
              <div className="flex items-center gap-1 bg-[#1E222D] p-0.5 rounded-lg border border-[#2A2E39]">
                {previewSymbols.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => onSelectSymbol(sym)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                      activeSymbol === sym ? 'bg-[#2962FF] text-white' : 'text-[#787B86] hover:text-[#D1D4DC]'
                    }`}
                  >
                    {sym}
                  </button>
                ))}
              </div>

              <span className="text-[#787B86] hidden lg:inline">·</span>

              <span className="font-bold text-white flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse" />
                {activeSymbol} · {timeframe}
              </span>

              <span className="text-[#787B86] hidden sm:inline tabular-nums">
                O: {latestCandle.open.toFixed(2)}
              </span>
              <span className="text-[#787B86] hidden sm:inline tabular-nums">
                H: {latestCandle.high.toFixed(2)}
              </span>
              <span className="text-[#787B86] hidden sm:inline tabular-nums">
                L: {latestCandle.low.toFixed(2)}
              </span>
              <span className="text-[#F0F3FA] tabular-nums font-semibold">
                C: {latestCandle.close.toFixed(2)}
              </span>
              <span
                className={`font-semibold tabular-nums ${
                  isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                }`}
              >
                {isPositive ? '+' : ''}
                {priceChangePct.toFixed(2)}% ({isPositive ? '+' : ''}
                {priceChange.toFixed(2)})
              </span>
            </div>

            {/* Timeframe & Action Buttons */}
            <div className="flex items-center space-x-2 text-[#787B86] text-xs shrink-0">
              <div className="hidden md:flex items-center space-x-1 border-r border-[#2A2E39] pr-2">
                {(['1D', '5D', '1M', '1Y'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      timeframe === tf ? 'bg-[#1E222D] text-white font-bold' : 'hover:text-[#D1D4DC]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowIndicators(!showIndicators)}
                className={`px-2.5 py-1 rounded border text-[11px] font-sans flex items-center gap-1 cursor-pointer transition-colors ${
                  showIndicators
                    ? 'bg-[#2962FF] border-[#2962FF] text-white'
                    : 'bg-[#1E222D] border-[#2A2E39] text-[#F0F3FA] hover:border-[#363A45]'
                }`}
              >
                <Sliders className="w-3 h-3" />
                Indicators (12)
              </button>

              <button
                onClick={onOpenSupercharts}
                className="px-2.5 py-1 rounded bg-[#2962FF]/15 border border-[#2962FF]/40 text-[#2962FF] hover:bg-[#2962FF] hover:text-white transition-all flex items-center gap-1 cursor-pointer text-[11px] font-sans font-semibold"
                title="Launch full trading terminal"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">Supercharts</span>
              </button>
            </div>
          </div>

          {/* Interactive Chart Visual Mockup */}
          <div className="relative h-72 sm:h-96 w-full bg-[#131722] p-4 flex flex-col justify-between select-none">
            <div className="absolute inset-0 grid-lines opacity-20 pointer-events-none" />

            {/* Price Level Lines on the Right */}
            <div className="absolute right-3 top-8 text-[11px] font-mono text-[#787B86]">
              {(latestCandle.close * 1.01).toFixed(2)}
            </div>
            <div className="absolute right-3 top-28 text-[11px] font-mono text-[#089981] font-semibold bg-[#131722]/80 px-1 rounded">
              {latestCandle.close.toFixed(2)} —
            </div>
            <div className="absolute right-3 top-48 text-[11px] font-mono text-[#787B86]">
              {(latestCandle.close * 0.99).toFixed(2)}
            </div>
            <div className="absolute right-3 top-68 text-[11px] font-mono text-[#787B86]">
              {(latestCandle.close * 0.98).toFixed(2)}
            </div>

            {/* Stylized Interactive Candlesticks and Trend Area */}
            <div className="relative w-full h-[82%]">
              <svg
                className="w-full h-full"
                preserveAspectRatio="none"
                viewBox="0 0 1000 350"
              >
                <defs>
                  <linearGradient id="chartGradientHero" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2962FF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2962FF" stopOpacity="0.0" />
                  </linearGradient>
                  {showIndicators && (
                    <linearGradient id="emaCloud" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#089981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#F23645" stopOpacity="0.05" />
                    </linearGradient>
                  )}
                </defs>

                {/* Area Fill */}
                <path
                  d="M 0,260 Q 150,290 280,210 T 520,180 T 780,120 T 1000,70 L 1000,350 L 0,350 Z"
                  fill="url(#chartGradientHero)"
                />

                {/* Trend Line */}
                <path
                  d="M 0,260 Q 150,290 280,210 T 520,180 T 780,120 T 1000,70"
                  fill="none"
                  stroke="#2962FF"
                  strokeWidth="3"
                />

                {/* EMA 20 Indicator if active */}
                {showIndicators && (
                  <path
                    d="M 0,270 Q 150,280 280,225 T 520,195 T 780,135 T 1000,85"
                    fill="none"
                    stroke="#F23645"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                )}

                {/* Candlestick Samples with interactive hover zones */}
                {/* Bar 1 (Bull) */}
                <line stroke="#089981" strokeWidth="1.5" x1="220" x2="220" y1="200" y2="245" />
                <rect fill="#089981" height="25" rx="1" width="10" x="215" y="210" />

                {/* Bar 2 (Bear) */}
                <line stroke="#F23645" strokeWidth="1.5" x1="340" x2="340" y1="180" y2="230" />
                <rect fill="#F23645" height="20" rx="1" width="10" x="335" y="195" />

                {/* Bar 3 (Bull) */}
                <line stroke="#089981" strokeWidth="1.5" x1="500" x2="500" y1="150" y2="210" />
                <rect fill="#089981" height="30" rx="1" width="10" x="495" y="165" />

                {/* Bar 4 (Bear small) */}
                <line stroke="#F23645" strokeWidth="1.5" x1="620" x2="620" y1="130" y2="180" />
                <rect fill="#F23645" height="18" rx="1" width="10" x="615" y="145" />

                {/* Bar 5 (Breakout Bull) */}
                <line stroke="#089981" strokeWidth="1.5" x1="760" x2="760" y1="90" y2="150" />
                <rect fill="#089981" height="35" rx="1" width="10" x="755" y="105" />

                {/* Bar 6 (Current Active) */}
                <line stroke="#089981" strokeWidth="2" x1="910" x2="910" y1="65" y2="120" />
                <rect fill="#089981" height="28" rx="1" width="10" x="905" y="75" />

                {/* Volume histogram bars at bottom */}
                <rect fill="rgba(8, 153, 129, 0.4)" x="215" y="310" width="10" height="40" />
                <rect fill="rgba(242, 54, 69, 0.4)" x="335" y="325" width="10" height="25" />
                <rect fill="rgba(8, 153, 129, 0.4)" x="495" y="295" width="10" height="55" />
                <rect fill="rgba(242, 54, 69, 0.4)" x="615" y="330" width="10" height="20" />
                <rect fill="rgba(8, 153, 129, 0.4)" x="755" y="280" width="10" height="70" />
                <rect fill="rgba(8, 153, 129, 0.5)" x="905" y="270" width="10" height="80" />
              </svg>
            </div>

            {/* Floating Info Pill over chart */}
            <div className="relative z-10 self-start bg-[#1E222D]/90 backdrop-blur-md border border-[#2A2E39] px-3 py-1.5 rounded-lg text-xs flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#2962FF]" />
              <span className="font-medium text-white">Supercharts 14.8</span>
              <span className="text-[#787B86] font-mono">
                Volume {(latestCandle.volume / 1000000).toFixed(1)}M
              </span>
              {showIndicators && (
                <span className="text-[#089981] font-mono text-[11px] border-l border-[#2A2E39] pl-2">
                  EMA (20, 50) Bullish
                </span>
              )}
            </div>

            {/* Time Scale Axis */}
            <div className="relative z-10 flex justify-between text-[11px] font-mono text-[#787B86] pt-2 border-t border-[#2A2E39]/50">
              <span>09:30</span>
              <span>11:00</span>
              <span>12:30</span>
              <span>14:00</span>
              <span>15:30</span>
              <span>16:00 (Close)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
