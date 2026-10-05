import React from 'react';
import { Search, Globe, User, BarChart2, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentScreen: 'home' | 'supercharts' | 'screener' | 'community' | 'pinescript' | 'brokers';
  onNavigate: (screen: 'home' | 'supercharts' | 'screener' | 'community' | 'pinescript' | 'brokers') => void;
  onOpenSearch: () => void;
  onOpenOrderModal: () => void;
  portfolioBalance: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenSearch,
  onOpenOrderModal,
  portfolioBalance
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0C]/95 backdrop-blur-md border-b border-[#2A2E39]">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Left Navigation Links */}
        <div className="flex items-center space-x-6 xl:space-x-8">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            aria-label="TradingView Homepage"
            className="flex items-center space-x-2 text-white group cursor-pointer focus:outline-none"
          >
            <svg
              className="w-8 h-8 fill-current text-white group-hover:text-[#2962FF] transition-colors"
              viewBox="0 0 36 28"
            >
              <path d="M14 22H7V6h7v16zm8-22h-7v28h7V0zm8 11h-7v17h7V11z" />
            </svg>
            <span className="font-bold text-lg tracking-tight text-white hidden sm:inline">TradingView</span>
          </button>

          {/* Global Search Bar matching visual reference */}
          <div className="relative hidden md:block w-48 lg:w-60">
            <button
              onClick={onOpenSearch}
              className="w-full flex items-center h-9 px-3 bg-[#1e222d] border border-[#2A2E39] rounded-full text-[#787B86] hover:border-[#363A45] hover:text-[#D1D4DC] transition-all cursor-pointer text-left"
            >
              <Search className="w-4 h-4 mr-2 text-[#787B86]" />
              <span className="text-xs">Search (Ctrl+K)</span>
            </button>
          </div>

          {/* Primary Navigation */}
          <nav className="hidden xl:flex items-center space-x-6 text-[14px] font-medium text-[#D1D4DC]">
            <button
              onClick={() => onNavigate('supercharts')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                currentScreen === 'supercharts' ? 'text-white border-b-2 border-[#2962FF]' : ''
              }`}
            >
              Supercharts
            </button>
            <button
              onClick={() => onNavigate('screener')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                currentScreen === 'screener' ? 'text-white border-b-2 border-[#2962FF]' : ''
              }`}
            >
              Screener
            </button>
            <button
              onClick={() => onNavigate('community')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                currentScreen === 'community' ? 'text-white border-b-2 border-[#2962FF]' : ''
              }`}
            >
              Community
            </button>
            <button
              onClick={() => onNavigate('pinescript')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                currentScreen === 'pinescript' ? 'text-white border-b-2 border-[#2962FF]' : ''
              }`}
            >
              Pine Script
            </button>
            <button
              onClick={() => onNavigate('brokers')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                currentScreen === 'brokers' ? 'text-white border-b-2 border-[#2962FF]' : ''
              }`}
            >
              Brokers
            </button>
          </nav>
        </div>

        {/* Right Utility Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Mobile search trigger */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 text-[#787B86] hover:text-white rounded-lg cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Paper Trading Balance Button */}
          <button
            onClick={onOpenOrderModal}
            title="Paper Trading Simulated Account"
            className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#1E222D] border border-[#2A2E39] hover:border-[#363A45] text-xs font-mono text-[#D1D4DC] transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#089981] animate-pulse"></span>
            <span className="text-[#787B86]">Paper:</span>
            <span className="font-bold text-[#F0F3FA] tabular-nums">
              ${portfolioBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </button>

          {/* Language Selector */}
          <button
            aria-label="Select Language"
            className="flex items-center space-x-1.5 text-sm text-[#D1D4DC] hover:text-white transition-colors px-2 py-1 cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[#787B86]" />
            <span className="text-xs font-semibold uppercase tracking-wider">EN</span>
          </button>

          {/* User Profile */}
          <button
            onClick={onOpenOrderModal}
            aria-label="User Account"
            className="p-1.5 text-[#D1D4DC] hover:text-white hover:bg-[#131722] rounded-full transition-colors cursor-pointer"
          >
            <User className="w-5 h-5" />
          </button>

          {/* Get Started Blue Button as seen in snapshot */}
          <button
            onClick={() => onNavigate('supercharts')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#2962FF] to-[#1e53e5] rounded-full hover:shadow-[0_0_16px_rgba(41,98,255,0.4)] transition-all cursor-pointer whitespace-nowrap"
          >
            Launch Terminal
          </button>
        </div>
      </div>
    </header>
  );
};
