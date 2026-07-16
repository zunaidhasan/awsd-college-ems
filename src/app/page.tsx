"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { mockNotices, mockResults, Notice } from "../data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Modal } from "../components/ui/Modal";
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

  const filteredNotices = mockNotices.filter((n) => {
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
      <section className="relative bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-950 text-white py-24 px-4 overflow-hidden border-b-4 border-blue-600">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="absolute inset-0 bg-blue-950/70 mix-blend-multiply" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-blue-500/30 mb-2">
            <Building2 size={14} />
            <span>Welcome to EMS Portal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-md">
            আবদুল ওদুদ শাহ্ ডিগ্রী কলেজ
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium tracking-wide max-w-4xl mx-auto leading-relaxed">
            ABDUL WADOD SHAH DEGREE COLLEGE | Damurhuda, Chuadanga | EIIN: 115429 | Established: 23 June 1994
          </p>
          
          {/* Quick Contacts inside Hero */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-xs md:text-sm text-blue-200/90 bg-blue-950/50 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-800/40 w-fit mx-auto">
            <span className="flex items-center space-x-1">
              <Phone size={14} className="text-blue-400" />
              <span>07623-56022</span>
            </span>
            <span className="h-4 w-px bg-blue-800 hidden sm:inline" />
            <span className="flex items-center space-x-1">
              <Smartphone size={14} className="text-blue-400" />
              <span>Mobile: 01718-119853</span>
            </span>
            <span className="h-4 w-px bg-blue-800 hidden sm:inline" />
            <span className="flex items-center space-x-1">
              <Mail size={14} className="text-blue-400" />
              <span>aosdcollege@yahoo.com</span>
            </span>
          </div>

          <div className="pt-6 flex flex-wrap justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="shadow-xl bg-yellow-500 hover:bg-yellow-600 text-slate-955 font-black px-10 py-4 text-base tracking-wide rounded-full flex items-center transition-all duration-300 hover:scale-105">
                {t("exploreEMS")}
                <ChevronRight size={20} className="ml-1" />
              </Button>
            </Link>
            <Link href="/results">
              <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-bold px-10 py-4 text-base rounded-full">
                {t("results")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Key Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur border-slate-100 dark:border-slate-800 text-center">
            <CardContent className="py-6 space-y-1">
              <Users className="mx-auto text-blue-600" size={28} />
              <p className="text-2xl font-black text-gray-900 dark:text-white">১২০০+</p>
              <p className="text-xs text-gray-500 font-semibold">{t("statsStudents")}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur border-slate-100 dark:border-slate-800 text-center">
            <CardContent className="py-6 space-y-1">
              <BookOpen className="mx-auto text-blue-600" size={28} />
              <p className="text-2xl font-black text-gray-900 dark:text-white">৪৫+</p>
              <p className="text-xs text-gray-500 font-semibold">{t("statsTeachers")}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur border-slate-100 dark:border-slate-800 text-center">
            <CardContent className="py-6 space-y-1">
              <Award className="mx-auto text-blue-600" size={28} />
              <p className="text-2xl font-black text-gray-900 dark:text-white">১৫</p>
              <p className="text-xs text-gray-500 font-semibold">{t("statsDepartments")}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/95 dark:bg-slate-900/95 backdrop-blur border-slate-100 dark:border-slate-800 text-center">
            <CardContent className="py-6 space-y-1">
              <TrendingUp className="mx-auto text-blue-500" size={28} />
              <p className="text-2xl font-black text-gray-900 dark:text-white">৯৮.৫%</p>
              <p className="text-xs text-gray-500 font-semibold">{t("statsPassRate")}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 2.5 At a Glance Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6">
            <div className="flex items-center space-x-2">
              <Info className="text-blue-400" size={24} />
              <CardTitle className="text-xl md:text-2xl font-black">
                প্রতিষ্ঠানের এক নজরে তথ্য (College At a Glance)
              </CardTitle>
            </div>
            <p className="text-blue-200 text-xs mt-1">Official administrative details and institute profile facts</p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="flex items-start space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100/80 dark:border-slate-800 hover:shadow-md transition-all duration-200">
                <Building2 size={24} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">EIIN & MPO CODE</h4>
                  <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">EIIN: 115429</p>
                  <p className="text-xs text-slate-500 font-semibold">MPO: 6203013201</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100/80 dark:border-slate-800 hover:shadow-md transition-all duration-200">
                <Calendar size={24} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Established Date</h4>
                  <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">23 June 1994</p>
                  <p className="text-xs text-slate-500 font-semibold">Type: Non-Govt. Degree</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100/80 dark:border-slate-800 hover:shadow-md transition-all duration-200">
                <GraduationCap size={24} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Programs & Groups</h4>
                  <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">HSC, Degree, Honours</p>
                  <p className="text-xs text-slate-500 font-semibold">Humanities, Science, B. Studies</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100/80 dark:border-slate-800 hover:shadow-md transition-all duration-200">
                <MapPin size={24} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Location & Contact</h4>
                  <p className="text-sm font-extrabold text-slate-800 dark:text-slate-100">Damurhuda, Chuadanga</p>
                  <p className="text-xs text-slate-500 font-semibold">Khulna Division, BD</p>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>
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
                  &quot;আবদুল ওদুদ শাহ্ ডিগ্রী কলেজ অত্র অঞ্চলের শিক্ষা প্রসারে দীর্ঘ দিন ধরে গৌরবময় ভূমিকা পালন করে আসছে। আমরা শিক্ষার্থীদের আধুনিক আইসিটি নির্ভর সুশিক্ষা দিতে অঙ্গীকারবদ্ধ।&quot;
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
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Campus View</span>
                  <h4 className="text-sm font-extrabold text-white">কলেজ ক্যাম্পাস ও খেলার মাঠ</h4>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-950/45 to-slate-950/85 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <Building2 size={64} className="text-white/20" />
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[4/3] transition-all duration-300 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Academics</span>
                  <h4 className="text-xs font-extrabold text-white">আধুনিক বিজ্ঞানাগার (Science Lab)</h4>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/45 to-slate-950/85 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <BookOpen size={36} className="text-white/20" />
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[4/3] transition-all duration-300 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">ICT Center</span>
                  <h4 className="text-xs font-extrabold text-white">কম্পিউটার ল্যাব (Computer Lab)</h4>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/45 to-slate-950/85 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <Award size={36} className="text-white/20" />
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[4/3] transition-all duration-300 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Events</span>
                  <h4 className="text-xs font-extrabold text-white">বার্ষিক ক্রীড়া প্রতিযোগিতা</h4>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/45 to-slate-950/85 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <Users size={36} className="text-white/20" />
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 aspect-[4/3] transition-all duration-300 hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 z-20">
                  <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Culture</span>
                  <h4 className="text-xs font-extrabold text-white">সাংস্কৃতিক উৎসব ও পুরস্কার বিতরণ</h4>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/45 to-slate-950/85 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <GraduationCap size={36} className="text-white/20" />
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
              { nameBn: "সাবিহা আনজুম", nameEn: "Sabiha Anjum", gpa: "5.00", year: "2025" },
              { nameBn: "মোঃ জুয়েল রানা", nameEn: "Md. Jewel Rana", gpa: "5.00", year: "2025" },
              { nameBn: "তানজিলা আক্তার", nameEn: "Tanzila Akter", gpa: "4.95", year: "2025" },
              { nameBn: "সাদমান রহমান", nameEn: "Sadman Rahman", gpa: "4.88", year: "2025" },
            ].map((std, idx) => (
              <Card key={idx} className="bg-white dark:bg-slate-900 text-center hover:scale-102 transition-transform duration-200">
                <CardContent className="pt-6 space-y-2">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300 mx-auto border-2 border-brand-accent">
                    M{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{language === "bn" ? std.nameBn : std.nameEn}</h4>
                    <p className="text-[10px] text-gray-400 font-semibold">এইচএসসি - {std.year}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-bold">GPA {std.gpa}</Badge>
                </CardContent>
              </Card>
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
