"use client";
import { AlertCircleIcon } from "lucide-react";
import { ComponentProps, FormEvent } from "react";

interface FormProps extends Omit<ComponentProps<"form">, "onSubmit"> {
  onSubmit: () => void | Promise<void>;
  isLoading: boolean;
  loadingLable?: string;
  initialLable?: string;
  error?: string;
}

function Form({
  onSubmit,
  isLoading,
  children,
  loadingLable = "Processing...",
  initialLable = "Submit",
  error = "",
  className = "",
}: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
      {error && (
        <div role="alert" className="alert alert-error">
          <AlertCircleIcon />
          <span>Error! {error}</span>
        </div>
      )}
      <div className="space-y-2">{children}</div>
      <button
        type="submit"
        disabled={isLoading}
        className={`btn w-full ${
          !isLoading
            ? "bg-check-gradient text-gray-100 hover:opacity-85 active:opacity-100"
            : ""
        }`}
      >
        {isLoading ? (
          <>
            <span className="loading"></span> {loadingLable}
          </>
        ) : (
          initialLable
        )}
      </button>
    </form>
  );
}

export { Form };
