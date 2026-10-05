import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Plus, CheckCircle2 } from 'lucide-react';
import { TradeIdea } from '../types/market';

interface CommunityIdeasSectionProps {
  ideas: TradeIdea[];
  onSelectIdea: (idea: TradeIdea) => void;
  onOpenPublishModal: () => void;
  onLikeIdea: (id: string) => void;
  likedIdeaIds: Set<string>;
}

export const CommunityIdeasSection: React.FC<CommunityIdeasSectionProps> = ({
  ideas,
  onSelectIdea,
  onOpenPublishModal,
  onLikeIdea,
  likedIdeaIds
}) => {
  const [filter, setFilter] = useState<'editors' | 'popular' | 'streams'>('editors');

  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12" id="community">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Community Ideas &amp; Insights</h2>
          <p className="text-[#787B86] text-sm mt-1">
            Real-time analysis, strategies, and chart forecasts published by leading market analysts.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold">
          <button
            onClick={() => setFilter('editors')}
            className={`px-3 py-1.5 rounded-md border transition-colors cursor-pointer ${
              filter === 'editors'
                ? 'text-white bg-[#1E222D] border-[#2A2E39]'
                : 'text-[#787B86] border-transparent hover:text-white'
            }`}
          >
            Editors' picks
          </button>
          <button
            onClick={() => setFilter('popular')}
            className={`px-3 py-1.5 rounded-md border transition-colors cursor-pointer ${
              filter === 'popular'
                ? 'text-white bg-[#1E222D] border-[#2A2E39]'
                : 'text-[#787B86] border-transparent hover:text-white'
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setFilter('streams')}
            className={`px-3 py-1.5 rounded-md border transition-colors cursor-pointer ${
              filter === 'streams'
                ? 'text-white bg-[#1E222D] border-[#2A2E39]'
                : 'text-[#787B86] border-transparent hover:text-white'
            }`}
          >
            Streams
          </button>

          <button
            onClick={onOpenPublishModal}
            className="ml-3 px-3 py-1.5 rounded-md bg-[#2962FF] hover:bg-[#1E53E5] text-white flex items-center gap-1 transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Publish Idea</span>
          </button>
        </div>
      </div>

      {/* Featured Trade Idea Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ideas.map((idea) => {
          const isLiked = likedIdeaIds.has(idea.id);

          return (
            <article
              key={idea.id}
              className="bg-[#131722] border border-[#2A2E39] rounded-xl overflow-hidden hover:border-[#363A45] hover:bg-[#161a26] transition-all flex flex-col group cursor-pointer"
              data-purpose="idea-card"
              onClick={() => onSelectIdea(idea)}
            >
              {/* Mock Thumbnail matching reference SVGs */}
              <div className="relative h-44 bg-[#1E222D] border-b border-[#2A2E39] overflow-hidden">
                <svg
                  className="w-full h-full opacity-60 group-hover:scale-105 transition-transform duration-300"
                  viewBox="0 0 300 150"
                >
                  {idea.direction === 'SHORT' ? (
                    <>
                      <line
                        stroke="#F23645"
                        strokeDasharray="4"
                        strokeWidth="2"
                        x1="0"
                        x2="300"
                        y1="120"
                        y2="40"
                      />
                      <polyline
                        fill="none"
                        points="10,130 50,110 90,125 150,70 200,90 280,45"
                        stroke="#2962FF"
                        strokeWidth="2"
                      />
                    </>
                  ) : idea.direction === 'LONG' ? (
                    <>
                      <line
                        stroke="#089981"
                        strokeDasharray="4"
                        strokeWidth="2"
                        x1="0"
                        x2="300"
                        y1="130"
                        y2="30"
                      />
                      <polyline
                        fill="none"
                        points="10,140 60,110 120,115 180,60 230,70 290,25"
                        stroke="#2962FF"
                        strokeWidth="2"
                      />
                    </>
                  ) : (
                    <polyline
                      fill="none"
                      points="10,60 70,85 130,50 190,120 250,90 290,135"
                      stroke="#2962FF"
                      strokeWidth="2"
                    />
                  )}
                </svg>

                {/* Badge for direction */}
                <span
                  className={`absolute top-3 left-3 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-sm ${
                    idea.direction === 'SHORT'
                      ? 'bg-[#F23645]'
                      : idea.direction === 'LONG'
                      ? 'bg-[#089981]'
                      : 'bg-amber-500 text-black'
                  }`}
                >
                  {idea.direction}
                </span>

                {/* Symbol tag */}
                <span className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-[11px] font-mono px-2 py-0.5 rounded border border-[#2A2E39]">
                  {idea.symbol}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-base leading-snug group-hover:text-[#2962FF] transition-colors line-clamp-2">
                    {idea.title}
                  </h3>
                  <p className="text-[#787B86] text-xs mt-2 line-clamp-2 leading-relaxed">
                    {idea.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#2A2E39] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-6 h-6 rounded-full ${idea.author.avatarColor} font-bold text-[10px] flex items-center justify-center text-white`}
                    >
                      {idea.author.avatarInitials}
                    </div>
                    <span className="text-[#F0F3FA] font-medium flex items-center gap-1">
                      {idea.author.name}
                      {idea.author.verified && (
                        <CheckCircle2 className="w-3 h-3 text-[#2962FF]" />
                      )}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-[#787B86] font-mono">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikeIdea(idea.id);
                      }}
                      className={`flex items-center gap-1 hover:text-[#2962FF] transition-colors cursor-pointer ${
                        isLiked ? 'text-[#2962FF]' : ''
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{idea.likes + (isLiked ? 1 : 0)}</span>
                    </button>

                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{idea.comments}</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
