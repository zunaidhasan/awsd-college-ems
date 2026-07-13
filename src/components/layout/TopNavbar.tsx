"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { Globe, Sun, Moon, LogOut, LayoutDashboard, LogIn, GraduationCap } from "lucide-react";
import { Button } from "../ui/Button";

export const TopNavbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Check if a user is logged in via cookies/session storage
  const [currentUser, setCurrentUser] = React.useState<{ role: string; name: string } | null>(null);

  React.useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      setCurrentUser(null);
    }
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setCurrentUser(null);
    router.push("/");
  };

  const isDashboard = pathname.startsWith("/admin") || pathname.startsWith("/student") || pathname.startsWith("/teacher");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-primary text-white shadow-md shadow-brand-primary/20 transition-transform group-hover:scale-105">
            <GraduationCap size={26} className="text-brand-accent animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold text-brand-primary dark:text-white leading-tight">
              {t("collegeName")}
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-400 font-medium leading-none mt-0.5">
              {t("collegeTagline")}
            </p>
          </div>
        </Link>

        {/* Center Menu Links (only visible on desktop and not in dashboard views) */}
        {!isDashboard && (
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-bold text-gray-650 dark:text-slate-200">
            <Link href="/" className="hover:text-brand-primary transition-colors">{t("home")}</Link>
            <Link href="#" className="hover:text-brand-primary transition-colors">Academics</Link>
            <Link href="/#notices-section" className="hover:text-brand-primary transition-colors">{t("notices")}</Link>
            <Link href="/#gallery" className="hover:text-brand-primary transition-colors">{t("gallery")}</Link>
            <Link href="#" className="hover:text-brand-primary transition-colors">About</Link>
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 text-xs font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-gray-200"
            aria-label="Toggle language"
          >
            <Globe size={14} className="text-brand-secondary" />
            <span>{language === "bn" ? "EN" : "বাং"}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} className="text-blue-900" /> : <Sun size={16} className="text-yellow-400" />}
          </button>

          {/* User actions */}
          {currentUser ? (
            <div className="flex items-center space-x-2">
              <Link href={`/${currentUser.role}`}>
                <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-1.5">
                  <LayoutDashboard size={14} />
                  <span>{t("dashboard")}</span>
                </Button>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                title={t("logout")}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            pathname !== "/login" && (
              <Link href="/login">
                <Button variant="primary" size="sm" className="flex items-center space-x-1.5 shadow-md shadow-brand-primary/10">
                  <LogIn size={14} />
                  <span>{t("login")}</span>
                </Button>
              </Link>
            )
          )}

          {/* Mobile hamburger menu (visible on mobile viewports only) */}
          {!isDashboard && (
            <button className="lg:hidden p-2 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-650 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
