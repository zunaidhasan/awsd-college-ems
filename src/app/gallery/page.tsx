"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { Footer } from "../../components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Building2, Camera, BookOpen, Users, Award, MapPin, Film, Sparkles, ChevronLeft } from "lucide-react";

const gallerySections = [
  {
    titleBn: "ক্যাম্পাস ও অবকাঠামো",
    titleEn: "Campus & Infrastructure",
    descriptionBn: "হালকা বাতাসপূর্ণ ক্লাসরুম, গ্রন্থাগার এবং খেলার মাঠের দৃশ্য।",
    descriptionEn: "Bright classrooms, library spaces, and campus grounds.",
    icon: Building2,
    color: "from-blue-600 to-indigo-700",
  },
  {
    titleBn: "অনুষ্ঠান ও উদযাপন",
    titleEn: "Events & Celebrations",
    descriptionBn: "বার্ষিক ক্রীড়া, সাংস্কৃতিক সন্ধ্যা ও উৎসবের মুহূর্ত।",
    descriptionEn: "Annual sports, cultural nights, and celebrations.",
    icon: Sparkles,
    color: "from-fuchsia-600 to-pink-700",
  },
  {
    titleBn: "শিক্ষার্থী ও কার্যক্রম",
    titleEn: "Students & Activities",
    descriptionBn: "পাঠশালা ও ক্লাব কার্যক্রমে শিক্ষার্থীদের প্রাণব্যাপ্ত উপস্থিতি।",
    descriptionEn: "Students engaged in classrooms and club activities.",
    icon: Users,
    color: "from-teal-600 to-emerald-700",
  },
  {
    titleBn: "একাডেমিক পরিবেশ",
    titleEn: "Academic Life",
    descriptionBn: "ল্যাব, পাঠাগার ও শ্রেণি পরিবেশের উচ্চমানের দৃশ্য।",
    descriptionEn: "Labs, library, and classroom learning environments.",
    icon: BookOpen,
    color: "from-amber-600 to-orange-700",
  },
  {
    titleBn: "পুরস্কার ও সম্মাননা",
    titleEn: "Awards & Achievements",
    descriptionBn: "মেধা, সৃজনশীলতা ও ক্রীড়া ক্ষেত্রে অর্জিত পুরস্কার।",
    descriptionEn: "Awards for excellence, creativity, and sports.",
    icon: Award,
    color: "from-sky-600 to-blue-700",
  },
  {
    titleBn: "কর্মশালা ও সেমিনার",
    titleEn: "Workshops & Seminars",
    descriptionBn: "শিক্ষকদের ও শিক্ষার্থীদের কাজের সঞ্চালনার মুহূর্ত।",
    descriptionEn: "Faculty and students in workshops and seminars.",
    icon: Film,
    color: "from-violet-600 to-purple-700",
  },
];

const campusImages = [
  "/images/campus/College-entrance.png",
  "/images/campus/New-Building.jpg",
  "/images/campus/campus-lawn-buildings.png",
  "/images/campus/monument.png",
  "/images/campus/walkway.png",
];

export default function GalleryPage() {
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
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs uppercase tracking-[0.35em] text-teal-200 border border-white/20">
            <Camera size={14} />
            <span>{t("galleryTitle")}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{language === "bn" ? "গ্যালারী" : "Photo Gallery"}</h1>
          <p className="max-w-3xl mx-auto text-sm text-slate-200 leading-relaxed">
            {language === "bn"
              ? "কলেজ ক্যাম্পাস, শিক্ষা কার্যক্রম, অনুষ্ঠান ও শিক্ষক-শিক্ষার্থীদের মুহূর্তগুলো এখানে দেখতে পাবেন।"
              : "Explore the college campus, academic life, events, and student moments in our visual gallery."}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 font-semibold">{t("galleryAll")}</p>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{language === "bn" ? "স্মৃতি ও মুহূর্ত" : "Memories & Moments"}</h2>
          </div>
          <Link href="/about" className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary dark:text-brand-accent hover:text-brand-secondary transition-colors">
            {language === "bn" ? "কলেজের গল্প জানুন" : "Learn about the college"}
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallerySections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Card key={idx} className="group overflow-hidden hover:-translate-y-1 transition-all duration-300">
                <div className={`p-6 ${section.color} bg-gradient-to-br rounded-3xl text-white`}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-3xl bg-white/15 mb-5">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-black mb-2">{language === "bn" ? section.titleBn : section.titleEn}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{language === "bn" ? section.descriptionBn : section.descriptionEn}</p>
                </div>
                <CardContent className="p-6 bg-white dark:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{language === "bn" ? "দর্শনীয়" : "Featured"}</Badge>
                    <Button variant="outline" size="sm" className="text-[11px] font-bold">
                      {language === "bn" ? "দেখুন" : "View"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-100 dark:bg-slate-900/70 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {campusImages.map((src, idx) => (
              <div key={idx} className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-950/80 border border-slate-200 dark:border-slate-800 relative group">
                <img src={src} alt={`Campus ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-end p-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-slate-300">{language === "bn" ? "ছবি" : "Photo"}</p>
                    <h4 className="text-sm font-black text-white">{language === "bn" ? "ক্যাম্পাস মুহূর্ত" : "Campus Moment"}</h4>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),transparent_40%)]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
