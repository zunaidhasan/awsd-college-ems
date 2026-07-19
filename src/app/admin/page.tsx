"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { Sidebar } from "../../components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";
import { TableContainer, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "../../components/ui/Table";
import { mockNotices, mockClassStudents, mockResults, Notice } from "../../data/mockData";
import { useRequireAuth } from "../../hooks/useRequireAuth";

function AdminDashboardContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get active tab from URL query params
  const tab = searchParams.get("tab") || "overview";
  const { user, ready } = useRequireAuth("admin");
  const adminName = user?.name ?? "Prof. Dr. Rafiqul Islam";

  // State variables
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [newNoticeTitleBn, setNewNoticeTitleBn] = useState("");
  const [newNoticeTitleEn, setNewNoticeTitleEn] = useState("");
  const [newNoticeContentBn, setNewNoticeContentBn] = useState("");
  const [newNoticeContentEn, setNewNoticeContentEn] = useState("");
  const [newNoticeCategory, setNewNoticeCategory] = useState<"academic" | "exam" | "event" | "general">("general");

  const [studentSearch, setStudentSearch] = useState("");
  const [students, setStudents] = useState(mockClassStudents);
  const [newStudentNameBn, setNewStudentNameBn] = useState("");
  const [newStudentNameEn, setNewStudentNameEn] = useState("");
  const [newStudentRoll, setNewStudentRoll] = useState("");
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  const [selectedResultClass, setSelectedResultClass] = useState("Class 11");
  const [resultSubject, setResultSubject] = useState("Math");
  const [resultPublishedMsg, setResultPublishedMsg] = useState("");

  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  if (!ready) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center text-sm font-semibold text-slate-500 bg-[#f8f9ff]">
        <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
        Loading dashboard...
      </div>
    );
  }

  const handleCreateNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitleBn || !newNoticeTitleEn) return;

    const noticeObj: Notice = {
      id: `notice-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      category: newNoticeCategory,
      titleBn: newNoticeTitleBn,
      titleEn: newNoticeTitleEn,
      contentBn: newNoticeContentBn,
      contentEn: newNoticeContentEn,
    };

    setNotices([noticeObj, ...notices]);
    setNewNoticeTitleBn("");
    setNewNoticeTitleEn("");
    setNewNoticeContentBn("");
    setNewNoticeContentEn("");
    alert(language === "bn" ? "নোটিশটি সফলভাবে প্রকাশিত হয়েছে!" : "Notice published successfully!");
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentNameBn || !newStudentRoll) return;

    const newStd = {
      id: `std-${Date.now()}`,
      nameBn: newStudentNameBn,
      nameEn: newStudentNameEn || newStudentNameBn,
      roll: newStudentRoll,
      present: true,
    };

    setStudents([...students, newStd]);
    setNewStudentNameBn("");
    setNewStudentNameEn("");
    setNewStudentRoll("");
    setShowAddStudentForm(false);
    alert(language === "bn" ? "শিক্ষার্থী সফলভাবে নিবন্ধিত হয়েছে!" : "Student registered successfully!");
  };

  const handlePublishResults = () => {
    setResultPublishedMsg(
      language === "bn"
        ? `${selectedResultClass}-এর ${resultSubject} বিষয়ের ফলাফল সফলভাবে প্রকাশ করা হলো!`
        : `Results for ${selectedResultClass} - ${resultSubject} published successfully!`
    );
    setTimeout(() => setResultPublishedMsg(""), 4000);
  };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearchQuery.trim()) {
      router.push(`/admin?tab=search&q=${encodeURIComponent(globalSearchQuery)}`);
    }
  };

  return (
    <div className="flex flex-1 min-h-[calc(100vh-4rem)] bg-[#f8f9ff]">
      <Sidebar role="admin" />

      {/* Main Container */}
      <main className="flex-1 p-6 space-y-6 pb-20 md:pb-8 max-w-[1600px] mx-auto w-full">
        {/* TopAppBar Search Header */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-xl border border-[#c5c5d3] shadow-sm">
          <form onSubmit={handleGlobalSearch} className="relative flex-1 max-w-lg">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#444651]">search</span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-[#d8e3f6]/40 border-none rounded-lg focus:ring-2 focus:ring-[#00236f]/20 transition-all text-xs"
              placeholder="Search records, students, or documents..."
              value={globalSearchQuery}
              onChange={(e) => setGlobalSearchQuery(e.target.value)}
              type="text"
            />
          </form>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <button
              onClick={() => router.push("/admin?tab=notifications")}
              className="relative p-2 text-[#444651] hover:bg-[#e5eeff] rounded-full transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 border-l border-[#c5c5d3] pl-4">
              <span className="text-xs font-bold text-[#00236f]">{adminName}</span>
              <div className="w-8 h-8 rounded-full bg-[#00236f] text-white flex items-center justify-center font-bold text-xs">
                A
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-[#00236f] to-[#1e3a8a] text-white p-6 rounded-xl shadow-lg space-y-4 sm:space-y-0">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined animate-bounce text-yellow-400">shield_with_heart</span>
              <span>{t("welcome")}, {adminName}</span>
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              Super Admin Overview | Abdul Wadud Shah Degree College
            </p>
          </div>
          <Badge variant="accent" className="px-3 py-1 font-bold text-yellow-400 bg-slate-800/80 border border-slate-700">
            রোল: কলেজ অধ্যক্ষ
          </Badge>
        </div>

        {/* Tab 1: Overview */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-[#c5c5d3] p-6 rounded-xl flex flex-col justify-between shadow-sm hover:-translate-y-0.5 transition-all">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-xs text-[#444651] uppercase tracking-wider">Total Students</span>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#00236f]">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-[#111c2a]">১,২৫০</span>
                  <p className="text-[10px] text-green-600 font-bold mt-1">+12% vs last year</p>
                </div>
              </div>

              <div className="bg-white border border-[#c5c5d3] p-6 rounded-xl flex flex-col justify-between shadow-sm hover:-translate-y-0.5 transition-all">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-xs text-[#444651] uppercase tracking-wider">Active Teachers</span>
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-[#006d30]">
                    <span className="material-symbols-outlined">diversity_3</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-[#111c2a]">৪৬</span>
                  <p className="text-[10px] text-[#444651] font-bold mt-1">Stable headcount</p>
                </div>
              </div>

              <div className="bg-white border border-[#c5c5d3] p-6 rounded-xl flex flex-col justify-between shadow-sm hover:-translate-y-0.5 transition-all">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-xs text-[#444651] uppercase tracking-wider">Pending Fees</span>
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-[#ca8a04]">
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-[#111c2a]">৳৮৫,৪০০</span>
                  <p className="text-[10px] text-red-600 font-bold mt-1">8% increase this week</p>
                </div>
              </div>

              <div className="bg-white border border-[#c5c5d3] p-6 rounded-xl flex flex-col justify-between shadow-sm hover:-translate-y-0.5 transition-all">
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-xs text-[#444651] uppercase tracking-wider">Avg Attendance</span>
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                    <span className="material-symbols-outlined">event_available</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-extrabold text-[#111c2a]">৯৪.২%</span>
                  <p className="text-[10px] text-green-600 font-bold mt-1">Above target threshold</p>
                </div>
              </div>
            </div>

            {/* Quick action buttons & SVG Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SVG Performance Chart */}
              <Card className="lg:col-span-2 border-[#c5c5d3]">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#006d30]">trending_up</span>
                    <span>{t("enrollmentTrend")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <svg viewBox="0 0 500 200" className="w-full h-48 bg-slate-50 rounded-lg p-2 border border-slate-100">
                    <path
                      d="M 50 150 Q 150 120 250 80 T 450 40"
                      fill="none"
                      stroke="#00236f"
                      strokeWidth="4"
                    />
                    <circle cx="50" cy="150" r="6" fill="#006d30" />
                    <circle cx="250" cy="80" r="6" fill="#ca8a04" />
                    <circle cx="450" cy="40" r="6" fill="#00236f" />
                    <line x1="50" y1="180" x2="450" y2="180" stroke="#cccccc" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50" y1="110" x2="450" y2="110" stroke="#cccccc" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50" y1="40" x2="450" y2="40" stroke="#cccccc" strokeWidth="1" strokeDasharray="5,5" />
                    <text x="45" y="195" className="text-[10px] fill-gray-400 font-bold">২০২৪</text>
                    <text x="245" y="195" className="text-[10px] fill-gray-400 font-bold">২০২৫</text>
                    <text x="445" y="195" className="text-[10px] fill-gray-400 font-bold">২০২৬</text>
                  </svg>
                  <p className="text-[11px] text-[#444651] mt-2 font-bold">বিগত ৩ বছরের বার্ষিক পাশের হার ও নতুন ভর্তির চিত্র বৃদ্ধি সূচক</p>
                </CardContent>
              </Card>

              {/* Action hub panel */}
              <Card className="border-[#c5c5d3]">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#ca8a04]">bolt</span>
                    <span>{t("quickActions")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" fullWidth className="justify-start text-xs font-semibold py-2.5" onClick={() => router.push("/admin?tab=students")}>
                    <span className="material-symbols-outlined mr-2 text-[#006d30]">person_add</span>
                    {t("addStudent")}
                  </Button>
                  <Button variant="outline" fullWidth className="justify-start text-xs font-semibold py-2.5" onClick={() => router.push("/admin?tab=results")}>
                    <span className="material-symbols-outlined mr-2 text-[#00236f]">description</span>
                    {t("publishResult")}
                  </Button>
                  <Button variant="outline" fullWidth className="justify-start text-xs font-semibold py-2.5" onClick={() => router.push("/admin?tab=notices")}>
                    <span className="material-symbols-outlined mr-2 text-[#ca8a04]">campaign</span>
                    {t("createNotice")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 2: Students List */}
        {tab === "students" && (
          <Card className="border-[#c5c5d3]">
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <CardTitle className="text-base font-bold text-[#00236f] flex items-center gap-1.5">
                <span className="material-symbols-outlined">group</span>
                <span>{t("studentList")}</span>
              </CardTitle>
              <Button size="sm" variant="secondary" onClick={() => setShowAddStudentForm(!showAddStudentForm)}>
                <span className="material-symbols-outlined mr-1 text-[16px]">add</span>
                {t("addStudent")}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {showAddStudentForm && (
                <form onSubmit={handleAddStudent} className="bg-slate-50 p-4 rounded-lg space-y-3 border border-[#c5c5d3]">
                  <h4 className="text-xs font-bold text-gray-800">নতুন শিক্ষার্থীর তথ্য দিন</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      label="শিক্ষার্থীর নাম (বাংলা)"
                      placeholder="যেমন: আরিফ রহমান"
                      value={newStudentNameBn}
                      onChange={(e) => setNewStudentNameBn(e.target.value)}
                      required
                    />
                    <Input
                      label="Student Name (English)"
                      placeholder="e.g. Arif Rahman"
                      value={newStudentNameEn}
                      onChange={(e) => setNewStudentNameEn(e.target.value)}
                    />
                    <Input
                      label="শ্রেণী রোল (Roll)"
                      placeholder="যেমন: ১০১"
                      value={newStudentRoll}
                      onChange={(e) => setNewStudentRoll(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowAddStudentForm(false)}>
                      বাতিল
                    </Button>
                    <Button type="submit" variant="secondary" size="sm">
                      সংরক্ষণ করুন
                    </Button>
                  </div>
                </form>
              )}

              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-[#444651] text-[18px]">search</span>
                <input
                  type="text"
                  placeholder="রোল বা নাম দিয়ে সার্চ করুন..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-transparent outline-none border-[#c5c5d3] text-gray-900"
                />
              </div>

              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>{t("roll")}</TableHeaderCell>
                    <TableHeaderCell>শিক্ষার্থীর নাম (Name)</TableHeaderCell>
                    <TableHeaderCell>{t("status")}</TableHeaderCell>
                    <TableHeaderCell>{t("action")}</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students
                    .filter(
                      (s) =>
                        s.roll.includes(studentSearch) ||
                        s.nameBn.includes(studentSearch) ||
                        s.nameEn.toLowerCase().includes(studentSearch.toLowerCase())
                    )
                    .map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-bold">{student.roll}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-bold text-xs text-gray-800">
                              {language === "bn" ? student.nameBn : student.nameEn}
                            </div>
                            <div className="text-[10px] text-gray-400">Class 12 (Science)</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={student.present ? "success" : "danger"} className="text-[10px]">
                            {student.present ? "নিয়মিত (Active)" : "অনিয়মিত (Inactive)"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="text-xs">
                            {t("viewDetails")}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Tab 3: Publish Results */}
        {tab === "results" && (
          <Card className="border-[#c5c5d3]">
            <CardHeader>
              <CardTitle className="text-base font-bold text-[#00236f] flex items-center gap-1.5">
                <span className="material-symbols-outlined">description</span>
                <span>{t("publishResult")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resultPublishedMsg && (
                <div className="p-3 bg-green-50 text-[#006d30] text-xs font-bold rounded-lg border border-green-200">
                  {resultPublishedMsg}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {t("class")}
                  </label>
                  <select
                    value={selectedResultClass}
                    onChange={(e) => setSelectedResultClass(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none border-[#c5c5d3]"
                  >
                    <option value="Class 11">একাদশ শ্রেণী (Class 11)</option>
                    <option value="Class 12">দ্বাদশ শ্রেণী (Class 12)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    {t("subject")}
                  </label>
                  <select
                    value={resultSubject}
                    onChange={(e) => setResultSubject(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none border-[#c5c5d3]"
                  >
                    <option value="Math">উচ্চতর গণিত (Math)</option>
                    <option value="Physics">পদার্থবিজ্ঞান (Physics)</option>
                    <option value="Chemistry">রসায়ন (Chemistry)</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button variant="primary" className="w-full font-bold py-2.5" onClick={handlePublishResults}>
                    প্রকাশ করুন (Publish Results)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 4: Notices Board */}
        {tab === "notices" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-[#c5c5d3]">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#ca8a04]">campaign</span>
                  <span>{t("createNotice")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateNotice} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="বিজ্ঞপ্তির শিরোনাম (বাংলা)"
                      placeholder="যেমন: অর্ধবার্ষিক পরীক্ষার রুটিন..."
                      value={newNoticeTitleBn}
                      onChange={(e) => setNewNoticeTitleBn(e.target.value)}
                      required
                    />
                    <Input
                      label="Notice Title (English)"
                      placeholder="e.g. Schedule of Half-Yearly Exam..."
                      value={newNoticeTitleEn}
                      onChange={(e) => setNewNoticeTitleEn(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      {t("category")}
                    </label>
                    <select
                      value={newNoticeCategory}
                      onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none border-[#c5c5d3]"
                    >
                      <option value="general">সাধারণ (General)</option>
                      <option value="academic">একাডেমিক (Academic)</option>
                      <option value="exam">পরীক্ষা (Exam)</option>
                      <option value="event">অনুষ্ঠান ও ছুটি (Event)</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" className="font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px]">send</span>
                      <span>নোটিশ প্রকাশ করুন</span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="border-[#c5c5d3]">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-gray-800">সাম্প্রতিক প্রকাশিত নোটিশসমূহ</CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-gray-100 space-y-3">
                {notices.map((n) => (
                  <div key={n.id} className="pt-3 first:pt-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] text-gray-400 font-bold">{n.date}</span>
                      <Badge variant={n.category === "exam" ? "danger" : "neutral"} className="scale-90 text-[9px]">
                        {n.category}
                      </Badge>
                    </div>
                    <p className="font-bold text-xs text-gray-800 line-clamp-2">
                      {language === "bn" ? n.titleBn : n.titleEn}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 5: Search Results (db253cae853d4998938ea6d84467ed3b) */}
        {tab === "search" && (
          <Card className="border-[#c5c5d3]">
            <CardHeader>
              <CardTitle className="text-base font-bold text-[#00236f] flex items-center gap-1.5">
                <span className="material-symbols-outlined">manage_search</span>
                <span>Search Results for &ldquo;{searchParams.get("q")}&rdquo;</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-[#444651] font-medium">Found results in Student Database:</p>
              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Roll</TableHeaderCell>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Role/Class</TableHeaderCell>
                    <TableHeaderCell>Action</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students
                    .filter(
                      (s) =>
                        s.nameBn.includes(searchParams.get("q") || "") ||
                        s.nameEn.toLowerCase().includes((searchParams.get("q") || "").toLowerCase()) ||
                        s.roll.includes(searchParams.get("q") || "")
                    )
                    .map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-bold">{student.roll}</TableCell>
                        <TableCell className="font-bold text-xs text-gray-800">
                          {language === "bn" ? student.nameBn : student.nameEn}
                        </TableCell>
                        <TableCell className="text-xs">Class 12 (Science)</TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="text-xs">
                            View Profile
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  {students.filter(
                    (s) =>
                      s.nameBn.includes(searchParams.get("q") || "") ||
                      s.nameEn.toLowerCase().includes((searchParams.get("q") || "").toLowerCase()) ||
                      s.roll.includes(searchParams.get("q") || "")
                  ).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-xs font-semibold text-gray-400">
                        No matches found. Try another search query.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Tab 6: Notifications View (c65ae9bcb5af49dd8dbb981be089f49c) */}
        {tab === "notifications" && (
          <Card className="border-[#c5c5d3]">
            <CardHeader>
              <CardTitle className="text-base font-bold text-[#00236f] flex items-center gap-1.5">
                <span className="material-symbols-outlined">notifications_active</span>
                <span>System Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 divide-y divide-gray-100">
              <div className="flex items-start gap-4 py-4 first:pt-0">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#00236f] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">info</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#111c2a]">System Backup Completed</h4>
                  <p className="text-xs text-[#444651]">Database synchronization completed successfully. Academic database is secure.</p>
                  <span className="text-[10px] text-gray-450 font-bold block pt-1">Today • 04:30 AM</span>
                </div>
              </div>

              <div className="flex items-start gap-4 py-4">
                <div className="w-10 h-10 rounded-full bg-green-100 text-[#006d30] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#111c2a]">New Payments Verified</h4>
                  <p className="text-xs text-[#444651]">Twelve (12) student semester fees were processed and reconciled automatically.</p>
                  <span className="text-[10px] text-gray-450 font-bold block pt-1">Yesterday • 05:15 PM</span>
                </div>
              </div>

              <div className="flex items-start gap-4 py-4">
                <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">error</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#111c2a]">Attendance Alert</h4>
                  <p className="text-xs text-[#444651]">Average attendance of Class 11 Section B fell below target threshold (85%).</p>
                  <span className="text-[10px] text-gray-450 font-bold block pt-1">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-xs font-bold text-gray-500 bg-[#f8f9ff]">Loading Admin Dashboard...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
