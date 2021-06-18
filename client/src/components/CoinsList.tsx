import { CoinModel } from "../../../types";
import Coin from "./Coin";
import CoinSkeleton from "./CoinSkeleton";

type Props = {
  coins?: CoinModel[];
  loading: boolean;
};

const CoinsList = ({ coins, loading }: Props) => {
  if (!coins && !loading) {
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap w-full">
      {loading
        ? [1, 2, 3, 4].map((index) => <CoinSkeleton key={index} />)
        : null}

      {coins
        ? coins.map((coin) => <Coin key={coin.ticker} coin={coin} />)
        : null}
    </div>
  );
};

export default CoinsList;
