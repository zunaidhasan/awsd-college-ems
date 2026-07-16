"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { getSessionUser, clearSessionUser, getUserHomeRoute } from "../../lib/auth";
import { Globe, Sun, Moon, LogOut, LayoutDashboard, LogIn, GraduationCap, Menu, X } from "lucide-react";
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
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [pathname]);

  const handleLogout = () => {
    clearSessionUser();
    setCurrentUser(null);
    setMobileOpen(false);
    router.push("/");
  };

  const isDashboard = pathname.startsWith("/admin") || pathname.startsWith("/student") || pathname.startsWith("/teacher");

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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-md shadow-brand-primary/20 transition-transform group-hover:scale-105">
              <GraduationCap size={26} className="text-brand-accent animate-pulse" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{t("collegeName")}</p>
              <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{t("collegeTagline")}</p>
            </div>
          </Link>
        </div>

        {!isDashboard && (
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700 dark:text-slate-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-brand-primary dark:hover:text-brand-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle language"
          >
            <Globe size={14} className="text-brand-secondary" />
            <span>{language === "bn" ? "EN" : "বাং"}</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} className="text-blue-900" /> : <Sun size={16} className="text-yellow-400" />}
          </button>

          {currentUser ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link href={getUserHomeRoute(currentUser.role as any)}>
                <Button variant="outline" size="sm" className="items-center gap-1.5">
                  <LayoutDashboard size={14} />
                  <span>{t("dashboard")}</span>
                </Button>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/20"
                title={t("logout")}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            pathname !== "/login" && (
              <Link href="/login" className="hidden sm:inline-flex">
                <Button variant="primary" size="sm" className="items-center gap-1.5 shadow-md shadow-brand-primary/10">
                  <LogIn size={14} />
                  <span>{t("login")}</span>
                </Button>
              </Link>
            )
          )}

          {!isDashboard && (
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          )}
        </div>
      </div>

      {!isDashboard && mobileOpen && (
        <div className="w-full lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {pathname !== "/login" && (
              <Link href="/login" className="block rounded-2xl px-4 py-3 text-sm font-semibold text-white bg-brand-primary hover:bg-brand-secondary text-center">
                {t("login")}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
