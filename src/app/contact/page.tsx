"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import { Footer } from "../../components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  MapPin,
  Phone,
  Smartphone,
  Mail,
  Clock,
  Globe,
  ChevronLeft,
  Send,
  Building2,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: MapPin,
      labelBn: "ঠিকানা",
      labelEn: "Address",
      valueBn: "দামুড়হুদা / হাউলী, দামুড়হুদা, চুয়াডাঙ্গা, খুলনা বিভাগ, বাংলাদেশ",
      valueEn: "Damurhuda / Hawlee, Damurhuda, Chuadanga, Khulna Division, Bangladesh",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: Phone,
      labelBn: "ফোন",
      labelEn: "Phone",
      valueBn: "০৭৬২৩-৫৬০২২",
      valueEn: "07623-56022",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
    },
    {
      icon: Smartphone,
      labelBn: "মোবাইল",
      labelEn: "Mobile",
      valueBn: "০১৭১৮-১১৯৮৫৩",
      valueEn: "01718-119853",
      color: "text-teal-600",
      bg: "bg-teal-50 dark:bg-teal-950/30",
    },
    {
      icon: Mail,
      labelBn: "ইমেইল",
      labelEn: "Email",
      valueBn: "aosdcollege@yahoo.com",
      valueEn: "aosdcollege@yahoo.com",
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      isLink: true,
    },
    {
      icon: Globe,
      labelBn: "ওয়েবসাইট",
      labelEn: "Website",
      valueBn: "awsdcollege.edu.bd",
      valueEn: "awsdcollege.edu.bd",
      color: "text-indigo-600",
      bg: "bg-indigo-50 dark:bg-indigo-950/30",
      isLink: true,
    },
    {
      icon: Clock,
      labelBn: "অফিস সময়",
      labelEn: "Office Hours",
      valueBn: "সকাল ৯:০০ - বিকাল ৫:০০ (রবি-বৃহঃ)",
      valueEn: "9:00 AM - 5:00 PM (Sun-Thu)",
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-950 to-teal-900 text-white py-20 md:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <Link href="/" className="inline-flex items-center space-x-1 text-xs font-bold text-blue-300 hover:text-white transition-colors mb-4">
            <ChevronLeft size={14} />
            <span>{t("home")}</span>
          </Link>
          <div className="inline-flex items-center space-x-2 bg-teal-500/20 text-teal-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-teal-500/30">
            <MessageSquare size={14} />
            <span>{t("contactUs")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">{t("contactUs")}</h1>
          <p className="text-blue-200 text-sm md:text-base max-w-xl mx-auto">
            {language === "bn"
              ? "আমাদের সাথে যোগাযোগ করুন। যেকোনো তথ্যের জন্য নিচের মাধ্যমে যোগাযোগ করতে পারেন।"
              : "Get in touch with us. Reach out through any of the channels below for information."}
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <Card key={idx} className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-5 flex items-start space-x-4">
                  <div className={`w-11 h-11 rounded-xl ${info.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={info.color} />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      {language === "bn" ? info.labelBn : info.labelEn}
                    </p>
                    {info.isLink ? (
                      <a
                        href={info.labelEn === "Email" ? `mailto:${info.valueEn}` : `https://${info.valueEn}`}
                        className="text-xs font-bold text-gray-800 dark:text-white hover:text-brand-primary transition-colors"
                      >
                        {language === "bn" ? info.valueBn : info.valueEn}
                      </a>
                    ) : (
                      <p className="text-xs font-bold text-gray-800 dark:text-white mt-0.5">
                        {language === "bn" ? info.valueBn : info.valueEn}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Map + Form */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Google Map Placeholder */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                <MapPin size={20} className="text-brand-primary" />
              </div>
              <h2 className="text-xl font-extrabold text-brand-primary dark:text-white">{t("contactMap")}</h2>
            </div>
            <Card className="overflow-hidden">
              <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29210.07!2d88.85!3d23.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f9a1e3a2d93a5b%3A0xf8cc5de0e7e9d6e2!2sDamurhuda!5e0!3m2!1sen!2sbd!4v1689300000000!5m2!1sen!2sbd"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="College Location Map"
                />
              </div>
            </Card>
            <div className="flex items-start space-x-2 text-xs text-gray-500 dark:text-gray-400 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
              <Building2 size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p>
                {language === "bn"
                  ? "দামুড়হুদা / হাউলী, দামুড়হুদা উপজেলা, চুয়াডাঙ্গা জেলা, খুলনা বিভাগ, বাংলাদেশ"
                  : "Damurhuda / Hawlee, Damurhuda Upazila, Chuadanga District, Khulna Division, Bangladesh"}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center">
                <Send size={20} className="text-teal-600" />
              </div>
              <h2 className="text-xl font-extrabold text-brand-primary dark:text-white">{t("contactForm")}</h2>
            </div>
            <Card>
              <CardContent className="p-6">
                {submitted && (
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 text-xs font-bold rounded-lg border border-green-200 dark:border-green-900">
                    {language === "bn" ? "✅ আপনার বার্তা সফলভাবে পাঠানো হয়েছে!" : "✅ Your message has been sent successfully!"}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-1">
                  <Input
                    label={language === "bn" ? "আপনার নাম *" : "Your Name *"}
                    placeholder={language === "bn" ? "পুরো নাম লিখুন" : "Enter full name"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    label={language === "bn" ? "মোবাইল নম্বর *" : "Phone Number *"}
                    placeholder={language === "bn" ? "০১৭XX-XXXXXX" : "017XX-XXXXXX"}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <Input
                    label={language === "bn" ? "ইমেইল (ঐচ্ছিক)" : "Email (Optional)"}
                    placeholder={language === "bn" ? "example@mail.com" : "example@mail.com"}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <div className="w-full mb-4">
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      {language === "bn" ? "আপনার বার্তা *" : "Your Message *"}
                    </label>
                    <textarea
                      className="w-full px-3.5 py-2.5 border rounded-lg text-sm bg-transparent outline-none transition-all focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary border-gray-300 dark:border-slate-700 text-gray-900 dark:text-slate-100 min-h-[120px] resize-y"
                      placeholder={language === "bn" ? "আপনার বার্তা লিখুন..." : "Write your message here..."}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" variant="primary" fullWidth className="py-3 font-bold">
                    <Send size={14} className="mr-2" />
                    {t("contactSend")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
