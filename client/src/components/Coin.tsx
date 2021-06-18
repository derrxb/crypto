import classNames from "classnames";
import { CoinModel } from "../../../types";
import { usdFormatter } from "../utils";

type Props = {
  coin: CoinModel;
};

const Coin = ({ coin }: Props) => {
  return (
    <div className="flex flex-col mb-4 ml-0 p-4 border-2 border-indigo-600 border-solid rounded shadow-lg w-full md:w-80 md:m-4">
      <div className="flex justify-between align-middle">
        <h1 className="font-bold text-lg mr-2">{coin.name}</h1>
        <span className="uppercase text-gray-400">{coin.ticker}</span>
      </div>

      <span className="font-medium text-2xl text-yellow-600 py-2">
        {usdFormatter.format(Number(coin.price || 0))}
      </span>

      <div className="flex align-middle justify-between">
        <div className="flex flex-col">
          <span className="uppercase text-sm">Volume</span>
          <span className="font-medium text-gray-500">
            {usdFormatter.format(Number(coin.volume || 0))}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="uppercase text-sm">Change</span>
          <span
            className={classNames("font-medium", {
              "text-red-500": Number(coin.change) < 0,
              "text-green-500": Number(coin.change) > 0,
              "text-gray-500": Number(coin.change) === 0,
            })}
          >
            {coin.change}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Coin;
