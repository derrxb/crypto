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

      <div className="flex flex-col mx-5 mb-5 lg:mx-20">
        <Search
          onResultSelect={(selected: CoinModel) =>
            setUserCoins([...userCoins, selected.ticker])
          }
        />

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
