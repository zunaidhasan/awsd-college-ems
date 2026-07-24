"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { mockNotices, mockResults, Notice } from "../data/mockData";
import { getPublicNotices } from "../lib/services/notices";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
import { EmptyState } from "../components/ui/EmptyState";
import { Reveal } from "../components/ui/Reveal";
import { Footer } from "../components/layout/Footer";
import {
  Calendar,
  BookOpen,
  Award,
  Users,
  TrendingUp,
  FileText,
  Clock,
  ChevronRight,
  GraduationCap,
  Phone,
  Mail,
  Smartphone,
  Download,
  Building2,
  MapPin,
  Info,
  ExternalLink
} from "lucide-react";

export default function LandingPage() {
  const { language, t } = useLanguage();
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Public notices from the backend (no auth needed). Falls back to mock data
  // if the backend is unreachable, so the homepage always renders content.
  const [notices, setNotices] = useState<Notice[]>(mockNotices);

  useEffect(() => {
    let cancelled = false;
    getPublicNotices()
      .then((data) => {
        if (!cancelled && data.length > 0) setNotices(data);
      })
      .catch(() => {
        /* keep mock notices on failure */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredNotices = notices.filter((n) => {
    if (filterCategory === "all") return true;
    return n.category === filterCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "exam":
        return "danger";
      case "academic":
        return "primary";
      case "event":
        return "accent";
      default:
        return "neutral";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative isolate overflow-hidden border-b-4 border-blue-600 px-4 py-28 text-white md:py-36">
        {/* Animated brand gradient canvas */}
        <div className="hero-gradient absolute inset-0 -z-20 bg-[linear-gradient(120deg,#0f2a6b_0%,#1E3A8A_28%,#1e1b4b_60%,#0c1a4a_100%)]" />
        {/* Hero background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src="/images/campus-hero.png"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center opacity-25 mix-blend-luminosity"
          />
        </div>
        {/* Floating decorative orbs */}
        <div className="hero-orb absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="hero-orb absolute -right-16 bottom-0 -z-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl [animation-delay:3s]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
        {/* Depth vignette */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,12,40,0.55)_100%)]" />

        <div className="relative z-10 mx-auto max-w-5xl space-y-7 text-center">
          <div className="motion-safe:animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both] inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-200 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <Building2 size={14} />
            <span>Welcome to EMS Portal</span>
          </div>
          <h1 className="font-bengali text-5xl font-extrabold tracking-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] motion-safe:animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.08s_both] md:text-7xl">
            আব্দুল ওদুদ শাহ ডিগ্রী কলেজ
          </h1>
          <p className="mx-auto max-w-4xl text-sm font-medium leading-relaxed tracking-wide text-blue-100/90 motion-safe:animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.16s_both] md:text-lg">
            ABDUL WADUD SHAH DEGREE COLLEGE · Damurhuda, Chuadanga · EIIN: 115429 · Established 23 June 1994
          </p>

          {/* Quick Contacts inside Hero */}
          <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full border border-blue-700/40 bg-blue-950/40 px-6 py-3 text-xs text-blue-200/90 backdrop-blur-md motion-safe:animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.24s_both] md:text-sm">
            <a href="tel:0762356022" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Phone size={14} className="text-blue-400" />
              <span>07623-56022</span>
            </a>
            <span className="hidden h-4 w-px bg-blue-800 sm:inline" />
            <a href="tel:01718119853" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Smartphone size={14} className="text-blue-400" />
              <span>01718-119853</span>
            </a>
            <span className="hidden h-4 w-px bg-blue-800 sm:inline" />
            <a href="mailto:aosdcollege@yahoo.com" className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Mail size={14} className="text-blue-400" />
              <span>aosdcollege@yahoo.com</span>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-6 motion-safe:animate-[fadeUp_0.7s_cubic-bezier(0.16,1,0.3,1)_0.32s_both]">
            <Link href="/login">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-amber-400 to-yellow-500 px-10 py-4 text-base font-black tracking-wide text-slate-900 shadow-xl shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-yellow-500/30"
              >
                {t("exploreEMS")}
                <ChevronRight size={20} className="ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/results">
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/5 px-10 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/70 hover:bg-white/15"
              >
                {t("results")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Key Stats Bar */}
      <section className="relative z-10 mx-auto -mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { Icon: Users, value: "১২০০+", label: t("statsStudents"), tint: "from-blue-500 to-indigo-600" },
            { Icon: BookOpen, value: "৪৫+", label: t("statsTeachers"), tint: "from-emerald-500 to-teal-600" },
            { Icon: Award, value: "১৫", label: t("statsDepartments"), tint: "from-amber-500 to-orange-600" },
            { Icon: TrendingUp, value: "৯৮.৫%", label: t("statsPassRate"), tint: "from-sky-500 to-blue-600" },
          ].map(({ Icon, value, label, tint }, idx) => (
            <Reveal key={label} delay={idx * 90}>
              <Card className="group border-slate-100 bg-white/95 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/95">
                <CardContent className="space-y-2 py-6">
                  <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tint} text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>
                    <Icon size={24} />
                  </div>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                  <p className="text-xs font-semibold text-gray-500">{label}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 2.5 At a Glance Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Reveal>
          <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-brand-primary to-indigo-950 text-white p-6">
              <div className="flex items-center space-x-2">
                <Info className="text-blue-300" size={24} />
                <CardTitle className="text-xl md:text-2xl font-black">
                  প্রতিষ্ঠানের এক নজরে তথ্য (College At a Glance)
                </CardTitle>
              </div>
              <p className="text-blue-200 text-xs mt-1">Official administrative details and institute profile facts</p>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { Icon: Building2, label: "EIIN & MPO CODE", line1: "EIIN: 115429", line2: "MPO: 6203013201" },
                  { Icon: Calendar, label: "Established Date", line1: "23 June 1994", line2: "Type: Non-Govt. Degree" },
                  { Icon: GraduationCap, label: "Programs & Groups", line1: "HSC, Degree, Honours", line2: "Humanities, Science, B. Studies" },
                  { Icon: MapPin, label: "Location & Contact", line1: "Damurhuda, Chuadanga", line2: "Khulna Division, BD" },
                ].map(({ Icon, label, line1, line2 }, idx) => (
                  <Reveal key={label} delay={idx * 80}>
                    <div className="group flex h-full items-start gap-3 rounded-xl border border-slate-100/80 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
                      <span className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary transition-colors duration-300 group-hover:bg-brand-primary group-hover:text-white dark:bg-brand-primary/20">
                        <Icon size={20} />
                      </span>
                      <div>
                        <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{label}</h4>
                        <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{line1}</p>
                        <p className="text-xs text-slate-500 font-semibold">{line2}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </section>

      {/* 3. Messages & Notices Section */}
      <section id="notices-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Messages */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-extrabold text-brand-primary dark:text-white flex items-center space-x-2 border-l-4 border-brand-primary pl-3">
            <span>কলেজ প্রশাসন (Administration)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-t-blue-600 bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-all duration-200">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center space-x-4">
                  {/* Elegant Placeholder Photo / Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-lg shadow-md border-2 border-white dark:border-slate-800">
                    PI
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-850 dark:text-white text-sm">{t("principalName")}</h3>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{t("principalMessage")}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 italic bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-50/50 dark:border-blue-950/50">
                  &quot;আব্দুল ওদুদ শাহ ডিগ্রী কলেজ অত্র অঞ্চলের শিক্ষা প্রসারে দীর্ঘ দিন ধরে গৌরবময় ভূমিকা পালন করে আসছে। আমরা শিক্ষার্থীদের আধুনিক আইসিটি নির্ভর সুশিক্ষা দিতে অঙ্গীকারবদ্ধ।&quot;
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-indigo-600 bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-all duration-200">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center space-x-4">
                  {/* Elegant Placeholder Photo / Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-md border-2 border-white dark:border-slate-800">
                    CH
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-850 dark:text-white text-sm">{t("chairmanName")}</h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">{t("chairmanMessage")}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 italic bg-indigo-50/50 dark:bg-indigo-950/20 p-3 rounded-lg border border-indigo-50/50 dark:border-indigo-950/50">
                  &quot;কলেজের সুষ্ঠু পরিচালনা এবং শিক্ষার গুণগত মান নিশ্চিত করতে গভর্নিং বডি সর্বদা সচেষ্ট। নতুন ইএমএস সিস্টেম আমাদের প্রশাসনিক কাজে আরো গতিশীলতা আনবে।&quot;
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Gallery Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-blue-900 dark:text-white flex items-center space-x-2 border-l-4 border-blue-600 pl-3">
              <span>{t("gallery")}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[4/3] md:col-span-2 md:row-span-2 transition-all duration-300 hover:shadow-lg">
                <img src="/images/campus/College-entrance.png" alt="College entrance" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Campus View</span>
                  <h4 className="text-sm font-extrabold text-white">কলেজ ক্যাম্পাস ও খেলার মাঠ</h4>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[4/3] transition-all duration-300 hover:shadow-lg">
                <img src="/images/campus/New-Building.jpg" alt="New Building" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Academics</span>
                  <h4 className="text-xs font-extrabold text-white">আধুনিক বিজ্ঞানাগার (Science Lab)</h4>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[4/3] transition-all duration-300 hover:shadow-lg">
                <img src="/images/campus/campus-lawn-buildings.png" alt="Campus lawn and buildings" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">ICT Center</span>
                  <h4 className="text-xs font-extrabold text-white">কম্পিউটার ল্যাব (Computer Lab)</h4>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[4/3] transition-all duration-300 hover:shadow-lg">
                <img src="/images/campus/walkway.png" alt="Walkway" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Events</span>
                  <h4 className="text-xs font-extrabold text-white">বার্ষিক ক্রীড়া প্রতিযোগিতা</h4>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[4/3] transition-all duration-300 hover:shadow-lg">
                <img src="/images/campus/monument.png" alt="Monument" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Culture</span>
                  <h4 className="text-xs font-extrabold text-white">সাংস্কৃতিক উৎসব ও পুরস্কার বিতরণ</h4>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Notice Board */}
        <div id="notices-section" className="space-y-6">
          <Card className="border-t-4 border-t-brand-primary shadow-md">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-850 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-extrabold text-brand-primary dark:text-white flex items-center space-x-2">
                <FileText size={18} className="text-brand-secondary" />
                <span>{t("noticeBoard")}</span>
              </CardTitle>
              <Badge variant="danger" className="animate-pulse">NEW</Badge>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-gray-100 dark:border-slate-800">
                {["all", "exam", "academic", "event"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2 py-1 text-[10px] font-bold rounded ${
                      filterCategory === cat
                        ? "bg-brand-primary text-white"
                        : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Notice List */}
              {filteredNotices.length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-slate-800 space-y-3">
                  {filteredNotices.map((notice) => (
                    <div key={notice.id} className="pt-3 first:pt-0 group">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock size={12} className="text-gray-400" />
                        <span className="text-[10px] text-gray-400 font-bold">{notice.date}</span>
                        <Badge variant={getCategoryColor(notice.category)} className="text-[9px] scale-90">
                          {notice.category}
                        </Badge>
                      </div>
                      <button
                        onClick={() => setSelectedNotice(notice)}
                        className="text-left font-bold text-gray-800 dark:text-slate-200 text-xs hover:text-brand-primary dark:hover:text-brand-accent transition-colors block line-clamp-2"
                      >
                        {language === "bn" ? notice.titleBn : notice.titleEn}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  className="py-8"
                  bn={language === "bn"}
                  icon={<FileText size={28} strokeWidth={1.75} aria-hidden="true" />}
                  title={language === "bn" ? "এই বিভাগে কোনো নোটিশ নেই" : "No notices in this category"}
                  description={
                    language === "bn"
                      ? "অন্য একটি বিভাগ নির্বাচন করুন অথবা পরে আবার দেখুন।"
                      : "Try another category or check back later."
                  }
                />
              )}

              <div className="pt-2 text-center">
                <Button size="sm" variant="outline" className="w-full text-xs font-bold">
                  {t("allNotices")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Academic Calendar Widget */}
          <Card className="bg-gradient-to-br from-brand-primary/5 to-transparent border-slate-100 dark:border-slate-800">
            <CardContent className="py-5 flex items-center space-x-4">
              <Calendar size={36} className="text-brand-primary flex-shrink-0" />
              <div>
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">{t("academicCalendar")}</h4>
                <p className="text-[11px] text-gray-500 leading-tight">২০২৬ শিক্ষাবর্ষের সকল একাডেমিক কার্যক্রম, পরীক্ষা ও ছুটির তালিকা ডাউনলোড করুন।</p>
                <button className="text-[11px] font-bold text-brand-secondary hover:underline mt-1 flex items-center">
                  <span>ডাউনলোড করুন</span>
                  <ChevronRight size={12} />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Merit List Section */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-16 border-t border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl font-black text-brand-primary dark:text-white flex items-center justify-center space-x-2">
              <GraduationCap className="text-brand-accent" />
              <span>{t("meritStudents")}</span>
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto">এইচএসসি এবং বোর্ড পরীক্ষায় সাফল্যের জন্য আমাদের গৌরবময় কৃতি মুখসমূহ।</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { nameBn: "আলিফা হাসান", nameEn: "Alifa Hasan", gpa: "5.00", year: "2025" },
              { nameBn: "মোঃ জুয়েল রানা", nameEn: "Md. Jewel Rana", gpa: "5.00", year: "2025" },
              { nameBn: "তানজিলা আক্তার", nameEn: "Tanzila Akter", gpa: "4.95", year: "2025" },
              { nameBn: "সাদমান রহমান", nameEn: "Sadman Rahman", gpa: "4.88", year: "2025" },
            ].map((std, idx) => (
              <Reveal key={idx} delay={idx * 90}>
                <Card className="group h-full bg-white dark:bg-slate-900 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                <CardContent className="pt-6 space-y-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-yellow-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center font-black text-brand-accent mx-auto border-2 border-brand-accent shadow-sm transition-transform duration-300 group-hover:scale-110">
                    M{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{language === "bn" ? std.nameBn : std.nameEn}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold">এইচএসসি - {std.year}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-bold">GPA {std.gpa}</Badge>
                </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <Modal
          isOpen={!!selectedNotice}
          onClose={() => setSelectedNotice(null)}
          title={language === "bn" ? selectedNotice.titleBn : selectedNotice.titleEn}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs">
              <Badge variant={getCategoryColor(selectedNotice.category)}>
                {selectedNotice.category}
              </Badge>
              <span className="text-gray-400 font-bold">{selectedNotice.date}</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {language === "bn" ? selectedNotice.contentBn : selectedNotice.contentEn}
            </p>
            {selectedNotice.id === "notice-0" && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-100 dark:border-blue-900/50 flex justify-between items-center text-xs">
                <span className="font-bold text-blue-700 dark:text-blue-300">Admission_Circular_2026-27.pdf</span>
                <button
                  onClick={() => alert("সার্কুলার ফাইল ডাউনলোড শুরু হচ্ছে (Downloading Admission Circular...)")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-bold flex items-center space-x-1"
                >
                  <Download size={14} />
                  <span>{language === "bn" ? "ডাউনলোড" : "Download"}</span>
                </button>
              </div>
            )}
            <div className="pt-4 flex justify-end">
              <Button size="sm" onClick={() => setSelectedNotice(null)}>
                বন্ধ করুন (Close)
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* College Footer */}
      <Footer />
    </div>
  );
}
