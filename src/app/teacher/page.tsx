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
import { Skeleton, SkeletonCard } from "../../components/ui/Skeleton";
import { Spinner } from "../../components/ui/Spinner";
import { mockClassStudents, mockNotices, Notice } from "../../data/mockData";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import { getNotices } from "../../lib/services/notices";
import { getAllStudents, type RosterStudent } from "../../lib/services/students";
import {
  Calendar,
  UserCheck,
  FileSpreadsheet,
  Clock,
  Sparkles,
  ClipboardCheck,
  CheckCircle,
  Save,
  Search,
  ChevronRight
} from "lucide-react";

function TeacherDashboardContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab") || "overview";
  const { user, ready } = useRequireAuth("teacher");
  const teacherName = user?.name ?? "Dr. Md. Kamruzzaman";

  // Attendance management states
  const [selectedClass, setSelectedClass] = useState("Class 11");
  const [students, setStudents] = useState<RosterStudent[]>(mockClassStudents);
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [attendanceSavedMsg, setAttendanceSavedMsg] = useState("");

  // Load live roster + notices; keep mock data on failure so the dashboard
  // still renders when the backend is unreachable.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [liveStudents, liveNotices] = await Promise.all([
          getAllStudents(),
          getNotices(),
        ]);
        if (!active) return;
        if (liveStudents.length) setStudents(liveStudents);
        if (liveNotices.length) setNotices(liveNotices);
      } catch (err) {
        console.warn("[teacher] live data fetch failed, using mock data:", err);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // New: handle attendance toggle for individual student
  const handleToggleAttendance = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, present: !s.present } : s))
    );
  };

  // New: save attendance action (placeholder)
  const handleSaveAttendance = () => {
    const msg = `${selectedClass} attendance saved successfully!`;
    setAttendanceSavedMsg(msg);
    setTimeout(() => setAttendanceSavedMsg(""), 4000);
  };

  // Grade Entry states
  const [gradeSubject, setGradeSubject] = useState("Physics");
  const [studentMarks, setStudentMarks] = useState<Record<string, number>>({
    "std-01": 85,
    "std-02": 72,
    "std-03": 94,
    "std-04": 61,
    "std-05": 88,
    "std-06": 79,
  });
  const [gradesSavedMsg, setGradesSavedMsg] = useState("");

  const handleMarkChange = (id: string, val: string) => {
    const parsed = parseInt(val) || 0;
    setStudentMarks({
      ...studentMarks,
      [id]: parsed,
    });
  };

  const handleSaveGrades = () => {
    setGradesSavedMsg(
      language === "bn"
        ? `${gradeSubject} বিষয়ের নম্বর সফলভাবে সংরক্ষণ করা হয়েছে!`
        : `Marks for ${gradeSubject} saved successfully!`
    );
    setTimeout(() => setGradesSavedMsg(""), 4000);
  }

  if (!ready) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)]">
        <div className="hidden lg:block w-64 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-3">
          <Skeleton width="w-full" height="h-10" className="rounded-xl" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} width="w-full" height="h-9" className="rounded-lg" />
          ))}
        </div>
        <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6" aria-busy="true" aria-label="Loading teacher dashboard">
          <Skeleton width="w-64" height="h-8" className="rounded-lg" />
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

  return (
    <div className="flex flex-1 min-h-[calc(100vh-4rem)]">
      <Sidebar role="teacher" />

      {/* Main Container */}
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 space-y-6 pb-20 md:pb-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-brand-primary to-slate-900 text-white p-6 rounded-2xl shadow-lg shadow-brand-primary/10 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-black flex items-center space-x-2">
              <Sparkles className="text-brand-accent animate-bounce" size={24} />
              <span>{t("welcome")}, {teacherName}</span>
            </h2>
            <p className="text-xs text-slate-300 font-semibold mt-1">
              সহযোগী অধ্যাপক | পদার্থবিজ্ঞান বিভাগ
            </p>
          </div>
          <Badge variant="accent" className="px-3 py-1 font-bold text-yellow-350 bg-slate-800">
            রোল: শিক্ষক (Teacher)
          </Badge>
        </div>

        {/* Tab 1: Overview */}
        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Today's Schedule */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm font-bold text-gray-800 dark:text-white flex items-center space-x-1.5">
                  <Clock size={16} className="text-brand-primary" />
                  <span>{t("mySchedule")}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TableContainer>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>সময় (Time)</TableHeaderCell>
                      <TableHeaderCell>শ্রেণী ও বিষয় (Class & Subject)</TableHeaderCell>
                      <TableHeaderCell>রুম (Room)</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-bold text-xs">09:45 AM - 10:30 AM</TableCell>
                      <TableCell>
                        <div className="font-bold text-xs text-slate-800 dark:text-white">একাদশ শ্রেণী (বিজ্ঞান)</div>
                        <div className="text-[10px] text-gray-400">রসায়ন ১ম পত্র</div>
                      </TableCell>
                      <TableCell className="font-semibold text-xs">২০১</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-bold text-xs">10:30 AM - 11:15 AM</TableCell>
                      <TableCell>
                        <div className="font-bold text-xs text-slate-800 dark:text-white">দ্বাদশ শ্রেণী (বিজ্ঞান)</div>
                        <div className="text-[10px] text-gray-400">পদার্থবিজ্ঞান ১ম পত্র</div>
                      </TableCell>
                      <TableCell className="font-semibold text-xs">২০৪</TableCell>
                    </TableRow>
                  </TableBody>
                </TableContainer>
              </CardContent>
            </Card>

            {/* Quick Stats Panel */}
            <div className="space-y-4">
              <Card className="bg-gradient-to-br from-green-50 to-transparent border-green-100 dark:border-slate-800">
                <CardContent className="py-5 flex items-center space-x-4">
                  <ClipboardCheck size={36} className="text-brand-secondary flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">আজকের উপস্থিতি গ্রহণ</h4>
                    <p className="text-[10px] text-gray-500 leading-tight">পদার্থবিজ্ঞান ১ম পত্র ক্লাসের উপস্থিতি এখনো নেওয়া হয়নি।</p>
                    <Button variant="secondary" size="sm" className="mt-2 text-[10px] font-bold py-1 px-2.5" onClick={() => router.push("/teacher?tab=attendance")}>
                      উপস্থিতি নিন (Mark now)
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-transparent border-blue-100 dark:border-slate-800">
                <CardContent className="py-5 flex items-center space-x-4">
                  <FileSpreadsheet size={36} className="text-brand-primary flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">নম্বর এন্ট্রি প্যানেল</h4>
                    <p className="text-[10px] text-gray-500 leading-tight">এইচএসসি পরীক্ষার অর্ধবার্ষিক নম্বর এন্ট্রি সম্পন্ন করুন।</p>
                    <Button variant="primary" size="sm" className="mt-2 text-[10px] font-bold py-1 px-2.5" onClick={() => router.push("/teacher?tab=marks")}>
                      নম্বর এন্ট্রি (Enter marks)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Tab 2: Mark Attendance */}
        {tab === "attendance" && (
          <div className="space-y-6">
            {/* Selectors */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
                <label className="block font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Department &amp; Class</label>
                <select className="w-full border-none bg-transparent font-label-md text-on-surface focus:ring-0 p-0 cursor-pointer">
                  <option>Science - Grade 12 (Section A)</option>
                  <option>Arts - Grade 12 (Section B)</option>
                  <option>Commerce - Grade 11 (Section A)</option>
                </select>
              </div>
              <div className="flex-1 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
                <label className="block font-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Select Date</label>
                <div className="flex items-center justify-between">
                  <input className="border-none bg-transparent font-label-md text-on-surface focus:ring-0 p-0 cursor-pointer" type="date" value={new Date().toISOString().slice(0,10)} />
                  <span className="material-symbols-outlined text-primary">calendar_month</span>
                </div>
              </div>
            </div>
            {/* Stats */}
            <div className="lg:col-span-4 flex gap-4">
              <div className="flex-1 bg-primary-container text-on-primary-container p-4 rounded-xl flex flex-col justify-center border border-primary-fixed shadow-sm">
                <p className="font-label-sm text-primary-fixed uppercase tracking-wider">Total Students</p>
                <p className="text-[28px] font-bold">{students.length}</p>
              </div>
              <div className="flex-1 bg-secondary-container text-on-secondary-container p-4 rounded-xl flex flex-col justify-center border border-secondary-fixed shadow-sm">
                <p className="font-label-sm text-on-secondary-fixed-variant uppercase tracking-wider">Present Today</p>
                <p className="text-[28px] font-bold">{students.filter(s => s.present).length}</p>
              </div>
            </div>
            {/* Table */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-surface-container text-left border-b border-outline-variant">
                      <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase tracking-widest">Roll No</th>
                      <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase tracking-widest">Student Name</th>
                      <th className="px-6 py-4 font-label-sm text-on-surface-variant uppercase tracking-widest text-right">Attendance Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-6 py-4 font-label-md text-primary font-bold">{student.roll}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
                              {student.avatar ? (
                                <img className="w-full h-full object-cover" src={student.avatar} alt="" />
                              ) : (
                                <span className="flex h-full w-full items-center justify-center bg-brand-primary/10 text-xs font-bold text-brand-primary">
                                  {(language === "bn" ? student.nameBn : student.nameEn).trim().charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div>
                              <p className="font-label-md font-bold text-on-surface">{language === "bn" ? student.nameBn : student.nameEn}</p>
                              <p className="font-label-sm text-on-surface-variant">{student.gender} • {student.group}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex bg-surface-container rounded-full p-1 border border-outline-variant">
                            <button
                              className={`attendance-active-${student.present ? "present" : "absent"} px-4 py-1.5 rounded-full font-label-sm flex items-center gap-1 transition-all`}
                              onClick={() => handleToggleAttendance(student.id)}
                            >
                              {student.present ? t("present") : t("absent")}
                            </button>
                            <button
                              className="px-4 py-1.5 rounded-full font-label-sm text-on-surface-variant hover:text-on-surface transition-all"
                              onClick={() => handleToggleAttendance(student.id)}
                            >
                              {t("late")}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Save Attendance */}
            <div className="flex space-x-2">
              <Button size="sm" variant="secondary" onClick={handleSaveAttendance} className="flex items-center gap-2 font-bold">
                <Save size={14} />
                <span>{t("saveAttendance")}</span>
              </Button>
            </div>
            {/* Saved Message */}
            {attendanceSavedMsg && (
              <div className="p-3 bg-green-50 dark:bg-green-950/20 text-brand-secondary dark:text-green-400 text-xs font-bold rounded-lg border border-green-200 dark:border-green-800 flex items-center space-x-1.5">
                <CheckCircle size={14} />
                <span>{attendanceSavedMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Enter Marks (Stitch Design) */}
        {tab === "marks" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                  <FileSpreadsheet size={22} />
                  <span>{t("enterMarks")}</span>
                </h1>
                <nav className="flex items-center text-xs text-on-surface-variant mt-1 gap-1">
                  <span>Teacher Portal</span>
                  <ChevronRight size={12} />
                  <span>Grading System</span>
                  <ChevronRight size={12} />
                  <span className="text-primary font-bold">Marks Entry</span>
                </nav>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center bg-green-50 dark:bg-green-950/20 text-brand-secondary px-4 py-2 rounded-full border border-green-200 dark:border-green-800 text-xs font-bold gap-2">
                  <FileSpreadsheet size={16} />
                  <span>Status: Draft</span>
                </div>
                <Button variant="primary" onClick={handleSaveGrades} className="flex items-center gap-2 font-bold rounded-full px-6 py-2.5 shadow-md active:scale-95 transition-all">
                  <Save size={16} />
                  <span>{t("submitMarks")}</span>
                </Button>
              </div>
            </div>

            {/* Saved Message */}
            {gradesSavedMsg && (
              <div className="p-3 bg-green-50 dark:bg-green-950/20 text-brand-secondary dark:text-green-400 text-xs font-bold rounded-lg border border-green-200 dark:border-green-800 flex items-center space-x-1.5">
                <CheckCircle size={14} />
                <span>{gradesSavedMsg}</span>
              </div>
            )}

            {/* Bento Selectors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-outline-variant">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">শ্রেণী (Class)</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none">
                    <option>HSC 1st Year (Science)</option>
                    <option>HSC 2nd Year (Science)</option>
                    <option>BBS Honors 1st Year</option>
                  </select>
                  <ChevronRight size={16} className="absolute right-3 top-2.5 text-gray-400 rotate-90 pointer-events-none" />
                </div>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-outline-variant">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">বিষয় (Subject)</label>
                <div className="relative">
                  <select
                    value={gradeSubject}
                    onChange={(e) => setGradeSubject(e.target.value)}
                    className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none"
                  >
                    <option value="Physics">Physics (Paper I)</option>
                    <option value="Chemistry">Chemistry (Paper II)</option>
                  </select>
                  <ChevronRight size={16} className="absolute right-3 top-2.5 text-gray-400 rotate-90 pointer-events-none" />
                </div>
              </div>
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-5 rounded-xl shadow-sm border border-outline-variant">
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">পরীক্ষার ধরন (Exam Type)</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant rounded-lg px-3 py-2 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:border-transparent outline-none appearance-none">
                    <option>Midterm Examination</option>
                    <option>Final Examination</option>
                    <option>Model Test</option>
                  </select>
                  <ChevronRight size={16} className="absolute right-3 top-2.5 text-gray-400 rotate-90 pointer-events-none" />
                </div>
              </div>
              <div className="bg-primary text-white p-5 rounded-xl shadow-md flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-80">Total Students</p>
                  <p className="text-3xl font-bold leading-none mt-1">{students.length}</p>
                </div>
                <UserCheck size={36} className="opacity-40" />
              </div>
            </div>

            {/* Sort & Search Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-outline-variant text-xs">
                <span className="text-gray-400 font-semibold">Sort by:</span>
                <button className="text-primary font-bold border-b-2 border-primary pb-0.5">Roll Number</button>
                <button className="text-on-surface-variant hover:text-primary transition-colors">Student Name</button>
              </div>
              <div className="relative w-full md:w-64">
                <input
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white dark:bg-slate-900 outline-none"
                  placeholder="Search Student..."
                  type="text"
                />
                <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Marks Entry Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-outline-variant shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low dark:bg-slate-800/50 border-b border-outline-variant">
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-20">রোল (Roll)</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">শিক্ষার্থীর নাম (Student Name)</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">থিওরি (Theory)</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">ব্যবহারিক (Prac.)</th>
                      <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">মোট (Total)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {students.map((student) => {
                      const theory = studentMarks[student.id] || 0;
                      const prac = Math.round(theory * 0.25); // mock practical as 25% of theory
                      const total = theory + prac;
                      const totalColorClass = total >= 80
                        ? "bg-green-50 dark:bg-green-950/30 text-brand-secondary dark:text-green-400 border border-green-200 dark:border-green-800"
                        : total < 33
                          ? "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
                          : "bg-blue-50 dark:bg-blue-950/30 text-primary border border-blue-200 dark:border-blue-800";
                      return (
                        <tr key={student.id} className="hover:bg-surface-container-low dark:hover:bg-slate-800/50 transition-colors group">
                          <td className="px-6 py-4 text-sm text-primary font-bold">{student.roll}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                {(language === "bn" ? student.nameBn : student.nameEn).substring(0, 2).toUpperCase()}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-on-surface">{language === "bn" ? student.nameBn : student.nameEn}</p>
                                <p className="text-xs text-gray-400">ID: {student.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={studentMarks[student.id] || 0}
                              onChange={(e) => handleMarkChange(student.id, e.target.value)}
                              max={80}
                              min={0}
                              className="w-24 px-3 py-1.5 rounded-md border border-outline-variant focus:ring-2 focus:ring-primary text-center text-sm bg-transparent outline-none"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="number"
                              value={prac}
                              readOnly
                              className="w-24 px-3 py-1.5 rounded-md border border-outline-variant text-center text-sm bg-gray-50 dark:bg-slate-800 outline-none cursor-not-allowed"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className={`w-24 px-3 py-1.5 rounded-md text-center font-bold text-sm ${totalColorClass}`}>
                              {total}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* Table Footer */}
              <div className="bg-surface-container-low dark:bg-slate-800/50 p-4 flex justify-between items-center border-t border-outline-variant">
                <div className="flex gap-2 text-xs">
                  <button className="px-4 py-2 rounded-lg border border-outline-variant hover:bg-white dark:hover:bg-slate-700 transition-all">Previous</button>
                  <button className="px-4 py-2 rounded-lg bg-white dark:bg-slate-700 border border-outline-variant shadow-sm font-bold">1</button>
                  <button className="px-4 py-2 rounded-lg border border-outline-variant hover:bg-white dark:hover:bg-slate-700 transition-all">Next</button>
                </div>
                <button onClick={handleSaveGrades} className="text-brand-secondary font-bold text-xs flex items-center gap-2 hover:bg-green-50 dark:hover:bg-green-950/20 px-4 py-2 rounded-lg transition-all">
                  <Save size={16} />
                  Save Progress
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Notices */}
        {tab === "notices" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-extrabold text-brand-primary dark:text-white flex items-center space-x-2">
                <Calendar size={18} />
                <span>{t("recentNotices")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-gray-150 dark:divide-slate-850 space-y-3.5">
              {notices.map((n) => (
                <div key={n.id} className="pt-3.5 first:pt-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] text-gray-400 font-bold">{n.date}</span>
                    <Badge variant={n.category === "exam" ? "danger" : "neutral"} className="scale-90 text-[9px]">
                      {n.category}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-xs text-gray-800 dark:text-slate-200">
                    {language === "bn" ? n.titleBn : n.titleEn}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-1">{language === "bn" ? n.contentBn : n.contentEn}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export default function TeacherDashboard() {
  return (
    <Suspense fallback={<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400"><Spinner size={18} /> Loading dashboard…</div>}>
      <TeacherDashboardContent />
    </Suspense>
  );
}
