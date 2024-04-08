import React, { useState } from "react";

interface IPill {
  title: string;
  handleClick: () => void;
  isActive: boolean;
}

const Pill = ({ title, handleClick, isActive }: IPill) => {
  return (
    <span
      className={`text-xs sm:text-base inline-block px-3 sm:px-4 py-2 hover:bg-[#E0B6FF] rounded-[14px] text-center cursor-pointer ${
        isActive ? "bg-[#E0B6FF]" : "bg-white"
      }`}
      onClick={handleClick}
    >
      {title}
    </span>
  );
};

export default Pill;
