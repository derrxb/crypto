export const getTokenData = async (tokens: string[]) => {
  return {
    btc: {
      name: "Bitcoin",
      volume_24hr: 5000,
      change_24hr: 0.03,
      price: 10000,
      symbol: "btc",
    },
    eth: {
      name: "Etherium",
      volume_24hr: 5000,
      change_24hr: 0.03,
      price: 10000,
      symbol: "eth",
    },
    doge: {
      name: "Dogecoin",
      volume_24hr: 5000,
      change_24hr: -0.03,
      price: 10000,
      symbol: "doge",
    },
  };
};
