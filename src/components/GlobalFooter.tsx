import React from 'react';

interface GlobalFooterProps {
  onNavigate: (screen: 'home' | 'supercharts' | 'screener' | 'community' | 'pinescript' | 'brokers') => void;
  onOpenSpaceStory: () => void;
  onOpenPlansModal: () => void;
}

export const GlobalFooter: React.FC<GlobalFooterProps> = ({
  onNavigate,
  onOpenSpaceStory,
  onOpenPlansModal
}) => {
  return (
    <footer className="border-t border-[#2A2E39] bg-[#08090b] text-[#787B86] text-xs pt-16 pb-12 select-none">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        {/* Multi-column links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div>
            <div className="font-bold text-white uppercase tracking-wider text-xs mb-4">Products</div>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('supercharts')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Supercharts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pinescript')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Pine Script®
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('screener')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Stock Screener
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('screener')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Forex Screener
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('screener')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Crypto Heatmap
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('screener')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Economic Calendar
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider text-xs mb-4">Company</div>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer text-left">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('supercharts')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Features
                </button>
              </li>
              <li>
                <button onClick={onOpenPlansModal} className="hover:text-white transition-colors cursor-pointer text-left">
                  Pricing &amp; Plans
                </button>
              </li>
              <li>
                <button onClick={onOpenSpaceStory} className="hover:text-white transition-colors cursor-pointer text-left">
                  Space Story
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Careers <span className="text-[#2962FF] font-semibold">We're hiring</span>
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Press Room
                </span>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider text-xs mb-4">Community</div>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Trade Ideas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pinescript')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Scripts &amp; Indicators
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">House Rules</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">Moderators</span>
              </li>
              <li>
                <button onClick={() => onNavigate('community')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Streams
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider text-xs mb-4">For Business</div>
            <ul className="space-y-2.5">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">Charting Libraries</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">Advanced Charts</span>
              </li>
              <li>
                <button onClick={() => onNavigate('brokers')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Trading Platform
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('brokers')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Brokerage Integration
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">Advertising Solutions</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider text-xs mb-4">Social &amp; Apps</div>
            <ul className="space-y-2.5">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">Desktop App</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">iOS &amp; iPad</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">Android Mobile</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">X (Twitter)</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">YouTube Channel</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">Discord Server</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimers & Copyright */}
        <div className="pt-8 border-t border-[#2A2E39] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center space-x-3 text-white">
            <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 36 28">
              <path d="M14 22H7V6h7v16zm8-22h-7v28h7V0zm8 11h-7v17h7V11z" />
            </svg>
            <span className="text-[#787B86]">
              © 2024 TradingView, Inc. All rights reserved. Look first / Then leap.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[#787B86]">
            <a href="#" className="hover:text-white transition-colors">Terms of use</a>
            <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies policy</a>
            <a href="#" className="hover:text-white transition-colors">Risk warning &amp; Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
