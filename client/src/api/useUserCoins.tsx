import { useEffect, useState } from "react";

const useUserCoins = () => {
  const [selected, setSelected] = useState<string[]>(
    window.localStorage.getItem("coins")
      ? JSON.parse(window.localStorage.getItem("coins") as string)
      : ["btc", "eth", "doge", "xpr"]
  );

  useEffect(() => {
    window.localStorage.setItem("coins", JSON.stringify(selected));
  }, [selected]);

  return [selected, setSelected] as const;
};

export default useUserCoins;
