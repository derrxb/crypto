import { CoinModel } from "../../../types";
import Button from "./Button";
import Coin from "./Coin";
import CoinSkeleton from "./CoinSkeleton";

type Props = {
  coins?: CoinModel[];
  reset: () => void;
  loading: boolean;
};

const CoinsList = ({ coins, loading, reset }: Props) => {
  if (!coins && !loading) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col justify-between md:flex-row py-2">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg">Tracked coins</h2>
          <span className="text-sm text-gray-700">
            Coin prices are updated in real time every 30 seconds
          </span>
        </div>

        {coins && coins.length > 0 && !loading ? (
          <Button onClick={reset} label="Clear all" />
        ) : null}
      </div>

      <div className="flex flex-row flex-wrap w-full">
        {loading
          ? [1, 2, 3, 4].map((index) => <CoinSkeleton key={index} />)
          : null}

        {coins && coins.length > 0
          ? coins.map((coin) => <Coin key={coin.ticker} coin={coin} />)
          : null}
      </div>
    </>
  );
};

export default CoinsList;
