import Container from "@/components/Container";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function Authlayout({ children }: Props) {
  return <Container className="px-3">{children}</Container>;
}

export default Authlayout;
