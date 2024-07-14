// @refresh reset
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Headers from "@/components/Headers";
import Footer from "@/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Starbucks App",
  description: "Applications order Starbucks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body
        className={cn(
          "overflow-x-hidden bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Headers />
        {children}
        <Footer />
      </body>
    </html>
  );
}
