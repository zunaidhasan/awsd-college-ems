import { NextResponse } from "next/server";

const notices = [
  {
    id: "n-1",
    titleBn: "পরীক্ষার সময়সূচী প্রকাশিত হয়েছে",
    titleEn: "Exam schedule has been published",
    descriptionBn: "এইচএসসি অর্ধবার্ষিক পরীক্ষার বিস্তারিত সময়সূচী এখন অনলাইনে পাওয়া যাচ্ছে।",
    descriptionEn: "The HSC half-yearly exam schedule is now available online.",
    unread: true,
    date: "2026-07-14",
  },
  {
    id: "n-2",
    titleBn: "লাইব্রেরিতে নতুন বই যোগ করা হয়েছে",
    titleEn: "New books added to the library",
    descriptionBn: "আইসিটি, রসায়ন ও গণিত বিষয়ে নতুন বই সংগ্রহাগারে যুক্ত হয়েছে।",
    descriptionEn: "New books in ICT, Chemistry and Mathematics have been added to the library.",
    unread: true,
    date: "2026-07-12",
  },
  {
    id: "n-3",
    titleBn: "সপ্তাহিক ক্লাস রুটিন আপডেট হয়েছে",
    titleEn: "Weekly class schedule updated",
    descriptionBn: "পরবর্তী সপ্তাহের ক্লাস রুটিন নতুন সূচী অনুযায়ী আপডেট করা হয়েছে।",
    descriptionEn: "The weekly class schedule has been updated according to the new timetable.",
    unread: false,
    date: "2026-07-10",
  },
];

export async function GET() {
  return NextResponse.json({ notices });
}
