import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { ThemeProvider } from "../context/ThemeContext";
import { TopNavbar } from "../components/layout/TopNavbar";

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  variable: "--font-sans" 
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-bengali"
});

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
      <body className={`${inter.variable} ${notoBengali.variable} font-sans min-h-screen flex flex-col overflow-x-hidden transition-colors duration-200 bg-[var(--color-bg)] text-[var(--color-text)]`}>
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
