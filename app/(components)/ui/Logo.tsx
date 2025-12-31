import React from "react";
import clsx from "clsx";

type LogoVariant = "default" | "gradient";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: LogoVariant;
}

const Logo: React.FC<Props> = ({
  children,
  className,
  variant = "default",
}) => {
  return (
    <h1
      className={clsx(
        "uppercase text-2xl md:text-4xl font-bold tracking-[0.4em]",
        {
          "text-white": variant === "default",
          "bg-custom-gradient bg-clip-text text-transparent":
            variant === "gradient",
        },
        className
      )}
    >
      {children}
    </h1>
  );
};

export default Logo;
