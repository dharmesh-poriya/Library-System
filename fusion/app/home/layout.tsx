import Navbar from "../components/navbar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <header>
                <Navbar />
            </header>

            <main>
                {children}
            </main>
        </>
    );
}
