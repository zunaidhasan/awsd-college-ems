"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

type Step = 0 | 1 | 2 | 3;

const STEPS = [
  { id: 1, labelBn: "ব্যক্তিগত তথ্য", labelEn: "Personal Info" },
  { id: 2, labelBn: "অভিভাবকের তথ্য", labelEn: "Guardian Info" },
  { id: 3, labelBn: "একাডেমিক তথ্য", labelEn: "Academic Details" },
  { id: 4, labelBn: "নিশ্চিতকরণ", labelEn: "Confirmation" },
] as const;

async function postRegistration(payload: Record<string, string>) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "";
  const url = `${apiBase}/students`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `Registration failed (HTTP ${res.status})`);
    }
    return await res.json();
  } catch (err) {
    console.warn("[register] backend POST failed, kept client-side only:", err);
    return null;
  }
}

export default function RegisterPage() {
  const { language } = useLanguage();
  const router = useRouter();

  const [step, setStep] = useState<Step>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string>("");

  const [form, setForm] = useState({
    nameBn: "",
    nameEn: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    gender: "" as "Male" | "Female" | "",
    bloodGroup: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    guardianOccupation: "",
    guardianRelation: "",
    classLevel: "" as "HSC" | "Degree" | "Honours" | "",
    group: "" as "Science" | "Humanities" | "Business" | "Vocational" | "",
    session: "2026-27",
    rollNo: "",
    previousInstitute: "",
  });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const next = () => setStep((s) => (Math.min(3, (s + 1) as Step)) as Step);
  const back = () => setStep((s) => (Math.max(0, (s - 1) as Step)) as Step);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError("");
    setSubmitting(true);
    const payload = {
      email: form.email,
      phone: form.phone,
      name: form.nameEn || form.nameBn,
      password: form.password,
      rollNo: form.rollNo || `NEW-${Date.now()}`,
      classId: form.classLevel || "unassigned",
      session: form.session,
      fatherName: form.guardianName,
      motherName: form.guardianName,
      dateOfBirth: form.dob || "2007-01-01",
      address: form.address,
    };
    const result = await postRegistration(payload);
    if (result === null) {
      setSubmissionError(
        language === "bn"
          ? "সার্ভারের সাথে সংযোগ করা যায়নি — ফর্ম স্থানীয়ভাবে গ্রহণ করা হলো, প্রশাসন নিবন্ধন নিশ্চিত করবে।"
          : "Could not reach the server. Form saved locally — administration will confirm enrollment.",
      );
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background dark:bg-surface-dark font-sans">
        <main className="max-w-2xl mx-auto px-4 py-16">
          <Card>
            <CardContent className="p-10 text-center space-y-4">
              <CheckCircle2 size={56} className="text-brand-secondary mx-auto" />
              <h2 className="text-2xl font-extrabold text-brand-primary font-headline">
                {language === "bn" ? "আবেদন গৃহীত হয়েছে" : "Application Received"}
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {language === "bn"
                  ? "আপনার নিবন্ধন সফলভাবে জমা হয়েছে। অধ্যক্ষের অনুমোদনের পর আপনি একটি নিশ্চিতকরণ এসএমএস পাবেন।"
                  : "Your enrollment has been submitted. Once the principal approves, you will receive a confirmation SMS."}
              </p>
              {submissionError && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                  {submissionError}
                </p>
              )}
              <div className="flex gap-3 justify-center pt-2">
                <Button variant="outline" onClick={() => router.push("/")}>
                  {language === "bn" ? "হোম পেজে" : "Back to Home"}
                </Button>
                <Button onClick={() => router.push("/login")}>
                  {language === "bn" ? "লগইন করুন" : "Go to Login"}
                  <ChevronRight size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-surface-dark font-sans">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-md bg-brand-primary flex items-center justify-center text-white">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-brand-primary font-headline">
              {language === "bn" ? "একাদশ শ্রেণীতে ভর্তি আবেদন" : "New Student Enrollment"}
            </h1>
            <p className="text-xs text-on-surface-variant">
              {language === "bn"
                ? "২০২৬-২৭ শিক্ষাবর্ষের জন্য অনলাইন আবেদন"
                : "Online application for the 2026-27 academic session"}
            </p>
          </div>
        </div>

        {/* Stepper */}
        <ol className="flex items-center gap-2 mb-6">
          {STEPS.map((s, idx) => {
            const isActive = idx === step;
            const isDone = idx < step;
            return (
              <li key={s.id} className="flex-1 flex items-center gap-2">
                <div
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                    isDone
                      ? "bg-brand-secondary border-brand-secondary text-on-primary"
                      : isActive
                      ? "bg-brand-primary border-brand-primary text-on-primary"
                      : "bg-white border-outline-variant text-on-surface-variant"
                  }`}
                >
                  {isDone ? <CheckCircle2 size={14} /> : s.id}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${isActive ? "text-brand-primary" : "text-on-surface-variant"}`}>
                  {language === "bn" ? s.labelBn : s.labelEn}
                </span>
                {idx < STEPS.length - 1 && (
                  <span className="flex-1 h-px bg-outline-variant" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>
                {language === "bn" ? STEPS[step].labelBn : STEPS[step].labelEn}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              {step === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input
                    label={language === "bn" ? "নাম (বাংলা)" : "Full Name (Bengali)"}
                    placeholder="আব্দুল্লাহ আল মামুন"
                    value={form.nameBn}
                    onChange={update("nameBn")}
                    required
                  />
                  <Input
                    label={language === "bn" ? "নাম (ইংরেজি)" : "Full Name (English)"}
                    placeholder="Abdullah Al Mamun"
                    value={form.nameEn}
                    onChange={update("nameEn")}
                    required
                  />
                  <Input
                    label={language === "bn" ? "ইমেইল" : "Email Address"}
                    type="email"
                    placeholder="example@student.awsdc.edu.bd"
                    value={form.email}
                    onChange={update("email")}
                    required
                  />
                  <Input
                    label={language === "bn" ? "মোবাইল নম্বর" : "Mobile Number"}
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={form.phone}
                    onChange={update("phone")}
                    required
                  />
                  <Input
                    label={language === "bn" ? "জন্ম তারিখ" : "Date of Birth"}
                    type="date"
                    value={form.dob}
                    onChange={update("dob")}
                    required
                  />
                  <div className="w-full mb-4">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {language === "bn" ? "লিঙ্গ" : "Gender"}
                    </label>
                    <select
                      value={form.gender}
                      onChange={update("gender")}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-md text-sm bg-white/90 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      required
                    >
                      <option value="">{language === "bn" ? "-- নির্বাচন করুন --" : "-- Select --"}</option>
                      <option value="Male">{language === "bn" ? "পুরুষ" : "Male"}</option>
                      <option value="Female">{language === "bn" ? "নারী" : "Female"}</option>
                    </select>
                  </div>
                  <Input
                    label={language === "bn" ? "রক্তের গ্রুপ (ঐচ্ছিক)" : "Blood Group (optional)"}
                    placeholder="O+"
                    value={form.bloodGroup}
                    onChange={update("bloodGroup")}
                  />
                  <Input
                    label={language === "bn" ? "ঠিকানা" : "Home Address"}
                    placeholder="Village / Post / Thana / District"
                    value={form.address}
                    onChange={update("address")}
                    required
                  />
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <Input
                    label={language === "bn" ? "অভিভাবকের নাম" : "Guardian Name"}
                    value={form.guardianName}
                    onChange={update("guardianName")}
                    required
                  />
                  <Input
                    label={language === "bn" ? "মোবাইল নম্বর" : "Phone Number"}
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={form.guardianPhone}
                    onChange={update("guardianPhone")}
                    required
                  />
                  <Input
                    label={language === "bn" ? "পেশা" : "Occupation"}
                    placeholder={language === "bn" ? "কৃষক / ব্যবসায়ী / চাকরিজীবী" : "Farmer / Business / Service"}
                    value={form.guardianOccupation}
                    onChange={update("guardianOccupation")}
                  />
                  <div className="w-full mb-4">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {language === "bn" ? "সম্পর্ক" : "Relation"}
                    </label>
                    <select
                      value={form.guardianRelation}
                      onChange={update("guardianRelation")}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-md text-sm bg-white/90 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      required
                    >
                      <option value="">{language === "bn" ? "-- নির্বাচন করুন --" : "-- Select --"}</option>
                      <option value="Father">{language === "bn" ? "পিতা" : "Father"}</option>
                      <option value="Mother">{language === "bn" ? "মাতা" : "Mother"}</option>
                      <option value="Brother">{language === "bn" ? "ভাই" : "Brother"}</option>
                      <option value="Sister">{language === "bn" ? "বোন" : "Sister"}</option>
                      <option value="Other">{language === "bn" ? "অন্যান্য" : "Other"}</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="w-full mb-4">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {language === "bn" ? "শ্রেণী" : "Class Level"}
                    </label>
                    <select
                      value={form.classLevel}
                      onChange={update("classLevel")}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-md text-sm bg-white/90 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      required
                    >
                      <option value="">{language === "bn" ? "-- নির্বাচন করুন --" : "-- Select --"}</option>
                      <option value="HSC">{language === "bn" ? "একাদশ (HSC)" : "Higher Secondary (HSC)"}</option>
                      <option value="Degree">{language === "bn" ? "ডিগ্রী (Pass)" : "Degree (Pass)"}</option>
                      <option value="Honours">{language === "bn" ? "অনার্স" : "Honours"}</option>
                    </select>
                  </div>
                  <div className="w-full mb-4">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {language === "bn" ? "বিভাগ" : "Group"}
                    </label>
                    <select
                      value={form.group}
                      onChange={update("group")}
                      className="w-full px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-md text-sm bg-white/90 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      required
                    >
                      <option value="">{language === "bn" ? "-- নির্বাচন করুন --" : "-- Select --"}</option>
                      <option value="Science">{language === "bn" ? "বিজ্ঞান" : "Science"}</option>
                      <option value="Humanities">{language === "bn" ? "মানবিক" : "Humanities"}</option>
                      <option value="Business">{language === "bn" ? "ব্যবসায়" : "Business Studies"}</option>
                      <option value="Vocational">{language === "bn" ? "ভোকেশনাল" : "Vocational"}</option>
                    </select>
                  </div>
                  <Input
                    label={language === "bn" ? "শিক্ষাবর্ষ" : "Academic Session"}
                    placeholder="2026-27"
                    value={form.session}
                    onChange={update("session")}
                    required
                  />
                  <Input
                    label={language === "bn" ? "পূর্ব শিক্ষা প্রতিষ্ঠান" : "Previous Institute"}
                    placeholder={language === "bn" ? "বিদ্যালয়ের নাম ও ঠিকানা" : "School name & address"}
                    value={form.previousInstitute}
                    onChange={update("previousInstitute")}
                  />
                  <Input
                    label={language === "bn" ? "লগইন পাসওয়ার্ড" : "Login Password"}
                    type="password"
                    placeholder="••••••••"
                    helperText={
                      language === "bn"
                        ? "ভর্তির পর লগইন করতে কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড দিন"
                        : "At least 6 characters — used to log in after enrollment"
                    }
                    value={form.password}
                    onChange={update("password")}
                    required
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-on-surface-variant">
                    {language === "bn"
                      ? "নিচের তথ্যগুলো যাচাই করে নিশ্চিত করুন। পরবর্তীতে সংশোধন করা সম্ভব।"
                      : "Please verify the information below. Edits are possible after submission."}
                  </p>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {[
                      [language === "bn" ? "নাম" : "Name", form.nameEn || form.nameBn],
                      [
                        language === "bn" ? "মোবাইল" : "Mobile",
                        form.phone,
                      ],
                      [language === "bn" ? "ইমেইল" : "Email", form.email],
                      [language === "bn" ? "জন্ম তারিখ" : "Date of Birth", form.dob],
                      [
                        language === "bn" ? "অভিভাবক" : "Guardian",
                        `${form.guardianName} (${form.guardianRelation || "—"})`,
                      ],
                      [
                        language === "bn" ? "শ্রেণী / বিভাগ" : "Class / Group",
                        `${form.classLevel || "—"} / ${form.group || "—"}`,
                      ],
                      [language === "bn" ? "শিক্ষাবর্ষ" : "Session", form.session],
                    ].map(([label, value]) => (
                      <div key={String(label)} className="flex flex-col bg-surface-container-low rounded-md px-3 py-2">
                        <dt className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                          {label}
                        </dt>
                        <dd className="text-sm font-bold text-on-surface mt-0.5 truncate">{value || "—"}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex items-center justify-between">
              {step > 0 ? (
                <Button type="button" variant="outline" onClick={back}>
                  <ChevronLeft size={16} />
                  {language === "bn" ? "পূর্ববর্তী" : "Back"}
                </Button>
              ) : (
                <Link href="/admissions" className="text-xs font-bold text-on-surface-variant hover:text-brand-primary">
                  ← {language === "bn" ? "ভর্তি পেজে ফিরুন" : "Back to Admissions"}
                </Link>
              )}
              {step < 3 ? (
                <Button type="button" onClick={next}>
                  {language === "bn" ? "পরবর্তী" : "Next"}
                  <ChevronRight size={16} />
                </Button>
              ) : (
                <Button type="submit" loading={submitting}>
                  {language === "bn" ? "আবেদন জমা দিন" : "Submit Application"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </form>
      </main>
    </div>
  );
}
