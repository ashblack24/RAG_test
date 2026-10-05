import React from 'react';
import { BrokerInfo } from '../types/market';
import { Star, CheckCircle } from 'lucide-react';

interface BrokerSectionProps {
  brokers: BrokerInfo[];
  connectedBroker: string | null;
  onConnectBroker: (brokerName: string) => void;
  onOpenOrderModal: () => void;
}

export const BrokerSection: React.FC<BrokerSectionProps> = ({
  brokers,
  connectedBroker,
  onConnectBroker,
  onOpenOrderModal
}) => {
  return (
    <section className="max-w-[1440px] mx-auto px-4 lg:px-8 py-12" id="brokers">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Trade Directly Through TradingView
        </h2>
        <p className="text-[#787B86] text-sm mt-2">
          Connect your verified brokerage account to execute orders seamlessly directly from our chart panels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {brokers.map((broker) => {
          const isConnected = connectedBroker === broker.name;

          return (
            <div
              key={broker.name}
              className="bg-[#131722] border border-[#2A2E39] rounded-xl p-6 flex flex-col justify-between hover:border-[#363A45] hover:bg-[#161a26] transition-all"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-white">{broker.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#089981]/15 text-[#089981] font-semibold">
                    {broker.badge}
                  </span>
                </div>
                <p className="text-xs text-[#787B86] leading-relaxed">
                  {broker.description}
                </p>
                <div className="mt-4 flex items-center space-x-2 text-xs font-mono text-[#F0F3FA]">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>Rating: {broker.rating} / 5.0</span>
                  </span>
                  <span className="text-[#787B86]">· {broker.reviews}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                {isConnected ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onConnectBroker(broker.name)}
                      className="flex-1 py-2 text-xs font-semibold text-[#089981] bg-[#089981]/15 rounded-lg border border-[#089981]/30 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Connected</span>
                    </button>
                    <button
                      onClick={onOpenOrderModal}
                      className="px-3 py-2 text-xs font-semibold text-white bg-[#2962FF] hover:bg-[#1E53E5] rounded-lg transition-colors cursor-pointer"
                    >
                      Trade
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onConnectBroker(broker.name)}
                    className="w-full py-2 text-xs font-semibold text-[#F0F3FA] bg-[#1E222D] hover:bg-[#252a37] rounded-lg border border-[#2A2E39] hover:border-[#363A45] transition-colors cursor-pointer"
                  >
                    Connect Account
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
