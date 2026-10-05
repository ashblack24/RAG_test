import React from 'react';
import { X, Rocket, Compass, Award } from 'lucide-react';

interface SpaceStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SpaceStoryModal: React.FC<SpaceStoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-[#131722] border border-[#2A2E39] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#2A2E39] flex items-center justify-between bg-[#181a20]">
          <div className="flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-[#2962FF]" />
            <span className="font-bold text-white text-base">The Space Story</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#1E222D] text-[#787B86] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-sm text-[#D1D4DC] leading-relaxed">
          <div className="flex items-center space-x-4 bg-[#1E222D] p-4 rounded-xl border border-[#2A2E39]">
            <div className="w-14 h-14 rounded-full bg-[#2962FF]/20 border border-[#2962FF] flex items-center justify-center text-white font-bold text-lg shrink-0">
              KP
            </div>
            <div>
              <div className="font-bold text-white text-base">Scott "Kidd" Poteet</div>
              <div className="text-xs text-[#787B86]">
                Mission Pilot, Polaris Dawn &amp; Former USAF Thunderbird #4
              </div>
            </div>
          </div>

          <blockquote className="border-l-2 border-[#2962FF] pl-4 italic text-[#F0F3FA] text-base font-serif">
            "Whether you're flying fighter jets at Mach 2 or charting high-beta breakaways on TradingView, precision preparation and data discipline define survival and victory."
          </blockquote>

          <p>
            When former USAF Thunderbird pilot and Polaris Dawn astronaut Scott "Kidd" Poteet prepared for high-apogee orbital flight, the guiding philosophy remained steadfast: <strong className="text-white">Look first / Then leap.</strong>
          </p>

          <p className="text-xs text-[#787B86]">
            TradingView was built for market participants who approach risk with the rigor of aviators and explorers — analyzing every vector before pulling the trigger.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-[#181d2c] rounded-lg border border-[#2A2E39] text-xs">
              <div className="font-bold text-white flex items-center gap-1.5 mb-1">
                <Compass className="w-4 h-4 text-[#2962FF]" />
                <span>1,400 km Orbit</span>
              </div>
              <div className="text-[#787B86] text-[11px]">Highest human Earth orbit since the Apollo program.</div>
            </div>
            <div className="p-3 bg-[#181d2c] rounded-lg border border-[#2A2E39] text-xs">
              <div className="font-bold text-white flex items-center gap-1.5 mb-1">
                <Award className="w-4 h-4 text-[#089981]" />
                <span>Commercial EVA</span>
              </div>
              <div className="text-[#787B86] text-[11px]">Historic first private astronaut spacewalk.</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2A2E39] bg-[#181a20] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};
