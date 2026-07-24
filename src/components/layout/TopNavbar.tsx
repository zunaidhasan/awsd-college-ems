"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { getSessionUser, logout, getUserHomeRoute } from "../../lib/auth";
import { Globe, Sun, Moon, LogOut, LayoutDashboard, LogIn, Menu, X } from "lucide-react";
import { Button } from "../ui/Button";

export const TopNavbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<ReturnType<typeof getSessionUser> | null>(null);

  useEffect(() => {
    setCurrentUser(getSessionUser());
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    setCurrentUser(null);
    setMobileOpen(false);
    router.push("/");
  };

  const isDashboard = pathname.startsWith("/admin") || pathname.startsWith("/student") || pathname.startsWith("/teacher") || pathname.startsWith("/guardian");

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/academics", label: t("academicsTitle") },
    { href: "/#notices-section", label: t("notices") },
    { href: "/gallery", label: t("gallery") },
    { href: "/about", label: t("aboutUs") },
    { href: "/admissions", label: t("admissionsTitle") },
    { href: "/contact", label: t("contactUs") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden bg-white shadow-md ring-1 ring-slate-200 dark:ring-slate-700 group-hover:ring-brand-primary transition-all">
              <Image src="/images/logo.png" alt="AWSD logo" width={40} height={40} className="h-10 w-10 object-cover" />
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="font-semibold text-slate-900 dark:text-white text-sm tracking-tight">{t("collegeName")}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 -mt-0.5">{t("collegeTagline")}</p>
            </div>
          </Link>
        </div>

        {/* Desktop Nav - Hidden on Dashboard */}
        {!isDashboard && (
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-brand-primary dark:hover:text-brand-accent transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-primary after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Globe size={16} />
            <span>{language === "bn" ? "EN" : "বাং"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <Link href={getUserHomeRoute(currentUser.role as any)}>
                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  {t("dashboard")}
                </Button>
              </Link>
              <button
                onClick={handleLogout}
                className="h-9 w-9 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            pathname !== "/login" && (
              <Link href="/login" className="hidden sm:block">
                <Button size="sm" className="shadow-md">
                  <LogIn size={16} className="mr-1" />
                  {t("login")}
                </Button>
              </Link>
            )
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && !isDashboard && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-4 shadow-xl">
          <div className="px-6 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 px-4 rounded-2xl text-base font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {!currentUser && pathname !== "/login" && (
              <Link href="/login" className="mt-2" onClick={() => setMobileOpen(false)}>
                <Button className="w-full">{t("login")}</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
