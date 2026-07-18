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
import { mockTimetable, mockResults, mockInvoices, studentProfile, Invoice } from "../../data/mockData";
import { useRequireAuth } from "../../hooks/useRequireAuth";
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

  // Invoices and Payment state
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  // bKash gateway simulator states
  const [bkashStep, setBkashStep] = useState<number>(1);
  const [bkashPhone, setBkashPhone] = useState<string>("01712123456");
  const [bkashOtp, setBkashOtp] = useState<string>("");
  const [bkashPin, setBkashPin] = useState<string>("");

  if (!ready) {
    return <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center text-sm font-semibold text-slate-500">Loading student dashboard...</div>;
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
              <span>{t("welcome")}, {isGuardian ? studentProfile.nameBn : userName}</span>
            </h2>
            <p className="text-xs text-slate-300 font-semibold mt-1">
              {studentProfile.classBn} | {studentProfile.sectionBn} | {t("roll")}: {studentProfile.roll}
            </p>
          </div>
          <div className="text-xs space-y-1">
            <p><b>রেজি নং:</b> {studentProfile.regNo}</p>
            <p><b>রক্তের গ্রুপ:</b> {studentProfile.bloodGroup}</p>
          </div>
        </div>

        {/* Tab 1: Overview */}
        {tab === "overview" && (
          <div className="space-y-6">
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Radial attendance circle preview */}
              <Card className="flex items-center space-x-4 p-5">
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
                      strokeDashoffset={2 * Math.PI * 24 * (1 - studentProfile.attendancePercentage / 100)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-black text-gray-800 dark:text-white">
                    {studentProfile.attendancePercentage}%
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">{t("attendanceRate")}</p>
                  <p className="text-sm font-bold text-gray-800 dark:text-slate-200">নিয়মিত উপস্থিতি</p>
                </div>
              </Card>

              <Card className="flex items-center space-x-4 p-5">
                <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-950/20 text-brand-accent rounded-full flex items-center justify-center font-black">
                  <Award size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">{t("gpa")}</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white">{studentProfile.gpa} / ৫.০০</p>
                </div>
              </Card>

              <Card className="flex items-center space-x-4 p-5">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-950/20 text-red-500 rounded-full flex items-center justify-center font-black">
                  <CreditCard size={22} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">{t("dueFees")}</p>
                  <p className="text-lg font-black text-gray-900 dark:text-white">৳৫,৭০০</p>
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
                  <p className="border-b pb-1"><span className="text-gray-500">বাবার নাম (Father&apos;s Name):</span> <span className="float-right text-gray-800 dark:text-white">{language === "bn" ? studentProfile.guardianNameBn : studentProfile.guardianNameEn}</span></p>
                  <p className="border-b pb-1"><span className="text-gray-500">মোবাইল (Phone):</span> <span className="float-right text-gray-800 dark:text-white">{studentProfile.phone}</span></p>
                  <p className="border-b pb-1"><span className="text-gray-500">জন্ম তারিখ (DOB):</span> <span className="float-right text-gray-800 dark:text-white">{studentProfile.dob}</span></p>
                </div>
                <div className="space-y-3.5">
                  <p className="border-b pb-1"><span className="text-gray-500">ইমেইল (Email):</span> <span className="float-right text-gray-800 dark:text-white">{studentProfile.email}</span></p>
                  <p className="border-b pb-1"><span className="text-gray-500">ঠিকানা (Address):</span> <span className="float-right text-gray-800 dark:text-white">{language === "bn" ? studentProfile.addressBn : studentProfile.addressEn}</span></p>
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
                <p className="text-[10px] text-gray-500 font-bold mt-0.5">আব্দুল ওদুদ শাহ ডিগ্রী কলেজ, নাটোর</p>
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
                  {mockResults.map((res, idx) => (
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
                <span className="text-brand-secondary dark:text-green-400 text-sm">GPA 4.83 (A)</span>
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
