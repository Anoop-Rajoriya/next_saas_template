"use client";

import { Container, Logo, Signout, ThemeToggle } from "@/app/(components)";
import { useUser } from "@clerk/nextjs";
import React from "react";

const DashboardPage = () => {
  const { user, isLoaded } = useUser();
  return (
    <Container>
      <header className="flex items-center justify-between gap-4">
        <div>
          <Logo variant="default">Todos</Logo>
          {user?.firstName && (
            <span className="text-sm uppercase font-bold text-white">
              welcom back, {user.firstName}
            </span>
          )}
        </div>
        <nav className="flex gap-6">
          <ThemeToggle />
          {isLoaded && <Signout />}
        </nav>
      </header>
      <main></main>
    </Container>
  );
};

export default DashboardPage;
