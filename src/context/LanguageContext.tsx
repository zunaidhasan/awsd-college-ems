"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "bn" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  bn: {
    // Branding & Header
    collegeName: "আবদুল ওদুদ শাহ্ ডিগ্রী কলেজ",
    collegeNameEMS: "আবদুল ওদুদ শাহ্ ডিগ্রী কলেজ ইএমএস",
    collegeTagline: "শিক্ষা, সংস্কৃতি ও প্রগতির আলোকবর্তিকা",
    home: "হোম",
    notices: "নোটিশ বোর্ড",
    gallery: "গ্যালারি",
    login: "লগইন পোর্টাল",
    dashboard: "ড্যাশবোর্ড",
    logout: "লগআউট",
    bengali: "বাংলা",
    english: "English",
    eiin: "ইআইআইএন: 115429",
    estd: "স্থাপিত: ১৯৯৪",

    // Role Names
    admin: "এডমিন",
    teacher: "শিক্ষক",
    student: "শিক্ষার্থী",
    guardian: "অভিভাবক",

    // Landing Page
    exploreEMS: "ইএমএস অন্বেষণ করুন",
    noticeBoard: "সর্বশেষ নোটিশ সমূহ",
    allNotices: "সকল নোটিশ",
    viewDetails: "বিস্তারিত দেখুন",
    principalMessage: "অধ্যক্ষের বাণী",
    principalName: "প্রफेसर ড. মোঃ রফিকুল ইসলাম",
    chairmanMessage: "সভাপতির বাণী",
    chairmanName: "আলহাজ্ব মোঃ গোলাম মোস্তফা",
    statsStudents: "মোট শিক্ষার্থী",
    statsTeachers: "মোট শিক্ষক",
    statsDepartments: "মোট বিভাগ",
    statsPassRate: "পাশের হার",
    meritStudents: "মেধাবী শিক্ষার্থী",
    academicCalendar: "একাডেমিক ক্যালেন্ডার",
    address: "দামুড়হুদা / হাউলী, দামুড়হুদা, চুয়াডাঙ্গা, খুলনা",
    email: "ইমেইল: info@awsdc.edu.bd",
    phone: "ফোন: 07623-56022",

    // Login Portal
    loginTitle: "কলেজ ইএমএস পোর্টাল",
    loginSubtitle: "আপনার অ্যাকাউন্টে অ্যাক্সেস করতে আপনার রোল নির্বাচন করুন",
    username: "ফোন নম্বর / ইমেইল",
    password: "পাসওয়ার্ড",
    loginBtn: "লগইন করুন",
    forgotPass: "পাসওয়ার্ড ভুলে গেছেন?",
    orLoginWith: "অথবা ওটিপি (OTP) দিয়ে লগইন করুন",
    getOTP: "ওটিপি পাঠান",
    rememberMe: "আমাকে মনে রাখুন",
    autoFill: "সহজে লগইন করার ডেমো ক্রেডেনশিয়াল",

    // Admin Dashboard
    adminDashboard: "এডমিন ড্যাশবোর্ড",
    totalStudents: "মোট শিক্ষার্থী",
    totalTeachers: "মোট শিক্ষক",
    pendingFees: "বকেয়া ফি",
    todayAttendance: "আজকের উপস্থিতি",
    quickActions: "কুইক অ্যাকশন",
    addStudent: "নতুন শিক্ষার্থী যোগ",
    publishResult: "ফলাফল প্রকাশ",
    createNotice: "নতুন নোটিশ তৈরি",
    enrollmentTrend: "ভর্তি ও উপস্থিতির গ্রাফ",
    recentNotices: "সাম্প্রতিক নোটিশসমূহ",
    upcomingExams: "আসন্ন পরীক্ষাসমূহ",

    // Student Dashboard
    studentDashboard: "শিক্ষার্থী ড্যাশবোর্ড",
    welcome: "স্বাগতম",
    roll: "রোল",
    class: "শ্রেণী",
    section: "শাখা",
    gpa: "বর্তমান জিপিএ (GPA)",
    dueFees: "বকেয়া ফি",
    myClasses: "আমার ক্লাস সমূহ",
    timetable: "ক্লাস রুটিন",
    assignments: "অ্যাসাইনমেন্ট",
    attendanceRate: "উপস্থিতি হার",
    payFees: "ফি প্রদান করুন",
    results: "পরীক্ষার ফলাফল",

    // Teacher Dashboard
    teacherDashboard: "শিক্ষক ড্যাশবোর্ড",
    mySchedule: "আজকের ক্লাস শিডিউল",
    markAttendance: "উপস্থিতি গ্রহণ",
    enterMarks: "নম্বর এন্ট্রি",
    selectClass: "শ্রেণী নির্বাচন করুন",
    studentList: "শিক্ষার্থী তালিকা",
    present: "উপস্থিত",
    absent: "অনুপস্থিত",
    late: "বিলম্ব",
    saveAttendance: "উপস্থিতি সংরক্ষণ করুন",
    attendanceSaved: "উপস্থিতি সফলভাবে সংরক্ষিত হয়েছে!",
    submitMarks: "নম্বর জমা দিন",

    // Common/Dashboard terms
    status: "অবস্থা",
    action: "অ্যাকশন",
    date: "তারিখ",
    category: "ক্যাটাগরি",
    subject: "বিষয়",
    marks: "নম্বর",
    grade: "গ্রেড",
    remarks: "মন্তব্য",
    personalInfo: "ব্যক্তিগত তথ্য",
    academicRecord: "একাডেমিক রেকর্ড",
    attendanceHistory: "উপস্থিতির ইতিহাস",
    feesPayment: "ফি ও পেমেন্ট",
    search: "অনুসন্ধান",
    printReport: "রিপোর্ট প্রিন্ট করুন",
    downloadPDF: "পিডিএফ ডাউনলোড",
    bkashPay: "বিকাশ (bKash) পেমেন্ট",
    paySuccess: "পেমেন্ট সফলভাবে সম্পন্ন হয়েছে!",
    themeToggle: "ডার্ক মোড পরিবর্তন",

    // About Page
    aboutUs: "আমাদের সম্পর্কে",
    aboutHistory: "প্রতিষ্ঠানের ইতিহাস",
    aboutHistoryText: "আবদুল ওদুদ শাহ্ ডিগ্রী কলেজ ২৩ জুন ১৯৯৪ সালে চুয়াডাঙ্গা জেলার দামুড়হুদা উপজেলায় প্রতিষ্ঠিত হয়। প্রতিষ্ঠালগ্ন থেকে এই কলেজ উচ্চ মাধ্যমিক, ডিগ্রী এবং অনার্স পর্যায়ে মানসম্মত শিক্ষা প্রদান করে আসছে। গ্রামীণ অঞ্চলের শিক্ষার্থীদের উচ্চশিক্ষার সুযোগ সৃষ্টিতে এই প্রতিষ্ঠান অগ্রণী ভূমিকা পালন করছে।",
    aboutVision: "আমাদের লক্ষ্য ও উদ্দেশ্য",
    aboutVisionText: "নৈতিক মূল্যবোধসম্পন্ন পেশাদার শিক্ষা প্রদানের মাধ্যমে দক্ষ মানবসম্পদ গড়ে তোলা এবং জাতীয় উন্নয়নে অবদান রাখা।",
    aboutMission: "আমাদের মিশন",
    aboutMissionText: "মানসম্মত শিক্ষা, গবেষণা ও সামাজিক সেবার মাধ্যমে শিক্ষার্থীদের সুনাগরিক হিসেবে গড়ে তোলা।",
    aboutFacilities: "সুযোগ-সুবিধা",
    aboutLeadership: "নেতৃত্ব",
    aboutAtAGlance: "এক নজরে",
    profileTitle: "প্রোফাইল",
    profileAcademicSummary: "একাডেমিক সারসংক্ষেপ",
    profilePersonalInfo: "ব্যক্তিগত তথ্য",
    profileDocumentsTitle: "প্রয়োজনীয় নথিপত্র",
    profileDocuments: "ডকুমেন্ট অ্যালবাম",
    contactMap: "মানচিত্রে অবস্থান",

    // Academics Page
    academicsTitle: "একাডেমিক প্রোগ্রাম",
    academicsHSC: "উচ্চ মাধ্যমিক (এইচএসসি)",
    academicsDegree: "ডিগ্রী (পাস)",
    academicsHonours: "অনার্স",
    academicsGroups: "বিভাগসমূহ",
    academicsHumanities: "মানবিক",
    academicsBusiness: "ব্যবসায় শিক্ষা",
    academicsScience: "বিজ্ঞান",
    academicsVocational: "ভোকেশনাল",

    // Admissions Page
    admissionsTitle: "ভর্তি তথ্য",
    admissionsProcess: "ভর্তি প্রক্রিয়া",
    admissionsEligibility: "যোগ্যতা",
    admissionsDates: "গুরুত্বপূর্ণ তারিখ",
    admissionsDocuments: "প্রয়োজনীয় কাগজপত্র",
    admissionsApply: "অনলাইন আবেদন করুন",
    admissionsContact: "ভর্তি সংক্রান্ত যোগাযোগ",

    // Gallery Page
    galleryTitle: "গ্যালারি",
    galleryCampus: "ক্যাম্পাস ও অবকাঠামো",
    galleryEvents: "অনুষ্ঠান ও উদযাপন",
    galleryStudents: "শিক্ষার্থী ও কার্যক্রম",
    galleryAcademic: "একাডেমিক কার্যক্রম",
    galleryAll: "সকল",

    // Faculty Page
    facultyTitle: "শিক্ষক ও কর্মচারী",
    facultyPrincipal: "অধ্যক্ষ",
    facultyTeachers: "শিক্ষকবৃন্দ",
    facultyStaff: "কর্মচারীবৃন্দ",
    facultyDepartment: "বিভাগ",
    facultyDesignation: "পদবী",
    facultySearch: "শিক্ষক অনুসন্ধান",

    // Contact
    contactUs: "যোগাযোগ",
    contactForm: "বার্তা পাঠান",
    contactSend: "বার্তা পাঠান",

    // Guardian
    guardianTitle: "অভিভাবক পোর্টাল",
    guardianWelcome: "স্বাগতম, প্রিয় অভিভাবক",
    guardianViewYourWard: "আপনার শিশুর একাডেমিক তথ্য দেখুন",
  },
  en: {
    // Branding & Header
    collegeName: "ABDUL WADOD SHAH DEGREE COLLEGE",
    collegeNameEMS: "AWS Degree College EMS",
    collegeTagline: "The Beacon of Education, Culture & Progress",
    home: "Home",
    notices: "Notices",
    gallery: "Gallery",
    login: "Login Portal",
    dashboard: "Dashboard",
    logout: "Logout",
    bengali: "বাংলা",
    english: "English",
    eiin: "EIIN: 115429",
    estd: "Estd: 1994",

    // Role Names
    admin: "Admin",
    teacher: "Teacher",
    student: "Student",
    guardian: "Guardian",

    // Landing Page
    exploreEMS: "Explore EMS",
    noticeBoard: "Latest Notices",
    allNotices: "All Notices",
    viewDetails: "View Details",
    principalMessage: "Principal's Message",
    principalName: "Prof. Dr. Md. Rafiqul Islam",
    chairmanMessage: "Chairman's Message",
    chairmanName: "Alhaj Md. Golam Mostafa",
    statsStudents: "Total Students",
    statsTeachers: "Total Teachers",
    statsDepartments: "Total Departments",
    statsPassRate: "Pass Rate",
    meritStudents: "Merit Students",
    academicCalendar: "Academic Calendar",
    address: "Damurhuda / Hawlee, Damurhuda, Chuadanga, Khulna",
    email: "Email: info@awsdc.edu.bd",
    phone: "Phone: 07623-56022",

    // Login Portal
    loginTitle: "College EMS Portal",
    loginSubtitle: "Select your role to access your account",
    username: "Phone Number / Email",
    password: "Password",
    loginBtn: "Log In",
    forgotPass: "Forgot Password?",
    orLoginWith: "Or Login with OTP",
    getOTP: "Get OTP",
    rememberMe: "Remember Me",
    autoFill: "Click to autofill demo credentials",

    // Admin Dashboard
    adminDashboard: "Admin Dashboard",
    totalStudents: "Total Students",
    totalTeachers: "Total Teachers",
    pendingFees: "Pending Fees",
    todayAttendance: "Today's Attendance",
    quickActions: "Quick Actions",
    addStudent: "Add Student",
    publishResult: "Publish Result",
    createNotice: "Create Notice",
    enrollmentTrend: "Enrollment & Attendance Trend",
    recentNotices: "Recent Notices",
    upcomingExams: "Upcoming Exams",

    // Student Dashboard
    studentDashboard: "Student Dashboard",
    welcome: "Welcome",
    roll: "Roll",
    class: "Class",
    section: "Section",
    gpa: "Current GPA",
    dueFees: "Due Fees",
    myClasses: "My Classes",
    timetable: "Timetable",
    assignments: "Assignments",
    attendanceRate: "Attendance Rate",
    payFees: "Pay Fees",
    results: "Exam Results",

    // Teacher Dashboard
    teacherDashboard: "Teacher Dashboard",
    mySchedule: "Today's Schedule",
    markAttendance: "Mark Attendance",
    enterMarks: "Enter Marks",
    selectClass: "Select Class",
    studentList: "Student List",
    present: "Present",
    absent: "Absent",
    late: "Late",
    saveAttendance: "Save Attendance",
    attendanceSaved: "Attendance saved successfully!",
    submitMarks: "Submit Marks",

    // Common/Dashboard terms
    status: "Status",
    action: "Action",
    date: "Date",
    category: "Category",
    subject: "Subject",
    marks: "Marks",
    grade: "Grade",
    remarks: "Remarks",
    personalInfo: "Personal Details",
    academicRecord: "Academic Record",
    attendanceHistory: "Attendance History",
    feesPayment: "Fees & Payment",
    search: "Search",
    printReport: "Print Report",
    downloadPDF: "Download PDF",
    bkashPay: "Pay with bKash",
    paySuccess: "Payment completed successfully!",
    themeToggle: "Toggle Theme",

    // About Page
    aboutUs: "About Us",
    aboutHistory: "Our History",
    aboutHistoryText: "Abdul Wadud Shah Degree College was established on 23 June 1994 in Damurhuda Upazila, Chuadanga District. Since its inception, this college has been providing quality education at Higher Secondary, Degree and Honours levels. The institution plays a pioneering role in creating higher education opportunities for students in rural areas.",
    aboutVision: "Our Vision",
    aboutVisionText: "To build skilled human resources through professional education with moral values and contribute to national development.",
    aboutMission: "Our Mission",
    aboutMissionText: "To develop students as responsible citizens through quality education, research and social services.",
    aboutFacilities: "Facilities",
    aboutLeadership: "Leadership",
    aboutAtAGlance: "At a Glance",
    profileTitle: "Profile",
    profileAcademicSummary: "Academic Snapshot",
    profilePersonalInfo: "Personal Information",
    profileDocumentsTitle: "Required Documents",
    profileDocuments: "Document Album",
    contactMap: "Location on Map",

    // Academics Page
    academicsTitle: "Academic Programs",
    academicsHSC: "Higher Secondary (HSC)",
    academicsDegree: "Degree (Pass)",
    academicsHonours: "Honours",
    academicsGroups: "Available Groups",
    academicsHumanities: "Humanities",
    academicsBusiness: "Business Studies",
    academicsScience: "Science",
    academicsVocational: "Vocational",

    // Admissions Page
    admissionsTitle: "Admission Information",
    admissionsProcess: "Admission Process",
    admissionsEligibility: "Eligibility",
    admissionsDates: "Important Dates",
    admissionsDocuments: "Required Documents",
    admissionsApply: "Apply Online",
    admissionsContact: "Contact for Admission",

    // Gallery Page
    galleryTitle: "Gallery",
    galleryCampus: "Campus & Infrastructure",
    galleryEvents: "Events & Celebrations",
    galleryStudents: "Students & Activities",
    galleryAcademic: "Academic Programs",
    galleryAll: "All",

    // Faculty Page
    facultyTitle: "Faculty & Staff",
    facultyPrincipal: "Principal",
    facultyTeachers: "Teachers",
    facultyStaff: "Staff",
    facultyDepartment: "Department",
    facultyDesignation: "Designation",
    facultySearch: "Search Faculty",

    // Contact
    contactUs: "Contact Us",
    contactForm: "Send a Message",
    contactSend: "Send Message",

    // Guardian
    guardianTitle: "Guardian Portal",
    guardianWelcome: "Welcome, Dear Guardian",
    guardianViewYourWard: "View your ward's academic information",
  },
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("bn");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["bn"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
