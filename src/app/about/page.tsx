"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { Footer } from "../../components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import {
  Building2,
  BookOpen,
  GraduationCap,
  Users,
  Eye,
  Target,
  Library,
  FlaskConical,
  Monitor,
  TreePine,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  ChevronLeft,
  Landmark,
  UserCircle2,
} from "lucide-react";

export default function AboutPage() {
  const { language, t } = useLanguage();

  const glanceData = [
    { labelBn: "প্রতিষ্ঠানের নাম", labelEn: "Institute Name", valueBn: "আবদুল ওদুদ শাহ্ ডিগ্রী কলেজ", valueEn: "Abdul Wadud Shah Degree College" },
    { labelBn: "ইআইআইএন (EIIN)", labelEn: "EIIN", valueBn: "১১৫৪২৯", valueEn: "115429" },
    { labelBn: "এমপিও কোড", labelEn: "MPO Code", valueBn: "৬২০৩০১৩২০১", valueEn: "6203013201" },
    { labelBn: "প্রতিষ্ঠার তারিখ", labelEn: "Established", valueBn: "২৩ জুন ১৯৯৪", valueEn: "23 June 1994" },
    { labelBn: "প্রতিষ্ঠানের ধরণ", labelEn: "Type", valueBn: "বেসরকারি ডিগ্রী কলেজ (এমপিওভুক্ত)", valueEn: "Non-Government Degree College (MPO Enlisted)" },
    { labelBn: "প্রোগ্রাম সমূহ", labelEn: "Programs", valueBn: "এইচএসসি, ডিগ্রী (পাস), অনার্স", valueEn: "HSC, Degree (Pass), Honours" },
    { labelBn: "বিভাগ সমূহ", labelEn: "Groups", valueBn: "মানবিক, ব্যবসায় শিক্ষা, বিজ্ঞান, ভোকেশনাল", valueEn: "Humanities, Business Studies, Science, Vocational" },
    { labelBn: "অবস্থান", labelEn: "Location", valueBn: "দামুড়হুদা, চুয়াডাঙ্গা, খুলনা বিভাগ", valueEn: "Damurhuda, Chuadanga, Khulna Division" },
    { labelBn: "সহশিক্ষা", labelEn: "Co-education", valueBn: "হ্যাঁ (একত্রে)", valueEn: "Yes (Co-educational)" },
    { labelBn: "শিফট", labelEn: "Shift", valueBn: "১ (দিবা)", valueEn: "1 (Day)" },
  ];

  const facilities = [
    { icon: Library, labelBn: "সমৃদ্ধ লাইব্রেরি", labelEn: "Rich Library", descBn: "হাজারো বই ও জার্নাল সমৃদ্ধ পাঠাগার", descEn: "Library enriched with thousands of books and journals" },
    { icon: FlaskConical, labelBn: "বিজ্ঞান ল্যাব", labelEn: "Science Laboratory", descBn: "আধুনিক যন্ত্রপাতি সজ্জিত বিজ্ঞান গবেষণাগার", descEn: "Science lab equipped with modern instruments" },
    { icon: Monitor, labelBn: "কম্পিউটার ল্যাব", labelEn: "Computer Lab", descBn: "ইন্টারনেট সংযুক্ত আধুনিক কম্পিউটার ল্যাব", descEn: "Modern computer lab with internet connectivity" },
    { icon: TreePine, labelBn: "খেলার মাঠ", labelEn: "Playground", descBn: "প্রশস্ত খেলার মাঠ ও ক্রীড়া সুবিধা", descEn: "Spacious playground and sports facilities" },
    { icon: BookOpen, labelBn: "ক্লাসরুম", labelEn: "Classrooms", descBn: "আলো-বাতাস সম্পন্ন প্রশস্ত শ্রেণীকক্ষ", descEn: "Well-ventilated and spacious classrooms" },
    { icon: Users, labelBn: "সাংস্কৃতিক মঞ্চ", labelEn: "Cultural Stage", descBn: "সাংস্কৃতিক অনুষ্ঠান ও সভার জন্য মঞ্চ", descEn: "Stage for cultural events and assemblies" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-950 to-teal-900 text-white py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <Link href="/" className="inline-flex items-center space-x-1 text-xs font-bold text-blue-300 hover:text-white transition-colors mb-4">
            <ChevronLeft size={14} />
            <span>{t("home")}</span>
          </Link>
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-teal-500/30">
            <Building2 size={14} />
            <span>{t("aboutUs")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            {language === "bn" ? "আবদুল ওদুদ শাহ্ ডিগ্রী কলেজ" : "Abdul Wadud Shah Degree College"}
          </h1>
          <p className="text-blue-200 text-sm md:text-base max-w-2xl mx-auto">
            {language === "bn"
              ? "দামুড়হুদা, চুয়াডাঙ্গা | স্থাপিত: ২৩ জুন ১৯৯৪ | EIIN: 115429"
              : "Damurhuda, Chuadanga | Established: 23 June 1994 | EIIN: 115429"}
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                <Calendar size={20} className="text-brand-primary" />
              </div>
              <h2 className="text-2xl font-extrabold text-brand-primary dark:text-white">{t("aboutHistory")}</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("aboutHistoryText")}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/40">
                <p className="text-2xl font-black text-brand-primary dark:text-blue-400">৩০+</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{language === "bn" ? "বছরের ঐতিহ্য" : "Years of Legacy"}</p>
              </div>
              <div className="bg-teal-50 dark:bg-teal-950/20 rounded-xl p-4 border border-teal-100 dark:border-teal-900/40">
                <p className="text-2xl font-black text-teal-600 dark:text-teal-400">১২০০+</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{language === "bn" ? "শিক্ষার্থী" : "Students"}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-950/20 rounded-xl p-4 border border-green-100 dark:border-green-900/40">
                <p className="text-2xl font-black text-green-600 dark:text-green-400">৪৫+</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{language === "bn" ? "শিক্ষক" : "Teachers"}</p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-4 border border-amber-100 dark:border-amber-900/40">
                <p className="text-2xl font-black text-amber-600 dark:text-amber-400">৯৮.৫%</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">{language === "bn" ? "পাশের হার" : "Pass Rate"}</p>
              </div>
            </div>
          </div>
          {/* College building placeholder */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-blue-900 to-indigo-950 border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <Building2 size={80} className="text-white/10" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 to-transparent p-6">
              <p className="text-white font-bold text-sm">{language === "bn" ? "কলেজ ভবন" : "College Building"}</p>
              <p className="text-blue-300 text-xs">{language === "bn" ? "দামুড়হুদা, চুয়াডাঙ্গা" : "Damurhuda, Chuadanga"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-t-brand-primary hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                  <Eye size={24} className="text-brand-primary" />
                </div>
                <h3 className="text-lg font-extrabold text-brand-primary dark:text-white">{t("aboutVision")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{t("aboutVisionText")}</p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-teal-600 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 md:p-8 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center">
                  <Target size={24} className="text-teal-600" />
                </div>
                <h3 className="text-lg font-extrabold text-teal-700 dark:text-white">{t("aboutMission")}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{t("aboutMissionText")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* At a Glance Table */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
            <Landmark size={20} className="text-brand-primary" />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-primary dark:text-white">{t("aboutAtAGlance")}</h2>
        </div>
        <Card className="overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white">
                  <th className="text-left px-5 py-3.5 font-bold text-xs uppercase tracking-wider">{language === "bn" ? "বিষয়" : "Item"}</th>
                  <th className="text-left px-5 py-3.5 font-bold text-xs uppercase tracking-wider">{language === "bn" ? "বিবরণ" : "Details"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                {glanceData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-gray-700 dark:text-gray-300 text-xs whitespace-nowrap">
                      {language === "bn" ? item.labelBn : item.labelEn}
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 dark:text-gray-400 text-xs">
                      {language === "bn" ? item.valueBn : item.valueEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* Leadership */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
              <Award size={20} className="text-amber-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-brand-primary dark:text-white">{t("aboutLeadership")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Chairman */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center flex-shrink-0 border-4 border-white dark:border-slate-700 shadow-md">
                  <UserCircle2 size={48} className="text-brand-primary dark:text-blue-400" />
                </div>
                <div className="text-center sm:text-left">
                  <Badge variant="primary" className="text-[10px] mb-2">{language === "bn" ? "সভাপতি" : "Chairman"}</Badge>
                  <h4 className="text-base font-extrabold text-gray-900 dark:text-white">{t("chairmanName")}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {language === "bn"
                      ? "গভর্নিং বডির সভাপতি, আবদুল ওদুদ শাহ্ ডিগ্রী কলেজ"
                      : "Chairman, Governing Body, Abdul Wadud Shah Degree College"}
                  </p>
                  <div className="flex items-center space-x-1 mt-2 text-xs text-gray-400 justify-center sm:justify-start">
                    <Phone size={12} />
                    <span>01718-119853</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Principal */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900 dark:to-teal-800 flex items-center justify-center flex-shrink-0 border-4 border-white dark:border-slate-700 shadow-md">
                  <GraduationCap size={48} className="text-teal-700 dark:text-teal-400" />
                </div>
                <div className="text-center sm:text-left">
                  <Badge variant="secondary" className="text-[10px] mb-2">{language === "bn" ? "অধ্যক্ষ" : "Principal"}</Badge>
                  <h4 className="text-base font-extrabold text-gray-900 dark:text-white">{t("principalName")}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {language === "bn"
                      ? "অধ্যক্ষ, আবদুল ওদুদ শাহ্ ডিগ্রী কলেজ"
                      : "Principal, Abdul Wadud Shah Degree College"}
                  </p>
                  <div className="flex items-center space-x-1 mt-2 text-xs text-gray-400 justify-center sm:justify-start">
                    <Mail size={12} />
                    <span>aosdcollege@yahoo.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/40 flex items-center justify-center">
            <Building2 size={20} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-primary dark:text-white">{t("aboutFacilities")}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {facilities.map((facility, idx) => {
            const Icon = facility.icon;
            return (
              <Card key={idx} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6 space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon size={24} className="text-brand-primary dark:text-blue-400" />
                  </div>
                  <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">
                    {language === "bn" ? facility.labelBn : facility.labelEn}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    {language === "bn" ? facility.descBn : facility.descEn}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
