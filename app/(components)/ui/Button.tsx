import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Size = "sm" | "md" | "lg";
type Variant = "primary" | "gradient" | "plan";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
  isIcon?: boolean;
  size?: Size;
  variant?: Variant;
}

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  size?: Size;
}

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  size = "md",
  className = "",
  ...props
}) => {
  const sizeClasses: Record<Size, string> = {
    sm: "text-sm md:text-base",
    md: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
  };
  return (
    <Link
      href={href}
      className={clsx(
        "text-brand hover:text-brand/80 active:text-brand",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  isIcon = false,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) => {
  const variantClasses: Record<Variant, string> = {
    primary: "bg-brand text-white hover:opacity-80 active:opacity-100",
    gradient:
      "bg-custom-gradient text-white hover:opacity-80 active:opacity-100",
    plan: "bg-transparent p-1 text-txt-main hover:text-txt-muted active:text-txt-main",
  };
  const sizeClasses: Record<Size, string> = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  return (
    <button
      className={clsx(
        "btn",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
    >
      {loading && <span className="loading size-4 text-inherit"></span>}
      {(!isIcon || !loading) && children}
    </button>
  );
};
