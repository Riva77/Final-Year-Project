import React from "react";

const Spinner = ({ message }) => {
  return (
    <div className="m-auto flex flex-col items-center gap-4">
      <div className="relative">
        <div className="w-20 h-20 border-[#bfad9b] border-2 rounded-full"></div>
        <div className="w-20 h-20 border-[#4C2B21] border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
      <div>{message}</div>
    </div>
  );
};

export default Spinner;
