import axios from "axios";
import { matchSorter } from "match-sorter";
import { CryptonatorTicker } from "../../../../../types";
import Coin from "../entities/coin";
import supportedCoins from "../lib/supported-coins.json";
import { CoinName } from "../values/coin-name";

export default class CoinRepository {
  static async getCoin(ticker: string) {
    const result = await axios.get(
      `https://api.cryptonator.com/api/ticker/${ticker}-usd`
    );

    const data = result.data as CryptonatorTicker;

    return new Coin({
      ticker,
      name: new CoinName(ticker).getName(),
      price: Number(data.ticker?.price || 0),
      change: Number(data.ticker?.change || 0),
      target: "USD",
      timestamp: Number(data.timestamp),
      volume: Number(data.ticker?.volume || 0),
    });
  }

  static async getCoins(tickers: string[]) {
    const coins = await Promise.all(
      tickers.map(async (ticker) => await this.getCoin(ticker))
    );

    return coins;
  }

  static async findCoins(query: string) {
    return matchSorter(supportedCoins.rows, query, {
      keys: ["name", "code"],
    })
      .slice(0, 50)
      .map(
        (result) =>
          new Coin({
            name: result.name,
            ticker: result.code.toLowerCase(),
            timestamp: new Date().getTime(),
            change: 0,
            price: 0,
            target: "USD",
            volume: 0,
          })
      );
  }
}
