import coins from "./supported-coins.json";

export const getCoinName = (ticker: string) => {
  const coin = coins.rows.find(
    (item) => item.code.toLowerCase() === ticker.toLowerCase()
  );

  return coin?.name;
};
