"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { Sidebar } from "../../components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { TableContainer, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "../../components/ui/Table";
import { Modal } from "../../components/ui/Modal";
import { Skeleton, SkeletonCard } from "../../components/ui/Skeleton";
import { EmptyState } from "../../components/ui/EmptyState";
import { mockTimetable, mockResults, mockInvoices, studentProfile as mockStudentProfile, Invoice, StudentProfile, StudentResult } from "../../data/mockData";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { getStudentProfile } from "../../lib/services/profile";
import { getMyWard } from "../../lib/services/guardian";
import { fetchStudentResults, overallGpa } from "../../lib/services/results";
import { getInvoicesByStudent } from "../../lib/services/finance";
import {
  Calendar,
  FileSpreadsheet,
  CreditCard,
  GraduationCap,
  Clock,
  Printer,
  ChevronRight,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  Bell,
  Lock
} from "lucide-react";

function StudentDashboardContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab") || "overview";
  const mode = searchParams.get("mode") || "student";
  const { user, ready } = useRequireAuth(["student", "guardian"]);
  const userName = user?.name ?? "Arif Rahman";
  const isGuardian = user?.role === "guardian" || mode === "guardian";

  // Live data (falls back to mock data if the backend is unreachable or the
  // account has no linked student profile — e.g. guardian mode).
  const [profile, setProfile] = useState<StudentProfile>(mockStudentProfile);
  const [results, setResults] = useState<StudentResult[]>(mockResults);
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Fetch this student's live data once auth is ready. Guardians currently keep
  // Fetch live data once auth is ready. Students load their own linkedProfileId;
  // guardians first resolve their ward's studentId, then load the same data.
  useEffect(() => {
    if (!ready) return;

    let cancelled = false;
    (async () => {
      // Determine which student's data to load.
      let studentId = user?.linkedProfileId;
      if (isGuardian) {
        try {
          const ward = await getMyWard();
          studentId = ward.studentId;
        } catch {
          // No ward linked / endpoint unavailable — keep mock data.
          return;
        }
      }
      if (cancelled || !studentId) return;

      const [p, r, inv] = await Promise.allSettled([
        getStudentProfile(studentId),
        fetchStudentResults(studentId),
        getInvoicesByStudent(studentId),
      ]);
      if (cancelled) return;
      if (p.status === "fulfilled") setProfile(p.value);
      if (r.status === "fulfilled") setResults(r.value);
      if (inv.status === "fulfilled" && inv.value.length > 0) setInvoices(inv.value);
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, isGuardian, user?.linkedProfileId]);

  // bKash gateway simulator states
  const [bkashStep, setBkashStep] = useState<number>(1);
  const [bkashPhone, setBkashPhone] = useState<string>("01712123456");
  const [bkashOtp, setBkashOtp] = useState<string>("");
  const [bkashPin, setBkashPin] = useState<string>("");

  if (!ready) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden lg:block w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-3">
          <Skeleton height="h-10" className="rounded-xl" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height="h-9" className="rounded-lg" />
          ))}
        </div>
        <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6" aria-busy="true" aria-label="Loading student dashboard">
          <Skeleton height="h-8" width="w-64" className="rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <SkeletonCard />
        </div>
      </div>
    );
  }

  const handleOpenBkash = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setBkashStep(1);
    setBkashOtp("");
    setBkashPin("");
  };

  const handleCloseBkash = () => {
    setSelectedInvoice(null);
  };

  const handleProceedBkash = (e: React.FormEvent) => {
    e.preventDefault();
    if (bkashStep === 1) {
      if (!bkashPhone) return;
      setBkashStep(2); // Proceed to OTP
    } else if (bkashStep === 2) {
      if (!bkashOtp) return;
      setBkashStep(3); // Proceed to PIN
    } else if (bkashStep === 3) {
      if (!bkashPin) return;

      // Update Payment status in local state
      if (selectedInvoice) {
        const updated = invoices.map((inv) => {
          if (inv.id === selectedInvoice.id) {
            return {
              ...inv,
              status: "paid" as const,
              paymentDate: new Date().toISOString().split("T")[0],
            };
          }
          return inv;
        });
        setInvoices(updated);
      }
      setBkashStep(4); // Success screen
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Derived from live data so the summary tiles never drift from the tables.
  const dueTotal = invoices
    .filter((inv) => inv.status !== "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const avgGpa = overallGpa(results);
  // Letter grade for the average GPA (Bangladesh GPA-5 scale).
  const avgGrade =
    avgGpa >= 5 ? "A+" : avgGpa >= 4 ? "A" : avgGpa >= 3.5 ? "A-" : avgGpa >= 3 ? "B" : avgGpa >= 2 ? "C" : avgGpa >= 1 ? "D" : "F";

  return (
    <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
      <Sidebar role={isGuardian ? "guardian" : "student"} />

      {/* Main Area */}
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 space-y-6 pb-20 md:pb-8">

        {/* Guardian Mode Banner */}
        {isGuardian && (
          <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-xl p-3.5 flex items-center space-x-2 text-yellow-800 dark:text-yellow-400 text-xs font-bold shadow-sm">
            <AlertCircle size={16} className="text-yellow-600 dark:text-yellow-500 animate-pulse" />
            <span>অভিভাবক মুড: আপনি আপনার সন্তান <b>আরিফ রহমান</b> (রোল: ১০১)-এর প্রোফাইল ও রিপোর্ট দেখছেন।</span>
          </div>
        )}

        {/* Welcome Block */}
        <div className="bg-gradient-to-r from-brand-primary to-slate-900 text-white p-6 rounded-2xl shadow-lg shadow-brand-primary/10 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-black flex items-center space-x-2">
              <GraduationCap className="text-brand-accent animate-pulse" size={24} />
              <span>{t("welcome")}, {isGuardian ? profile.nameBn : userName}</span>
            </h2>
            <p className="text-xs text-slate-300 font-semibold mt-1">
              {profile.classBn} | {profile.sectionBn} | {t("roll")}: {profile.roll}
            </p>
          </div>
          <div className="text-xs space-y-1">
            <p><b>রেজি নং:</b> {profile.regNo}</p>
            <p><b>রক্তের গ্রুপ:</b> {profile.bloodGroup}</p>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {tab === "overview" && (
          <div className="space-y-6">

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Radial attendance circle preview */}
              <Card className="flex items-center space-x-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="28" cy="28" r="24" stroke="#e2e8f0" strokeWidth="4" fill="transparent" />
                    <circle
                      cx="28"
                      cy="28"
                      r="24"
                      stroke="#15803D"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 24}
                      strokeDashoffset={2 * Math.PI * 24 * (1 - profile.attendancePercentage / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-black text-gray-800 dark:text-white">
                    {profile.attendancePercentage}%
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">{t("attendanceRate")}</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-200">নিয়মিত উপস্থিতি</p>
                </div>
              </Card>

              <Card className="flex items-center space-x-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-950/20 text-brand-accent rounded-full flex items-center justify-center font-black">
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">{t("gpa")}</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white">{profile.gpa} / ৫.০০</p>
                </div>
              </Card>

              <Card className="flex items-center space-x-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center font-black">
                  <CreditCard size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">{t("dueFees")}</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white">৳{dueTotal.toLocaleString()}</p>
                </div>
              </Card>
            </div>

            {/* Profile Detail Tabs Grid */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold text-gray-800 dark:text-white">{t("personalInfo")}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                <div className="space-y-3.5">
                  <p className="border-b pb-1"><span className="text-gray-500">বাবার নাম (Father&apos;s Name):</span> <span className="float-right text-gray-800 dark:text-white">{language === "bn" ? profile.guardianNameBn : profile.guardianNameEn}</span></p>
                  <p className="border-b pb-1"><span className="text-gray-500">মোবাইল (Phone):</span> <span className="float-right text-gray-800 dark:text-white">{profile.phone}</span></p>
                  <p className="border-b pb-1"><span className="text-gray-500">জন্ম তারিখ (DOB):</span> <span className="float-right text-gray-800 dark:text-white">{profile.dob}</span></p>
                </div>
                <div className="space-y-3.5">
                  <p className="border-b pb-1"><span className="text-gray-500">ইমেইল (Email):</span> <span className="float-right text-gray-800 dark:text-white">{profile.email}</span></p>
                  <p className="border-b pb-1"><span className="text-gray-500">ঠিকানা (Address):</span> <span className="float-right text-gray-800 dark:text-white">{language === "bn" ? profile.addressBn : profile.addressEn}</span></p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 2: Timetable Schedule */}
        {tab === "schedule" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-extrabold text-brand-primary dark:text-white flex items-center space-x-2">
                <Calendar size={18} />
                <span>{t("timetable")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>বার (Day)</TableHeaderCell>
                    <TableHeaderCell>সময় (Time)</TableHeaderCell>
                    <TableHeaderCell>বিষয় ও শিক্ষক (Subject & Teacher)</TableHeaderCell>
                    <TableHeaderCell>রুম (Room)</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockTimetable.map((entry, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-bold">{entry.day}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1 font-semibold text-xs">
                          <Clock size={12} className="text-gray-400" />
                          <span>{entry.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-bold text-xs text-gray-800 dark:text-white">
                            {language === "bn" ? entry.subjectBn : entry.subjectEn}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {language === "bn" ? entry.teacherBn : entry.teacherEn}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-xs">{entry.room}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Tab 3: Exam Results */}
        {tab === "results" && (
          <Card className="print:shadow-none print:border-none">
            <CardHeader className="flex flex-row justify-between items-center print:hidden">
              <CardTitle className="text-base font-extrabold text-brand-primary dark:text-white flex items-center space-x-2">
                <FileSpreadsheet size={18} />
                <span>{t("results")}</span>
              </CardTitle>
              <Button size="sm" variant="outline" onClick={handlePrint} className="flex items-center space-x-1.5 font-bold">
                <Printer size={14} />
                <span>{t("printReport")}</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">

              <div className="text-center py-4 border-b border-gray-150 dark:border-slate-800">
                <h3 className="text-sm font-extrabold text-brand-primary dark:text-brand-accent uppercase tracking-wider">এইচএসসি অর্ধবার্ষিক পরীক্ষার ফলাফল বিবরণী ২০২৬</h3>
                <p className="text-[10px] text-gray-500 font-bold mt-0.5">আবদুল ওদুদ শাহ্ ডিগ্রী কলেজ, চুয়াডাঙ্গা</p>
              </div>

              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>বিষয় (Subject)</TableHeaderCell>
                    <TableHeaderCell>মোট নম্বর (Total)</TableHeaderCell>
                    <TableHeaderCell>প্রাপ্ত নম্বর (Obtained)</TableHeaderCell>
                    <TableHeaderCell>গ্রেড (Grade)</TableHeaderCell>
                    <TableHeaderCell>জিপিএ (GPA)</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((res, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-bold text-xs">
                        {language === "bn" ? res.subjectBn : res.subjectEn}
                      </TableCell>
                      <TableCell className="font-semibold text-xs">{res.totalMarks}</TableCell>
                      <TableCell className="font-bold text-xs text-brand-primary dark:text-white">{res.obtainedMarks}</TableCell>
                      <TableCell>
                        <Badge variant={res.grade === "A+" ? "success" : "primary"} className="text-[10px]">
                          {res.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-black text-xs">{res.gpa.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContainer>

              <div className="flex justify-between items-center p-4 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs font-black">
                <span>গড় জিপিএ (GPA AVERAGE)</span>
                <span className="text-brand-secondary dark:text-green-400 text-sm">GPA {avgGpa.toFixed(2)} ({avgGrade})</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 4: Fees & Payment Gateway integration */}
        {tab === "fees" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-extrabold text-brand-primary dark:text-white flex items-center space-x-2">
                <CreditCard size={18} />
                <span>{t("feesPayment")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>ইনভয়েস নাম (Invoice Description)</TableHeaderCell>
                    <TableHeaderCell>পরিমাণ (Amount)</TableHeaderCell>
                    <TableHeaderCell>শেষ তারিখ (Due Date)</TableHeaderCell>
                    <TableHeaderCell>পেমেন্ট স্ট্যাটাস (Status)</TableHeaderCell>
                    <TableHeaderCell>অ্যাকশন (Action)</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-bold text-xs">
                        {language === "bn" ? inv.titleBn : inv.titleEn}
                      </TableCell>
                      <TableCell className="font-black text-xs">৳{inv.amount}</TableCell>
                      <TableCell className="text-xs text-gray-500 font-semibold">{inv.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant={inv.status === "paid" ? "success" : "danger"} className="text-[10px]">
                          {inv.status === "paid" ? "পরিশোধিত (Paid)" : "বকেয়া (Unpaid)"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {inv.status === "paid" ? (
                          <div className="text-[10px] text-gray-400 font-bold">
                            Paid on: {inv.paymentDate}
                          </div>
                        ) : (
                          <Button size="sm" variant="secondary" className="text-xs py-1" onClick={() => handleOpenBkash(inv)}>
                            {t("payFees")}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Tab 5: Notifications */}
        {tab === "notifications" && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "bn" ? "নোটিফিকেশন" : "Notifications"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  {
                    iconType: "exam",
                    titleBn: "অর্ধবার্ষিক পরীক্ষার রুটিন প্রকাশিত",
                    titleEn: "Half-Yearly Exam Routine Published",
                    bodyBn: "আগামী ১লা আগস্ট থেকে পরীক্ষা শুরু হবে। রুটিন কলেজের নোটিশ বোর্ডে দেওয়া হয়েছে।",
                    bodyEn: "Exams start from August 1. Schedule is on the college notice board.",
                    whenBn: "১০ মিনিট আগে",
                    whenEn: "10 minutes ago",
                    unread: true,
                  },
                  {
                    iconType: "fee",
                    titleBn: "পেমেন্ট গৃহীত: ৫০০ টাকা",
                    titleEn: "Payment Received: ৳500",
                    bodyBn: "লাইব্রেরি ও আইসিটি ল্যাব ফি সফলভাবে গৃহীত হয়েছে।",
                    bodyEn: "Library & ICT Lab fee received successfully.",
                    whenBn: "২ দিন আগে",
                    whenEn: "2 days ago",
                    unread: false,
                  },
                  {
                    iconType: "event",
                    titleBn: "সাংস্কৃতিক সপ্তাহ উদযাপন",
                    titleEn: "Cultural Week Celebration",
                    bodyBn: "আগামী ২৫শে ডিসেম্বর থেকে সাংস্কৃতিক সপ্তাহ শুরু হবে।",
                    bodyEn: "Cultural week begins December 25. Save the date!",
                    whenBn: "১ সপ্তাহ আগে",
                    whenEn: "1 week ago",
                    unread: false,
                  },
                  {
                    iconType: "general",
                    titleBn: "গ্রীষ্মকালীন অবকাশ নোটিশ",
                    titleEn: "Summer Vacation Notice",
                    bodyBn: "৩ জুলাই থেকে ১০ জুলাই পর্যন্ত কলেজ বন্ধ থাকবে।",
                    bodyEn: "College closed from July 3 to July 10.",
                    whenBn: "২ সপ্তাহ আগে",
                    whenEn: "2 weeks ago",
                    unread: false,
                  },
                ].map((n, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3 rounded-md border transition-colors ${n.unread
                      ? "border-brand-primary/30 bg-brand-primary/5"
                      : "border-outline-variant bg-white dark:bg-slate-900"
                      }`}
                  >
                    <div
                      className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${n.iconType === "exam"
                        ? "bg-brand-primary/10 text-brand-primary"
                        : n.iconType === "fee"
                          ? "bg-brand-secondary/10 text-brand-secondary"
                          : n.iconType === "event"
                            ? "bg-brand-accent/10 text-brand-accent"
                            : "bg-slate-100 text-slate-600"
                        }`}
                    >
                      <Bell size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold text-gray-800 dark:text-white truncate">
                          {language === "bn" ? n.titleBn : n.titleEn}
                        </p>
                        {n.unread && (
                          <span className="shrink-0 w-2 h-2 rounded-full bg-brand-primary" aria-label="unread" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-0.5">
                        {language === "bn" ? n.bodyBn : n.bodyEn}
                      </p>
                      <p className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">
                        {language === "bn" ? n.whenBn : n.whenEn}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Interactive bKash Merchant Gateway Simulator Modal */}
      {selectedInvoice && (
        <Modal isOpen={!!selectedInvoice} onClose={handleCloseBkash}>
          <div className="bg-[#E2125B] text-white p-5 -mx-5 -mt-4 text-center select-none">
            <h3 className="text-lg font-black tracking-wider flex items-center justify-center space-x-1.5">
              <span>bKash Merchant Payment</span>
            </h3>
            <div className="text-[10px] bg-black/20 rounded py-1 px-3 mt-2 inline-block font-semibold">
              Merchant: AWSD College EMS
            </div>
            <div className="text-lg font-extrabold mt-1">Amount: ৳{selectedInvoice.amount}</div>
          </div>

          <div className="py-6 space-y-4">
            {/* Step 1: Phone number entry */}
            {bkashStep === 1 && (
              <form onSubmit={handleProceedBkash} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    Your bKash Account Number
                  </label>
                  <input
                    type="text"
                    value={bkashPhone}
                    onChange={(e) => setBkashPhone(e.target.value)}
                    placeholder="e.g. 017XXXXXXXX"
                    className="w-full px-3 py-2.5 border rounded-lg text-sm text-center font-bold tracking-widest text-slate-800 focus:outline-none border-gray-300 focus:border-[#E2125B]"
                    required
                  />
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-[10px] text-gray-500 font-semibold">
                  By clicking Proceed, you agree to the terms & conditions of bKash payment gateway.
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button type="button" variant="outline" className="flex-1 text-xs" onClick={handleCloseBkash}>
                    CLOSE
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#E2125B] hover:bg-[#c20e4b] text-white text-xs font-bold">
                    PROCEED
                  </Button>
                </div>
              </form>
            )}

            {/* Step 2: OTP Entry */}
            {bkashStep === 2 && (
              <form onSubmit={handleProceedBkash} className="space-y-4">
                <div className="space-y-1 text-center">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    Enter Verification Code (OTP) sent to {bkashPhone}
                  </label>
                  <input
                    type="text"
                    value={bkashOtp}
                    onChange={(e) => setBkashOtp(e.target.value)}
                    placeholder="e.g. 123456"
                    className="w-full px-3 py-2.5 border rounded-lg text-sm text-center font-bold tracking-widest text-slate-800 focus:outline-none border-gray-300 focus:border-[#E2125B]"
                    required
                  />
                  <p className="text-[9px] text-[#E2125B] font-bold mt-1">Mock OTP Helper: Enter any 6 digit code (e.g. 123456)</p>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button type="button" variant="outline" className="flex-1 text-xs" onClick={() => setBkashStep(1)}>
                    BACK
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#E2125B] hover:bg-[#c20e4b] text-white text-xs font-bold">
                    PROCEED
                  </Button>
                </div>
              </form>
            )}

            {/* Step 3: PIN Entry */}
            {bkashStep === 3 && (
              <form onSubmit={handleProceedBkash} className="space-y-4">
                <div className="space-y-1 text-center">
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                    Enter your 5-digit bKash PIN
                  </label>
                  <input
                    type="password"
                    value={bkashPin}
                    onChange={(e) => setBkashPin(e.target.value)}
                    placeholder="•••••"
                    maxLength={5}
                    className="w-full px-3 py-2.5 border rounded-lg text-sm text-center font-bold tracking-widest text-slate-800 focus:outline-none border-gray-300 focus:border-[#E2125B]"
                    required
                  />
                  <p className="text-[9px] text-gray-450 font-semibold mt-1">🔒 PIN is fully encrypted & safe.</p>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button type="button" variant="outline" className="flex-1 text-xs" onClick={() => setBkashStep(2)}>
                    BACK
                  </Button>
                  <Button type="submit" className="flex-1 bg-[#E2125B] hover:bg-[#c20e4b] text-white text-xs font-bold">
                    CONFIRM
                  </Button>
                </div>
              </form>
            )}

            {/* Step 4: Success Screen */}
            {bkashStep === 4 && (
              <div className="text-center py-6 space-y-4">
                <CheckCircle2 size={48} className="mx-auto text-green-500 animate-bounce" />
                <div>
                  <h4 className="text-sm font-bold text-gray-800 dark:text-white">Payment Successful</h4>
                  <p className="text-xs text-gray-500 mt-1">Thank you! Your payment has been received successfully.</p>
                </div>
                <div className="pt-2">
                  <Button variant="primary" size="sm" onClick={handleCloseBkash} className="w-full">
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-xs font-bold text-gray-500">Loading Student Dashboard...</div>}>
      <StudentDashboardContent />
    </Suspense>
  );
}
