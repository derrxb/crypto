import { keyBy } from "lodash";
import coins from "./supported-coins.json";

export default (tickers: string[]) => {
  const coinKeys = keyBy(coins.rows, (row) => row.code.toLowerCase());

  for (let index = 0; index < tickers.length; index++) {
    const coin = coinKeys[tickers[index].toLowerCase()];

    if (typeof coin === "undefined") {
      throw new Error(
        `\`${tickers[index].toLowerCase()}\` is an unsupported coin.`
      );
    }
  }
};
