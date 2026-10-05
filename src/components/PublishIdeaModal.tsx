import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { TradeIdea } from '../types/market';

interface PublishIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (idea: Omit<TradeIdea, 'id' | 'likes' | 'comments' | 'timeAgo'>) => void;
  activeSymbol: string;
}

export const PublishIdeaModal: React.FC<PublishIdeaModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  activeSymbol
}) => {
  const [title, setTitle] = useState('');
  const [symbol, setSymbol] = useState(activeSymbol);
  const [direction, setDirection] = useState<'LONG' | 'SHORT' | 'MACRO'>('LONG');
  const [description, setDescription] = useState('');
  const [targetPrice, setTargetPrice] = useState<number>(250);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onPublish({
      title,
      symbol: symbol.toUpperCase(),
      direction,
      description,
      author: {
        name: 'You (Trader)',
        avatarInitials: 'ME',
        avatarColor: 'bg-[#2962FF]',
        verified: true
      },
      targetPrice,
      chartType: direction === 'LONG' ? 'breakout' : direction === 'SHORT' ? 'pullback' : 'range'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#131722] border border-[#2A2E39] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#2A2E39] flex items-center justify-between bg-[#181a20]">
          <h3 className="font-bold text-white text-base">Publish Trade Idea</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#1E222D] text-[#787B86] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs text-[#787B86] mb-1">Trade Direction</label>
            <div className="grid grid-cols-3 gap-2">
              {(['LONG', 'SHORT', 'MACRO'] as const).map((dir) => (
                <button
                  type="button"
                  key={dir}
                  onClick={() => setDirection(dir)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    direction === dir
                      ? dir === 'LONG'
                        ? 'bg-[#089981] text-white shadow-md'
                        : dir === 'SHORT'
                        ? 'bg-[#F23645] text-white shadow-md'
                        : 'bg-amber-500 text-black shadow-md'
                      : 'bg-[#1E222D] text-[#787B86] hover:text-white'
                  }`}
                >
                  {dir}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-[#787B86] mb-1">Symbol Ticker</label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="e.g. AAPL, BTCUSD"
                className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-lg px-3 py-2 text-xs font-mono font-bold text-white focus:outline-none focus:border-[#2962FF]"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-[#787B86] mb-1">Price Target ($)</label>
              <input
                type="number"
                step="0.01"
                value={targetPrice}
                onChange={(e) => setTargetPrice(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#2962FF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#787B86] mb-1">Idea Headline</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Breakout retest confirmed on massive volume"
              className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2962FF]"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-[#787B86] mb-1">Analysis &amp; Strategy Thesis</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail your technical thesis, key support/resistance levels, and invalidation criteria..."
              className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2962FF] resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#2962FF] hover:bg-[#1E53E5] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publish to Community</span>
          </button>
        </form>
      </div>
    </div>
  );
};
