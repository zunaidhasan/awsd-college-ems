"use client";

import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { TableContainer, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "../../components/ui/Table";
import { Badge } from "../../components/ui/Badge";
import { Footer } from "../../components/layout/Footer";
import { mockResults } from "../../data/mockData";
import { Search, Printer, FileSpreadsheet, GraduationCap, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ResultsSearchPage() {
  const { language, t } = useLanguage();
  const [roll, setRoll] = useState("");
  const [regNo, setRegNo] = useState("");
  const [examType, setExamType] = useState("Half-Yearly");
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roll || !regNo) {
      setErrorMsg(language === "bn" ? "রোল এবং রেজিস্ট্রেশন নাম্বার উভয়ই পূরণ করুন।" : "Please enter both roll and registration numbers.");
      return;
    }
    // Mock validator: check if roll is 101 and reg is 1612345678 (matching Arif Rahman)
    if (roll === "101" && regNo === "1612345678") {
      setSearchSubmitted(true);
      setErrorMsg("");
    } else {
      setErrorMsg(language === "bn" ? "কোন তথ্য পাওয়া যায়নি! অনুগ্রহ করে রোল: ১০১ এবং রেজি: ১৬১২৩৪৫৬৭৮ ব্যবহার করুন।" : "No record found! Please use Roll: 101 and Reg: 1612345678.");
      setSearchSubmitted(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950">
      <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-12 space-y-6">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center space-x-1 text-xs font-bold text-brand-primary dark:text-brand-accent hover:underline print:hidden">
          <ChevronLeft size={14} />
          <span>{t("home")}</span>
        </Link>

        {/* Portal title */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-brand-primary dark:text-white flex items-center justify-center space-x-2">
            <GraduationCap className="text-brand-accent animate-pulse" size={28} />
            <span>ফলাফল অনুসন্ধান পোর্টাল</span>
          </h2>
          <p className="text-xs text-gray-500 font-semibold">{t("collegeName")}</p>
        </div>

        {/* Search Panel Card */}
        <Card className="print:hidden border-slate-200 dark:border-slate-800 shadow-md">
          <CardHeader className="bg-slate-50/50 dark:bg-slate-850/50 py-4">
            <CardTitle className="text-sm font-extrabold text-slate-800 dark:text-white">ফলাফল খুজুন (Result Search)</CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold rounded-lg border border-red-200 dark:border-red-900">
                {errorMsg}
              </div>
            )}
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  পরীক্ষার ধরণ (Exam Type)
                </label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
                >
                  <option value="Half-Yearly">অর্ধবার্ষিক পরীক্ষা (Half-Yearly)</option>
                  <option value="Final">বার্ষিক পরীক্ষা (Annual Exam)</option>
                </select>
              </div>
              <Input
                label="রোল নম্বর (Roll)"
                placeholder="যেমন: ১০১"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                required
              />
              <Input
                label="রেজিস্ট্রেশন নম্বর (Reg No)"
                placeholder="যেমন: ১৬১২৩৪৫৬৭৮"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                required
              />
              <div className="flex items-end">
                <Button type="submit" variant="primary" fullWidth className="py-2.5 font-bold">
                  <Search size={14} className="mr-1.5" />
                  <span>অনুসন্ধান করুন</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results output sheet */}
        {searchSubmitted && (
          <Card className="print:shadow-none print:border-none border-slate-200 dark:border-slate-800 shadow-lg">
            <CardHeader className="flex flex-row justify-between items-center border-b border-gray-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-850/50 print:hidden">
              <span className="text-xs font-bold text-brand-secondary flex items-center space-x-1">
                <FileSpreadsheet size={16} />
                <span>ফলাফল বিবরণী প্রস্তুত</span>
              </span>
              <Button size="sm" variant="outline" onClick={handlePrint} className="flex items-center space-x-1.5 font-bold">
                <Printer size={14} />
                <span>{t("printReport")}</span>
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              {/* College Logo / Header for report card */}
              <div className="text-center pb-4 border-b border-gray-200 dark:border-slate-850">
                <h3 className="text-base font-extrabold text-brand-primary dark:text-brand-accent">
                  আবদুল ওদুদ শাহ্ ডিগ্রী কলেজ, চুয়াডাঙ্গা
                </h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">ACADEMIC REPORT CARD</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-left text-xs text-gray-650 font-semibold p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div><b>শিক্ষার্থীর নাম:</b> আরিফ রহমান (Arif Rahman)</div>
                  <div><b>শ্রেণী রোল:</b> ১০১ (Roll: 101)</div>
                  <div><b>পরীক্ষা:</b> অর্ধবার্ষিক পরীক্ষা ২০২৬</div>
                  <div><b>বিভাগ:</b> দ্বাদশ শ্রেণী (বিজ্ঞান)</div>
                </div>
              </div>

              {/* Marks list */}
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
                      <TableCell className="font-bold text-xs text-brand-primary dark:text-white">
                        {res.obtainedMarks}
                      </TableCell>
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
      </div>
      <Footer />
    </div>
  );
}
