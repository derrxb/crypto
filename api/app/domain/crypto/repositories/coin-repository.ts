import axios from "axios";
import { add, fromUnixTime } from "date-fns";
import { matchSorter } from "match-sorter";
import { CryptonatorTicker } from "../../../../types";
import Cache from "../../../infrastructure/redis";
import Coin from "../entities/coin";
import supportedCoins from "../lib/supported-coins.json";
import { CoinName } from "../values/coin-name";

export default class CoinRepository {
  static async getCoin(ticker: string) {
    const key = `https://api.cryptonator.com/api/ticker/${ticker}-usd`;
    let result: CryptonatorTicker | null;

    result = await Cache.getAsync<CryptonatorTicker>(key);

    if (!result) {
      const { data } = await axios.get(key);
      result = data as CryptonatorTicker;

      // set timestamp or current time if none is provided
      const timestamp = Number(result.timestamp) || new Date().getTime() / 1000;
      // add 30 seconds to timestamp to account for cyrponator's delay
      const expirationTime =
        add(fromUnixTime(timestamp), {
          seconds: 30,
        }).getTime() / 1000;

      // cache for any number of seconds larger than 0 and at most
      const cacheSeconds =
        Math.ceil(expirationTime - new Date().getTime() / 1000) > 0 &&
        Math.ceil(expirationTime - new Date().getTime() / 1000) < 0
          ? Math.ceil(expirationTime - new Date().getTime() / 1000)
          : 15;

      await Cache.setAsync(
        key,
        result,
        "EX",
        // expiration time - update time  => expiration seconds
        cacheSeconds
      );
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
