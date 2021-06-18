import { CoinModel } from "../../../../types";

export default class Coin implements CoinModel {
  ticker: string;
  name: string;
  target: "USD";
  price: number;
  volume: number;
  change: number;
  timestamp: number;

  constructor(props: CoinModel) {
    this.ticker = props.ticker;
    this.name = props.name;
    this.target = props.target;
    this.price = props.price;
    this.volume = props.volume;
    this.change = props.change;
    this.timestamp = props.timestamp;
  }
}
