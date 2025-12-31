import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-josefin",
});

export const metadata: Metadata = {
  title: "Todo Saas Template",
  description: "Next.js fullstack todo saas template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${josefin.variable} antialiased`}>
        <ThemeProvider>
          <ClerkProvider>{children}</ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
