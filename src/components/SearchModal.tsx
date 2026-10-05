import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { TickerItem } from '../types/market';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickers: TickerItem[];
  onSelectSymbol: (symbol: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  tickers,
  onSelectSymbol
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'all' | 'indices' | 'crypto' | 'equities' | 'forex' | 'commodities'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filtered = tickers.filter((t) => {
    const matchesQuery =
      t.symbol.toLowerCase().includes(query.toLowerCase()) ||
      t.name.toLowerCase().includes(query.toLowerCase());
    const matchesCat = category === 'all' || t.category === category;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#131722] border border-[#2A2E39] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="h-14 px-4 border-b border-[#2A2E39] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#787B86] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search symbol, company, crypto, or forex (e.g. AAPL, BTC, SPX)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-[#787B86] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#1E222D] text-[#787B86] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 px-4 py-2 border-b border-[#2A2E39] bg-[#181a20] overflow-x-auto text-xs">
          {(['all', 'equities', 'crypto', 'indices', 'forex', 'commodities'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full capitalize cursor-pointer transition-colors ${
                category === cat
                  ? 'bg-[#2962FF] text-white font-semibold'
                  : 'text-[#787B86] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#2A2E39]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-[#787B86] text-sm font-sans">
              No matching instruments found for "{query}".
            </div>
          ) : (
            filtered.map((item) => {
              const isPos = item.changePercent >= 0;
              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    onSelectSymbol(item.symbol);
                    onClose();
                  }}
                  className="p-3.5 flex items-center justify-between hover:bg-[#1E222D] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-[#1E222D] border border-[#2A2E39] flex items-center justify-center font-bold text-xs text-white group-hover:bg-[#2962FF] group-hover:border-[#2962FF] transition-colors">
                      {item.symbol.slice(0, 3)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm group-hover:text-[#2962FF] transition-colors flex items-center gap-2">
                        <span>{item.symbol}</span>
                        <span className="text-[10px] font-mono uppercase text-[#787B86] bg-[#0A0A0C] px-1.5 py-0.5 rounded border border-[#2A2E39]">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-[#787B86]">{item.name}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono text-sm">
                    <div className="text-white font-semibold tabular-nums">
                      ${item.price > 1000 ? item.price.toLocaleString() : item.price.toFixed(2)}
                    </div>
                    <div
                      className={`text-xs tabular-nums ${
                        isPos ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPos ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer tip */}
        <div className="p-3 bg-[#181a20] border-t border-[#2A2E39] text-[11px] text-[#787B86] flex items-center justify-between">
          <span>Press ESC to dismiss</span>
          <span>Click symbol to load Supercharts</span>
        </div>
      </div>
    </div>
  );
};
