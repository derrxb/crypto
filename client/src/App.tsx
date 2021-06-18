import React from "react";
import { getTokenData } from "./api";
import CoinsList from "./components/CoinsList";
import { CoinModel } from "./types";

function App() {
  const [coins, setCoins] =
    React.useState<
      | {
          [key: string]: CoinModel;
        }
      | undefined
    >(undefined);

  React.useEffect(() => {
    const fetch = async () => {
      const result = await getTokenData([] as string[]);

      setTimeout(() => {
        setCoins(result);
      }, 2000);
    };

    fetch();
  }, [setCoins]);

  return (
    <div className="container-small">
      <nav className="flex flex-col">
        <h1 className="m-0 p-4 font-bold text-lg">Crypto Realtime tracker</h1>
        <CoinsList coins={coins} loading={typeof coins === "undefined"} />
      </nav>
    </div>
  );
}

export default App;
