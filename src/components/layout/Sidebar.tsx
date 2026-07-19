"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { clearSessionUser } from "../../lib/auth";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  FileSpreadsheet,
  CreditCard,
  Bell,
  LogOut,
  UserCheck
} from "lucide-react";

interface SidebarProps {
  role: "admin" | "teacher" | "student" | "guardian";
}

export const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogout = () => {
    clearSessionUser();
    router.push("/");
  };

  const getNavItems = () => {
    switch (role) {
      case "admin":
        return [
          { label: t("dashboard"), href: "/admin", icon: LayoutDashboard },
          { label: t("studentList"), href: "/admin?tab=students", icon: Users },
          { label: t("enterMarks"), href: "/admin?tab=results", icon: FileSpreadsheet },
          { label: t("notices"), href: "/admin?tab=notices", icon: Bell },
        ];
      case "teacher":
        return [
          { label: t("dashboard"), href: "/teacher", icon: LayoutDashboard },
          { label: t("markAttendance"), href: "/teacher?tab=attendance", icon: UserCheck },
          { label: t("enterMarks"), href: "/teacher?tab=marks", icon: FileSpreadsheet },
          { label: t("notices"), href: "/teacher?tab=notices", icon: Bell },
        ];
      case "student":
      case "guardian":
        const prefix = `/${role}`;
        return [
          { label: t("dashboard"), href: prefix, icon: LayoutDashboard },
          { label: t("timetable"), href: `${prefix}?tab=schedule`, icon: Calendar },
          { label: t("results"), href: `${prefix}?tab=results`, icon: FileSpreadsheet },
          { label: t("feesPayment"), href: `${prefix}?tab=fees`, icon: CreditCard },
          { label: t("notifications"), href: `${prefix}?tab=notifications`, icon: Bell },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  const currentTab = searchParams?.get("tab") ?? "";

  const isActiveItem = (item: { href: string }) => {
    const [itemPath, itemQuery] = item.href.split("?");
    const itemParams = new URLSearchParams(itemQuery || "");
    const expectedTab = itemParams.get("tab") ?? "";

    if (pathname !== itemPath) {
      return false;
    }

    if (!expectedTab) {
      return currentTab === "";
    }

    return currentTab === expectedTab;
  };

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] border-r border-slate-800 transition-colors">
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveItem(item);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-brand-primary text-white font-bold shadow-md shadow-brand-primary/20"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={18} className={isActive ? "text-brand-accent" : "text-slate-400"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-sm font-semibold text-red-400 hover:bg-slate-800 hover:text-red-300 transition-all"
          >
            <LogOut size={18} />
            <span>{t("logout")}</span>
          </button>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around h-16 px-2 shadow-lg transition-colors">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveItem(item);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] font-semibold transition-all ${
                isActive ? "text-brand-primary dark:text-brand-accent" : "text-slate-500 dark:text-slate-400"
              }`}
            >
              <Icon size={20} className={isActive ? "text-brand-primary dark:text-brand-accent scale-110" : "text-slate-400"} />
              <span className="mt-1 leading-none">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};
