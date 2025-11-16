import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function Container({ children, className }: Props) {
  return (
    <main className={`container min-h-screen flex gap-2 mx-auto ${className}`}>
      {children}
    </main>
  );
}

export default Container;
