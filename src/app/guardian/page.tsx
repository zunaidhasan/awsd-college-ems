"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { Footer } from "../../components/layout/Footer";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { ShieldCheck, UserCheck, CreditCard, BellRing, ChevronLeft } from "lucide-react";

const guardianNotes = [
  { id: "g-1", titleBn: "শিক্ষকের সাথে যোগাযোগ করুন", titleEn: "Contact your ward's teacher", descriptionBn: "নতুন রুটিন ও পরীক্ষার ফলাফল দেখতে শিক্ষকের ইমেইল ব্যবহার করুন।", descriptionEn: "Use the teacher's email to view schedule updates and exam results." },
  { id: "g-2", titleBn: "ফি সম্পন্ন হওয়ার তথ্য", titleEn: "Track fee payment status", descriptionBn: "শুধু এক ক্লিকে বাকি শুল্ক ও আপডেটগুলি দেখুন।", descriptionEn: "View outstanding dues and updates in one click." },
  { id: "g-3", titleBn: "প্রগতির বার্তা", titleEn: "Progress alerts", descriptionBn: "বার্ষিক পরীক্ষার ফলাফল ও উপস্থিতি আপডেটের জন্য নোটিফিকেশন সক্ৰিয় রাখুন।", descriptionEn: "Keep notifications enabled for exam and attendance updates." },
];

export default function GuardianPage() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <section className="relative bg-gradient-to-r from-emerald-600 via-sky-600 to-blue-700 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),transparent_25%)]" />
        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-200 font-bold hover:text-white transition-colors">
            <ChevronLeft size={14} />
            <span>{t("home")}</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{language === "bn" ? "অভিভাবক পোর্টাল" : "Guardian Portal"}</h1>
          <p className="max-w-3xl mx-auto text-sm text-slate-200 leading-relaxed">
            {language === "bn"
              ? "আপনার সন্তানের একাডেমিক উন্নতি, উপস্থিতি এবং ফি আপডেট সরাসরি এখানে দেখুন।"
              : "View your student's academic progress, attendance and fee updates in one place."}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 font-semibold">{t("guardianTitle")}</p>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{language === "bn" ? "আপনার সন্তানের সেরা সহায়ক" : "Your Student’s Trusted Support"}</h2>
                  </div>
                  <Badge variant="success">{language === "bn" ? "নিরাপদ" : "Secure"}</Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === "bn"
                    ? "গার্ডিয়ান পোর্টালে পরীক্ষা, অনুষ্ঠানের নোটিফিকেশন ও অভিভাবক নির্দেশাবলী সহজেই পাওয়া যাবে।"
                    : "The guardian portal keeps you informed with exam notifications, event updates, and parent guidance."}
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center">
                    <ShieldCheck className="mx-auto text-sky-500" size={24} />
                    <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{language === "bn" ? "নিরাপত্তা" : "Security"}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center">
                    <BellRing className="mx-auto text-emerald-500" size={24} />
                    <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{language === "bn" ? "নোটিফিকেশন" : "Alerts"}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center">
                    <CreditCard className="mx-auto text-violet-500" size={24} />
                    <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{language === "bn" ? "ফি পরিচালনা" : "Fee Tracking"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              {guardianNotes.map((note) => (
                <Card key={note.id} className="border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <UserCheck size={18} className="text-slate-700 dark:text-slate-200" />
                      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{language === "bn" ? note.titleBn : note.titleEn}</h3>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{language === "bn" ? note.descriptionBn : note.descriptionEn}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-sm">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 font-semibold">{t("guardianTitle")}</p>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{language === "bn" ? "আপনার অ্যাকাউন্ট" : "Your account"}</h3>
                  </div>
                  <span className="text-sm text-emerald-600 dark:text-emerald-400">{language === "bn" ? "সক্রিয়" : "Active"}</span>
                </div>
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 p-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400">{language === "bn" ? "শ্রেণী" : "Class"}</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">{language === "bn" ? "দ্বাদশ শ্রেণী (বিজ্ঞান)" : "Class 12 (Science)"}</p>
                </div>
                <Button className="w-full" variant="secondary">{language === "bn" ? "নতুন নোটিফিকেশন দেখুন" : "View latest alerts"}</Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-sm">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 font-semibold">{language === "bn" ? "বিনিয়োগ" : "Overview"}</p>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{language === "bn" ? "জরুরি অনুরোধ" : "Important Requests"}</h3>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  <li>• {language === "bn" ? "পরবর্তী পরীক্ষার ফি জমা দিন" : "Submit exam fee soon"}</li>
                  <li>• {language === "bn" ? "প্রকৃত উপস্থিতি রিপোর্ট দেখুন" : "Review attendance report"}</li>
                  <li>• {language === "bn" ? "অফলাইন অভিভাবক মিটে যোগ দিন" : "Join the parent meeting"}</li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
