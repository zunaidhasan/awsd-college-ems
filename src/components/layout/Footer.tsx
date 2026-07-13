"use client";

import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { MapPin, Phone, Mail, Globe, ExternalLink, Smartphone } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  const govtLinks = [
    { label: "Ministry of Education", url: "http://www.moedu.gov.bd" },
    { label: "DSHE", url: "http://www.dshe.gov.bd" },
    { label: "Rajshahi Education Board", url: "http://www.rajshahieducationboard.gov.bd" },
    { label: "National University", url: "http://www.nu.ac.bd" },
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Info */}
          <div>
            <h3 className="text-white font-extrabold text-base mb-3">
              {t("collegeName")}
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              {t("collegeTagline")}
            </p>
            <div className="text-xs space-y-1 bg-slate-950/20 p-3 rounded border border-slate-800/40">
              <p className="text-slate-350"><span className="font-semibold text-white">EIIN:</span> 115429</p>
              <p className="text-slate-350"><span className="font-semibold text-white">Established:</span> 23 June 1994</p>
            </div>
          </div>

          {/* Column 2: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3">যোগাযোগ (Contact Details)</h3>
            <ul className="space-y-2.5 text-xs md:text-sm">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                <span>Damurhuda, Chuadanga</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-blue-500 flex-shrink-0" />
                <span>Tel: 07623-56022</span>
              </li>
              <li className="flex items-center space-x-2">
                <Smartphone size={16} className="text-blue-500 flex-shrink-0" />
                <span>Mob: 01718-119853</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-500 flex-shrink-0" />
                <a href="mailto:aosdcollege@yahoo.com" className="hover:underline">aosdcollege@yahoo.com</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Government Boards */}
          <div>
            <h3 className="text-white font-bold text-sm mb-3">গুরুত্বপূর্ণ লিংক (Govt Links)</h3>
            <ul className="space-y-1.5 text-sm">
              {govtLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 hover:text-white hover:underline transition-colors"
                  >
                    <ExternalLink size={12} className="text-slate-500" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Official Institute Info Grid */}
        <div className="mt-10 pt-8 border-t border-slate-800">
          <h4 className="text-white font-extrabold text-sm mb-4 tracking-wide uppercase text-slate-300">
            প্রতিষ্ঠানের মৌলিক তথ্য (Official Institute Info - 2026)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-[11px]">
            <div className="space-y-1 bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block">ইআইআইএন (EIIN)</span>
              <span className="text-slate-200 font-bold">115429</span>
            </div>
            <div className="space-y-1 bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block">এমপিও কোড (MPO)</span>
              <span className="text-slate-200 font-bold">6203013201</span>
            </div>
            <div className="space-y-1 bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block">প্রতিষ্ঠানের ধরন</span>
              <span className="text-slate-200 font-bold">Degree College (Non-Govt.)</span>
            </div>
            <div className="space-y-1 bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block">প্রতিষ্ঠার তারিখ</span>
              <span className="text-slate-200 font-bold">23/06/1994</span>
            </div>
            <div className="space-y-1 bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block">ব্যবস্থাপনা</span>
              <span className="text-slate-200 font-bold">Non-Government (এমপিওভুক্ত)</span>
            </div>
            <div className="space-y-1 bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block">স্বীকৃতি স্তর</span>
              <span className="text-slate-200 font-bold">HSC, Degree, Honours</span>
            </div>
            <div className="space-y-1 bg-slate-950/40 p-2.5 rounded border border-slate-800/60 col-span-2">
              <span className="text-slate-500 block">গ্রুপ সমূহ (Groups)</span>
              <span className="text-slate-200 font-bold">Humanities, Science, Business Studies, HSC (Vocational)</span>
            </div>
            <div className="space-y-1 bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block">সহশিক্ষা / শিফট</span>
              <span className="text-slate-200 font-bold">একত্রে (Co-education) / Shift: 1</span>
            </div>
            <div className="space-y-1 bg-slate-950/40 p-2.5 rounded border border-slate-800/60">
              <span className="text-slate-500 block">অবস্থান</span>
              <span className="text-slate-200 font-bold">Grameen (Plain Land)</span>
            </div>
            <div className="space-y-1 bg-slate-950/40 p-2.5 rounded border border-slate-800/60 col-span-2">
              <span className="text-slate-500 block">ঠিকানা (Address)</span>
              <span className="text-slate-200 font-bold">Damurhuda / Hawlee, Damurhuda, Chuadanga, Khulna</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {currentYear} {t("collegeName")}. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center space-x-1">
            <Globe size={12} />
            <span>Designed for Ministry of Education, BD</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
