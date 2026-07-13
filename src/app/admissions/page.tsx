"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { Footer } from "../../components/layout/Footer";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  FileText,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Phone,
  Mail,
  ExternalLink,
  AlertCircle,
  Clock,
  UserPlus,
} from "lucide-react";

export default function AdmissionsPage() {
  const { language, t } = useLanguage();

  const steps = [
    { numBn: "০১", numEn: "01", titleBn: "অনলাইন আবেদন", titleEn: "Online Application", descBn: "অনলাইনে আবেদন ফরম পূরণ করুন এবং প্রয়োজনীয় তথ্য প্রদান করুন।", descEn: "Fill out the online application form and provide required information." },
    { numBn: "০২", numEn: "02", titleBn: "কাগজপত্র জমা", titleEn: "Document Submission", descBn: "প্রয়োজনীয় সকল কাগজপত্রের কপি কলেজ অফিসে জমা দিন।", descEn: "Submit copies of all required documents to the college office." },
    { numBn: "০৩", numEn: "03", titleBn: "ভর্তি ফি প্রদান", titleEn: "Pay Admission Fee", descBn: "নির্ধারিত ভর্তি ফি প্রদান করুন (বিকাশ/নগদ/ব্যাংক)।", descEn: "Pay the prescribed admission fee (bKash/Nagad/Bank)." },
    { numBn: "০৪", numEn: "04", titleBn: "ভর্তি নিশ্চিতকরণ", titleEn: "Confirm Admission", descBn: "ভর্তি নিশ্চিতকরণ রসিদ সংগ্রহ করুন এবং ক্লাসে যোগ দিন।", descEn: "Collect admission confirmation receipt and join classes." },
  ];

  const dates = [
    { eventBn: "আবেদন শুরু", eventEn: "Application Opens", dateBn: "১ আগস্ট ২০২৬", dateEn: "1 August 2026", status: "upcoming" },
    { eventBn: "আবেদনের শেষ তারিখ", eventEn: "Application Deadline", dateBn: "৩১ আগস্ট ২০২৬", dateEn: "31 August 2026", status: "upcoming" },
    { eventBn: "মেধা তালিকা প্রকাশ", eventEn: "Merit List Published", dateBn: "৫ সেপ্টেম্বর ২০২৬", dateEn: "5 September 2026", status: "upcoming" },
    { eventBn: "ভর্তি কার্যক্রম", eventEn: "Admission Period", dateBn: "৭-১৫ সেপ্টেম্বর ২০২৬", dateEn: "7-15 September 2026", status: "upcoming" },
    { eventBn: "ক্লাস আরম্ভ", eventEn: "Classes Begin", dateBn: "১ অক্টোবর ২০২৬", dateEn: "1 October 2026", status: "upcoming" },
  ];

  const documents = [
    { bn: "এসএসসি/সমমান পরীক্ষার মার্কশিট ও সনদপত্র (মূল ও ফটোকপি)", en: "SSC/equivalent Marksheet & Certificate (Original + Copy)" },
    { bn: "প্রশংসাপত্র (মূল)", en: "Testimonial (Original)" },
    { bn: "পাসপোর্ট সাইজের ৪ কপি ছবি (সত্যায়িত)", en: "4 copies of passport size photo (attested)" },
    { bn: "জাতীয় পরিচয়পত্র / জন্ম সনদের ফটোকপি", en: "Copy of NID / Birth Certificate" },
    { bn: "অভিভাবকের জাতীয় পরিচয়পত্রের ফটোকপি", en: "Copy of Guardian's NID" },
    { bn: "মুক্তিযোদ্ধা কোটার ক্ষেত্রে সনদপত্র (প্রযোজ্য ক্ষেত্রে)", en: "Freedom Fighter quota certificate (if applicable)" },
  ];

  const eligibility = [
    { programBn: "উচ্চ মাধ্যমিক (HSC)", programEn: "Higher Secondary (HSC)", reqBn: "এসএসসি/সমমান পরীক্ষায় নূন্যতম জিপিএ ২.০০ প্রাপ্ত।", reqEn: "Minimum GPA 2.00 in SSC/equivalent examination." },
    { programBn: "ডিগ্রী (পাস)", programEn: "Degree (Pass)", reqBn: "এইচএসসি/সমমান পরীক্ষায় উত্তীর্ণ।", reqEn: "Passed HSC/equivalent examination." },
    { programBn: "অনার্স", programEn: "Honours", reqBn: "এইচএসসি পরীক্ষায় নূন্যতম জিপিএ ২.৫০ প্রাপ্ত (বিষয়ভেদে পরিবর্তন হতে পারে)।", reqEn: "Minimum GPA 2.50 in HSC examination (may vary by subject)." },
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
          <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-green-500/30">
            <UserPlus size={14} />
            <span>{t("admissionsTitle")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">{t("admissionsTitle")}</h1>
          <p className="text-blue-200 text-sm md:text-base max-w-xl mx-auto">
            {language === "bn"
              ? "২০২৬-২৭ শিক্ষাবর্ষে ভর্তির জন্য আবেদন করুন"
              : "Apply for admission in the 2026-27 academic session"}
          </p>
          <div className="pt-2">
            <Badge variant="danger" className="animate-pulse text-xs px-4 py-1.5">
              {language === "bn" ? "🔴 ভর্তি চলছে — ২০২৬-২৭ সেশন" : "🔴 Admission Open — 2026-27 Session"}
            </Badge>
          </div>
        </div>
      </section>

      {/* Admission Process Steps */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
            <ClipboardList size={20} className="text-brand-primary" />
          </div>
          <h2 className="text-2xl font-extrabold text-brand-primary dark:text-white">{t("admissionsProcess")}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, idx) => (
            <Card key={idx} className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-visible">
              <CardContent className="p-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary to-indigo-800 text-white flex items-center justify-center font-black text-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                  {language === "bn" ? step.numBn : step.numEn}
                </div>
                <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">
                  {language === "bn" ? step.titleBn : step.titleEn}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {language === "bn" ? step.descBn : step.descEn}
                </p>
              </CardContent>
              {idx < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ChevronRight size={20} className="text-gray-300 dark:text-slate-600" />
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Eligibility */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-teal-600" />
            </div>
            <h2 className="text-2xl font-extrabold text-brand-primary dark:text-white">{t("admissionsEligibility")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {eligibility.map((item, idx) => (
              <Card key={idx} className="border-t-4 border-t-teal-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <Badge variant="secondary" className="text-[10px]">{language === "bn" ? item.programBn : item.programEn}</Badge>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {language === "bn" ? item.reqBn : item.reqEn}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Dates + Documents */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Important Dates */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center">
                <Calendar size={20} className="text-amber-600" />
              </div>
              <h2 className="text-xl font-extrabold text-brand-primary dark:text-white">{t("admissionsDates")}</h2>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                  {dates.map((d, idx) => (
                    <div key={idx} className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Clock size={14} className="text-amber-500" />
                        <span className="text-xs font-bold text-gray-800 dark:text-white">
                          {language === "bn" ? d.eventBn : d.eventEn}
                        </span>
                      </div>
                      <Badge variant="neutral" className="text-[10px] font-bold">
                        {language === "bn" ? d.dateBn : d.dateEn}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Required Documents */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-950/40 flex items-center justify-center">
                <FileText size={20} className="text-red-600" />
              </div>
              <h2 className="text-xl font-extrabold text-brand-primary dark:text-white">{t("admissionsDocuments")}</h2>
            </div>
            <Card>
              <CardContent className="p-5 space-y-3">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-xs">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-semibold">{language === "bn" ? doc.bn : doc.en}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Apply CTA + Contact */}
      <section className="bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Online Apply */}
            <Card className="bg-gradient-to-br from-brand-primary to-indigo-900 border-none text-white">
              <CardContent className="p-8 space-y-4 text-center">
                <GraduationCap size={40} className="mx-auto text-brand-accent" />
                <h3 className="text-lg font-extrabold">{t("admissionsApply")}</h3>
                <p className="text-blue-200 text-xs">
                  {language === "bn"
                    ? "অনলাইনে আবেদন ফরম পূরণ করুন। আবেদন ফি বিকাশ/নগদের মাধ্যমে প্রদান করতে পারবেন।"
                    : "Fill out the online application form. Application fee can be paid via bKash/Nagad."}
                </p>
                <Button className="bg-brand-accent hover:bg-yellow-600 text-slate-900 font-bold px-8 py-3 rounded-full shadow-lg">
                  <ExternalLink size={14} className="mr-2" />
                  {t("admissionsApply")}
                </Button>
              </CardContent>
            </Card>

            {/* Contact for Admission */}
            <Card>
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle size={20} className="text-brand-primary" />
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">{t("admissionsContact")}</h3>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {language === "bn"
                    ? "ভর্তি সংক্রান্ত যেকোনো তথ্যের জন্য যোগাযোগ করুন:"
                    : "For any admission related queries, contact:"}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-xs">
                    <Phone size={14} className="text-blue-500" />
                    <span className="font-bold text-gray-700 dark:text-gray-300">07623-56022</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <Phone size={14} className="text-green-500" />
                    <span className="font-bold text-gray-700 dark:text-gray-300">01718-119853</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <Mail size={14} className="text-amber-500" />
                    <a href="mailto:aosdcollege@yahoo.com" className="font-bold text-gray-700 dark:text-gray-300 hover:text-brand-primary">aosdcollege@yahoo.com</a>
                  </div>
                </div>
                <Link href="/contact">
                  <Button variant="outline" fullWidth className="mt-2 text-xs font-bold">
                    {language === "bn" ? "যোগাযোগ পাতায় যান" : "Go to Contact Page"}
                    <ChevronRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
