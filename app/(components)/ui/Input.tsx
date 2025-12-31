"use client";
import React, { forwardRef, useState } from "react";
import { Eye, EyeOff, AlertCircle, LucideIcon } from "lucide-react";
import clsx from "clsx";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
  label: string;
  error?: string;
  icon?: LucideIcon;
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      onChange,
      label = "",
      icon: Icon,
      error = "",
      className = "",
      type = "text",
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-2">
        <label className="label">{label}</label>
        <div
          className={clsx(
            "input outline-none shadow-none",
            "w-full bg-surface text-txt-main placeholder:text-txt-muted border-2 relative",
            error
              ? "border-error text-error"
              : "border-border-main focus-within:border-txt-main/50",
            className
          )}
        >
          {Icon && (
            <Icon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          )}
          <input
            ref={ref}
            type={inputType}
            onChange={(e) => onChange(e.target.value)}
            className={clsx(
              "border-none outline-none shadow-none text-inherit flex-1",
              Icon && "pl-7",
              isPassword && "pr-12"
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <p className="flex items-center gap-1.5 text-sm text-error animate-fade-in">
            <AlertCircle size={14} />
            {error}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
