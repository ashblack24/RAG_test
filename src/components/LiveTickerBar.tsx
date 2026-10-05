import React from 'react';
import { TickerItem } from '../types/market';

interface LiveTickerBarProps {
  tickers: TickerItem[];
  onSelectSymbol?: (symbol: string) => void;
}

export const LiveTickerBar: React.FC<LiveTickerBarProps> = ({ tickers, onSelectSymbol }) => {
  return (
    <div
      className="w-full bg-[#08090b] border-b border-[#2A2E39] overflow-hidden whitespace-nowrap z-50 text-xs py-1.5 select-none font-mono"
      data-purpose="realtime-ticker-bar"
    >
      <div className="animate-marquee flex items-center space-x-8">
        {/* First Loop */}
        <div className="flex items-center space-x-6">
          {tickers.map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <button
                key={`${item.symbol}-1`}
                onClick={() => onSelectSymbol?.(item.symbol)}
                className="inline-flex items-center space-x-1.5 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              >
                <span className="font-semibold text-[#F0F3FA]">{item.symbol}</span>
                <span className="text-[#787B86] tabular-nums">
                  {item.price > 1000
                    ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : item.price.toFixed(item.price < 5 ? 4 : 2)}
                </span>
                <span
                  className={`font-medium tabular-nums ${
                    isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Second Loop for seamless infinite marquee */}
        <div className="flex items-center space-x-6">
          {tickers.map((item) => {
            const isPositive = item.changePercent >= 0;
            return (
              <button
                key={`${item.symbol}-2`}
                onClick={() => onSelectSymbol?.(item.symbol)}
                className="inline-flex items-center space-x-1.5 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none"
              >
                <span className="font-semibold text-[#F0F3FA]">{item.symbol}</span>
                <span className="text-[#787B86] tabular-nums">
                  {item.price > 1000
                    ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : item.price.toFixed(item.price < 5 ? 4 : 2)}
                </span>
                <span
                  className={`font-medium tabular-nums ${
                    isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
