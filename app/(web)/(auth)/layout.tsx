import { Container, Logo } from "@/app/(components)";
import React, { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Container variant="plain" className="flex flex-col gap-6">
      <Logo variant="gradient" className="mx-auto">
        Todo
      </Logo>
      {children}
    </Container>
  );
}

export default AuthLayout;
