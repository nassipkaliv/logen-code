import { useEffect, useState } from 'react';

interface CryptoData {
  symbol: string;
  change: string;
  isPositive: boolean;
}

interface CoinGeckoPrice {
  usd: number;
  usd_24h_change: number;
}

const COINS = [
  { id: 'bitcoin', symbol: 'BTC' },
  { id: 'ethereum', symbol: 'ETH' },
  { id: 'binancecoin', symbol: 'BNB' },
  { id: 'solana', symbol: 'SOL' },
  { id: 'tron', symbol: 'TRX' },
  { id: 'dogecoin', symbol: 'DOGE' },
  { id: 'cardano', symbol: 'ADA' },
  { id: 'chainlink', symbol: 'LINK' },
  { id: 'stellar', symbol: 'XLM' },
  { id: 'litecoin', symbol: 'LTC' },
  { id: 'avalanche-2', symbol: 'AVAX' },
  { id: 'shiba-inu', symbol: 'SHIB' },
  { id: 'polkadot', symbol: 'DOT' },
];

export default function TickerBar() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const ids = COINS.map(c => c.id).join(',');
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await response.json();
        
        const formattedData: CryptoData[] = COINS.map(coin => {
          const priceData: CoinGeckoPrice = data[coin.id];
          const change = priceData?.usd_24h_change || 0;
          const isPositive = change >= 0;
          
          return {
            symbol: coin.symbol,
            change: `${isPositive ? '+' : ''}${change.toFixed(2)}%`,
            isPositive,
          };
        });

        setCryptoData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        // Fallback data
        setCryptoData([
          { symbol: 'SOL', change: '+2.31%', isPositive: true },
          { symbol: 'BONK', change: '-4.88%', isPositive: false },
          { symbol: 'POPCAT', change: '+1.25%', isPositive: true },
        ]);
        setLoading(false);
      }
    };

    fetchCryptoData();
    // Refresh every 60 seconds
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading || cryptoData.length === 0) {
    return null; // Don't show ticker while loading
  }

  // Duplicate data for seamless loop
  const displayData = [...cryptoData, ...cryptoData, ...cryptoData];

  return (
    <div className="relative w-full overflow-hidden py-[15px] border-y border-[rgba(235,234,250,0.08)] bg-[rgba(1,1,14,0.5)] mt-[10px]">
      <div className="flex animate-ticker">
        {displayData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-[6px] px-[15px] shrink-0"
          >
            <span className="font-primary text-[15px] leading-[147%] tracking-[0.02em] text-white">
              {item.symbol}
            </span>
            <div
              className={`font-mono text-[10px] px-1.5 py-0.5 ${
                item.isPositive ? 'text-[#5fffd7]' : 'text-[#ff587a]'
              }`}
              style={{
                borderLeft: `1px solid ${
                  item.isPositive ? 'rgb(95, 255, 215)' : 'rgb(255, 88, 122)'
                }`,
              }}
            >
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
