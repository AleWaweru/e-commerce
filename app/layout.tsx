import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NavbarPage from "./components/Nav/Navbar";
import FooterPage from "./components/Footer/Footer";
import CartProvider from "@/providers/CartProviders";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider"

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "700"] });

export const metadata: Metadata = {
  title: "E-COMMERCE",
  description: "E-COMMERCES APP",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
      <ThemeProvider>
        <Toaster
        toastOptions={{
          style: {
            background: "rgb(51 65 85)",
            color: "#fff",
          },
        }}
        />
        <CartProvider>
        <div className="flex flex-col min-h-screen">
        <NavbarPage />
        <main className="flex-grow ">{children}</main>
        <FooterPage />
        </div>
        </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
