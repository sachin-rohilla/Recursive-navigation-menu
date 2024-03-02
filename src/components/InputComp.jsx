import React from "react";

const InputComp = ({
  type,
  value,
  title,
  placeholder,
  handleChange,
  style,
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        value={value}
        name={title}
        placeholder={placeholder}
        onChange={handleChange}
        className={`w-full border border-gray-300 p-2 rounded-md ${style}`}
        required
      />
    </div>
  );
};

export default InputComp;
