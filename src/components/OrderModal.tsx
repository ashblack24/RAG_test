import React, { useState } from 'react';
import { X, ShieldCheck, ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';
import { PaperPosition, TickerItem } from '../types/market';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickers: TickerItem[];
  activeSymbol: string;
  portfolioBalance: number;
  positions: PaperPosition[];
  onPlaceOrder: (order: { symbol: string; side: 'BUY' | 'SELL'; shares: number; price: number }) => void;
  onClosePosition: (index: number) => void;
  onResetBalance: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  tickers,
  activeSymbol,
  portfolioBalance,
  positions,
  onPlaceOrder,
  onClosePosition,
  onResetBalance
}) => {
  const [selectedSymbol, setSelectedSymbol] = useState(activeSymbol);
  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [shares, setShares] = useState(10);
  const [limitPrice, setLimitPrice] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentTicker = tickers.find((t) => t.symbol === selectedSymbol) || tickers[0];
  const executionPrice = orderType === 'LIMIT' && limitPrice > 0 ? limitPrice : currentTicker.price;
  const estimatedCost = shares * executionPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shares <= 0) return;

    onPlaceOrder({
      symbol: selectedSymbol,
      side,
      shares,
      price: executionPrice
    });

    setFeedback(`Success! ${side} order executed for ${shares} shares of ${selectedSymbol}.`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const totalPositionsValue = positions.reduce((acc, pos) => acc + pos.shares * pos.currentPrice, 0);
  const totalPnL = positions.reduce((acc, pos) => acc + pos.pnl, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#131722] border border-[#2A2E39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#2A2E39] flex items-center justify-between bg-[#181a20]">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#089981] animate-pulse" />
            <h3 className="font-bold text-white text-base">
              Paper Trading &amp; Broker Execution
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#1E222D] text-[#787B86] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portfolio Stats Banner */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-[#0A0A0C] border-b border-[#2A2E39] text-xs font-mono">
          <div>
            <div className="text-[#787B86]">Cash Balance</div>
            <div className="text-base font-bold text-white tabular-nums mt-0.5">
              ${portfolioBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div className="text-[#787B86]">Open Positions Value</div>
            <div className="text-base font-bold text-[#F0F3FA] tabular-nums mt-0.5">
              ${totalPositionsValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <div className="text-[#787B86]">Unrealized P&amp;L</div>
            <div
              className={`text-base font-bold tabular-nums mt-0.5 ${
                totalPnL >= 0 ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {totalPnL >= 0 ? '+' : ''}${totalPnL.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Main Content: Order Form + Open Positions */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Order Placement Form */}
          <form onSubmit={handleSubmit} className="bg-[#1E222D] p-5 rounded-xl border border-[#2A2E39] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">New Order Ticket</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#787B86]">Symbol:</span>
                <select
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  className="bg-[#131722] border border-[#2A2E39] text-xs font-bold text-white px-2.5 py-1 rounded-lg focus:outline-none focus:border-[#2962FF]"
                >
                  {tickers.map((t) => (
                    <option key={t.symbol} value={t.symbol}>
                      {t.symbol} (${t.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Side selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSide('BUY')}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  side === 'BUY'
                    ? 'bg-[#089981] text-white shadow-md'
                    : 'bg-[#131722] text-[#787B86] hover:text-white'
                }`}
              >
                Buy (Long)
              </button>
              <button
                type="button"
                onClick={() => setSide('SELL')}
                className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  side === 'SELL'
                    ? 'bg-[#F23645] text-white shadow-md'
                    : 'bg-[#131722] text-[#787B86] hover:text-white'
                }`}
              >
                Sell (Short)
              </button>
            </div>

            {/* Order type & Shares input */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#787B86] mb-1">Order Type</label>
                <div className="grid grid-cols-2 gap-2 bg-[#131722] p-1 rounded-lg border border-[#2A2E39]">
                  <button
                    type="button"
                    onClick={() => setOrderType('MARKET')}
                    className={`py-1 text-xs font-semibold rounded cursor-pointer ${
                      orderType === 'MARKET' ? 'bg-[#2962FF] text-white' : 'text-[#787B86]'
                    }`}
                  >
                    Market
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType('LIMIT');
                      setLimitPrice(currentTicker.price);
                    }}
                    className={`py-1 text-xs font-semibold rounded cursor-pointer ${
                      orderType === 'LIMIT' ? 'bg-[#2962FF] text-white' : 'text-[#787B86]'
                    }`}
                  >
                    Limit
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#787B86] mb-1">Quantity (Units)</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={shares}
                  onChange={(e) => setShares(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-[#131722] border border-[#2A2E39] rounded-lg px-3 py-1.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#2962FF]"
                />
              </div>
            </div>

            {/* Order Price & Cost Preview */}
            <div className="flex items-center justify-between text-xs font-mono p-3 bg-[#131722] rounded-lg border border-[#2A2E39]">
              <div>
                <span className="text-[#787B86]">Execution Price: </span>
                <span className="text-white font-bold">${executionPrice.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[#787B86]">Estimated Cost: </span>
                <span className="text-white font-bold">${estimatedCost.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-2.5 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-md ${
                side === 'BUY'
                  ? 'bg-[#089981] hover:bg-[#078570]'
                  : 'bg-[#F23645] hover:bg-[#d62b39]'
              }`}
            >
              Submit {side} Order ({shares} {selectedSymbol})
            </button>

            {feedback && (
              <div className="p-2.5 rounded-lg bg-[#089981]/15 border border-[#089981]/40 text-[#089981] text-xs font-mono text-center">
                {feedback}
              </div>
            )}
          </form>

          {/* Active Positions Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Open Positions ({positions.length})
              </h4>
              <button
                onClick={onResetBalance}
                className="text-[11px] text-[#787B86] hover:text-[#D1D4DC] flex items-center gap-1 cursor-pointer"
              >
                <RefreshCcw className="w-3 h-3" />
                <span>Reset Portfolio</span>
              </button>
            </div>

            {positions.length === 0 ? (
              <div className="p-6 text-center text-[#787B86] text-xs bg-[#1E222D]/40 rounded-xl border border-[#2A2E39]">
                No active positions. Execute a trade above to start building your simulated portfolio.
              </div>
            ) : (
              <div className="overflow-x-auto bg-[#131722] border border-[#2A2E39] rounded-xl">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#2A2E39] text-[#787B86] bg-[#181a20]">
                      <th className="p-3">Symbol</th>
                      <th className="p-3">Side</th>
                      <th className="p-3 text-right">Shares</th>
                      <th className="p-3 text-right">Avg Price</th>
                      <th className="p-3 text-right">Current Price</th>
                      <th className="p-3 text-right">Unrealized P&amp;L</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2E39]">
                    {positions.map((pos, idx) => {
                      const isProfit = pos.pnl >= 0;
                      return (
                        <tr key={`${pos.symbol}-${idx}`} className="hover:bg-[#1E222D]/50 transition-colors">
                          <td className="p-3 font-bold text-white">{pos.symbol}</td>
                          <td className="p-3">
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                pos.side === 'BUY'
                                  ? 'bg-[#089981]/15 text-[#089981]'
                                  : 'bg-[#F23645]/15 text-[#F23645]'
                              }`}
                            >
                              {pos.side}
                            </span>
                          </td>
                          <td className="p-3 text-right text-white tabular-nums">{pos.shares}</td>
                          <td className="p-3 text-right text-[#787B86] tabular-nums">
                            ${pos.avgPrice.toFixed(2)}
                          </td>
                          <td className="p-3 text-right text-white tabular-nums">
                            ${pos.currentPrice.toFixed(2)}
                          </td>
                          <td
                            className={`p-3 text-right font-bold tabular-nums ${
                              isProfit ? 'text-[#089981]' : 'text-[#F23645]'
                            }`}
                          >
                            {isProfit ? '+' : ''}${pos.pnl.toFixed(2)} ({isProfit ? '+' : ''}
                            {pos.pnlPercent.toFixed(2)}%)
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => onClosePosition(idx)}
                              className="px-2.5 py-1 rounded bg-[#1E222D] hover:bg-[#F23645] hover:text-white text-[#787B86] text-[11px] transition-colors cursor-pointer border border-[#2A2E39]"
                            >
                              Close
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
