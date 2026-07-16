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
import { mockClassStudents, mockTimetable, mockNotices } from "../../data/mockData";
import { useRequireAuth } from "../../hooks/useRequireAuth";
import {
  Calendar,
  UserCheck,
  FileSpreadsheet,
  Clock,
  Sparkles,
  ClipboardCheck,
  CheckCircle,
  Save
} from "lucide-react";

function TeacherDashboardContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab") || "overview";
  const { user, ready } = useRequireAuth("teacher");
  const teacherName = user?.name ?? "Dr. Md. Kamruzzaman";

  if (!ready) {
    return <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center text-sm font-semibold text-slate-500">Loading teacher dashboard...</div>;
  }

  // Attendance management states
  const [selectedClass, setSelectedClass] = useState("Class 11");
  const [students, setStudents] = useState(mockClassStudents);
  const [attendanceSavedMsg, setAttendanceSavedMsg] = useState("");

  const handleToggleAttendance = (id: string) => {
    const updated = students.map((std) => {
      if (std.id === id) {
        return { ...std, present: !std.present };
      }
      return std;
    });
    setStudents(updated);
  };

  const handleSaveAttendance = () => {
    setAttendanceSavedMsg(t("attendanceSaved"));
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
  };

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
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <CardTitle className="text-base font-extrabold text-brand-primary dark:text-white flex items-center space-x-2">
                <UserCheck size={18} />
                <span>{t("markAttendance")}</span>
              </CardTitle>
              
              <div className="flex space-x-2">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-2.5 py-1.5 border rounded-lg text-xs font-semibold bg-transparent outline-none border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
                >
                  <option value="Class 11">একাদশ শ্রেণী (Class 11)</option>
                  <option value="Class 12">দ্বাদশ শ্রেণী (Class 12)</option>
                </select>
                <Button size="sm" variant="secondary" onClick={handleSaveAttendance} className="flex items-center space-x-1 font-bold">
                  <Save size={14} />
                  <span>{t("saveAttendance")}</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {attendanceSavedMsg && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 text-brand-secondary dark:text-green-400 text-xs font-bold rounded-lg border border-green-200 dark:border-green-800 flex items-center space-x-1.5">
                  <CheckCircle size={14} />
                  <span>{attendanceSavedMsg}</span>
                </div>
              )}

              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>{t("roll")}</TableHeaderCell>
                    <TableHeaderCell>শিক্ষার্থীর নাম (Name)</TableHeaderCell>
                    <TableHeaderCell>উপস্থিতি স্ট্যাটাস (Status)</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-bold text-xs">{student.roll}</TableCell>
                      <TableCell className="font-bold text-xs">{language === "bn" ? student.nameBn : student.nameEn}</TableCell>
                      <TableCell>
                        <button
                          type="button"
                          onClick={() => handleToggleAttendance(student.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${
                            student.present
                              ? "bg-green-50 border-green-200 text-green-700"
                              : "bg-red-50 border-red-200 text-red-700"
                          }`}
                        >
                          {student.present ? t("present") : t("absent")}
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {/* Tab 3: Enter Marks */}
        {tab === "marks" && (
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
              <CardTitle className="text-base font-extrabold text-brand-primary dark:text-white flex items-center space-x-2">
                <FileSpreadsheet size={18} />
                <span>{t("enterMarks")}</span>
              </CardTitle>

              <div className="flex space-x-2">
                <select
                  value={gradeSubject}
                  onChange={(e) => setGradeSubject(e.target.value)}
                  className="px-2.5 py-1.5 border rounded-lg text-xs font-semibold bg-transparent outline-none border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100"
                >
                  <option value="Physics">পদার্থবিজ্ঞান (Physics)</option>
                  <option value="Chemistry">রসায়ন (Chemistry)</option>
                </select>
                <Button size="sm" variant="primary" onClick={handleSaveGrades} className="flex items-center space-x-1 font-bold">
                  <Save size={14} />
                  <span>{t("submitMarks")}</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {gradesSavedMsg && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 text-brand-secondary dark:text-green-400 text-xs font-bold rounded-lg border border-green-200 dark:border-green-800 flex items-center space-x-1.5">
                  <CheckCircle size={14} />
                  <span>{gradesSavedMsg}</span>
                </div>
              )}

              <TableContainer>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>{t("roll")}</TableHeaderCell>
                    <TableHeaderCell>শিক্ষার্থীর নাম (Name)</TableHeaderCell>
                    <TableHeaderCell>প্রাপ্ত নম্বর (Obtained Mark)</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-bold text-xs">{student.roll}</TableCell>
                      <TableCell className="font-bold text-xs">{language === "bn" ? student.nameBn : student.nameEn}</TableCell>
                      <TableCell>
                        <input
                          type="number"
                          value={studentMarks[student.id] || 0}
                          onChange={(e) => handleMarkChange(student.id, e.target.value)}
                          max={100}
                          min={0}
                          className="px-3 py-1.5 border rounded-lg text-xs font-bold w-20 text-center outline-none bg-transparent border-gray-300 dark:border-slate-700 text-slate-800 dark:text-white"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </TableContainer>
            </CardContent>
          </Card>
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
              {mockNotices.map((n) => (
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
    <Suspense fallback={<div className="p-6 text-center text-xs font-bold text-gray-500">Loading Teacher Dashboard...</div>}>
      <TeacherDashboardContent />
    </Suspense>
  );
}
