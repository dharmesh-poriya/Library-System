import { HomeNavbar } from "../components/home_navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header>
                <HomeNavbar />
            </header>

            <main>
                {children}
            </main>
        </>
    );
}
