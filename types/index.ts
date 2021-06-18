export type CoinModel = {
  ticker: string;
  name: string;
  target: "USD";
  price: number;
  volume: number;
  change: number;
  timestamp: number;
};

export type CryptonatorTicker = {
  ticker: {
    base: string;
    target: string;
    price: string;
    volume: string;
    change: string;
  };
  timestamp: string;
  success: boolean;
  error: any;
};
