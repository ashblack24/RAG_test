import React, { useState } from 'react';
import { Star, Check, Code, Play } from 'lucide-react';
import { PineScriptItem } from '../types/market';

interface PineScriptSectionProps {
  scripts: PineScriptItem[];
  onOpenPineStudio: (script?: PineScriptItem) => void;
  onAddScriptToChart: (script: PineScriptItem) => void;
  appliedScriptIds: Set<string>;
}

export const PineScriptSection: React.FC<PineScriptSectionProps> = ({
  scripts,
  onOpenPineStudio,
  onAddScriptToChart,
  appliedScriptIds
}) => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12" id="pinescript">
      <div className="bg-gradient-to-r from-[#131722] via-[#181d2c] to-[#131722] border border-[#2A2E39] rounded-2xl p-6 sm:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono text-[#2962FF] bg-[#2962FF]/10 px-3 py-1 rounded-full mb-3 border border-[#2962FF]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2962FF] animate-pulse" />
              <span>Pine Script® v5</span>
              <span className="text-[#787B86]">| Open Indicator Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Automate and Analyze with Pine Script
            </h2>
            <p className="text-[#787B86] text-sm max-w-xl mt-2 leading-relaxed">
              Access over 100,000+ community-built indicators and strategies or script your own algorithmic trading edges.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => onOpenPineStudio()}
              className="px-5 py-2.5 rounded-lg bg-[#1E222D] border border-[#2A2E39] text-sm font-semibold text-white hover:border-[#363A45] hover:bg-[#252a37] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Code className="w-4 h-4 text-[#787B86]" />
              <span>Documentation</span>
            </button>
            <button
              onClick={() => onOpenPineStudio()}
              className="px-5 py-2.5 rounded-lg bg-[#2962FF] text-sm font-semibold text-white hover:bg-[#1E53E5] transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <Play className="w-4 h-4" />
              <span>Explore Scripts</span>
            </button>
          </div>
        </div>

        {/* 4 Script Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {scripts.map((script) => {
            const isApplied = appliedScriptIds.has(script.id);

            return (
              <div
                key={script.id}
                className="bg-[#1E222D]/80 border border-[#2A2E39] p-4 rounded-xl hover:border-[#2962FF] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#787B86] mb-2">
                    <span className="text-amber-400 font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{script.rating}</span>
                      <span className="text-[#787B86] font-normal font-mono">({script.reviewsCount})</span>
                    </span>
                    <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[#131722] border border-[#2A2E39]">
                      {script.type}
                    </span>
                  </div>

                  <h4
                    onClick={() => onOpenPineStudio(script)}
                    className="font-bold text-white text-sm group-hover:text-[#2962FF] transition-colors cursor-pointer"
                  >
                    {script.title}
                  </h4>
                  <p className="text-xs text-[#787B86] mt-1.5 line-clamp-2 leading-relaxed">
                    {script.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2A2E39] flex items-center justify-between text-xs">
                  <span className="text-[#787B86]">
                    by <span className="text-[#D1D4DC] font-medium">{script.author}</span>
                  </span>
                  <button
                    onClick={() => onAddScriptToChart(script)}
                    className={`font-semibold cursor-pointer transition-colors flex items-center gap-1 ${
                      isApplied
                        ? 'text-[#089981] font-bold'
                        : 'text-[#2962FF] hover:underline'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </>
                    ) : (
                      'Add to chart'
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
