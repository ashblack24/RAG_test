import React, { useState } from 'react';
import { TickerItem } from '../types/market';
import { CATEGORY_MARKET_CARDS } from '../data/mockMarketData';

interface MarketSummarySectionProps {
  onSelectSymbol: (symbol: string) => void;
  onExploreAll: () => void;
}

export const MarketSummarySection: React.FC<MarketSummarySectionProps> = ({
  onSelectSymbol,
  onExploreAll
}) => {
  const [activeTab, setActiveTab] = useState<'indices' | 'crypto' | 'futures' | 'bonds' | 'forex'>('indices');

  const currentCards = CATEGORY_MARKET_CARDS[activeTab] || CATEGORY_MARKET_CARDS.indices;

  // Custom sparkline shapes per card
  const getSparklinePoints = (index: number, isPositive: boolean) => {
    if (isPositive) {
      if (index === 0) return '0,32 30,28 60,35 90,20 120,22 160,8';
      if (index === 1) return '0,36 35,30 70,25 105,15 130,18 160,5';
      return '0,28 35,32 70,20 100,16 130,22 160,8';
    } else {
      if (index === 2) return '0,10 40,15 80,12 110,25 140,22 160,34';
      return '0,8 30,14 65,18 95,26 130,22 160,32';
    }
  };

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12" id="markets">
      {/* Category Tabs */}
      <div className="flex items-center justify-between border-b border-[#2A2E39] pb-4 mb-6 overflow-x-auto">
        <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
          <button
            onClick={() => setActiveTab('indices')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'indices'
                ? 'bg-white text-black shadow-md'
                : 'text-[#787B86] hover:text-white'
            }`}
          >
            Major indices
          </button>
          <button
            onClick={() => setActiveTab('crypto')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'crypto'
                ? 'bg-white text-black shadow-md'
                : 'text-[#787B86] hover:text-white'
            }`}
          >
            Crypto market cap
          </button>
          <button
            onClick={() => setActiveTab('futures')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'futures'
                ? 'bg-white text-black shadow-md'
                : 'text-[#787B86] hover:text-white'
            }`}
          >
            Futures
          </button>
          <button
            onClick={() => setActiveTab('bonds')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'bonds'
                ? 'bg-white text-black shadow-md'
                : 'text-[#787B86] hover:text-white'
            }`}
          >
            Bonds
          </button>
          <button
            onClick={() => setActiveTab('forex')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'forex'
                ? 'bg-white text-black shadow-md'
                : 'text-[#787B86] hover:text-white'
            }`}
          >
            Forex
          </button>
        </div>

        <button
          onClick={onExploreAll}
          className="text-xs sm:text-sm font-semibold text-[#2962FF] hover:text-[#1E53E5] shrink-0 ml-4 cursor-pointer focus:outline-none"
        >
          Explore all markets →
        </button>
      </div>

      {/* 4 Quote Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentCards.map((card, idx) => {
          const isPositive = card.changePercent >= 0;
          const strokeColor = isPositive ? '#089981' : '#F23645';
          const badgeBg = isPositive ? 'bg-[#089981]/15 text-[#089981]' : 'bg-[#F23645]/15 text-[#F23645]';

          return (
            <div
              key={card.symbol}
              onClick={() => onSelectSymbol(card.symbol)}
              className="bg-[#131722] border border-[#2A2E39] hover:border-[#363A45] hover:bg-[#181d2c] p-4 rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer group"
              data-purpose="market-card"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="text-xs font-semibold text-[#787B86] uppercase tracking-wider">
                    {card.category}
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-[#2962FF] transition-colors">
                    {card.name}
                  </div>
                </div>
                <span className={`text-xs font-mono px-2 py-0.5 rounded font-semibold tabular-nums ${badgeBg}`}>
                  {isPositive ? '+' : ''}
                  {card.changePercent.toFixed(2)}%
                </span>
              </div>

              <div className="text-2xl font-bold font-mono text-white mb-2 tabular-nums">
                {card.price > 1000
                  ? card.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  : card.price.toFixed(card.price < 5 ? 4 : 2)}
              </div>

              {/* Sparkline SVG */}
              <div className="h-14 w-full">
                <svg className="w-full h-full" viewBox="0 0 160 40">
                  <polyline
                    fill="none"
                    points={getSparklinePoints(idx, isPositive)}
                    stroke={strokeColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex justify-between text-[11px] font-mono text-[#787B86] mt-2 pt-2 border-t border-[#2A2E39]/40">
                <span>H: {card.high?.toFixed(2) || '—'}</span>
                <span>L: {card.low?.toFixed(2) || '—'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Macro Data Strip */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#131722]/50 border border-[#2A2E39] rounded-lg p-3 text-xs font-mono">
        <div className="flex items-center justify-between px-2">
          <span className="text-[#787B86]">US Dollar Index (DXY):</span>
          <span className="text-white font-semibold">
            103.82 <span className="text-[#089981]">(+0.15%)</span>
          </span>
        </div>
        <div className="flex items-center justify-between px-2 border-l border-[#2A2E39]">
          <span className="text-[#787B86]">US 10Y Yield:</span>
          <span className="text-white font-semibold">
            4.24% <span className="text-[#F23645]">(-0.03)</span>
          </span>
        </div>
        <div className="flex items-center justify-between px-2 border-l border-[#2A2E39]">
          <span className="text-[#787B86]">Crude Oil:</span>
          <span className="text-white font-semibold">
            $71.74 <span className="text-[#089981]">(+1.22%)</span>
          </span>
        </div>
        <div className="flex items-center justify-between px-2 border-l border-[#2A2E39]">
          <span className="text-[#787B86]">VIX Volatility:</span>
          <span className="text-white font-semibold">
            18.24 <span className="text-[#F23645]">(-2.14%)</span>
          </span>
        </div>
      </div>
    </section>
  );
};
