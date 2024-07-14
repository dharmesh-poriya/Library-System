"use client";

import Image from "next/image"
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'
// import img from "./login.jpg"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  return <div>
    {children}
  </div>;
}
