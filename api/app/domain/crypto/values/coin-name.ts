import { getCoinName } from "../lib/get-coin-name";

export class CoinName {
  private ticker: string;

  constructor(ticker: string) {
    this.ticker = ticker;
  }

  getName(): string {
    const name = getCoinName(this.ticker);

    if (typeof name === "undefined") {
      throw new Error("The provided `ticker` is not supported.");
    }

    return name;
  }
}
