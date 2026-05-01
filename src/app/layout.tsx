import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { ModalProvider } from "@/contexts/ModalContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zoe Christian Assembly",
  description: "Welcome to Zoe Christian Assembly. Join us this Sunday.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} bg-white font-sans antialiased`}>
        <ModalProvider>
          <Navbar />

          <main className="min-h-screen">{children}</main>

          <Footer />

          <BackToTop />
        </ModalProvider>
      </body>
    </html>
  );
}
