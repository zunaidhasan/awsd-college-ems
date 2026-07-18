import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { ThemeProvider } from "../context/ThemeContext";
import { TopNavbar } from "../components/layout/TopNavbar";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Abdul Wadud Shah Degree College EMS",
  description: "Education Management System - AWSD Degree College, Lalpur, Natore",
  icons: {
    icon: "/images/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col overflow-x-hidden transition-colors duration-200 bg-[var(--color-bg)] text-[var(--color-text)]`}>
        <ThemeProvider>
          <LanguageProvider>
            <TopNavbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
