import React from "react";
import { CoinModel } from "../../types";
import useCoins from "./api/useCoins";
import useUserCoins from "./api/useUserCoins";
import CoinsList from "./components/CoinsList";
import Header from "./components/Header";
import Search from "./components/Search";

function App() {
  const [userCoins, setUserCoins] = useUserCoins();
  const coins = useCoins({ tickers: userCoins });

  return (
    <div className="flex flex-col w-full h-full">
      <Header />

      <div className="container mx-2 md:mx-auto">
        <Search
          onResultSelect={(selected: CoinModel) =>
            setUserCoins([...userCoins, selected.ticker])
          }
        />

        <hr className="text-gray-300 my-4" />

        <CoinsList
          coins={coins.data}
          loading={coins.isLoading}
          reset={() => setUserCoins([])}
        />
      </div>
    </div>
  );
}

export default App;
