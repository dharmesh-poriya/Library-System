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
    <div className="">
        {/* <Image
          src={img}
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        /> */}
        {/* <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        /> */}
      </div>

      <div className="container relative h-[800px] flex-col items-center justify-center grid md:max-w-none md:grid-cols-2 md:px-0">
        
        {/* <Link
          href={pathName.endsWith("signup") ? `/auth/login` : "/auth/signup"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute max-md:hidden right-4 top-4 bg-slate-200 md:right-8 md:top-8"
          )}
        >
          {pathName.endsWith("login") ? `Signup` : "Login"}
        </Link> */}

        <div className="relative h-full max-md:w-full flex-col bg-muted p-10 text-white dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium cursor-pointer" onClick={()=> {window.location.replace("/")}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Acme Inc
          </div>
          {/* <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;This library has saved me countless hours of work and
                helped me deliver stunning designs to my clients faster than
                ever before.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div> */}
        </div>
        {children}
        
      </div>
    </div>;
}
