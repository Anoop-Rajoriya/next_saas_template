import clsx from "clsx";
import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";

type Variant = "primary" | "secondary" | "gradiant" | "link";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: Variant;
  size?: Size;
}

const Button: FC<Props> = ({
  children,
  isLoading = false,
  loadingText = "Processing...",
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  ...props
}) => {
  const variantClasses: Record<Variant, string> = {
    primary: "bg-brand text-white hover:opacity-80",
    secondary: "bg-surface text-txt-main",
    gradiant: "bg-custom-gradient text-white hover:opacity-80",
    link: "btn-link no-underline p-0 text-brand hover:text-brand/80",
  };

  const sizeClasses: Record<Size, string> = {
    sm: "px-3 py-1.5 text-sm btn-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg btn-lg",
  };

  const isActuallyDisabled = disabled || isLoading;

  return (
    <button
      className={clsx(
        "btn border-none",
        variantClasses[variant],
        variant !== "link" && sizeClasses[size],
        isActuallyDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className
      )}
      disabled={isActuallyDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="loading loading-sm text-inherit"></span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
