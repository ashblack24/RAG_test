import React from 'react';
import { MarketMover, EarningsEvent } from '../types/market';
import { ArrowUpRight } from 'lucide-react';

interface MarketMoversAndCalendarProps {
  movers: MarketMover[];
  earnings: EarningsEvent[];
  onSelectSymbol: (symbol: string) => void;
  onLaunchScreener: () => void;
}

export const MarketMoversAndCalendar: React.FC<MarketMoversAndCalendarProps> = ({
  movers,
  earnings,
  onSelectSymbol,
  onLaunchScreener
}) => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* High Volume Market Movers (2 Columns) */}
        <div className="lg:col-span-2 bg-[#131722] border border-[#2A2E39] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2A2E39]">
            <div className="flex items-center space-x-3">
              <h3 className="font-bold text-white text-lg">High Volume Movers</h3>
              <span className="text-xs font-mono bg-[#1E222D] px-2 py-0.5 rounded text-[#787B86] border border-[#2A2E39]">
                US Equities
              </span>
            </div>
            <button
              onClick={onLaunchScreener}
              className="text-xs font-semibold text-[#2962FF] hover:text-[#1E53E5] flex items-center gap-1 cursor-pointer focus:outline-none"
            >
              <span>Launch Screener</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm font-mono">
              <thead>
                <tr className="text-xs text-[#787B86] border-b border-[#2A2E39]">
                  <th className="pb-2.5 font-medium">Ticker</th>
                  <th className="pb-2.5 font-medium text-right">Price</th>
                  <th className="pb-2.5 font-medium text-right">Change %</th>
                  <th className="pb-2.5 font-medium text-right">Volume</th>
                  <th className="pb-2.5 font-medium text-right hidden sm:table-cell">Consensus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E39] text-xs sm:text-sm">
                {movers.slice(0, 5).map((stock) => {
                  const isPositive = stock.changePercent >= 0;

                  return (
                    <tr
                      key={stock.ticker}
                      onClick={() => onSelectSymbol(stock.ticker)}
                      className="hover:bg-[#1E222D]/60 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 font-sans">
                        <div className="font-bold text-white group-hover:text-[#2962FF] transition-colors">
                          {stock.ticker}
                        </div>
                        <div className="text-[11px] text-[#787B86] font-sans truncate max-w-[140px]">
                          {stock.name}
                        </div>
                      </td>
                      <td className="py-3 text-right font-semibold text-white tabular-nums">
                        ${stock.price.toFixed(2)}
                      </td>
                      <td
                        className={`py-3 text-right font-semibold tabular-nums ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {stock.changePercent.toFixed(2)}%
                      </td>
                      <td className="py-3 text-right text-[#D1D4DC] tabular-nums">
                        {stock.volume}
                      </td>
                      <td className="py-3 text-right hidden sm:table-cell">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-sans font-semibold inline-block ${
                            stock.consensus === 'Strong Buy'
                              ? 'bg-[#089981]/15 text-[#089981]'
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Earnings & Economic Calendar Preview (1 Column) */}
        <div className="bg-[#131722] border border-[#2A2E39] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2A2E39]">
              <h3 className="font-bold text-white text-lg">Earnings Calendar</h3>
              <span className="text-xs font-mono text-[#787B86]">Tomorrow</span>
            </div>

            <div className="space-y-3">
              {earnings.map((event) => (
                <div
                  key={event.ticker}
                  onClick={() => onSelectSymbol(event.ticker)}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#1E222D]/50 border border-[#2A2E39]/60 hover:border-[#363A45] hover:bg-[#1E222D] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-[#2A2E39] flex items-center justify-center font-bold text-xs text-white group-hover:bg-[#2962FF] transition-colors">
                      {event.ticker}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#2962FF] transition-colors">
                        {event.name}
                      </div>
                      <div className="text-[10px] text-[#787B86]">{event.timing}</div>
                    </div>
                  </div>

                  <div className="text-right text-xs font-mono">
                    <div className="text-[#F0F3FA] font-medium tabular-nums">
                      Est. {event.estEPS}
                    </div>
                    <div className="text-[10px] text-[#787B86] tabular-nums">
                      Rev {event.estRev}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#2A2E39]">
            <button
              onClick={onLaunchScreener}
              className="w-full py-2 bg-[#1E222D] hover:bg-[#252a38] text-white text-xs font-semibold rounded-lg flex items-center justify-center transition-colors cursor-pointer border border-[#2A2E39]"
            >
              View Complete Economic Calendar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
