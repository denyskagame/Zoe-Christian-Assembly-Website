import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { BackToTop } from "@/components/ui/BackToTop";
import { ModalProvider } from "@/contexts/ModalContext";
import { getActiveAnnouncements, getSiteSettings } from "@/sanity/lib/sanity";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Both reads are independent and resilient — either may return null/[] when
  // Sanity isn't configured. Footer + AnnouncementBanner fall back gracefully.
  const [settings, announcements] = await Promise.all([
    getSiteSettings().catch(() => null),
    getActiveAnnouncements().catch(() => []),
  ]);

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} bg-white font-sans antialiased`}>
        <ModalProvider>
          <AnnouncementBanner announcements={announcements} />
          <Navbar settings={settings} />

          <main className="min-h-screen">{children}</main>

          <Footer settings={settings} />

          <BackToTop />
        </ModalProvider>
      </body>
    </html>
  );
}
