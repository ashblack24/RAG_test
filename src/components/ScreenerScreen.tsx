import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Filter, ChevronRight, BarChart2 } from 'lucide-react';
import { MarketMover } from '../types/market';
import { HIGH_VOLUME_MOVERS } from '../data/mockMarketData';

interface ScreenerScreenProps {
  onSelectSymbol: (symbol: string) => void;
  onOpenOrderModal: () => void;
}

export const ScreenerScreen: React.FC<ScreenerScreenProps> = ({
  onSelectSymbol,
  onOpenOrderModal
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'semiconductors' | 'tech' | 'consumer'>('all');
  const [ratingFilter, setRatingFilter] = useState<'all' | 'Strong Buy' | 'Buy' | 'Hold'>('all');
  const [sortField, setSortField] = useState<keyof MarketMover>('volume');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredMovers = useMemo(() => {
    return HIGH_VOLUME_MOVERS.filter((item) => {
      const matchesSearch =
        item.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRating =
        ratingFilter === 'all' || item.consensus === ratingFilter;

      const matchesCategory =
        categoryFilter === 'all' ||
        (categoryFilter === 'semiconductors' && item.sector === 'Semiconductors') ||
        (categoryFilter === 'tech' && (item.sector === 'Technology' || item.sector === 'Software')) ||
        (categoryFilter === 'consumer' && item.sector === 'Consumer Cyclical');

      return matchesSearch && matchesRating && matchesCategory;
    }).sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (typeof valA === 'string' && valA.endsWith('M')) {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }

      if (valA < valB) return sortAsc ? -1 : 1;
      if (valA > valB) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [searchTerm, categoryFilter, ratingFilter, sortField, sortAsc]);

  const handleSort = (field: keyof MarketMover) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10">
      {/* Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Stock Screener &amp; Market Radar
          </h1>
          <p className="text-[#787B86] text-sm mt-1">
            Filter 10,000+ instruments by volume spikes, consensus ratings, and institutional order flow.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#787B86] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ticker or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#131722] border border-[#2A2E39] rounded-lg text-sm text-white focus:outline-none focus:border-[#2962FF] transition-colors"
          />
        </div>
      </div>

      {/* Segmented Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-[#131722] border border-[#2A2E39] rounded-xl mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#787B86] mr-2">Sector:</span>
          {(['all', 'semiconductors', 'tech', 'consumer'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-md text-xs font-semibold capitalize cursor-pointer transition-colors ${
                categoryFilter === cat
                  ? 'bg-[#2962FF] text-white shadow-sm'
                  : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
              }`}
            >
              {cat === 'all' ? 'All Sectors' : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-[#787B86] mr-2">Consensus:</span>
          {(['all', 'Strong Buy', 'Buy', 'Hold'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRatingFilter(r)}
              className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                ratingFilter === r
                  ? 'bg-[#089981] text-white shadow-sm'
                  : 'text-[#787B86] hover:text-white hover:bg-[#1E222D]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Screener Data Table */}
      <div className="bg-[#131722] border border-[#2A2E39] rounded-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono">
            <thead>
              <tr className="text-xs text-[#787B86] border-b border-[#2A2E39] bg-[#181a20]">
                <th
                  onClick={() => handleSort('ticker')}
                  className="p-4 font-medium cursor-pointer hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Ticker</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('price')}
                  className="p-4 font-medium text-right cursor-pointer hover:text-white"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('changePercent')}
                  className="p-4 font-medium text-right cursor-pointer hover:text-white"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Change %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('volume')}
                  className="p-4 font-medium text-right cursor-pointer hover:text-white"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Volume</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-4 font-medium text-right hidden md:table-cell">Market Cap</th>
                <th className="p-4 font-medium text-right hidden lg:table-cell">P/E Ratio</th>
                <th className="p-4 font-medium text-center">Consensus</th>
                <th className="p-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E39]">
              {filteredMovers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#787B86] font-sans">
                    No instruments match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredMovers.map((stock) => {
                  const isPositive = stock.changePercent >= 0;

                  return (
                    <tr
                      key={stock.ticker}
                      onClick={() => onSelectSymbol(stock.ticker)}
                      className="hover:bg-[#1E222D]/60 transition-colors cursor-pointer group"
                    >
                      <td className="p-4 font-sans">
                        <div className="font-bold text-white group-hover:text-[#2962FF] transition-colors flex items-center gap-2">
                          <span>{stock.ticker}</span>
                          <span className="text-[10px] font-mono text-[#787B86] px-1.5 py-0.5 rounded bg-[#1E222D] border border-[#2A2E39]">
                            {stock.sector}
                          </span>
                        </div>
                        <div className="text-xs text-[#787B86]">{stock.name}</div>
                      </td>
                      <td className="p-4 text-right font-semibold text-white tabular-nums">
                        ${stock.price.toFixed(2)}
                      </td>
                      <td
                        className={`p-4 text-right font-semibold tabular-nums ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {stock.changePercent.toFixed(2)}%
                      </td>
                      <td className="p-4 text-right text-[#D1D4DC] tabular-nums">
                        {stock.volume}
                      </td>
                      <td className="p-4 text-right text-[#787B86] hidden md:table-cell tabular-nums">
                        {stock.marketCap}
                      </td>
                      <td className="p-4 text-right text-[#787B86] hidden lg:table-cell tabular-nums">
                        {stock.pe}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded text-xs font-sans font-semibold inline-block ${
                            stock.consensus === 'Strong Buy'
                              ? 'bg-[#089981]/15 text-[#089981] border border-[#089981]/30'
                              : stock.consensus === 'Buy'
                              ? 'bg-[#089981]/10 text-[#089981]'
                              : stock.consensus === 'Hold'
                              ? 'bg-[#1E222D] text-[#787B86] border border-[#2A2E39]'
                              : 'bg-[#F23645]/15 text-[#F23645]'
                          }`}
                        >
                          {stock.consensus}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectSymbol(stock.ticker);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#2962FF] hover:bg-[#1E53E5] text-white text-xs font-sans font-semibold transition-all cursor-pointer shadow-sm"
                        >
                          Chart
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
