import axios from "axios";
import { useQuery } from "react-query";
import { CoinModel } from "../../../types";
import { COINS } from "../routes";

type QueryProps = {
  tickers: string[];
};

const getCoins = async (props: QueryProps) => {
  const result = await axios.post(COINS, { coins: props.tickers });

  return result.data.message;
};

// NOTE: A better approach would be to not do this in a API request but
// via something like Sockets since we'd want our app to be real-time.
// However, the tracker the api uses does not really update real-time but every 30 seconds.
// So to keep things simple, we automatically refetch every 15 seconds. I guess you can say
// that we opt for long-polling rather than websockets.
const useCoins = (props: QueryProps) => {
  return useQuery<CoinModel[] | undefined, Error>({
    queryKey: ["coins", { tickers: props.tickers }],
    queryFn: () => getCoins(props),
    // refetch every 15 seconds
    refetchInterval: 1000 * 5,
  });
};

export default useCoins;
