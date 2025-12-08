import { Container } from "@/components";
import Link from "next/link";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div>
        <Link
          href={"/"}
          className="btn btn-link no-underline text-text-muted hover:text-text-main"
        ></Link>
        {children}
      </div>
    </Container>
  );
}

export default AuthLayout;
