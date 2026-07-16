"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { Footer } from "../../components/layout/Footer";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Building2, UserCircle2, Search, ChevronLeft } from "lucide-react";

const facultyMembers = [
  { id: "f-1", nameBn: "ড. মো: কামরুজ্জামান", nameEn: "Dr. Md. Kamruzzaman", designationBn: "শ্রেণী শিক্ষক, পদার্থবিজ্ঞান", designationEn: "Class Teacher, Physics", departmentBn: "বিজ্ঞান", departmentEn: "Science", photoTag: "KK" },
  { id: "f-2", nameBn: "মোছা: নাজনীন সুলতানা", nameEn: "Mst. Naznin Sultana", designationBn: "শ্রেণী শিক্ষক, রসায়ন", designationEn: "Class Teacher, Chemistry", departmentBn: "বিজ্ঞান", departmentEn: "Science", photoTag: "NS" },
  { id: "f-3", nameBn: "আব্দুল মান্নান", nameEn: "Abdul Mannan", designationBn: "শ্রেণী শিক্ষক, উচ্চতর গণিত", designationEn: "Class Teacher, Higher Math", departmentBn: "বিজ্ঞান", departmentEn: "Science", photoTag: "AM" },
  { id: "f-4", nameBn: "শারমিন আক্তার", nameEn: "Sharmin Akter", designationBn: "শ্রেণী শিক্ষক, ইংরেজি", designationEn: "Class Teacher, English", departmentBn: "মানবিক", departmentEn: "Humanities", photoTag: "SA" },
  { id: "f-5", nameBn: "মো: রহিম উদ্দিন", nameEn: "Md. Rahim Uddin", designationBn: "শ্রেণী শিক্ষক, ব্যবসায় শিক্ষা", designationEn: "Class Teacher, Business Studies", departmentBn: "ব্যবসায় শিক্ষা", departmentEn: "Business Studies", photoTag: "RU" },
  { id: "f-6", nameBn: "মো: রফিকুল ইসলাম", nameEn: "Md. Rafiqul Islam", designationBn: "অধ্যক্ষ", designationEn: "Principal", departmentBn: "প্রশাসন", departmentEn: "Administration", photoTag: "RI" },
];

export default function FacultyPage() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-950 to-teal-900 text-white py-20 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),transparent_25%)]" />
        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-teal-200 font-bold hover:text-white transition-colors">
            <ChevronLeft size={14} />
            <span>{t("home")}</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{t("facultyTitle")}</h1>
          <p className="max-w-3xl mx-auto text-sm text-slate-200 leading-relaxed">
            {language === "bn"
              ? "কলেজের শিক্ষক ও কর্মচারী দল যা শ্রেণীকক্ষে ও প্রশাসনে মানসম্মত শিক্ষা ও সহায়তা নিশ্চিত করে।"
              : "Meet the faculty and staff team who deliver quality education and support across academics and administration."}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 font-semibold">{t("facultyTitle")}</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{language === "bn" ? "দলীয় পাঠদাতা ও প্রশাসনিক শিক্ষক" : "Our Teaching & Administrative Team"}</h2>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 rounded-full px-4 py-2 border border-slate-200 dark:border-slate-800 shadow-sm">
            <Search size={16} className="text-slate-500" />
            <input type="search" placeholder={language === "bn" ? "শিক্ষক অনুসন্ধান করুন" : "Search faculty"} className="bg-transparent outline-none text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 w-full" />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {facultyMembers.map((member) => (
            <Card key={member.id} className="group overflow-hidden hover:-translate-y-1 transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-700 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),transparent_30%)] opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl font-black text-white shadow-lg">
                    {member.photoTag}
                  </div>
                </div>
              </div>
              <CardContent className="p-6 bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{language === "bn" ? member.nameBn : member.nameEn}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold mt-2">{language === "bn" ? member.designationBn : member.designationEn}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>{language === "bn" ? member.departmentBn : member.departmentEn}</span>
                  <Badge variant="secondary" className="text-[10px] uppercase">{language === "bn" ? "দল" : "Department"}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
