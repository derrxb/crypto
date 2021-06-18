import React from "react";
import useCoins from "./api/useCoins";
import useUserCoins from "./api/useUserCoins";
import CoinsList from "./components/CoinsList";

function App() {
  const [userCoins, setUserCoins] = useUserCoins();
  const coins = useCoins({ tickers: userCoins });

  return (
    <div className="container-small">
      <nav className="flex flex-col">
        <h1 className="m-0 p-4 font-bold text-lg">Crypto Realtime tracker</h1>

        <CoinsList coins={coins.data} loading={coins.isLoading} />
      </nav>
    </div>
  );
}

export default App;
