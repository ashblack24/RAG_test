import React, { useState, useRef, useEffect } from 'react';
import {
  TrendingUp,
  BarChart2,
  Sliders,
  Maximize2,
  Camera,
  Layers,
  Search,
  PenTool,
  Minus,
  Hash,
  Type,
  Trash2,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Check,
  ChevronDown
} from 'lucide-react';
import { CandleData, TickerItem, PaperPosition } from '../types/market';

interface SuperchartsScreenProps {
  activeSymbol: string;
  onSelectSymbol: (symbol: string) => void;
  candles: CandleData[];
  tickers: TickerItem[];
  portfolioBalance: number;
  onPlaceOrder: (order: { symbol: string; side: 'BUY' | 'SELL'; shares: number; price: number }) => void;
  positions: PaperPosition[];
}

export const SuperchartsScreen: React.FC<SuperchartsScreenProps> = ({
  activeSymbol,
  onSelectSymbol,
  candles,
  tickers,
  portfolioBalance,
  onPlaceOrder,
  positions
}) => {
  const [chartType, setChartType] = useState<'candles' | 'line' | 'heikin'>('candles');
  const [timeframe, setTimeframe] = useState<string>('1D');
  const [activeDrawingTool, setActiveDrawingTool] = useState<string>('crosshair');
  const [showRSI, setShowRSI] = useState<boolean>(true);
  const [showEMA, setShowEMA] = useState<boolean>(true);
  const [showOrderBook, setShowOrderBook] = useState<boolean>(true);
  const [isLiveReplay, setIsLiveReplay] = useState<boolean>(true);

  // Quick Order State
  const [orderSide, setOrderSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderQuantity, setOrderQuantity] = useState<number>(10);
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);

  // Crosshair state
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const currentTicker = tickers.find((t) => t.symbol === activeSymbol) || {
    symbol: activeSymbol,
    name: activeSymbol,
    price: candles.length > 0 ? candles[candles.length - 1].close : 234.80,
    change: 3.40,
    changePercent: 1.47,
    high: 235.10,
    low: 230.85,
    category: 'equities' as const
  };

  const latestCandle = candles[candles.length - 1] || {
    open: currentTicker.price * 0.99,
    high: currentTicker.price * 1.01,
    low: currentTicker.price * 0.98,
    close: currentTicker.price,
    time: '16:00',
    volume: 54200000,
    timestamp: Date.now()
  };

  // Min and max prices for chart scaling
  const candlePrices = candles.flatMap((c) => [c.high, c.low]);
  const minPrice = candlePrices.length > 0 ? Math.min(...candlePrices) * 0.995 : 225;
  const maxPrice = candlePrices.length > 0 ? Math.max(...candlePrices) * 1.005 : 240;
  const priceRange = maxPrice - minPrice || 1;

  // Chart coordinates calculation
  const width = 800;
  const height = 340;
  const candleWidth = Math.max(4, Math.floor((width - 40) / Math.max(1, candles.length) - 4));

  const getY = (price: number) => {
    return height - ((price - minPrice) / priceRange) * (height - 30) - 15;
  };

  const getX = (index: number) => {
    return 30 + index * (candleWidth + 4);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartContainerRef.current) return;
    const rect = chartContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const hoveredIndex = mousePos
    ? Math.min(
        candles.length - 1,
        Math.max(0, Math.floor((mousePos.x - 30) / (candleWidth + 4)))
      )
    : candles.length - 1;

  const displayCandle = candles[hoveredIndex] || latestCandle;
  const hoveredPrice = mousePos
    ? minPrice + ((height - 15 - mousePos.y) / (height - 30)) * priceRange
    : latestCandle.close;

  const handleQuickExecute = () => {
    onPlaceOrder({
      symbol: activeSymbol,
      side: orderSide,
      shares: orderQuantity,
      price: latestCandle.close
    });

    setOrderSuccessMsg(
      `Executed ${orderSide} ${orderQuantity} ${activeSymbol} @ $${latestCandle.close.toFixed(2)}`
    );

    setTimeout(() => {
      setOrderSuccessMsg(null);
    }, 3500);
  };

  return (
    <div className="w-full flex-1 flex flex-col bg-[#0A0A0C] text-[#D1D4DC] overflow-hidden select-none min-h-[calc(100vh-64px)]">
      {/* Supercharts Top Toolbar */}
      <div className="h-12 border-b border-[#2A2E39] bg-[#131722] px-3 flex items-center justify-between gap-3 text-xs font-mono shrink-0 overflow-x-auto">
        <div className="flex items-center space-x-2 shrink-0">
          {/* Symbol Search Trigger */}
          <div className="flex items-center bg-[#1E222D] border border-[#2A2E39] rounded-lg px-2.5 py-1">
            <span className="font-bold text-white text-sm">{activeSymbol}</span>
            <span className="text-[#787B86] text-[11px] ml-1.5 hidden md:inline">
              {currentTicker.name}
            </span>
          </div>

          {/* Timeframes */}
          <div className="flex items-center bg-[#1E222D] p-0.5 rounded-lg border border-[#2A2E39]">
            {['1m', '5m', '15m', '1H', '4H', '1D', '1W'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer transition-colors ${
                  timeframe === tf ? 'bg-[#2962FF] text-white' : 'text-[#787B86] hover:text-[#D1D4DC]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Chart Style Switcher */}
          <div className="flex items-center bg-[#1E222D] p-0.5 rounded-lg border border-[#2A2E39]">
            <button
              onClick={() => setChartType('candles')}
              className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                chartType === 'candles' ? 'bg-[#2962FF] text-white' : 'text-[#787B86] hover:text-white'
              }`}
            >
              Candles
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                chartType === 'line' ? 'bg-[#2962FF] text-white' : 'text-[#787B86] hover:text-white'
              }`}
            >
              Line
            </button>
            <button
              onClick={() => setChartType('heikin')}
              className={`px-2 py-0.5 rounded text-[11px] cursor-pointer ${
                chartType === 'heikin' ? 'bg-[#2962FF] text-white' : 'text-[#787B86] hover:text-white'
              }`}
            >
              Heikin
            </button>
          </div>

          {/* Indicators Toggle Buttons */}
          <button
            onClick={() => setShowEMA(!showEMA)}
            className={`px-2.5 py-1 rounded text-[11px] font-sans border cursor-pointer transition-colors ${
              showEMA
                ? 'bg-[#2962FF]/20 border-[#2962FF] text-[#2962FF] font-semibold'
                : 'bg-[#1E222D] border-[#2A2E39] text-[#787B86]'
            }`}
          >
            EMA (20/50)
          </button>
          <button
            onClick={() => setShowRSI(!showRSI)}
            className={`px-2.5 py-1 rounded text-[11px] font-sans border cursor-pointer transition-colors ${
              showRSI
                ? 'bg-[#2962FF]/20 border-[#2962FF] text-[#2962FF] font-semibold'
                : 'bg-[#1E222D] border-[#2A2E39] text-[#787B86]'
            }`}
          >
            RSI (14)
          </button>
        </div>

        {/* Live Replay & Order Book Toggle */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsLiveReplay(!isLiveReplay)}
            className={`px-2.5 py-1 rounded border flex items-center gap-1.5 cursor-pointer text-[11px] font-sans ${
              isLiveReplay
                ? 'bg-[#089981]/15 border-[#089981]/40 text-[#089981] font-semibold'
                : 'bg-[#1E222D] border-[#2A2E39] text-[#787B86]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLiveReplay ? 'bg-[#089981] animate-ping' : 'bg-[#787B86]'}`} />
            <span>{isLiveReplay ? 'Live Market' : 'Paused'}</span>
          </button>

          <button
            onClick={() => setShowOrderBook(!showOrderBook)}
            className={`px-2.5 py-1 rounded border text-[11px] font-sans cursor-pointer ${
              showOrderBook
                ? 'bg-[#1E222D] border-[#363A45] text-white'
                : 'bg-[#131722] border-[#2A2E39] text-[#787B86]'
            }`}
          >
            DOM Book
          </button>
        </div>
      </div>

      {/* Main Terminal Grid: Drawing Bar + Chart Viewport + Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Drawing Tools Toolbar */}
        <div className="w-12 border-r border-[#2A2E39] bg-[#131722] flex flex-col items-center py-3 space-y-2 shrink-0">
          {[
            { id: 'crosshair', icon: Hash, label: 'Crosshair' },
            { id: 'trendline', icon: PenTool, label: 'Trendline' },
            { id: 'horizontal', icon: Minus, label: 'Horizontal Ray' },
            { id: 'text', icon: Type, label: 'Note' },
            { id: 'indicator', icon: BarChart2, label: 'Volume' }
          ].map((tool) => {
            const Icon = tool.icon;
            const isActive = activeDrawingTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveDrawingTool(tool.id)}
                title={tool.label}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#2962FF] text-white'
                    : 'text-[#787B86] hover:text-[#D1D4DC] hover:bg-[#1E222D]'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}

          <div className="w-6 h-[1px] bg-[#2A2E39] my-2" />

          <button
            onClick={() => setActiveDrawingTool('crosshair')}
            title="Clear Drawings"
            className="p-2 rounded-lg text-[#787B86] hover:text-[#F23645] hover:bg-[#1E222D] transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Central Chart Viewport */}
        <div
          ref={chartContainerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex-1 flex flex-col relative bg-[#131722] overflow-hidden cursor-crosshair"
        >
          {/* Chart Header Bar with live OHLCV */}
          <div className="h-9 border-b border-[#2A2E39]/70 bg-[#151924] px-4 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-white">{activeSymbol}</span>
              <span className="text-[#787B86]">O: <span className="text-[#F0F3FA] tabular-nums">{displayCandle.open.toFixed(2)}</span></span>
              <span className="text-[#787B86]">H: <span className="text-[#F0F3FA] tabular-nums">{displayCandle.high.toFixed(2)}</span></span>
              <span className="text-[#787B86]">L: <span className="text-[#F0F3FA] tabular-nums">{displayCandle.low.toFixed(2)}</span></span>
              <span className="text-[#787B86]">C: <span className="text-[#F0F3FA] tabular-nums">{displayCandle.close.toFixed(2)}</span></span>
              <span className={displayCandle.close >= displayCandle.open ? 'text-[#089981]' : 'text-[#F23645]'}>
                {displayCandle.close >= displayCandle.open ? '+' : ''}
                {(displayCandle.close - displayCandle.open).toFixed(2)} ({(((displayCandle.close - displayCandle.open) / displayCandle.open) * 100).toFixed(2)}%)
              </span>
            </div>

            <div className="text-[11px] text-[#787B86] hidden sm:block">
              {displayCandle.time} · Vol: {(displayCandle.volume / 1000).toFixed(0)}k
            </div>
          </div>

          {/* SVG Candlestick Canvas */}
          <div className="flex-1 relative p-3">
            <div className="absolute inset-0 grid-lines opacity-15 pointer-events-none" />

            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${width} ${height}`}
              preserveAspectRatio="none"
            >
              {/* Horizontal Price Grid Lines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
                const p = minPrice + ratio * priceRange;
                const y = getY(p);
                return (
                  <g key={ratio}>
                    <line
                      x1="0"
                      y1={y}
                      x2={width}
                      y2={y}
                      stroke="#2A2E39"
                      strokeWidth="1"
                      strokeDasharray="2 4"
                    />
                    <text
                      x={width - 50}
                      y={y - 4}
                      fill="#787B86"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {p.toFixed(2)}
                    </text>
                  </g>
                );
              })}

              {/* EMA Line (20 Period) */}
              {showEMA && (
                <path
                  d={candles
                    .map((c, i) => {
                      const x = getX(i) + candleWidth / 2;
                      const ema = c.close * 0.998;
                      const y = getY(ema);
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#2962FF"
                  strokeWidth="1.5"
                />
              )}

              {/* Candlesticks Rendering */}
              {chartType === 'candles' || chartType === 'heikin'
                ? candles.map((c, i) => {
                    const isBull = c.close >= c.open;
                    const color = isBull ? '#089981' : '#F23645';
                    const x = getX(i);
                    const openY = getY(c.open);
                    const closeY = getY(c.close);
                    const highY = getY(c.high);
                    const lowY = getY(c.low);
                    const bodyY = Math.min(openY, closeY);
                    const bodyHeight = Math.max(2, Math.abs(openY - closeY));

                    return (
                      <g key={`${c.time}-${i}`}>
                        {/* Upper & Lower Wick */}
                        <line
                          x1={x + candleWidth / 2}
                          y1={highY}
                          x2={x + candleWidth / 2}
                          y2={lowY}
                          stroke={color}
                          strokeWidth="1.2"
                        />
                        {/* Candle Body */}
                        <rect
                          x={x}
                          y={bodyY}
                          width={candleWidth}
                          height={bodyHeight}
                          fill={color}
                          rx="0.5"
                        />
                        {/* Bottom Volume bar */}
                        <rect
                          x={x}
                          y={height - (c.volume / 100000) * 0.8}
                          width={candleWidth}
                          height={(c.volume / 100000) * 0.8}
                          fill={isBull ? 'rgba(8, 153, 129, 0.3)' : 'rgba(242, 54, 69, 0.3)'}
                        />
                      </g>
                    );
                  })
                : (
                    /* Line Chart Mode */
                    <path
                      d={candles
                        .map((c, i) => {
                          const x = getX(i) + candleWidth / 2;
                          const y = getY(c.close);
                          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        })
                        .join(' ')}
                      fill="none"
                      stroke="#2962FF"
                      strokeWidth="2.5"
                    />
                  )}

              {/* Current Price Dashed Line */}
              <line
                x1="0"
                y1={getY(latestCandle.close)}
                x2={width}
                y2={getY(latestCandle.close)}
                stroke="#089981"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />

              {/* Interactive Crosshair */}
              {mousePos && (
                <g>
                  {/* Vertical line */}
                  <line
                    x1={mousePos.x}
                    y1="0"
                    x2={mousePos.x}
                    y2={height}
                    stroke="#787B86"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                  />
                  {/* Horizontal line */}
                  <line
                    x1="0"
                    y1={mousePos.y}
                    x2={width}
                    y2={mousePos.y}
                    stroke="#787B86"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                  />
                </g>
              )}
            </svg>

            {/* Current Price Flag on Right Y-Axis */}
            <div
              className="absolute right-0 px-2 py-0.5 rounded-l bg-[#089981] text-white text-[11px] font-mono font-bold shadow-md"
              style={{
                top: `${Math.max(10, Math.min(height - 25, getY(latestCandle.close)))}px`
              }}
            >
              {latestCandle.close.toFixed(2)}
            </div>

            {/* Hovered Price Flag if Crosshair Active */}
            {mousePos && (
              <div
                className="absolute right-0 px-2 py-0.5 rounded-l bg-[#2A2E39] text-[#F0F3FA] text-[10px] font-mono"
                style={{ top: `${mousePos.y - 10}px` }}
              >
                {hoveredPrice.toFixed(2)}
              </div>
            )}
          </div>

          {/* Sub-Chart Pane: RSI (14) */}
          {showRSI && (
            <div className="h-28 border-t border-[#2A2E39] bg-[#0E1118] px-4 py-2 relative flex flex-col justify-between shrink-0">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#787B86]">
                  RSI (14, close): <span className="text-amber-400 font-bold">58.42</span>
                </span>
                <div className="flex space-x-3 text-[10px] text-[#787B86]">
                  <span>Overbought: 70</span>
                  <span>Oversold: 30</span>
                </div>
              </div>

              <div className="h-16 w-full relative">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 60">
                  {/* Levels 70 and 30 */}
                  <line x1="0" y1="18" x2="800" y2="18" stroke="#F23645" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                  <line x1="0" y1="42" x2="800" y2="42" stroke="#089981" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
                  {/* RSI Oscillator Curve */}
                  <path
                    d="M 0,35 Q 120,48 240,25 T 480,18 T 680,32 T 800,24"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Time axis on bottom */}
          <div className="h-6 border-t border-[#2A2E39] bg-[#131722] px-4 flex items-center justify-between text-[10px] font-mono text-[#787B86] shrink-0">
            <span>09:30</span>
            <span>10:30</span>
            <span>11:30</span>
            <span>12:30</span>
            <span>13:30</span>
            <span>14:30</span>
            <span>15:30</span>
            <span>16:00 (Close)</span>
          </div>
        </div>

        {/* Right Sidebar: Watchlist & Quick Order Ticket */}
        <div className="w-72 border-l border-[#2A2E39] bg-[#131722] flex flex-col shrink-0">
          {/* Quick Order Execution Panel */}
          <div className="p-4 border-b border-[#2A2E39] bg-[#181d2c]/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Order Ticket
              </span>
              <span className="text-[11px] font-mono text-[#089981]">
                Paper: ${portfolioBalance.toFixed(0)}
              </span>
            </div>

            {/* Side Switcher (Buy / Sell) */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => setOrderSide('BUY')}
                className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  orderSide === 'BUY'
                    ? 'bg-[#089981] text-white shadow-md'
                    : 'bg-[#1E222D] text-[#787B86] hover:text-white'
                }`}
              >
                Buy {latestCandle.close.toFixed(2)}
              </button>
              <button
                onClick={() => setOrderSide('SELL')}
                className={`py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                  orderSide === 'SELL'
                    ? 'bg-[#F23645] text-white shadow-md'
                    : 'bg-[#1E222D] text-[#787B86] hover:text-white'
                }`}
              >
                Sell {(latestCandle.close * 0.999).toFixed(2)}
              </button>
            </div>

            {/* Quantity Input */}
            <div className="flex items-center justify-between bg-[#1E222D] border border-[#2A2E39] rounded-lg px-2.5 py-1.5 text-xs font-mono mb-3">
              <span className="text-[#787B86]">Shares:</span>
              <input
                type="number"
                min="1"
                max="5000"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 bg-transparent text-right font-bold text-white focus:outline-none"
              />
            </div>

            {/* Total value */}
            <div className="flex items-center justify-between text-[11px] font-mono text-[#787B86] mb-3">
              <span>Estimated Cost:</span>
              <span className="text-[#F0F3FA] font-bold">
                ${(orderQuantity * latestCandle.close).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>

            <button
              onClick={handleQuickExecute}
              className={`w-full py-2 rounded-lg text-xs font-bold text-white transition-all cursor-pointer shadow-md ${
                orderSide === 'BUY'
                  ? 'bg-[#089981] hover:bg-[#078570]'
                  : 'bg-[#F23645] hover:bg-[#d62b39]'
              }`}
            >
              Place {orderSide} Order
            </button>

            {orderSuccessMsg && (
              <div className="mt-2 p-2 rounded bg-[#089981]/15 border border-[#089981]/40 text-[#089981] text-[11px] font-mono text-center">
                {orderSuccessMsg}
              </div>
            )}
          </div>

          {/* Depth of Market (DOM) / Order Book Preview */}
          {showOrderBook && (
            <div className="p-3 border-b border-[#2A2E39] text-xs font-mono">
              <div className="flex justify-between text-[10px] text-[#787B86] mb-1 font-sans">
                <span>Bid Size</span>
                <span>Price</span>
                <span>Ask Size</span>
              </div>
              <div className="space-y-1">
                {/* Ask levels */}
                <div className="flex justify-between text-[11px] text-[#F23645] bg-[#F23645]/5 px-1 rounded">
                  <span className="text-[#787B86]">—</span>
                  <span className="font-semibold">{(latestCandle.close + 0.15).toFixed(2)}</span>
                  <span>1,420</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#F23645] bg-[#F23645]/10 px-1 rounded">
                  <span className="text-[#787B86]">—</span>
                  <span className="font-semibold">{(latestCandle.close + 0.05).toFixed(2)}</span>
                  <span>3,850</span>
                </div>
                {/* Spread */}
                <div className="flex justify-between text-[10px] text-[#787B86] py-0.5 border-y border-[#2A2E39]">
                  <span>Spread</span>
                  <span className="text-white font-bold">${latestCandle.close.toFixed(2)}</span>
                  <span>0.05</span>
                </div>
                {/* Bid levels */}
                <div className="flex justify-between text-[11px] text-[#089981] bg-[#089981]/10 px-1 rounded">
                  <span>4,120</span>
                  <span className="font-semibold">{(latestCandle.close - 0.05).toFixed(2)}</span>
                  <span className="text-[#787B86]">—</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#089981] bg-[#089981]/5 px-1 rounded">
                  <span>2,300</span>
                  <span className="font-semibold">{(latestCandle.close - 0.15).toFixed(2)}</span>
                  <span className="text-[#787B86]">—</span>
                </div>
              </div>
            </div>
          )}

          {/* Watchlist Section */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-3 border-b border-[#2A2E39] flex items-center justify-between text-xs">
              <span className="font-bold text-white">Watchlist</span>
              <span className="text-[#787B86] font-mono text-[11px]">{tickers.length} symbols</span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#2A2E39]/40">
              {tickers.map((t) => {
                const isSelected = t.symbol === activeSymbol;
                const isPos = t.changePercent >= 0;

                return (
                  <div
                    key={t.symbol}
                    onClick={() => onSelectSymbol(t.symbol)}
                    className={`p-2.5 flex items-center justify-between text-xs cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#2962FF]/15 border-l-2 border-[#2962FF]'
                        : 'hover:bg-[#1E222D]/60'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <span>{t.symbol}</span>
                      </div>
                      <div className="text-[10px] text-[#787B86] truncate max-w-[110px]">
                        {t.name}
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-[#F0F3FA] font-medium tabular-nums">
                        {t.price > 1000
                          ? t.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                          : t.price.toFixed(2)}
                      </div>
                      <div
                        className={`text-[11px] tabular-nums ${
                          isPos ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPos ? '+' : ''}
                        {t.changePercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
