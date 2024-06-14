import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokedex",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main className="px-2 flex flex-col gap-4 mb-4 mt-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
