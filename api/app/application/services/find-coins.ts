import CoinRepository from "../../domain/crypto/repositories/coin-repository";
import findCoinsSchema from "../requests/find-coins";

export default class FindCoins {
  private query: string;

  constructor(query: string) {
    this.query = query;
  }

  private async validateParams() {
    await findCoinsSchema.validateAsync({
      query: this.query,
    });
  }

  async call() {
    await this.validateParams();

    return await CoinRepository.findCoins(this.query);
  }
}
