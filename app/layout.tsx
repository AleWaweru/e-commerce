import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavbarPage from "./components/Nav/Navbar";
import FooterPage from "./components/Nav/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "700"] });

export const metadata: Metadata = {
  title: "E-COMMERCE",
  description: "E-COMMERCE APP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <div className="flex flex-col min-h-screen">
        <NavbarPage />
        <main className="flex-grow ">{children}</main>
        <FooterPage />
        </div>
      </body>
    </html>
  );
}
