import { NextResponse } from "next/server";

const testimonials = [
  {
    id: "t-1",
    nameBn: "মো: সাফিকুর রহমান",
    nameEn: "Md. Safiqur Rahman",
    classBn: "দ্বাদশ শ্রেণী (বিজ্ঞান)",
    classEn: "Class 12 (Science)",
    quoteBn: "এই কলেজের জিপিএ উন্নতি ও অনলাইন ফলাফল সিস্টেম আমার পাঠাভাবকে আরো সংগঠিত করেছে।",
    quoteEn: "The college improved my GPA and the online results system made my study routine much more organized.",
    photoLabel: "SR",
  },
  {
    id: "t-2",
    nameBn: "রোমানা আক্তার",
    nameEn: "Romana Akter",
    classBn: "একাদশ শ্রেণী (ব্যবসায় শিক্ষা)",
    classEn: "Class 11 (Business Studies)",
    quoteBn: "শিক্ষকরা প্রতিদিন সহায়তা করে এবং কলেজের পরিবেশটি সম্পূর্ণ নিরাপদ ও উত্সাহব্যঞ্জক।",
    quoteEn: "The teachers support me every day and the campus feels safe and inspiring.",
    photoLabel: "RA",
  },
  {
    id: "t-3",
    nameBn: "সুলতানা ইয়াসমিন",
    nameEn: "Sultana Yasmin",
    classBn: "দ্বাদশ শ্রেণী (মানবিক)",
    classEn: "Class 12 (Humanities)",
    quoteBn: "কলেজে অ্যাকাডেমিক সেবা ও অনলাইন ভর্তি প্রক্রিয়া খুবই সহায়ক হয়েছে।",
    quoteEn: "The academic support and online admission process at college have been very helpful.",
    photoLabel: "SY",
  },
  {
    id: "t-4",
    nameBn: "নাঈম আহমেদ",
    nameEn: "Naeem Ahmed",
    classBn: "একাদশ শ্রেণী (বিজ্ঞান)",
    classEn: "Class 11 (Science)",
    quoteBn: "এই প্ল্যাটফর্মের মাধ্যমে আমার টিউশন ও পরীক্ষার প্রস্তুতি অনেক সহজ হয়েছে।",
    quoteEn: "This platform has made my tuition and exam preparation much easier.",
    photoLabel: "NA",
  },
];

export async function GET() {
  return NextResponse.json({ testimonials });
}
