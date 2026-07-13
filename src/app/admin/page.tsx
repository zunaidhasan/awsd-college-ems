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
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Plus,
  FileSpreadsheet,
  Bell,
  Search,
  Calendar,
  Sparkles,
  ShieldCheck,
  Send
} from "lucide-react";

function AdminDashboardContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get active tab from URL query params
  const tab = searchParams.get("tab") || "overview";

  // Check login
  const [adminName, setAdminName] = useState<string>("Prof. Dr. Rafiqul Islam");
  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
    } else {
      const user = JSON.parse(userStr);
      if (user.role !== "admin") {
        router.push(`/${user.role}`);
      } else {
        setAdminName(user.name);
      }
    }
  }, [router]);

  // Notice states
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [newNoticeTitleBn, setNewNoticeTitleBn] = useState("");
  const [newNoticeTitleEn, setNewNoticeTitleEn] = useState("");
  const [newNoticeContentBn, setNewNoticeContentBn] = useState("");
  const [newNoticeContentEn, setNewNoticeContentEn] = useState("");
  const [newNoticeCategory, setNewNoticeCategory] = useState<"academic" | "exam" | "event" | "general">("general");

  // Student list states
  const [studentSearch, setStudentSearch] = useState("");
  const [students, setStudents] = useState(mockClassStudents);
  const [newStudentNameBn, setNewStudentNameBn] = useState("");
  const [newStudentNameEn, setNewStudentNameEn] = useState("");
  const [newStudentRoll, setNewStudentRoll] = useState("");
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  // Result publishing state
  const [selectedResultClass, setSelectedResultClass] = useState("Class 11");
  const [resultSubject, setResultSubject] = useState("Math");
  const [resultPublishedMsg, setResultPublishedMsg] = useState("");

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

  return (
    <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
      <Sidebar role="admin" />

      {/* Main Container */}
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 space-y-6 pb-20 md:pb-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-brand-primary to-slate-900 text-white p-6 rounded-2xl shadow-lg shadow-brand-primary/10 space-y-4 sm:space-y-0">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black flex items-center space-x-2">
              <ShieldCheck className="text-brand-accent animate-bounce" size={24} />
              <span>{t("welcome")}, {adminName}</span>
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              {t("adminDashboard")} | {t("collegeName")}
            </p>
          </div>
          <Badge variant="accent" className="px-3 py-1 font-bold text-yellow-350 bg-slate-800">
            রোল: কলেজ অধ্যক্ষ
          </Badge>
        </div>

        {/* Tab 1: Overview */}
        {tab === "overview" && (
          <div className="space-y-6">
            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-brand-primary">
                <CardContent className="py-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t("totalStudents")}</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">১,২৫০</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-brand-primary rounded-xl">
                    <Users size={20} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-brand-secondary">
                <CardContent className="py-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t("totalTeachers")}</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">৪৬</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950/20 text-brand-secondary rounded-xl">
                    <BookOpen size={20} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-brand-accent">
                <CardContent className="py-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t("pendingFees")}</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">৳৮৫,৪০০</p>
                  </div>
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 text-brand-accent rounded-xl">
                    <DollarSign size={20} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="py-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t("todayAttendance")}</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">৯৪.২%</p>
                  </div>
                  <div className="p-3 bg-sky-50 dark:bg-sky-950/20 text-blue-500 rounded-xl">
                    <TrendingUp size={20} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick action buttons & SVG Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* SVG Performance Chart */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-gray-800 dark:text-white flex items-center space-x-1.5">
                    <TrendingUp size={16} className="text-brand-secondary" />
                    <span>{t("enrollmentTrend")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  {/* Inline Vector graph for statistics */}
                  <svg viewBox="0 0 500 200" className="w-full h-48 bg-slate-50 dark:bg-slate-900 rounded-lg p-2 border border-slate-100 dark:border-slate-800">
                    <path
                      d="M 50 150 Q 150 120 250 80 T 450 40"
                      fill="none"
                      stroke="#1E3A8A"
                      strokeWidth="4"
                      className="transition-all hover:stroke-brand-secondary"
                    />
                    <circle cx="50" cy="150" r="6" fill="#15803D" />
                    <circle cx="250" cy="80" r="6" fill="#CA8A04" />
                    <circle cx="450" cy="40" r="6" fill="#1E3A8A" />
                    
                    {/* Grid lines */}
                    <line x1="50" y1="180" x2="450" y2="180" stroke="#cccccc" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50" y1="110" x2="450" y2="110" stroke="#cccccc" strokeWidth="1" strokeDasharray="5,5" />
                    <line x1="50" y1="40" x2="450" y2="40" stroke="#cccccc" strokeWidth="1" strokeDasharray="5,5" />

                    <text x="45" y="195" className="text-[10px] fill-gray-400 font-bold">২০২৪</text>
                    <text x="245" y="195" className="text-[10px] fill-gray-400 font-bold">২০২৫</text>
                    <text x="445" y="195" className="text-[10px] fill-gray-400 font-bold">২০২৬</text>
                  </svg>
                  <p className="text-[11px] text-gray-450 mt-2 font-bold">বিগত ৩ বছরের বার্ষিক পাশের হার ও নতুন ভর্তির চিত্র বৃদ্ধি সূচক</p>
                </CardContent>
              </Card>

              {/* Action hub panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-bold text-gray-800 dark:text-white flex items-center space-x-1.5">
                    <Sparkles size={16} className="text-brand-accent animate-spin" />
                    <span>{t("quickActions")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" fullWidth className="justify-start text-xs font-semibold py-2.5" onClick={() => router.push("/admin?tab=students")}>
                    <Plus size={14} className="mr-2 text-brand-secondary" />
                    {t("addStudent")}
                  </Button>
                  <Button variant="outline" fullWidth className="justify-start text-xs font-semibold py-2.5" onClick={() => router.push("/admin?tab=results")}>
                    <FileSpreadsheet size={14} className="mr-2 text-brand-primary" />
                    {t("publishResult")}
                  </Button>
                  <Button variant="outline" fullWidth className="justify-start text-xs font-semibold py-2.5" onClick={() => router.push("/admin?tab=notices")}>
                    <Bell size={14} className="mr-2 text-brand-accent" />
                    {t("createNotice")}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming activities & alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-extrabold text-slate-800 dark:text-white">{t("upcomingExams")}</CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-slate-100 dark:divide-slate-850 space-y-3.5">
                <div className="flex justify-between items-center text-xs pt-3 first:pt-0">
                  <div className="flex items-center space-x-2.5">
                    <Calendar size={14} className="text-brand-secondary" />
                    <span className="font-bold">দ্বাদশ শ্রেণীর অর্ধবার্ষিক পরীক্ষা</span>
                  </div>
                  <Badge variant="primary">আগস্ট ০১, ২০২৬</Badge>
                </div>
                <div className="flex justify-between items-center text-xs pt-3">
                  <div className="flex items-center space-x-2.5">
                    <Calendar size={14} className="text-brand-primary" />
                    <span className="font-bold">এইচএসসি ব্যবহারিক পরীক্ষা ২০২৬</span>
                  </div>
                  <Badge variant="neutral">আগস্ট ২০, ২০২৬</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab 2: Students List */}
        {tab === "students" && (
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <CardTitle className="text-base font-extrabold text-brand-primary dark:text-white flex items-center space-x-2">
                <Users size={18} />
                <span>{t("studentList")}</span>
              </CardTitle>
              <Button size="sm" variant="secondary" onClick={() => setShowAddStudentForm(!showAddStudentForm)}>
                <Plus size={14} className="mr-1" />
                {t("addStudent")}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Add Student Form */}
              {showAddStudentForm && (
                <form onSubmit={handleAddStudent} className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl space-y-3 border border-slate-200 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-gray-800 dark:text-white">নতুন শিক্ষার্থীর তথ্য দিন</h4>
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

              {/* Student Search and List */}
              <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="রোল বা নাম দিয়ে সার্চ করুন..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-transparent outline-none border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
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
                            <div className="font-bold text-xs text-gray-800 dark:text-white">
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
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-extrabold text-brand-primary dark:text-white flex items-center space-x-2">
                <FileSpreadsheet size={18} />
                <span>{t("publishResult")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resultPublishedMsg && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 text-brand-secondary dark:text-green-400 text-xs font-bold rounded-lg animate-pulse border border-green-200 dark:border-green-800">
                  {resultPublishedMsg}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    {t("class")}
                  </label>
                  <select
                    value={selectedResultClass}
                    onChange={(e) => setSelectedResultClass(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
                  >
                    <option value="Class 11">একাদশ শ্রেণী (Class 11)</option>
                    <option value="Class 12">দ্বাদশ শ্রেণী (Class 12)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    {t("subject")}
                  </label>
                  <select
                    value={resultSubject}
                    onChange={(e) => setResultSubject(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
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

              {/* Sample Published list */}
              <div className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-gray-800 dark:text-white">সাম্প্রতিক প্রকাশিত পরীক্ষার ফলাফল</h4>
                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                  <div className="flex justify-between items-center text-xs py-2">
                    <span>এইচএসসি মডেল টেস্ট ফলাফল ২০২৬</span>
                    <Badge variant="success">প্রকাশিত (Published)</Badge>
                  </div>
                  <div className="flex justify-between items-center text-xs py-2">
                    <span>একাদশ শ্রেণী বার্ষিক পরীক্ষা ফলাফল ২০২৫</span>
                    <Badge variant="success">প্রকাশিত (Published)</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tab 4: Notices Board (Write New Notices) */}
        {tab === "notices" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create notice form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-gray-800 dark:text-white flex items-center space-x-1.5">
                  <Bell size={16} className="text-brand-secondary animate-bounce" />
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
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      {t("category")}
                    </label>
                    <select
                      value={newNoticeCategory}
                      onChange={(e) => setNewNoticeCategory(e.target.value as any)}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
                    >
                      <option value="general">সাধারণ (General)</option>
                      <option value="academic">একাডেমিক (Academic)</option>
                      <option value="exam">পরীক্ষা (Exam)</option>
                      <option value="event">অনুষ্ঠান ও ছুটি (Event)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      বিজ্ঞপ্তির বিস্তারিত বিবরণ (বাংলা)
                    </label>
                    <textarea
                      placeholder="এখানে বাংলা বিবরণ লিখুন..."
                      value={newNoticeContentBn}
                      onChange={(e) => setNewNoticeContentBn(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      Detailed Description (English)
                    </label>
                    <textarea
                      placeholder="Write English description here..."
                      value={newNoticeContentEn}
                      onChange={(e) => setNewNoticeContentEn(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border rounded-lg text-sm bg-transparent outline-none border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" className="font-bold flex items-center space-x-1.5">
                      <Send size={14} />
                      <span>নোটিশ প্রকাশ করুন</span>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Recent list on right */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold text-gray-800 dark:text-white">সাম্প্রতিক প্রকাশিত নোটিশসমূহ</CardTitle>
              </CardHeader>
              <CardContent className="divide-y divide-gray-150 dark:divide-slate-800 space-y-3">
                {notices.map((n) => (
                  <div key={n.id} className="pt-3 first:pt-0">
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="text-[10px] text-gray-400 font-bold">{n.date}</span>
                      <Badge variant={n.category === "exam" ? "danger" : "neutral"} className="scale-90 text-[9px]">
                        {n.category}
                      </Badge>
                    </div>
                    <p className="font-bold text-xs text-gray-800 dark:text-slate-200 line-clamp-2">
                      {language === "bn" ? n.titleBn : n.titleEn}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-xs font-bold text-gray-500">Loading Admin Dashboard...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
