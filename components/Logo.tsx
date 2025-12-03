import React from "react";

type Props = {
  children: string;
};

function Logo({ children }: Props) {
  return (
    <h1 className="text-2xl md:text-3xl font-bold uppercase font-josefin tracking-[0.4em] text-gray-200">
      {children}
    </h1>
  );
}

export default Logo;
