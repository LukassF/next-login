import React, { forwardRef } from "react";

interface inputProps {
  type: string;
  name: string;
  placeholder: string;
  onChange?: () => any;
  value?: any;
  className: string;
}

const Input = forwardRef(
  (
    { type, name, placeholder, onChange, value, className }: inputProps,
    ref
  ) => {
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        //@ts-ignore
        ref={ref}
        className={`rounded-full py-1 px-4 bg-stone-100 w-8/10 bg-opacity-70 min-w-none outline-none text-black ${className}`}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
