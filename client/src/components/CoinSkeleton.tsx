import React from "react";

const CoinSkeleton = () => {
  return (
    <div className="flex flex-col m-2 p-4 w-80 border-2 border-indigo-600 border-solid rounded shadow-lg animate-pulse">
      <div className="flex justify-between align-middle mb-4">
        <div className="h-4 bg-indigo-400 rounded w-20" />
        <span className="h-4 bg-indigo-400 rounded w-10" />
      </div>

      <span className="h-6 bg-indigo-400 rounded w-2/3 mb-4" />

      <div className="flex align-middle justify-between mb-4">
        <div className="flex flex-col w-1/2 pr-2">
          <span className="h-4 bg-indigo-400 rounded w-10 mb-2" />
          <span className="h-4 bg-indigo-400 rounded w-full" />
        </div>

        <div className="flex flex-col w-1/2">
          <span className="h-4 bg-indigo-400 rounded w-10 mb-2" />
          <span className="h-4 bg-indigo-400 rounded w-full" />
        </div>
      </div>
    </div>
  );
};

export default CoinSkeleton;
