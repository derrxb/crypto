import axios from "axios";
import { useQuery } from "react-query";
import { CoinModel } from "../../../types";
import { SEARCH } from "../routes";

type QueryProps = {
  search: string;
};

const findCoins = async (props: QueryProps) => {
  const result = await axios.get(`${SEARCH}?q=${props.search}`);

  return result.data.message;
};

const useFindCoins = (props: QueryProps) => {
  return useQuery<CoinModel[] | undefined, Error>({
    queryKey: ["search", { q: props.search }],
    queryFn: () => findCoins(props),
    enabled: Boolean(props.search && props.search.length > 0),
  });
};

export default useFindCoins;
