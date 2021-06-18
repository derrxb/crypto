import validateCoinTickers from "../../domain/crypto/lib/validate-coin-tickers";
import CoinRepository from "../../domain/crypto/repositories/coin-repository";
import getCoinsSchema from "../requests/get-coins";
import Failure from "./lib/error";

export default class GetCoins {
  private coins: string[];

  constructor(coins: string[]) {
    this.coins = coins;
  }

  private async validateParams() {
    await getCoinsSchema.validateAsync({
      tickers: this.coins,
    });
  }

  /**
   * Ensure that the tickers are actually supported
   */
  private async validateTickers() {
    try {
      validateCoinTickers(this.coins);
    } catch (e) {
      throw new Failure("bad_request", e?.message);
    }
  }

  async call() {
    await this.validateParams();
    await this.validateTickers();

    return await CoinRepository.getCoins(this.coins);
  }
}
