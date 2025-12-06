"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

function WebLayout({ children }: Props) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute={"data-theme"}
        defaultTheme="system"
        enableSystem
      >
        {children}
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default WebLayout;
