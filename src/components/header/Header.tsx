import React from "react";

export const Header = () => {
  return (
    <>
      <div className="h-[60px]"></div>
      <header className="fixed top-0 left-0 right-0 h-[60px] w-full flex justify-center items-center bg-main">
        <h1 className="text-main-4 font-bold text-xl">Dictionary</h1>
      </header>
    </>
  );
};
