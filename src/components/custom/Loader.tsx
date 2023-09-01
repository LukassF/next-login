import React from "react";
import { Watch } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="w-screen h-screen bg-slate-800 flex flex-col items-center justify-center gap-10">
      <Watch
        height="150"
        width="150"
        radius="48"
        color="white"
        ariaLabel="watch-loading"
      />
      <h1 className="text-slate-200 text-2xl font-bold">
        Loading, please wait...
      </h1>
    </div>
  );
};

export default Loader;
