import axios from "axios";
import { CryptonatorTicker } from "../../../../../types";
import Coin from "../entities/coin";
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
      price: Number(data.ticker.price),
      change: Number(data.ticker.change),
      target: "USD",
      timestamp: Number(data.timestamp),
      volume: Number(data.ticker.volume),
    });
  }

  static async getCoins(tickers: string[]) {
    const coins = await Promise.all(
      tickers.map(async (ticker) => await this.getCoin(ticker))
    );

    return coins;
  }
}
