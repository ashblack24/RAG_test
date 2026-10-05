import React from 'react';

interface BottomCTAProps {
  onGetStarted: () => void;
  onExplorePlans: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ onGetStarted, onExplorePlans }) => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-16">
      <div className="bg-gradient-to-b from-[#181d2c] to-[#131722] border border-[#2A2E39] rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Prepare your charts.
          </h2>
          <p className="text-[#787B86] text-base leading-relaxed">
            Look first / Then leap. Join 100M+ traders on the world's most advanced financial visualization network.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-100 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              Get started for free
            </button>
            <button
              onClick={onExplorePlans}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1E222D] border border-[#2A2E39] text-white font-semibold text-sm hover:border-[#363A45] hover:bg-[#252a38] transition-all cursor-pointer"
            >
              Explore Pro Plans
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
