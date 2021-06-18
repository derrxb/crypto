import { upperCase } from "lodash";
import debounce from "lodash/debounce";
import React from "react";
import { CoinModel } from "../../../types";
import useFindCoins from "../api/useFindCoins";

type Props = {
  onResultSelect: (result: CoinModel) => void;
};

const Search = (props: Props) => {
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  const handleChange = (event: any) => {
    setSearch(event.target.value);
    const cb = debounce(() => setDebouncedSearch(event.target.value), 500);
    cb();
  };

  const handleSelect = (coin: CoinModel) => {
    props.onResultSelect(coin);
    setSearch("");
    setDebouncedSearch("");
  };

  const coins = useFindCoins({ search: debouncedSearch });

  return (
    <div className="flex flex-col w-72">
      <label htmlFor="search">Search for new coins</label>

      <input
        id="search"
        value={search}
        onChange={handleChange}
        className="rounded-md border-gray-300 border-2 p-2 my-2"
        placeholder="i.e bitcoin"
      />

      {coins.data && coins.data?.length > 0 ? (
        <div className="absolute">
          <ol className="absolute left-0 top-20 mt-2 py-2 w-80 bg-white rounded-md shadow-xl z-20 border-gray-300 border-2">
            {coins.data.slice(0, 10).map((item) => (
              <li
                key={item.ticker}
                onClick={() => handleSelect(item)}
                className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-200"
              >
                <span className="font-semibold mr-2">{item.name}</span>
                <span className="text-gray-500">{upperCase(item.ticker)}</span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
