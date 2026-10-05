import React, { useState } from 'react';
import { Play, Code, Check, RefreshCw, BarChart2, ShieldCheck, Copy } from 'lucide-react';
import { PineScriptItem } from '../types/market';
import { PINE_SCRIPTS } from '../data/mockMarketData';

interface PineScriptStudioScreenProps {
  initialScript?: PineScriptItem;
  onAddScriptToChart: (script: PineScriptItem) => void;
  onOpenSupercharts: () => void;
}

export const PineScriptStudioScreen: React.FC<PineScriptStudioScreenProps> = ({
  initialScript,
  onAddScriptToChart,
  onOpenSupercharts
}) => {
  const [selectedScript, setSelectedScript] = useState<PineScriptItem>(initialScript || PINE_SCRIPTS[0]);
  const [editorCode, setEditorCode] = useState<string>(selectedScript.codeSnippet);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compileSuccess, setCompileSuccess] = useState<boolean>(true);
  const [applied, setApplied] = useState<boolean>(false);

  // Backtest simulation results
  const [backtestStats, setBacktestStats] = useState({
    netProfit: '+38.4%',
    profitFactor: 2.14,
    winRate: '68.2%',
    trades: 142,
    maxDrawdown: '-6.8%'
  });

  const handleSelectTemplate = (script: PineScriptItem) => {
    setSelectedScript(script);
    setEditorCode(script.codeSnippet);
    setApplied(false);
  };

  const handleRunBacktest = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setCompileSuccess(true);
      setBacktestStats({
        netProfit: `+${(25 + Math.random() * 30).toFixed(1)}%`,
        profitFactor: Number((1.8 + Math.random() * 0.8).toFixed(2)),
        winRate: `${(62 + Math.random() * 12).toFixed(1)}%`,
        trades: Math.floor(100 + Math.random() * 80),
        maxDrawdown: `-${(4 + Math.random() * 5).toFixed(1)}%`
      });
    }, 600);
  };

  const handleApply = () => {
    onAddScriptToChart(selectedScript);
    setApplied(true);
    setTimeout(() => {
      onOpenSupercharts();
    }, 800);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#2962FF] bg-[#2962FF]/10 px-3 py-1 rounded-full mb-2">
            <span>● Pine Script® v5 Studio</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Script Editor &amp; Strategy Backtester
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleRunBacktest}
            disabled={isCompiling}
            className="px-4 py-2 bg-[#1E222D] hover:bg-[#252a38] text-white border border-[#2A2E39] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCompiling ? 'animate-spin' : ''}`} />
            <span>{isCompiling ? 'Backtesting...' : 'Run Strategy Test'}</span>
          </button>

          <button
            onClick={handleApply}
            className="px-4 py-2 bg-[#2962FF] hover:bg-[#1E53E5] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            {applied ? <Check className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5" />}
            <span>{applied ? 'Applied to Chart!' : 'Add to Supercharts'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Templates Sidebar */}
        <div className="bg-[#131722] border border-[#2A2E39] rounded-xl p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white text-sm mb-3">Community Indicators</h3>
            <div className="space-y-2">
              {PINE_SCRIPTS.map((script) => (
                <button
                  key={script.id}
                  onClick={() => handleSelectTemplate(script)}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedScript.id === script.id
                      ? 'bg-[#2962FF]/15 border-[#2962FF] text-white'
                      : 'bg-[#1E222D]/60 border-[#2A2E39] text-[#787B86] hover:text-[#D1D4DC]'
                  }`}
                >
                  <div className="text-xs font-bold leading-snug">{script.title}</div>
                  <div className="flex items-center justify-between text-[11px] font-mono mt-1 text-[#787B86]">
                    <span>★ {script.rating}</span>
                    <span>{script.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#2A2E39] text-xs text-[#787B86] leading-relaxed">
            Pine Script® is TradingView's domain-specific programming language designed for creating custom indicators and strategies.
          </div>
        </div>

        {/* Central Code Editor */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-[#131722] border border-[#2A2E39] rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="h-10 border-b border-[#2A2E39] bg-[#181a20] px-4 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center space-x-2 text-[#787B86]">
                <Code className="w-4 h-4 text-[#2962FF]" />
                <span className="text-white font-semibold">{selectedScript.title}.pine</span>
              </div>
              <span className="text-[#089981] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Compiler: Ready</span>
              </span>
            </div>

            {/* Code Textarea with line numbers */}
            <div className="p-4 bg-[#0A0A0C] font-mono text-xs text-[#D1D4DC] overflow-x-auto min-h-[320px]">
              <textarea
                value={editorCode}
                onChange={(e) => setEditorCode(e.target.value)}
                rows={14}
                className="w-full bg-transparent resize-none focus:outline-none font-mono text-xs leading-relaxed text-[#D1D4DC] selection:bg-[#2962FF]"
                spellCheck="false"
              />
            </div>
          </div>

          {/* Backtest Strategy Performance Matrix */}
          <div className="bg-[#131722] border border-[#2A2E39] rounded-xl p-5 shadow-xl">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Backtesting Performance Metrics (Simulated Historical Data)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
              <div className="p-3 bg-[#1E222D] rounded-lg border border-[#2A2E39]">
                <div className="text-[10px] text-[#787B86]">Net Profit</div>
                <div className="text-base font-bold text-[#089981] mt-1 tabular-nums">
                  {backtestStats.netProfit}
                </div>
              </div>
              <div className="p-3 bg-[#1E222D] rounded-lg border border-[#2A2E39]">
                <div className="text-[10px] text-[#787B86]">Profit Factor</div>
                <div className="text-base font-bold text-white mt-1 tabular-nums">
                  {backtestStats.profitFactor}
                </div>
              </div>
              <div className="p-3 bg-[#1E222D] rounded-lg border border-[#2A2E39]">
                <div className="text-[10px] text-[#787B86]">Win Rate</div>
                <div className="text-base font-bold text-[#089981] mt-1 tabular-nums">
                  {backtestStats.winRate}
                </div>
              </div>
              <div className="p-3 bg-[#1E222D] rounded-lg border border-[#2A2E39]">
                <div className="text-[10px] text-[#787B86]">Closed Trades</div>
                <div className="text-base font-bold text-white mt-1 tabular-nums">
                  {backtestStats.trades}
                </div>
              </div>
              <div className="p-3 bg-[#1E222D] rounded-lg border border-[#2A2E39]">
                <div className="text-[10px] text-[#787B86]">Max Drawdown</div>
                <div className="text-base font-bold text-[#F23645] mt-1 tabular-nums">
                  {backtestStats.maxDrawdown}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
