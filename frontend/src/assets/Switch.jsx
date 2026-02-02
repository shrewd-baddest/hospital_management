import React from "react";

const Switch = ({ onChange, checked }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />

      <div
        className={`
          relative w-11 h-5 rounded-full transition-all
          ${checked ? "bg-blue-500 after:translate-x-5" : "bg-gray-200"}
          after:content-['']
          after:absolute after:top-[1px] after:left-[2px]
          after:w-[18px] after:h-[18px]
          after:bg-white after:rounded-full
          after:shadow-lg after:transition-all
        `}
      />
    </label>
  );
};

export default Switch;
