import clsx from "clsx";
import React, { FC, InputHTMLAttributes } from "react";

interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

const Input: FC<Props> = ({
  onChange,
  error = "",
  label = "",
  className = "",
  ...props
}) => {
  return (
    <div className="space-x-1 w-full">
      {label && <label className="label">{label}</label>}
      <input
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "input outline-none border-none shadow-none",
          "w-full bg-surface text-txt-main placeholder:text-txt-muted border-2",
          error
            ? "border-error text-error"
            : "border-border-main focus-within:border-border-main",
          className
        )}
        {...props}
      />
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};

export default Input;
