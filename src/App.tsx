/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveTickerBar } from './components/LiveTickerBar';
import { HeroSection } from './components/HeroSection';
import { MarketSummarySection } from './components/MarketSummarySection';
import { CommunityIdeasSection } from './components/CommunityIdeasSection';
import { PineScriptSection } from './components/PineScriptSection';
import { MarketMoversAndCalendar } from './components/MarketMoversAndCalendar';
import { BrokerSection } from './components/BrokerSection';
import { BottomCTA } from './components/BottomCTA';
import { GlobalFooter } from './components/GlobalFooter';

import { SuperchartsScreen } from './components/SuperchartsScreen';
import { ScreenerScreen } from './components/ScreenerScreen';
import { PineScriptStudioScreen } from './components/PineScriptStudioScreen';

import { SearchModal } from './components/SearchModal';
import { SpaceStoryModal } from './components/SpaceStoryModal';
import { OrderModal } from './components/OrderModal';
import { PublishIdeaModal } from './components/PublishIdeaModal';
import { PlansModal } from './components/PlansModal';
import { IdeaDetailModal } from './components/IdeaDetailModal';

import {
  INITIAL_TICKERS,
  INITIAL_IDEAS,
  PINE_SCRIPTS,
  HIGH_VOLUME_MOVERS,
  EARNINGS_CALENDAR,
  BROKERS,
  generateInitialCandles
} from './data/mockMarketData';
import { TickerItem, TradeIdea, PineScriptItem, PaperPosition, CandleData } from './types/market';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'home' | 'supercharts' | 'screener' | 'community' | 'pinescript' | 'brokers'
  >('home');

  const [tickers, setTickers] = useState<TickerItem[]>(INITIAL_TICKERS);
  const [ideas, setIdeas] = useState<TradeIdea[]>(INITIAL_IDEAS);
  const [activeSymbol, setActiveSymbol] = useState<string>('AAPL');
  const [candles, setCandles] = useState<CandleData[]>(() => generateInitialCandles(230, 28));

  // Paper Trading State
  const [portfolioBalance, setPortfolioBalance] = useState<number>(100000);
  const [positions, setPositions] = useState<PaperPosition[]>([
    {
      symbol: 'AAPL',
      side: 'BUY',
      shares: 20,
      avgPrice: 231.50,
      currentPrice: 234.80,
      pnl: (234.80 - 231.50) * 20,
      pnlPercent: ((234.80 - 231.50) / 231.50) * 100
    }
  ]);

  // Applied Pine Scripts & Liked Ideas
  const [appliedScriptIds, setAppliedScriptIds] = useState<Set<string>>(new Set(['pine-1']));
  const [likedIdeaIds, setLikedIdeaIds] = useState<Set<string>>(new Set());
  const [connectedBroker, setConnectedBroker] = useState<string | null>('TradeStation');

  // Modals state
  const [searchOpen, setSearchOpen] = useState(false);
  const [spaceStoryOpen, setSpaceStoryOpen] = useState(false);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [publishIdeaOpen, setPublishIdeaOpen] = useState(false);
  const [plansModalOpen, setPlansModalOpen] = useState(false);
  const [selectedIdeaModal, setSelectedIdeaModal] = useState<TradeIdea | null>(null);
  const [selectedStudioScript, setSelectedStudioScript] = useState<PineScriptItem | undefined>(undefined);

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Real-time market tick simulation: randomly pulsates prices realistically
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          const delta = (Math.random() - 0.48) * (t.price > 1000 ? 12 : 0.25);
          const newPrice = Math.max(0.1, t.price + delta);
          const newChange = t.change + delta;
          const newChangePct = (newChange / (newPrice - newChange)) * 100;
          return {
            ...t,
            price: Number(newPrice.toFixed(t.price < 5 ? 4 : 2)),
            change: Number(newChange.toFixed(2)),
            changePercent: Number(newChangePct.toFixed(2))
          };
        })
      );

      // Also update latest candle close price
      setCandles((prevCandles) => {
        if (prevCandles.length === 0) return prevCandles;
        const last = { ...prevCandles[prevCandles.length - 1] };
        const tickDelta = (Math.random() - 0.48) * 0.4;
        last.close = Number(Math.max(1, last.close + tickDelta).toFixed(2));
        last.high = Number(Math.max(last.high, last.close).toFixed(2));
        last.low = Number(Math.min(last.low, last.close).toFixed(2));
        last.volume += Math.floor(Math.random() * 500);

        return [...prevCandles.slice(0, -1), last];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Update position PnL when current prices change
  useEffect(() => {
    setPositions((prevPositions) =>
      prevPositions.map((pos) => {
        const liveTicker = tickers.find((t) => t.symbol === pos.symbol);
        const currentPrice = liveTicker ? liveTicker.price : pos.currentPrice;
        const pnl =
          pos.side === 'BUY'
            ? (currentPrice - pos.avgPrice) * pos.shares
            : (pos.avgPrice - currentPrice) * pos.shares;
        const pnlPercent =
          pos.side === 'BUY'
            ? ((currentPrice - pos.avgPrice) / pos.avgPrice) * 100
            : ((pos.avgPrice - currentPrice) / pos.avgPrice) * 100;

        return {
          ...pos,
          currentPrice,
          pnl: Number(pnl.toFixed(2)),
          pnlPercent: Number(pnlPercent.toFixed(2))
        };
      })
    );
  }, [tickers]);

  // Symbol selection handler
  const handleSelectSymbol = (symbol: string) => {
    setActiveSymbol(symbol);
    const ticker = tickers.find((t) => t.symbol === symbol);
    const base = ticker ? ticker.price : 200;
    setCandles(generateInitialCandles(base, 28));
  };

  // Switch to supercharts with target symbol
  const handleOpenSuperchartsForSymbol = (symbol: string) => {
    handleSelectSymbol(symbol);
    setCurrentScreen('supercharts');
  };

  // Like idea toggle
  const handleLikeIdea = (id: string) => {
    setLikedIdeaIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Add Pine Script to chart
  const handleAddScriptToChart = (script: PineScriptItem) => {
    setAppliedScriptIds((prev) => {
      const next = new Set(prev);
      next.add(script.id);
      return next;
    });
  };

  // Open Pine Studio with optional specific script
  const handleOpenPineStudio = (script?: PineScriptItem) => {
    setSelectedStudioScript(script);
    setCurrentScreen('pinescript');
  };

  // Execute paper trade order
  const handlePlaceOrder = (order: {
    symbol: string;
    side: 'BUY' | 'SELL';
    shares: number;
    price: number;
  }) => {
    const cost = order.shares * order.price;
    setPortfolioBalance((prev) => (order.side === 'BUY' ? prev - cost : prev + cost));

    setPositions((prev) => [
      ...prev,
      {
        symbol: order.symbol,
        side: order.side,
        shares: order.shares,
        avgPrice: order.price,
        currentPrice: order.price,
        pnl: 0,
        pnlPercent: 0
      }
    ]);
  };

  const handleClosePosition = (index: number) => {
    setPositions((prev) => {
      const pos = prev[index];
      if (pos) {
        const returnAmount = pos.shares * pos.currentPrice;
        setPortfolioBalance((b) => b + returnAmount);
      }
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleResetBalance = () => {
    setPortfolioBalance(100000);
    setPositions([]);
  };

  // Publish new Trade Idea
  const handlePublishIdea = (
    newIdea: Omit<TradeIdea, 'id' | 'likes' | 'comments' | 'timeAgo'>
  ) => {
    const created: TradeIdea = {
      ...newIdea,
      id: `idea-${Date.now()}`,
      likes: 1,
      comments: 0,
      timeAgo: 'Just now'
    };
    setIdeas([created, ...ideas]);
  };

  // Broker connection toggle
  const handleConnectBroker = (brokerName: string) => {
    if (connectedBroker === brokerName) {
      setConnectedBroker(null);
    } else {
      setConnectedBroker(brokerName);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#D1D4DC] flex flex-col font-sans">
      {/* Live Continuous Ticker Bar at Top */}
      <LiveTickerBar tickers={tickers} onSelectSymbol={handleSelectSymbol} />

      {/* Global Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenOrderModal={() => setOrderModalOpen(true)}
        portfolioBalance={portfolioBalance}
      />

      {/* Screen Router */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'home' && (
          <>
            {/* Hero Section with Live Chart preview */}
            <HeroSection
              candles={candles}
              activeSymbol={activeSymbol}
              onSelectSymbol={handleSelectSymbol}
              onOpenSupercharts={() => setCurrentScreen('supercharts')}
              onOpenSpaceStory={() => setSpaceStoryOpen(true)}
              onOpenOrderModal={() => setOrderModalOpen(true)}
            />

            {/* Markets Summary Cards & Macro Strip */}
            <MarketSummarySection
              onSelectSymbol={(sym) => {
                handleSelectSymbol(sym);
                setCurrentScreen('supercharts');
              }}
              onExploreAll={() => setCurrentScreen('screener')}
            />

            {/* Community Ideas & Insights */}
            <CommunityIdeasSection
              ideas={ideas}
              onSelectIdea={(idea) => setSelectedIdeaModal(idea)}
              onOpenPublishModal={() => setPublishIdeaOpen(true)}
              onLikeIdea={handleLikeIdea}
              likedIdeaIds={likedIdeaIds}
            />

            {/* Pine Script Ecosystem */}
            <PineScriptSection
              scripts={PINE_SCRIPTS}
              onOpenPineStudio={handleOpenPineStudio}
              onAddScriptToChart={handleAddScriptToChart}
              appliedScriptIds={appliedScriptIds}
            />

            {/* High Volume Movers & Earnings Calendar */}
            <MarketMoversAndCalendar
              movers={HIGH_VOLUME_MOVERS}
              earnings={EARNINGS_CALENDAR}
              onSelectSymbol={(sym) => {
                handleSelectSymbol(sym);
                setCurrentScreen('supercharts');
              }}
              onLaunchScreener={() => setCurrentScreen('screener')}
            />

            {/* Trade Directly Through TradingView (Brokers) */}
            <BrokerSection
              brokers={BROKERS}
              connectedBroker={connectedBroker}
              onConnectBroker={handleConnectBroker}
              onOpenOrderModal={() => setOrderModalOpen(true)}
            />

            {/* Bottom CTA */}
            <BottomCTA
              onGetStarted={() => setCurrentScreen('supercharts')}
              onExplorePlans={() => setPlansModalOpen(true)}
            />
          </>
        )}

        {/* Supercharts Terminal Screen */}
        {currentScreen === 'supercharts' && (
          <SuperchartsScreen
            activeSymbol={activeSymbol}
            onSelectSymbol={handleSelectSymbol}
            candles={candles}
            tickers={tickers}
            portfolioBalance={portfolioBalance}
            onPlaceOrder={handlePlaceOrder}
            positions={positions}
          />
        )}

        {/* Screener Screen */}
        {currentScreen === 'screener' && (
          <ScreenerScreen
            onSelectSymbol={(sym) => {
              handleSelectSymbol(sym);
              setCurrentScreen('supercharts');
            }}
            onOpenOrderModal={() => setOrderModalOpen(true)}
          />
        )}

        {/* Community Screen */}
        {currentScreen === 'community' && (
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10 w-full">
            <CommunityIdeasSection
              ideas={ideas}
              onSelectIdea={(idea) => setSelectedIdeaModal(idea)}
              onOpenPublishModal={() => setPublishIdeaOpen(true)}
              onLikeIdea={handleLikeIdea}
              likedIdeaIds={likedIdeaIds}
            />
          </div>
        )}

        {/* Pine Script Studio Screen */}
        {currentScreen === 'pinescript' && (
          <PineScriptStudioScreen
            initialScript={selectedStudioScript}
            onAddScriptToChart={handleAddScriptToChart}
            onOpenSupercharts={() => setCurrentScreen('supercharts')}
          />
        )}

        {/* Brokers Screen */}
        {currentScreen === 'brokers' && (
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10 w-full">
            <BrokerSection
              brokers={BROKERS}
              connectedBroker={connectedBroker}
              onConnectBroker={handleConnectBroker}
              onOpenOrderModal={() => setOrderModalOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <GlobalFooter
        onNavigate={setCurrentScreen}
        onOpenSpaceStory={() => setSpaceStoryOpen(true)}
        onOpenPlansModal={() => setPlansModalOpen(true)}
      />

      {/* Global Modals */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        tickers={tickers}
        onSelectSymbol={(sym) => {
          handleSelectSymbol(sym);
          setCurrentScreen('supercharts');
        }}
      />

      <SpaceStoryModal
        isOpen={spaceStoryOpen}
        onClose={() => setSpaceStoryOpen(false)}
      />

      <OrderModal
        isOpen={orderModalOpen}
        onClose={() => setOrderModalOpen(false)}
        tickers={tickers}
        activeSymbol={activeSymbol}
        portfolioBalance={portfolioBalance}
        positions={positions}
        onPlaceOrder={handlePlaceOrder}
        onClosePosition={handleClosePosition}
        onResetBalance={handleResetBalance}
      />

      <PublishIdeaModal
        isOpen={publishIdeaOpen}
        onClose={() => setPublishIdeaOpen(false)}
        onPublish={handlePublishIdea}
        activeSymbol={activeSymbol}
      />

      <PlansModal
        isOpen={plansModalOpen}
        onClose={() => setPlansModalOpen(false)}
      />

      <IdeaDetailModal
        idea={selectedIdeaModal}
        onClose={() => setSelectedIdeaModal(null)}
        onLike={handleLikeIdea}
        isLiked={selectedIdeaModal ? likedIdeaIds.has(selectedIdeaModal.id) : false}
        onOpenSuperchartsForSymbol={handleOpenSuperchartsForSymbol}
      />
    </div>
  );
}
