"use client";
import { useState, useEffect, ChangeEvent, ComponentProps } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface Props extends Omit<ComponentProps<"input">, "onChange"> {
  label: string;
  onChange: (value: string) => void;
  error?: string;
  value?: string;
  validationMessage?: string;
}

function Input({
  id,
  label,
  onChange,
  error = "",
  value = "",
  className = "",
  validationMessage = "This field is required",
  type = "text",
  ...props
}: Props) {
  const [visible, setVisible] = useState(false);
  const [err, setErr] = useState(error);
  const [val, setVal] = useState(value);

  const isPassword = type === "password";

  useEffect(() => setVal(value), [value]);
  useEffect(() => setErr(error), [error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setVal(newValue);
    onChange(newValue);

    if (!newValue.trim()) setErr(validationMessage);
    else setErr("");
  };

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <label htmlFor={id} className="label text-text-main font-medium">
        {label}
      </label>

      {/* wrapper that ensures identical height always */}
      <div
        className={`input w-full text-text-main outline-none
        placeholder:text-text-main/50 relative ${
          err ? "input-error" : "focus:border-text-main"
        }`}
      >
        <input
          id={id}
          type={isPassword && visible ? "text" : type}
          value={val}
          onChange={handleChange}
          className="grow outline-none border-none bg-transparent"
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-main/70 hover:text-main"
            tabIndex={-1}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {err && <div className="label p-0 mt-1 text-error text-wrap">{err}</div>}
    </div>
  );
}

export default Input;
