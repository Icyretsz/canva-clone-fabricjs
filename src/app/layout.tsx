import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from "@nextui-org/react";
import {ClerkProvider} from '@clerk/nextjs'


const nunito = Nunito({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: "Canza",
  description: "A Canva clone built on React and Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>

      <NextUIProvider>
          <ClerkProvider>
      {children}
          </ClerkProvider>
      </NextUIProvider>

      </body>
    </html>
  );
}
