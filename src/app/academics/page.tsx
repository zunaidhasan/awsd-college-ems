"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { Footer } from "../../components/layout/Footer";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import {
  BookOpen,
  GraduationCap,
  Award,
  Users,
  FlaskConical,
  Briefcase,
  Palette,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Building2,
} from "lucide-react";

export default function AcademicsPage() {
  const { language, t } = useLanguage();

  const programs = [
    {
      icon: BookOpen,
      titleBn: "উচ্চ মাধ্যমিক (এইচএসসি)",
      titleEn: "Higher Secondary (HSC)",
      descBn: "এসএসসি/সমমান পাশের পর দুই বছর মেয়াদী উচ্চ মাধ্যমিক শিক্ষা কার্যক্রম। যশোর শিক্ষা বোর্ডের অধীনে পরিচালিত।",
      descEn: "Two-year Higher Secondary education program after SSC/equivalent. Conducted under Jessore Education Board.",
      durationBn: "২ বছর",
      durationEn: "2 Years",
      groupsBn: "মানবিক, ব্যবসায় শিক্ষা, বিজ্ঞান",
      groupsEn: "Humanities, Business Studies, Science",
      boardBn: "যশোর শিক্ষা বোর্ড",
      boardEn: "Jessore Education Board",
      color: "from-blue-600 to-indigo-700",
      iconBg: "bg-blue-100 dark:bg-blue-950/40",
      iconColor: "text-blue-600",
      borderColor: "border-t-blue-600",
    },
    {
      icon: GraduationCap,
      titleBn: "ডিগ্রী (পাস)",
      titleEn: "Degree (Pass)",
      descBn: "এইচএসসি পাশের পর তিন বছর মেয়াদী স্নাতক (পাস) কোর্স। জাতীয় বিশ্ববিদ্যালয়ের অধীনে পরিচালিত।",
      descEn: "Three-year Bachelor (Pass) course after HSC. Conducted under National University.",
      durationBn: "৩ বছর",
      durationEn: "3 Years",
      groupsBn: "মানবিক, ব্যবসায় শিক্ষা, বিজ্ঞান",
      groupsEn: "Humanities, Business Studies, Science",
      boardBn: "জাতীয় বিশ্ববিদ্যালয়",
      boardEn: "National University",
      color: "from-teal-600 to-green-700",
      iconBg: "bg-teal-100 dark:bg-teal-950/40",
      iconColor: "text-teal-600",
      borderColor: "border-t-teal-600",
    },
    {
      icon: Award,
      titleBn: "অনার্স",
      titleEn: "Honours",
      descBn: "এইচএসসি পাশের পর চার বছর মেয়াদী স্নাতক (সম্মান) কোর্স। জাতীয় বিশ্ববিদ্যালয়ের অধীনে পরিচালিত।",
      descEn: "Four-year Bachelor (Honours) course after HSC. Conducted under National University.",
      durationBn: "৪ বছর",
      durationEn: "4 Years",
      groupsBn: "নির্বাচিত বিষয়সমূহ",
      groupsEn: "Selected Subjects",
      boardBn: "জাতীয় বিশ্ববিদ্যালয়",
      boardEn: "National University",
      color: "from-amber-600 to-orange-700",
      iconBg: "bg-amber-100 dark:bg-amber-950/40",
      iconColor: "text-amber-600",
      borderColor: "border-t-amber-600",
    },
  ];

  const groups = [
    {
      icon: Palette,
      titleBn: "মানবিক",
      titleEn: "Humanities",
      descBn: "বাংলা, ইংরেজি, ইতিহাস, ইসলামের ইতিহাস, সমাজবিজ্ঞান, রাষ্ট্রবিজ্ঞান, অর্থনীতি, ইসলাম শিক্ষা ইত্যাদি বিষয়ে শিক্ষা প্রদান।",
      descEn: "Education in Bangla, English, History, Islamic History, Sociology, Political Science, Economics, Islamic Studies etc.",
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/20",
      border: "border-purple-200 dark:border-purple-900/40",
    },
    {
      icon: Briefcase,
      titleBn: "ব্যবসায় শিক্ষা",
      titleEn: "Business Studies",
      descBn: "হিসাববিজ্ঞান, ব্যবস্থাপনা, ফিন্যান্স ও ব্যাংকিং, মার্কেটিং, উৎপাদন ব্যবস্থাপনা বিষয়ে দক্ষতা অর্জন।",
      descEn: "Expertise in Accounting, Management, Finance & Banking, Marketing, Production Management.",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-200 dark:border-blue-900/40",
    },
    {
      icon: FlaskConical,
      titleBn: "বিজ্ঞান",
      titleEn: "Science",
      descBn: "পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান, গণিত, তথ্য ও যোগাযোগ প্রযুক্তি (ICT) বিষয়ে গভীর জ্ঞান অর্জন।",
      descEn: "In-depth knowledge in Physics, Chemistry, Biology, Mathematics, and ICT.",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/20",
      border: "border-green-200 dark:border-green-900/40",
    },
    {
      icon: Wrench,
      titleBn: "ভোকেশনাল (কারিগরি)",
      titleEn: "Vocational (Technical)",
      descBn: "কারিগরি শিক্ষায় ব্যবহারিক দক্ষতা অর্জনের মাধ্যমে কর্মমুখী শিক্ষার সুযোগ। এইচএসসি (ভোকেশনাল) কোর্স পরিচালিত হয়।",
      descEn: "Opportunities for career-oriented education through practical skills in vocational education. HSC (Vocational) courses available.",
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-950/20",
      border: "border-orange-200 dark:border-orange-900/40",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-950 to-teal-900 text-white py-20 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <Link href="/" className="inline-flex items-center space-x-1 text-xs font-bold text-blue-300 hover:text-white transition-colors mb-4">
            <ChevronLeft size={14} />
            <span>{t("home")}</span>
          </Link>
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-blue-500/30">
            <BookOpen size={14} />
            <span>{t("academicsTitle")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">{t("academicsTitle")}</h1>
          <p className="text-blue-200 text-sm md:text-base max-w-xl mx-auto">
            {language === "bn"
              ? "উচ্চ মাধ্যমিক থেকে অনার্স পর্যায় পর্যন্ত মানসম্মত শিক্ষা কার্যক্রম"
              : "Quality education programs from Higher Secondary to Honours level"}
          </p>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
            <GraduationCap size={20} className="text-brand-primary" />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-primary dark:text-white">
            {language === "bn" ? "শিক্ষা কার্যক্রম" : "Education Programs"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <Card key={idx} className={`${prog.borderColor} border-t-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group`}>
                <CardContent className="p-6 md:p-7 space-y-5">
                  <div className={`w-14 h-14 rounded-2xl ${prog.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={28} className={prog.iconColor} />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-2">
                      {language === "bn" ? prog.titleBn : prog.titleEn}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {language === "bn" ? prog.descBn : prog.descEn}
                    </p>
                  </div>
                  <div className="space-y-2 pt-3 border-t border-gray-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-semibold flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{language === "bn" ? "সময়কাল" : "Duration"}</span>
                      </span>
                      <Badge variant="secondary" className="text-[10px]">{language === "bn" ? prog.durationBn : prog.durationEn}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-semibold flex items-center space-x-1">
                        <Users size={12} />
                        <span>{language === "bn" ? "বিভাগ" : "Groups"}</span>
                      </span>
                      <span className="font-bold text-gray-700 dark:text-gray-300 text-right text-[10px] max-w-[55%]">
                        {language === "bn" ? prog.groupsBn : prog.groupsEn}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-semibold flex items-center space-x-1">
                        <Building2 size={12} />
                        <span>{language === "bn" ? "অধীনে" : "Under"}</span>
                      </span>
                      <span className="font-bold text-gray-700 dark:text-gray-300 text-[10px]">
                        {language === "bn" ? prog.boardBn : prog.boardEn}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Available Groups */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center">
              <BookOpen size={20} className="text-teal-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-brand-primary dark:text-white">{t("academicsGroups")}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {groups.map((group, idx) => {
              const Icon = group.icon;
              return (
                <Card key={idx} className={`hover:shadow-lg transition-shadow duration-300 border-l-4 ${group.border}`}>
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl ${group.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={24} className={group.color} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">
                        {language === "bn" ? group.titleBn : group.titleEn}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {language === "bn" ? group.descBn : group.descEn}
                      </p>
                      <div className="flex items-center space-x-1 pt-1">
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span className="text-[10px] text-green-600 dark:text-green-400 font-bold">
                          {language === "bn" ? "ভর্তি চলমান" : "Enrollment Open"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <Card className="bg-gradient-to-r from-brand-primary to-indigo-900 border-none text-white overflow-hidden">
          <CardContent className="p-8 md:p-12 space-y-4">
            <GraduationCap size={40} className="mx-auto text-brand-accent" />
            <h3 className="text-xl md:text-2xl font-extrabold">
              {language === "bn" ? "ভর্তি হতে আগ্রহী?" : "Interested in Admission?"}
            </h3>
            <p className="text-blue-200 text-sm max-w-lg mx-auto">
              {language === "bn"
                ? "আমাদের ভর্তি পৃষ্ঠায় গিয়ে বিস্তারিত তথ্য জানুন এবং অনলাইনে আবেদন করুন।"
                : "Visit our admissions page for detailed information and apply online."}
            </p>
            <Link
              href="/admissions"
              className="inline-flex items-center space-x-2 bg-brand-accent hover:bg-yellow-600 text-slate-900 font-bold px-8 py-3 rounded-full text-sm transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span>{language === "bn" ? "ভর্তি তথ্য দেখুন" : "View Admissions"}</span>
              <ChevronRight size={16} />
            </Link>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
