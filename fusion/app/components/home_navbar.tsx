'use client'

import { usePathname } from "next/navigation";
import Link from "next/link";

export function HomeNavbar() {
    const pathname = usePathname();

    let endButtonTitle = 'Unknown';
    let endButtonUrl = '/';

    if (pathname === '/home') {
        endButtonTitle = 'Log In';
        endButtonUrl = '/home/login';
    } else if (pathname === '/home/login') {
        endButtonTitle = 'Home';
        endButtonUrl = '/home';
    }

    return (
        <div className="navbar">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl" href="/">📚 Libro</a>
            </div>
            <div className="navbar-end">
                <Link href={endButtonUrl} className="btn btn-primary">{endButtonTitle}</Link>
            </div>
        </div>
    );
};  