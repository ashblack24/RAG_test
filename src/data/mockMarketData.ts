import { TickerItem, TradeIdea, PineScriptItem, MarketMover, EarningsEvent, BrokerInfo, CandleData } from '../types/market';

export const INITIAL_TICKERS: TickerItem[] = [
  { symbol: 'SPX', name: 'S&P 500 Index', price: 5864.67, change: 24.52, changePercent: 0.42, high: 5878.20, low: 5840.10, category: 'indices' },
  { symbol: 'NDX', name: 'Nasdaq 100', price: 20385.20, change: 157.80, changePercent: 0.78, high: 20410.50, low: 20215.00, category: 'indices' },
  { symbol: 'BTCUSD', name: 'Bitcoin / US Dollar', price: 68430.50, change: -775.20, changePercent: -1.12, high: 69520.00, low: 67880.00, category: 'crypto' },
  { symbol: 'ETHUSD', name: 'Ethereum / US Dollar', price: 2642.15, change: -22.65, changePercent: -0.85, high: 2688.40, low: 2615.10, category: 'crypto' },
  { symbol: 'DXY', name: 'US Dollar Currency Index', price: 103.82, change: 0.16, changePercent: 0.15, high: 104.05, low: 103.65, category: 'forex' },
  { symbol: 'GOLD', name: 'Gold Spot / US Dollar', price: 2736.40, change: 14.70, changePercent: 0.54, high: 2741.00, low: 2718.50, category: 'commodities' },
  { symbol: 'US10Y', name: 'US 10-Year Bond Yield', price: 4.24, change: -0.03, changePercent: -0.70, high: 4.28, low: 4.21, category: 'indices' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 141.54, change: 4.36, changePercent: 3.18, high: 142.20, low: 138.90, category: 'equities' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 234.80, change: 3.40, changePercent: 1.47, high: 235.10, low: 230.85, category: 'equities' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 218.85, change: -4.42, changePercent: -1.98, high: 224.50, low: 216.70, category: 'equities' },
  { symbol: 'EURUSD', name: 'Euro / US Dollar', price: 1.0825, change: -0.0018, changePercent: -0.17, high: 1.0860, low: 1.0810, category: 'forex' },
  { symbol: 'CL1!', name: 'Crude Oil WTI', price: 71.74, change: 0.86, changePercent: 1.22, high: 72.40, low: 70.80, category: 'commodities' }
];

export const CATEGORY_MARKET_CARDS: Record<string, TickerItem[]> = {
  indices: [
    { symbol: 'SPX', name: 'S&P 500', price: 5864.67, change: 24.52, changePercent: 0.42, high: 5878.20, low: 5840.10, category: 'indices' },
    { symbol: 'NDX', name: 'Nasdaq 100', price: 20385.20, change: 157.80, changePercent: 0.78, high: 20410.50, low: 20215.00, category: 'indices' },
    { symbol: 'BTCUSD', name: 'Bitcoin / USD', price: 68430.50, change: -775.20, changePercent: -1.12, high: 69520.00, low: 67880.00, category: 'crypto' },
    { symbol: 'GOLD', name: 'Gold (Spot)', price: 2736.40, change: 14.70, changePercent: 0.54, high: 2741.00, low: 2718.50, category: 'commodities' }
  ],
  crypto: [
    { symbol: 'BTCUSD', name: 'Bitcoin', price: 68430.50, change: -775.20, changePercent: -1.12, high: 69520.00, low: 67880.00, category: 'crypto' },
    { symbol: 'ETHUSD', name: 'Ethereum', price: 2642.15, change: -22.65, changePercent: -0.85, high: 2688.40, low: 2615.10, category: 'crypto' },
    { symbol: 'SOLUSD', name: 'Solana', price: 172.40, change: 7.85, changePercent: 4.77, high: 175.20, low: 164.10, category: 'crypto' },
    { symbol: 'BNBUSD', name: 'BNB Chain', price: 594.30, change: 3.10, changePercent: 0.52, high: 598.00, low: 588.50, category: 'crypto' }
  ],
  futures: [
    { symbol: 'ES1!', name: 'S&P 500 E-mini Futures', price: 5882.25, change: 26.50, changePercent: 0.45, high: 5894.00, low: 5855.00, category: 'indices' },
    { symbol: 'NQ1!', name: 'Nasdaq 100 E-mini', price: 20460.00, change: 165.25, changePercent: 0.81, high: 20490.00, low: 20280.00, category: 'indices' },
    { symbol: 'CL1!', name: 'Crude Oil Futures', price: 71.74, change: 0.86, changePercent: 1.22, high: 72.40, low: 70.80, category: 'commodities' },
    { symbol: 'GC1!', name: 'Gold Futures', price: 2748.90, change: 15.30, changePercent: 0.56, high: 2755.00, low: 2730.00, category: 'commodities' }
  ],
  bonds: [
    { symbol: 'US10Y', name: 'US 10Y Yield', price: 4.24, change: -0.03, changePercent: -0.70, high: 4.28, low: 4.21, category: 'indices' },
    { symbol: 'US02Y', name: 'US 2Y Yield', price: 4.02, change: -0.02, changePercent: -0.50, high: 4.05, low: 4.00, category: 'indices' },
    { symbol: 'US30Y', name: 'US 30Y Yield', price: 4.51, change: -0.04, changePercent: -0.88, high: 4.56, low: 4.49, category: 'indices' },
    { symbol: 'DE10Y', name: 'German Bund 10Y', price: 2.29, change: 0.01, changePercent: 0.44, high: 2.31, low: 2.27, category: 'indices' }
  ],
  forex: [
    { symbol: 'EURUSD', name: 'EUR / USD', price: 1.0825, change: -0.0018, changePercent: -0.17, high: 1.0860, low: 1.0810, category: 'forex' },
    { symbol: 'GBPUSD', name: 'GBP / USD', price: 1.2980, change: 0.0022, changePercent: 0.17, high: 1.3015, low: 1.2950, category: 'forex' },
    { symbol: 'USDJPY', name: 'USD / JPY', price: 152.85, change: 0.45, changePercent: 0.30, high: 153.20, low: 152.10, category: 'forex' },
    { symbol: 'AUDUSD', name: 'AUD / USD', price: 0.6650, change: 0.0015, changePercent: 0.23, high: 0.6675, low: 0.6620, category: 'forex' }
  ]
};

export const INITIAL_IDEAS: TradeIdea[] = [
  {
    id: 'idea-1',
    title: 'Bitcoin Testing Key Overhead Liquidity at $69.2k: Rejection Imminent?',
    symbol: 'CRYPTO:BTCUSD',
    direction: 'SHORT',
    description: 'Observing RSI divergence across the 4H timeframe with decreasing spot cumulative volume delta (CVD). Expecting liquidity sweep into the fair value gap.',
    author: {
      name: 'Alan_Santana',
      avatarInitials: 'AK',
      avatarColor: 'bg-zinc-700',
      verified: true
    },
    likes: 842,
    comments: 76,
    timeAgo: '4 hours ago',
    targetPrice: 65800,
    entryPrice: 68950,
    chartType: 'pullback'
  },
  {
    id: 'idea-2',
    title: 'Apple Inc. (AAPL): Bull Flag Breakout Into New All-Time Highs',
    symbol: 'NASDAQ:AAPL',
    direction: 'LONG',
    description: 'Ascending triangle pattern breakout on massive institutional block volumes. Next Fibonacci extension target is $248.50 with invalidation below $229.50.',
    author: {
      name: 'Tim_West_CMT',
      avatarInitials: 'TV',
      avatarColor: 'bg-[#2962FF]',
      verified: true
    },
    likes: 1420,
    comments: 124,
    timeAgo: '7 hours ago',
    targetPrice: 248.50,
    entryPrice: 234.80,
    chartType: 'breakout'
  },
  {
    id: 'idea-3',
    title: 'Nike Bottom Fishing Opportunity or Value Trap in Consumer Discretionary?',
    symbol: 'NYSE:NKE',
    direction: 'MACRO',
    description: 'Deep value analysis factoring forward P/E, inventory turnaround speed in EMEA, and CEO transition historical returns. Risk-reward favored at horizontal support.',
    author: {
      name: 'Capital_Flows',
      avatarInitials: 'CF',
      avatarColor: 'bg-purple-700',
      verified: false
    },
    likes: 519,
    comments: 48,
    timeAgo: '12 hours ago',
    targetPrice: 94.00,
    entryPrice: 78.50,
    chartType: 'range'
  }
];

export const PINE_SCRIPTS: PineScriptItem[] = [
  {
    id: 'pine-1',
    title: 'Volume Profile Fixed Range (VPVR)',
    type: 'Open-Source',
    rating: 4.9,
    reviewsCount: '18.2k',
    description: 'Identifies high-liquidity volume nodes and point of control (POC) across custom price ranges.',
    author: 'TradingView',
    codeSnippet: `//@version=5
indicator("Volume Profile Fixed Range", overlay=true, max_boxes_count=500)
var float poc = na
var float vah = na
var float val = na

// Calculate Volume Distribution
volume_step = (high - low) / 24
plot(ta.ema(close, 20), "EMA 20", color=color.blue, linewidth=2)`
  },
  {
    id: 'pine-2',
    title: 'Low-Risk Multi-Timeframe ETF',
    type: 'Strategy',
    rating: 4.8,
    reviewsCount: '9.4k',
    description: 'Backtested dual momentum strategy optimizing Sharpe ratio with trailing volatility stops.',
    author: 'QuantAlgo_Pro',
    codeSnippet: `//@version=5
strategy("Low-Risk Multi-Timeframe ETF", overlay=true, initial_capital=100000)
emaFast = ta.ema(close, 12)
emaSlow = ta.ema(close, 26)

if (ta.crossover(emaFast, emaSlow))
    strategy.entry("Long", strategy.long)
if (ta.crossunder(emaFast, emaSlow))
    strategy.close("Long")`
  },
  {
    id: 'pine-3',
    title: 'Trend Target Ribbon & Divergence',
    type: 'Indicator',
    rating: 4.9,
    reviewsCount: '31.1k',
    description: 'Dynamic EMA bands with multi-layer oscillation exhaustion filters and cloud shading.',
    author: 'LuxAlgo',
    codeSnippet: `//@version=5
indicator("Trend Target Ribbon", overlay=true)
src = close
len1 = input.int(20, "Fast EMA")
len2 = input.int(50, "Slow EMA")
plot(ta.ema(src, len1), color=color.green)
plot(ta.ema(src, len2), color=color.red)`
  },
  {
    id: 'pine-4',
    title: 'Statistical Mean Reversion Engine',
    type: 'Oscillator',
    rating: 4.7,
    reviewsCount: '7.8k',
    description: 'Z-score standard deviation channels calibrated for intraday scalping and reversion targets.',
    author: 'KivancOzbilgic',
    codeSnippet: `//@version=5
indicator("Statistical Mean Reversion", overlay=false)
length = input.int(20, "Period")
mult = input.float(2.0, "Z-Score Mult")
zscore = (close - ta.sma(close, length)) / ta.stdev(close, length)
hline(2.0, "Overbought", color=color.red, linestyle=hline.style_dashed)
hline(-2.0, "Oversold", color=color.green, linestyle=hline.style_dashed)
plot(zscore, "Z-Score", color=color.yellow)`
  }
];

export const HIGH_VOLUME_MOVERS: MarketMover[] = [
  { ticker: 'NVDA', name: 'NVIDIA Corp', price: 141.54, change: 4.36, changePercent: 3.18, volume: '64.12M', consensus: 'Strong Buy', pe: 54.2, marketCap: '$3.47T', sector: 'Semiconductors' },
  { ticker: 'TSLA', name: 'Tesla Inc', price: 218.85, change: -4.42, changePercent: -1.98, volume: '52.48M', consensus: 'Hold', pe: 68.4, marketCap: '$698.2B', sector: 'Consumer Cyclical' },
  { ticker: 'MU', name: 'Micron Technology', price: 112.30, change: 4.99, changePercent: 4.65, volume: '38.90M', consensus: 'Buy', pe: 28.1, marketCap: '$124.6B', sector: 'Semiconductors' },
  { ticker: 'AMD', name: 'Advanced Micro Devices', price: 156.24, change: 3.66, changePercent: 2.40, volume: '31.75M', consensus: 'Buy', pe: 42.8, marketCap: '$252.8B', sector: 'Semiconductors' },
  { ticker: 'MSTR', name: 'MicroStrategy', price: 214.50, change: 13.70, changePercent: 6.82, volume: '18.42M', consensus: 'Strong Buy', pe: 92.5, marketCap: '$44.1B', sector: 'Technology' },
  { ticker: 'PLTR', name: 'Palantir Technologies', price: 44.80, change: 1.85, changePercent: 4.31, volume: '46.10M', consensus: 'Buy', pe: 88.0, marketCap: '$99.5B', sector: 'Software' },
  { ticker: 'COIN', name: 'Coinbase Global', price: 226.90, change: 8.40, changePercent: 3.84, volume: '14.80M', consensus: 'Hold', pe: 39.2, marketCap: '$56.2B', sector: 'Financial Tech' },
  { ticker: 'AMZN', name: 'Amazon.com Inc', price: 187.90, change: 1.45, changePercent: 0.78, volume: '29.30M', consensus: 'Strong Buy', pe: 43.1, marketCap: '$1.96T', sector: 'Consumer Cyclical' }
];

export const EARNINGS_CALENDAR: EarningsEvent[] = [
  { ticker: 'MSFT', name: 'Microsoft Corp', timing: 'After Market Close', estEPS: '$3.10', estRev: '$64.5B', date: 'Tomorrow' },
  { ticker: 'GOOG', name: 'Alphabet Inc', timing: 'After Market Close', estEPS: '$1.85', estRev: '$86.3B', date: 'Tomorrow' },
  { ticker: 'META', name: 'Meta Platforms', timing: 'After Market Close', estEPS: '$5.28', estRev: '$40.2B', date: 'Tomorrow' },
  { ticker: 'AAPL', name: 'Apple Inc', timing: 'Thursday After Close', estEPS: '$1.60', estRev: '$94.4B', date: 'In 2 days' }
];

export const BROKERS: BrokerInfo[] = [
  {
    name: 'TradeStation',
    badge: 'Integrated API',
    description: 'Commission-free US equities and futures with micro contracts and lightning fast order routing.',
    rating: 4.8,
    reviews: '14k Reviews'
  },
  {
    name: 'OANDA',
    badge: 'Global Forex',
    description: 'Industry-leading FX liquidity, tight spreads across 70+ currency pairs, and regulatory compliance.',
    rating: 4.7,
    reviews: '9.8k Reviews'
  },
  {
    name: 'NinjaTrader',
    badge: 'Futures Specialist',
    description: 'Low margins for E-mini and Micro indices, deep depth of market (DOM), and fast server execution.',
    rating: 4.9,
    reviews: '21k Reviews'
  }
];

export function generateInitialCandles(basePrice: number = 230, count: number = 32): CandleData[] {
  const candles: CandleData[] = [];
  let currentPrice = basePrice;
  const now = Date.now();
  const stepMs = 5 * 60 * 1000;

  for (let i = count; i >= 0; i--) {
    const timestamp = now - i * stepMs;
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const mins = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${mins}`;

    const delta = (Math.random() - 0.46) * 1.8;
    const open = currentPrice;
    const close = Math.max(1, open + delta);
    const high = Math.max(open, close) + Math.random() * 1.2;
    const low = Math.min(open, close) - Math.random() * 1.2;
    const volume = Math.floor(20000 + Math.random() * 80000);

    candles.push({
      time,
      timestamp,
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume
    });

    currentPrice = close;
  }

  return candles;
}
