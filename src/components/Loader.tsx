import React from "react";

type Props = {
  className?: string;
};

export function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <span className="loading loading-dots loading-lg"></span>
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
