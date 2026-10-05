import React from 'react';
import { X, Check, Zap } from 'lucide-react';

interface PlansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlansModal: React.FC<PlansModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-[#131722] border border-[#2A2E39] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#2A2E39] flex items-center justify-between bg-[#181a20]">
          <div>
            <h3 className="font-bold text-white text-lg">TradingView Pro Plans</h3>
            <p className="text-xs text-[#787B86] mt-0.5">
              Unlock maximum chart speed, unlimited indicators, and real-time exchange data feeds.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#1E222D] text-[#787B86] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tier Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto">
          {/* Plan 1 */}
          <div className="bg-[#1E222D] border border-[#2A2E39] rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-white">Essential</div>
              <div className="text-2xl font-bold font-mono text-white mt-2">$14.95<span className="text-xs text-[#787B86] font-normal"> /mo</span></div>
              <p className="text-xs text-[#787B86] mt-2">Distraction-free trading with enhanced charting flexibility.</p>
              <ul className="mt-5 space-y-2 text-xs text-[#D1D4DC]">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> 5 indicators per chart</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> 2 charts in one layout</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> 20 active price alerts</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> Ad-free experience</li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2 bg-[#2A2E39] hover:bg-[#363A45] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Start 30-Day Free Trial
            </button>
          </div>

          {/* Plan 2: Most Popular */}
          <div className="bg-[#181d2c] border-2 border-[#2962FF] rounded-xl p-5 flex flex-col justify-between relative shadow-xl">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2962FF] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
              Most Popular
            </span>
            <div>
              <div className="text-sm font-bold text-white">Plus</div>
              <div className="text-2xl font-bold font-mono text-white mt-2">$29.95<span className="text-xs text-[#787B86] font-normal"> /mo</span></div>
              <p className="text-xs text-[#787B86] mt-2">Advanced technical analysis and intraday strategy testing.</p>
              <ul className="mt-5 space-y-2 text-xs text-[#D1D4DC]">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> 10 indicators per chart</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> 4 charts in one layout</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> 100 active price alerts</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> Intraday bar replay</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> Custom formula charts</li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2 bg-[#2962FF] hover:bg-[#1E53E5] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-md"
            >
              Start 30-Day Free Trial
            </button>
          </div>

          {/* Plan 3 */}
          <div className="bg-[#1E222D] border border-[#2A2E39] rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-white">Premium</div>
              <div className="text-2xl font-bold font-mono text-white mt-2">$59.95<span className="text-xs text-[#787B86] font-normal"> /mo</span></div>
              <p className="text-xs text-[#787B86] mt-2">Maximum data density and ultra-low latency execution.</p>
              <ul className="mt-5 space-y-2 text-xs text-[#D1D4DC]">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> 25 indicators per chart</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> 8 charts in one layout</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> 400 active price alerts</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> Second-based intervals</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#089981]" /> Priority customer support</li>
              </ul>
            </div>
            <button
              onClick={onClose}
              className="mt-6 w-full py-2 bg-[#2A2E39] hover:bg-[#363A45] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Start 30-Day Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
