export interface Notice {
  id: string;
  date: string;
  category: "academic" | "exam" | "event" | "general";
  titleBn: string;
  titleEn: string;
  contentBn: string;
  contentEn: string;
  isImportant?: boolean;
}

export interface TimetableEntry {
  day: string;
  time: string;
  subjectBn: string;
  subjectEn: string;
  teacherBn: string;
  teacherEn: string;
  room: string;
}

export interface StudentResult {
  subjectBn: string;
  subjectEn: string;
  totalMarks: number;
  obtainedMarks: number;
  grade: string;
  gpa: number;
}

export interface Invoice {
  id: string;
  titleBn: string;
  titleEn: string;
  amount: number;
  dueDate: string;
  status: "paid" | "unpaid";
  paymentDate?: string;
}

export interface StudentProfile {
  id: string;
  nameBn: string;
  nameEn: string;
  roll: string;
  regNo: string;
  classBn: string;
  classEn: string;
  sectionBn: string;
  sectionEn: string;
  guardianNameBn: string;
  guardianNameEn: string;
  attendancePercentage: number;
  gpa: number;
  phone: string;
  email: string;
  addressBn: string;
  addressEn: string;
  dob: string;
  bloodGroup: string;
}

export const mockNotices: Notice[] = [
  {
    id: "notice-0",
    date: "2026-07-13",
    category: "general",
    isImportant: true,
    titleBn: "২০২৬-২৭ শিক্ষাবর্ষে একাদশ শ্রেণীতে ভর্তি বিজ্ঞপ্তি",
    titleEn: "2026-27 Admission Circular Published",
    contentBn: "২০২৬-২৭ শিক্ষাবর্ষে একাদশ শ্রেণীতে ভর্তির আবেদন ও প্রয়োজনীয় তথ্যাবলী প্রকাশিত হয়েছে। বিস্তারিত জানতে নিচের পিডিএফ লিঙ্ক থেকে সার্কুলারটি ডাউনলোড করুন।",
    contentEn: "The admission circular and guidelines for the 2026-27 academic session in class XI have been published. Please download the circular for details.",
  },
  {
    id: "notice-1",
    date: "2026-07-10",
    category: "exam",
    isImportant: true,
    titleBn: "এইচএসসি পরীক্ষা ২০২৬-এর ফরম পূরণ সংক্রান্ত বিজ্ঞপ্তি",
    titleEn: "HSC Exam 2026 Form Fill-up Notice",
    contentBn: "এইচএসসি পরীক্ষা ২০২৬-এর ফরম পূরণ আগামী ১৫ই জুলাই থেকে শুরু হবে। সকল শিক্ষার্থীকে নির্ধারিত ফি পরিশোধ করে অনলাইন ফরম পূরণ সম্পন্ন করার অনুরোধ করা হলো।",
    contentEn: "The form fill-up for HSC Exam 2026 will start from July 15. All students are requested to complete the online form fill-up after paying the scheduled fees.",
  },
  {
    id: "notice-2",
    date: "2026-07-08",
    category: "academic",
    titleBn: "একাদশ শ্রেণীর অর্ধবার্ষিক পরীক্ষার সিলেবাস ও সময়সূচী",
    titleEn: "Syllabus and Schedule for Class 11 Half-Yearly Exam",
    contentBn: "একাদশ শ্রেণীর অর্ধবার্ষিক পরীক্ষা আগামী ১লা আগস্ট থেকে শুরু হবে। বিস্তারিত সিলেবাস এবং সময়সূচী কলেজের নোটিশ বোর্ডে এবং ওয়েবসাইটে দেওয়া হয়েছে।",
    contentEn: "The Half-Yearly Exam for Class 11 will commence on August 1. The detailed syllabus and schedule are available on the college notice board and website.",
  },
  {
    id: "notice-3",
    date: "2026-07-05",
    category: "event",
    titleBn: "জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানের শাহাদাত বার্ষিকী ও জাতীয় শোক দিবস পালন",
    titleEn: "Observance of National Mourning Day",
    contentBn: "আগামী ১৫ই আগস্ট জাতির পিতা বঙ্গবন্ধু শেখ মুজিবুর রহমানের শাহাদাত বার্ষিকী ও জাতীয় শোক দিবস উপলক্ষে কলেজে আলোচনা সভা ও দোয়া মাহফিল অনুষ্ঠিত হবে।",
    contentEn: "A discussion meeting and prayer session will be held at the college on August 15 on the occasion of the death anniversary of the Father of the Nation Bangabandhu Sheikh Mujibur Rahman and National Mourning Day.",
  },
  {
    id: "notice-4",
    date: "2026-06-30",
    category: "general",
    titleBn: "গ্রীষ্মকালীন অবকাশ ও কলেজ বন্ধের নোটিশ",
    titleEn: "Summer Vacation and College Closure Notice",
    contentBn: "কলেজের গ্রীষ্মকালীন অবকাশ উপলক্ষে আগামী ৩রা জুলাই থেকে ১০ই জুলাই পর্যন্ত সকল সাধারণ ক্লাস বন্ধ থাকবে। ১১ই জুলাই থেকে যথারীতি ক্লাস শুরু হবে।",
    contentEn: "All regular classes will remain closed from July 3 to July 10 on account of summer vacation. Regular classes will resume on July 11.",
  },
];

export const mockTimetable: TimetableEntry[] = [
  { day: "Saturday", time: "09:00 AM - 09:45 AM", subjectBn: "বাংলা ১ম পত্র", subjectEn: "Bangla 1st Paper", teacherBn: "মো: রফিকুল ইসলাম", teacherEn: "Md. Rafiqul Islam", room: "১০২" },
  { day: "Saturday", time: "09:45 AM - 10:30 AM", subjectBn: "ইংরেজি ১ম পত্র", subjectEn: "English 1st Paper", teacherBn: "শারমিন আক্তার", teacherEn: "Sharmin Akter", room: "১০২" },
  { day: "Saturday", time: "10:30 AM - 11:15 AM", subjectBn: "পদার্থবিজ্ঞান ১ম পত্র", subjectEn: "Physics 1st Paper", teacherBn: "ড. মো: কামরুজ্জামান", teacherEn: "Dr. Md. Kamruzzaman", room: "২০৪" },
  { day: "Sunday", time: "09:00 AM - 09:45 AM", subjectBn: "উচ্চতর গণিত ১ম পত্র", subjectEn: "Higher Math 1st Paper", teacherBn: "আব্দুল মান্নান", teacherEn: "Abdul Mannan", room: "১০৫" },
  { day: "Sunday", time: "09:45 AM - 10:30 AM", subjectBn: "রসায়ন ১ম পত্র", subjectEn: "Chemistry 1st Paper", teacherBn: "মোছা: নাজনীন সুলতানা", teacherEn: "Mst. Naznin Sultana", room: "২০১" },
  { day: "Sunday", time: "10:30 AM - 11:15 AM", subjectBn: "তথ্য ও যোগাযোগ প্রযুক্তি", subjectEn: "ICT", teacherBn: "জুনাইদ আহমেদ", teacherEn: "Zunaid Ahmed", room: "ল্যাব ৩" },
  { day: "Monday", time: "09:00 AM - 09:45 AM", subjectBn: "জীববিজ্ঞান ১ম পত্র", subjectEn: "Biology 1st Paper", teacherBn: "ড. শাহনাজ বেগম", teacherEn: "Dr. Shahnaz Begum", room: "২০৫" },
  { day: "Monday", time: "09:45 AM - 10:30 AM", subjectBn: "বাংলা ১ম পত্র", subjectEn: "Bangla 1st Paper", teacherBn: "মো: রফিকুল ইসলাম", teacherEn: "Md. Rafiqul Islam", room: "১০২" },
  { day: "Monday", time: "10:30 AM - 11:15 AM", subjectBn: "রসায়ন ১ম পত্র", subjectEn: "Chemistry 1st Paper", teacherBn: "মোছা: নাজনীন সুলতানা", teacherEn: "Mst. Naznin Sultana", room: "২০১" },
];

export const mockResults: StudentResult[] = [
  { subjectBn: "বাংলা ১ম পত্র", subjectEn: "Bangla 1st Paper", totalMarks: 100, obtainedMarks: 85, grade: "A+", gpa: 5.0 },
  { subjectBn: "ইংরেজি ১ম পত্র", subjectEn: "English 1st Paper", totalMarks: 100, obtainedMarks: 78, grade: "A", gpa: 4.0 },
  { subjectBn: "পদার্থবিজ্ঞান ১ম পত্র", subjectEn: "Physics 1st Paper", totalMarks: 100, obtainedMarks: 92, grade: "A+", gpa: 5.0 },
  { subjectBn: "রসায়ন ১ম পত্র", subjectEn: "Chemistry 1st Paper", totalMarks: 100, obtainedMarks: 88, grade: "A+", gpa: 5.0 },
  { subjectBn: "উচ্চতর গণিত ১ম পত্র", subjectEn: "Higher Math 1st Paper", totalMarks: 100, obtainedMarks: 95, grade: "A+", gpa: 5.0 },
  { subjectBn: "তথ্য ও যোগাযোগ প্রযুক্তি", subjectEn: "ICT", totalMarks: 100, obtainedMarks: 89, grade: "A+", gpa: 5.0 },
];

export const mockInvoices: Invoice[] = [
  { id: "inv-001", titleBn: "একাদশ শ্রেণীর ভর্তি ও সেশন ফি", titleEn: "Class 11 Admission & Session Fees", amount: 4500, dueDate: "2026-07-20", status: "unpaid" },
  { id: "inv-002", titleBn: "অর্ধবার্ষিক পরীক্ষার ফি", titleEn: "Half-Yearly Exam Fees", amount: 1200, dueDate: "2026-08-01", status: "unpaid" },
  { id: "inv-003", titleBn: "লাইব্রেরি ও আইসিটি ল্যাব ফি", titleEn: "Library & ICT Lab Fees", amount: 500, dueDate: "2026-06-15", status: "paid", paymentDate: "2026-06-12" },
  { id: "inv-004", titleBn: "মাসিক টিউশন ফি (জানুয়ারি-জুন)", titleEn: "Monthly Tuition Fees (Jan-Jun)", amount: 1800, dueDate: "2026-06-10", status: "paid", paymentDate: "2026-06-08" },
];

export const studentProfile: StudentProfile = {
  id: "std-1001",
  nameBn: "আরিফ রহমান",
  nameEn: "Arif Rahman",
  roll: "১০১",
  regNo: "১৬১২৩৪৫৬৭৮",
  classBn: "দ্বাদশ (বিজ্ঞান)",
  classEn: "Class 12 (Science)",
  sectionBn: "ক শাখা",
  sectionEn: "Section A",
  guardianNameBn: "মোঃ লুৎফর রহমান",
  guardianNameEn: "Md. Lutfar Rahman",
  attendancePercentage: 88.5,
  gpa: 4.83,
  phone: "01712123456",
  email: "arif.rahman@student.awsdc.edu.bd",
  addressBn: "গ্রাম: লালপুর, ডাকঘর: লালপুর, নাটোর",
  addressEn: "Village: Lalpur, Post: Lalpur, Natore",
  dob: "2008-04-12",
  bloodGroup: "O+",
};

export const mockClassStudents = [
  { id: "std-01", nameBn: "আরিফ রহমান", nameEn: "Arif Rahman", roll: "১০১", present: true },
  { id: "std-02", nameBn: "তানভীর হাসান", nameEn: "Tanvir Hasan", roll: "১০২", present: true },
  { id: "std-03", nameBn: "সাদিয়া আফরিন", nameEn: "Sadia Afrin", roll: "১০৩", present: true },
  { id: "std-04", nameBn: "মেহেদী হাসান", nameEn: "Mehedi Hasan", roll: "১০৪", present: false },
  { id: "std-05", nameBn: "ফাতেমা তুজ জোহরা", nameEn: "Fatema Tuz Zohra", roll: "১০৫", present: true },
  { id: "std-06", nameBn: "মাহমুদুল হাসান", nameEn: "Mahmudul Hasan", roll: "১০৬", present: true },
];

export const demoCredentials = {
  admin: { username: "admin@awsdc.edu.bd", password: "password123", label: "Admin / Principal" },
  teacher: { username: "teacher@awsdc.edu.bd", password: "password123", label: "Teacher" },
  student: { username: "arif.rahman@student.awsdc.edu.bd", password: "password123", label: "Student" },
  guardian: { username: "guardian@awsdc.edu.bd", password: "password123", label: "Guardian" },
};
