import axios from "axios";
import { matchSorter } from "match-sorter";
import { app } from "../../../../config/index";
import { CryptonatorTicker } from "../../../../types";
import Cache from "../../../infrastructure/redis";
import Coin from "../entities/coin";
import supportedCoins from "../lib/supported-coins.json";
import { CoinName } from "../values/coin-name";

export default class CoinRepository {
  static async getCoin(ticker: string) {
    const key = `https://api.cryptonator.com/api/ticker/${ticker}-usd`;
    let result: CryptonatorTicker | null;

    const cache = app.locals.cache as Cache;
    result = await cache.getAsync<CryptonatorTicker>(key);

    if (!result) {
      const { data } = await axios.get(key);
      result = data as CryptonatorTicker;

      await cache.setAsync(key, result, "EX", 15);
    }

    return new Coin({
      ticker,
      name: new CoinName(ticker).getName(),
      price: Number(result?.ticker?.price || 0),
      change: Number(result?.ticker?.change || 0),
      target: "USD",
      timestamp: Number(result?.timestamp),
      volume: Number(result?.ticker?.volume || 0),
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
