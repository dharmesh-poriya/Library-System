import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { opun_black, opun_light, opun_medium } from "./assets/fonts/FontMaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Website",
  description: "Here's Website Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${opun_medium.variable} font-opun-medium`}>{children}</body>
    </html>
  );
}
