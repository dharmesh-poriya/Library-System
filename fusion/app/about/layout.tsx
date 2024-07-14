import Navbar from "../components/navbar";
import Footer from "../components/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website | About Us",
  description: "Here's Website About us Description",
};

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <div className="prose mt-8 mb-8 m-auto">{children}</div>
      <Footer/>
    </div>
  );
}