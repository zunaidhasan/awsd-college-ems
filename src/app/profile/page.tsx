"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { useToast } from "../../components/ui/Toast";
import { Footer } from "../../components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { studentProfile, type StudentProfile } from "../../data/mockData";
import { getSessionUser } from "../../lib/auth";
import { getStudentProfile } from "../../lib/services/profile";
import {
  UserCircle2,
  FileText,
  Calendar,
  Award,
  CreditCard,
  Download,
  MapPin,
  Mail,
  Phone,
  Pencil,
  Save,
  X,
} from "lucide-react";

const documents = [
  { titleBn: "ভর্তির ফরম", titleEn: "Admission Form", statusBn: "সম্পন্ন", statusEn: "Completed" },
  { titleBn: "সর্বশেষ মার্কশিট", titleEn: "Latest Marksheet", statusBn: "অনুমোদিত", statusEn: "Verified" },
  { titleBn: "অপরিচয় পত্র", titleEn: "ID Document", statusBn: "আপলোড করা হয়েছে", statusEn: "Uploaded" },
  { titleBn: "জন্য নিবন্ধন সনদ", titleEn: "Birth Registration", statusBn: "তৈরি", statusEn: "Ready" },
];

async function putProfile(payload: Partial<StudentProfile>) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "";
  const url = `${apiBase}/auth/me`;
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("[profile] backend PUT failed, kept client-side only:", err);
    return null;
  }
}

export default function ProfilePage() {
  const { language, t } = useLanguage();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editing, setEditing] = useState<StudentProfile>({ ...studentProfile });
  const [viewing, setViewing] = useState<StudentProfile>({ ...studentProfile });
  const [saving, setSaving] = useState(false);

  // Load the signed-in student's live profile once, falling back to mock data
  // if the backend is unreachable or the account has no linked student profile.
  useEffect(() => {
    const studentId = getSessionUser()?.linkedProfileId;
    if (!studentId) return;

    let cancelled = false;
    (async () => {
      try {
        const p = await getStudentProfile(studentId);
        if (cancelled) return;
        setViewing(p);
        // Only seed the edit form from live data when not mid-edit, so we
        // never clobber a user's in-progress changes.
        setEditing((prev) => (isEditing ? prev : p));
      } catch (err) {
        console.warn("[profile] live profile fetch failed, using mock data:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (key: keyof StudentProfile) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditing((prev) => ({ ...prev, [key]: e.target.value }));

  const handleCancel = () => {
    setEditing({ ...viewing });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await putProfile({
      nameBn: editing.nameBn,
      nameEn: editing.nameEn,
      phone: editing.phone,
      email: editing.email,
      addressBn: editing.addressBn,
      addressEn: editing.addressEn,
      guardianNameBn: editing.guardianNameBn,
      guardianNameEn: editing.guardianNameEn,
    });
    setSaving(false);
    setViewing({ ...editing });
    setIsEditing(false);
    toast({ message: language === "bn" ? "প্রোফাইল সংরক্ষিত হয়েছে" : "Profile saved", variant: "success" });
  };

  const profile = isEditing ? editing : viewing;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-950 to-teal-900 text-white py-20 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),transparent_35%)] opacity-30" />
        <div className="max-w-6xl mx-auto relative z-10 grid gap-8 lg:grid-cols-[1fr_360px] items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-teal-200 font-bold">{t("profileTitle")}</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              {language === "bn" ? profile.nameBn : profile.nameEn}
            </h1>
            <p className="max-w-2xl text-sm text-slate-200 leading-relaxed">
              {language === "bn"
                ? "আপনার ব্যক্তিগত তথ্য, শিক্ষা সংক্রান্ত নথি এবং প্রোফাইল সংক্ষেপ এখানে পাওয়া যাবে।"
                : "View your personal profile, academic snapshot, and uploaded documents in one place."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary">{language === "bn" ? profile.classBn : profile.classEn}</Badge>
              <Badge variant="accent">{t("profileAcademicSummary")}</Badge>
              <Badge variant="primary">{language === "bn" ? profile.sectionBn : profile.sectionEn}</Badge>
            </div>
          </div>
          <div className="rounded-3xl bg-white/10 border border-white/10 p-6 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-3xl bg-white/15 border border-white/20 flex items-center justify-center text-white">
                <UserCircle2 size={32} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">{t("profilePersonalInfo")}</p>
                <p className="text-xl font-black">{language === "bn" ? profile.nameBn : profile.nameEn}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-200">
              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-xs text-slate-400 uppercase tracking-[0.2em]">{t("roll")}</p>
                <p className="font-bold mt-2">{profile.roll}</p>
              </div>
              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-xs text-slate-400 uppercase tracking-[0.2em]">{t("class")}</p>
                <p className="font-bold mt-2">{language === "bn" ? profile.classBn : profile.classEn}</p>
              </div>
              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-xs text-slate-400 uppercase tracking-[0.2em]">{t("gpa")}</p>
                <p className="font-bold mt-2">{profile.gpa.toFixed(2)}</p>
              </div>
              <div className="rounded-2xl bg-slate-950/50 p-4">
                <p className="text-xs text-slate-400 uppercase tracking-[0.2em]">{t("attendanceRate")}</p>
                <p className="font-bold mt-2">{profile.attendancePercentage}%</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{language === "bn" ? profile.addressBn : profile.addressEn}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>{profile.phone}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {!isEditing ? (
                <Button variant="secondary" size="sm" onClick={() => { setEditing({ ...viewing }); setIsEditing(true); }}>
                  <Pencil size={14} className="mr-1" />
                  {language === "bn" ? "সম্পাদনা করুন" : "Edit Profile"}
                </Button>
              ) : (
                <>
                  <Button variant="success" size="sm" onClick={handleSave} loading={saving}>
                    <Save size={14} className="mr-1" />
                    {language === "bn" ? "সংরক্ষণ করুন" : "Save"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleCancel} className="bg-white text-slate-950">
                    <X size={14} className="mr-1" />
                    {language === "bn" ? "বাতিল" : "Cancel"}
                  </Button>
                </>
              )}
              {!isEditing && (
                <Button size="sm" className="bg-white text-slate-950 hover:bg-slate-100">
                  {language === "bn" ? "প্রোফাইল শেয়ার করুন" : "Share Profile"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="bg-slate-900/80 text-white p-6 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-extrabold">{t("personalInfo")}</CardTitle>
                {isEditing && (
                  <span className="text-xs bg-amber-500 text-slate-900 px-2 py-1 rounded font-bold uppercase tracking-wider">
                    {language === "bn" ? "সম্পাদনা মোড" : "Edit Mode"}
                  </span>
                )}
              </CardHeader>
              <CardContent className="p-6 grid gap-4 md:grid-cols-2 text-sm">
                {isEditing ? (
                  <>
                    <Input
                      label={language === "bn" ? "নাম (বাংলা)" : "Name (Bengali)"}
                      value={editing.nameBn}
                      onChange={update("nameBn")}
                    />
                    <Input
                      label={language === "bn" ? "নাম (ইংরেজি)" : "Name (English)"}
                      value={editing.nameEn}
                      onChange={update("nameEn")}
                    />
                    <Input
                      label={language === "bn" ? "ইমেইল" : "Email"}
                      type="email"
                      value={editing.email}
                      onChange={update("email")}
                    />
                    <Input
                      label={language === "bn" ? "মোবাইল" : "Phone"}
                      type="tel"
                      value={editing.phone}
                      onChange={update("phone")}
                    />
                    <Input
                      label={language === "bn" ? "ঠিকানা (বাংলা)" : "Address (Bengali)"}
                      value={editing.addressBn}
                      onChange={update("addressBn")}
                    />
                    <Input
                      label={language === "bn" ? "ঠিকানা (English)" : "Address (English)"}
                      value={editing.addressEn}
                      onChange={update("addressEn")}
                    />
                    <Input
                      label={language === "bn" ? "অভিভাবক (বাংলা)" : "Guardian Name (Bengali)"}
                      value={editing.guardianNameBn}
                      onChange={update("guardianNameBn")}
                    />
                    <Input
                      label={language === "bn" ? "অভিভাবক (English)" : "Guardian Name (English)"}
                      value={editing.guardianNameEn}
                      onChange={update("guardianNameEn")}
                    />
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {language === "bn" ? "রোল" : "Roll"}
                      </p>
                      <p className="text-sm font-bold text-slate-500 italic">
                        {editing.roll} — {language === "bn" ? "পরিবর্তনযোগ্য নয়" : "read-only"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {language === "bn" ? "রেজি নং" : "Registration No"}
                      </p>
                      <p className="text-sm font-bold text-slate-500 italic">
                        {editing.regNo} — {language === "bn" ? "পরিবর্তনযোগ্য নয়" : "read-only"}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-3">
                      <p className="text-gray-500">{language === "bn" ? "রোল" : "Roll"}</p>
                      <p className="font-semibold">{profile.roll}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-500">{language === "bn" ? "রেজি নং" : "Registration No"}</p>
                      <p className="font-semibold">{profile.regNo}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-500">{language === "bn" ? "শ্রেণী" : "Class"}</p>
                      <p className="font-semibold">{language === "bn" ? profile.classBn : profile.classEn}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-500">{language === "bn" ? "শাখা" : "Section"}</p>
                      <p className="font-semibold">{language === "bn" ? profile.sectionBn : profile.sectionEn}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-500">{language === "bn" ? "অভিভাবক" : "Father / Guardian"}</p>
                      <p className="font-semibold">
                        {language === "bn" ? profile.guardianNameBn : profile.guardianNameEn}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-500">{language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}</p>
                      <p className="font-semibold">{profile.bloodGroup}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-500">{language === "bn" ? "জন্ম তারিখ" : "Date of Birth"}</p>
                      <p className="font-semibold">{profile.dob}</p>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-500">{language === "bn" ? "ইমেইল" : "Email"}</p>
                      <p className="font-semibold">{profile.email}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-slate-900/80 text-white p-6">
                <CardTitle className="text-lg font-extrabold">{t("profileDocumentsTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold text-sm">
                        <FileText size={18} />
                        <span>{language === "bn" ? doc.titleBn : doc.titleEn}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {language === "bn" ? doc.statusBn : doc.statusEn}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-[0.25em]">
                        {language === "bn" ? "স্ট্যাটাস" : "Status"}
                      </Badge>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download size={14} />
                        {language === "bn" ? "ডাউনলোড" : "Download"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-brand-primary/10 to-slate-50 dark:from-brand-primary/10 dark:to-slate-950 border border-slate-200 dark:border-slate-800">
              <CardHeader className="p-6">
                <CardTitle className="text-lg font-extrabold">{t("academicRecord")}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="rounded-3xl bg-slate-950/80 p-5 text-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{t("results")}</p>
                      <p className="text-3xl font-black">{profile.gpa.toFixed(2)}</p>
                    </div>
                    <div className="rounded-2xl bg-teal-500/15 text-teal-200 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em]">
                      GPA
                    </div>
                  </div>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>{t("attendanceRate")}</span>
                      <span className="font-bold">{profile.attendancePercentage}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{t("dueFees")}</span>
                      <span className="font-bold">৳5,700</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{language === "bn" ? "ক্লাশ টিচার" : "Class Teacher"}</span>
                      <span className="font-bold">{language === "bn" ? "মো: রফিকুল ইসলাম" : "Md. Rafiqul Islam"}</span>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Calendar size={16} />
                    <span>
                      {language === "bn" ? "পরবর্তী মূল্যায়ন: ১৫ ই আগস্ট" : "Next review: 15 Aug"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Award size={16} />
                    <span>
                      {language === "bn" ? "অর্ধবার্ষিক পরীক্ষা: চলছে" : "Half-yearly exam: in progress"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <CreditCard size={16} />
                    <span>{language === "bn" ? "বকেয়া ফি: ৳৫,৭০০" : "Outstanding fees: ৳5,700"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="bg-slate-900/80 text-white p-6">
                <CardTitle className="text-lg font-extrabold">{t("profileDocuments")}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-5 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText size={18} className="text-brand-primary" />
                    <span className="font-semibold">
                      {language === "bn" ? "ডকুমেন্ট ব্যবস্থাপনা" : "Document Management"}
                    </span>
                  </div>
                  <p>
                    {language === "bn"
                      ? "আপনার গুরুত্বপূর্ণ নথিপত্র এখানে প্রদর্শিত হয়। অনুগ্রহ করে যেকোনো প্রয়োজনীয় নথি ডাউনলোড করে রাখুন।"
                      : "Your key documents are shown here. Download any required file for your records."}
                  </p>
                </div>
                <Link href="/contact" className="inline-flex items-center text-xs font-bold text-brand-primary hover:underline">
                  {language === "bn" ? "কোনো নথি অনুপস্থিত? যোগাযোগ করুন" : "Missing a document? Contact us"}
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
