import React from "react";

type Props = {
  children: string;
};

function Logo({ children }: Props) {
  return (
    <h1 className="text-xl md:text-2xl font-bold uppercase font-josefin tracking-[0.4em] text-text-main">
      {children}
    </h1>
  );
}

export default Logo;
