import React from "react";
import Logo from "./Logo";

type Props = {
  className?: string;
};

export function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center relative">
      <Logo />
      <div className="absolute bottom-8 left-4 translate-x-1/2 -translate-y-1/2">
        <span className="loading loading-spinner"></span> Please wait
      </div>
    </div>
  );
}

type ButtonProps = {
  className?: string;
  loading: boolean;
  loadingLabel?: string;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
};

export function BtnWithLoader({
  className,
  loading,
  loadingLabel = "loading...",
  type = "button",
  children,
}: ButtonProps) {
  return (
    <button className={`btn ${className}`} disabled={loading} type={type}>
      {loading ? (
        <>
          <span className="loading loading-spinner"></span> {loadingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}
