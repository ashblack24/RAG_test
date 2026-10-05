import React, { useState } from 'react';
import { X, ThumbsUp, MessageSquare, ArrowUpRight, CheckCircle2, Share2 } from 'lucide-react';
import { TradeIdea } from '../types/market';

interface IdeaDetailModalProps {
  idea: TradeIdea | null;
  onClose: () => void;
  onLike: (id: string) => void;
  isLiked: boolean;
  onOpenSuperchartsForSymbol: (symbol: string) => void;
}

export const IdeaDetailModal: React.FC<IdeaDetailModalProps> = ({
  idea,
  onClose,
  onLike,
  isLiked,
  onOpenSuperchartsForSymbol
}) => {
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState<string[]>([
    'Solid analysis! Looking for confirmation on the 1H timeframe before taking entry.',
    'Agreed on the volume shelf divergence. Trailing stop is a must here.'
  ]);

  if (!idea) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentsList([...commentsList, commentText.trim()]);
    setCommentText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-[#131722] border border-[#2A2E39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#2A2E39] flex items-center justify-between bg-[#181a20]">
          <div className="flex items-center space-x-3">
            <span
              className={`text-white text-xs font-bold px-2 py-0.5 rounded ${
                idea.direction === 'SHORT'
                  ? 'bg-[#F23645]'
                  : idea.direction === 'LONG'
                  ? 'bg-[#089981]'
                  : 'bg-amber-500 text-black'
              }`}
            >
              {idea.direction}
            </span>
            <span className="font-mono text-sm font-bold text-white">{idea.symbol}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#1E222D] text-[#787B86] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Author info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`w-9 h-9 rounded-full ${idea.author.avatarColor} font-bold text-xs flex items-center justify-center text-white`}
              >
                {idea.author.avatarInitials}
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>{idea.author.name}</span>
                  {idea.author.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#2962FF]" />}
                </div>
                <div className="text-[11px] text-[#787B86]">{idea.timeAgo}</div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                const rawSym = idea.symbol.includes(':') ? idea.symbol.split(':')[1] : idea.symbol;
                onOpenSuperchartsForSymbol(rawSym);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#2962FF] hover:bg-[#1E53E5] text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Open in Supercharts</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Title & Description */}
          <div>
            <h2 className="text-xl font-bold text-white leading-snug">{idea.title}</h2>
            <p className="text-sm text-[#D1D4DC] mt-3 leading-relaxed">{idea.description}</p>
          </div>

          {/* Trade Parameters Cards */}
          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="p-3 bg-[#1E222D] rounded-lg border border-[#2A2E39]">
              <div className="text-[#787B86] text-[10px]">Entry Price</div>
              <div className="text-sm font-bold text-white mt-1">
                ${idea.entryPrice?.toFixed(2) || 'Market'}
              </div>
            </div>
            <div className="p-3 bg-[#1E222D] rounded-lg border border-[#2A2E39]">
              <div className="text-[#787B86] text-[10px]">Target Price</div>
              <div className="text-sm font-bold text-[#089981] mt-1">
                ${idea.targetPrice?.toFixed(2) || 'Open Target'}
              </div>
            </div>
            <div className="p-3 bg-[#1E222D] rounded-lg border border-[#2A2E39]">
              <div className="text-[#787B86] text-[10px]">Direction / Type</div>
              <div className="text-sm font-bold text-white mt-1">{idea.direction} · {idea.chartType}</div>
            </div>
          </div>

          {/* Likes & Comments bar */}
          <div className="flex items-center space-x-4 pt-2 border-t border-[#2A2E39] text-xs text-[#787B86]">
            <button
              onClick={() => onLike(idea.id)}
              className={`flex items-center gap-1.5 hover:text-[#2962FF] transition-colors cursor-pointer ${
                isLiked ? 'text-[#2962FF] font-bold' : ''
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>{idea.likes + (isLiked ? 1 : 0)} Likes</span>
            </button>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              <span>{commentsList.length} Comments</span>
            </span>
          </div>

          {/* Comments section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Discussion</h4>
            <div className="space-y-2">
              {commentsList.map((comm, idx) => (
                <div key={idx} className="p-3 bg-[#181d2c] rounded-lg border border-[#2A2E39] text-xs">
                  <div className="text-[#787B86] text-[10px] mb-1">Community Member · Just now</div>
                  <div className="text-[#D1D4DC]">{comm}</div>
                </div>
              ))}
            </div>

            {/* Comment input form */}
            <form onSubmit={handleAddComment} className="flex gap-2 pt-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your perspective or ask a question..."
                className="flex-1 bg-[#1E222D] border border-[#2A2E39] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#2962FF]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2962FF] hover:bg-[#1E53E5] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
