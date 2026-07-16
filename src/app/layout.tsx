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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 min-h-screen flex flex-col overflow-x-hidden transition-colors duration-200`}>
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
