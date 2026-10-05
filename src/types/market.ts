export interface TickerItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high?: number;
  low?: number;
  category: 'indices' | 'crypto' | 'forex' | 'commodities' | 'equities';
  name: string;
}

export interface CandleData {
  time: string;
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TradeIdea {
  id: string;
  title: string;
  symbol: string;
  direction: 'LONG' | 'SHORT' | 'MACRO';
  description: string;
  author: {
    name: string;
    avatarInitials: string;
    avatarColor: string;
    verified?: boolean;
  };
  likes: number;
  comments: number;
  timeAgo: string;
  targetPrice?: number;
  entryPrice?: number;
  chartType: 'breakout' | 'pullback' | 'range';
}

export interface PineScriptItem {
  id: string;
  title: string;
  type: 'Open-Source' | 'Strategy' | 'Indicator' | 'Oscillator';
  rating: number;
  reviewsCount: string;
  description: string;
  author: string;
  codeSnippet: string;
}

export interface MarketMover {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
  consensus: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell';
  pe?: number;
  marketCap?: string;
  sector?: string;
}

export interface EarningsEvent {
  ticker: string;
  name: string;
  timing: string;
  estEPS: string;
  estRev: string;
  date: string;
}

export interface BrokerInfo {
  name: string;
  badge: string;
  description: string;
  rating: number;
  reviews: string;
  connected?: boolean;
}

export interface PaperPosition {
  symbol: string;
  side: 'BUY' | 'SELL';
  shares: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}
