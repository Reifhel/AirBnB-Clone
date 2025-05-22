import React from "react";

const PerkItem = ({ name, icon, text, handleClick, checkedValue }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-4 py-3"
      >
        <input
          type="checkbox"
          id={name}
          value={text}
          checked={checkedValue}
          onChange={(e) => handleClick(e.target)}
        />
        {icon} {text}
      </label>
    </div>
  );
};

export default PerkItem;
