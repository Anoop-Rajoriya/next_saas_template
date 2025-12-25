import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";

type Variant = "primary" | "secondary" | "gradiant" | "error";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: Variant;
}

const Button: FC<Props> = ({
  children,
  isLoading = false,
  loadingText = "Processing...",
  className = "",
  variant = "primary",
  disabled,
  ...props
}) => {
  const variantClasses: Record<Variant, string> = {
    primary: "bg-brand text-white",
    secondary: "bg-surface text-txt-main",
    gradiant: "bg-custom-gradiant text-white",
    error: "btn-error",
  };
  return (
    <button
      className={clsx(
        "btn",
        variantClasses[variant],
        isLoading && variantClasses.secondary,
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="loading loading-sm text-txt-muted"></span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
