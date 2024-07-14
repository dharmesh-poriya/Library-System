import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { opun_black, opun_light, opun_medium } from "./assets/fonts/FontMaster";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Libro",
  description: "Borrow books using this awesome library management site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${inter}`}><Toaster/>{children}</body>
    </html>
  );
}
