import { Container } from "@/components";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <div className="flex flex-col gap-8">
        <Link
          href={"/"}
          className="btn btn-link no-underline text-text-muted hover:text-text-main self-start"
        >
          <ArrowLeftIcon />
          Go Back To Home
        </Link>
        {children}
      </div>
    </Container>
  );
}

export default AuthLayout;
