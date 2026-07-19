"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { demoCredentials } from "../../data/mockData";
import { setSessionUser, getUserHomeRoute } from "../../lib/auth";

export default function LoginPage() {
  const { t, locale, setLocale } = useLanguage();
  const router = useRouter();

  const [activeRole, setActiveRole] = useState<string>("admin");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [otpMode, setOtpMode] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Autofill fields when role changes
  useEffect(() => {
    const creds = demoCredentials[activeRole as keyof typeof demoCredentials];
    if (creds) {
      setUsername(creds.username);
      setPassword(creds.password);
    }
  }, [activeRole]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setLoginError(data.error || "Invalid credentials.");
        setIsLoading(false);
        return;
      }

      setSessionUser(data.user);
      router.push(getUserHomeRoute(data.user.role));
    } catch (error) {
      setLoginError("Unable to login at this time. Please try again.");
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleSendOTP = () => {
    setOtpSent(true);
  };

  const toggleLanguage = () => {
    setLocale(locale === "bn" ? "en" : "bn");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff]">
      {/* Top Navigation (Reduced version for Login) */}
      <nav className="w-full h-16 bg-[#ffffff] border-b border-[#c5c5d3] flex items-center px-6 sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00236f] rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
            <span className="text-2xl font-bold text-[#00236f]">AWSD College</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-sm text-[#00236f] font-bold px-4 py-2 hover:bg-[#e5eeff] transition-colors rounded-full"
            >
              {locale === "bn" ? "English" : "বাংলা"}
            </button>
            <a className="text-sm text-[#444651] hover:text-[#00236f] transition-colors" href="/">Home</a>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Background Atmospheric Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-[#1e3a8a] opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-80 h-80 bg-[#92f5a4] opacity-10 rounded-full blur-3xl"></div>

        <div className="w-full max-w-[480px] z-10 space-y-6">
          {/* Institutional Branding Header */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-[#00236f] mb-2">Login Portal</h1>
            <p className="text-sm text-[#444651] font-medium">আব্দুল ওয়াদুদ শাহ ডিগ্রি কলেজ এডুকেশন পোর্টাল</p>
          </div>

          {/* Login Card */}
          <div className="bg-[#ffffff] rounded-xl border border-[#c5c5d3] overflow-hidden shadow-xl">
            {/* Role Selection Tabs */}
            <div className="flex border-b border-[#c5c5d3] bg-[#eff4ff]">
              {(["admin", "teacher", "student", "guardian"] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setActiveRole(role);
                    setOtpMode(false);
                  }}
                  className={`flex-1 py-4 text-xs font-semibold text-[#444651] hover:bg-[#d8e3f6] transition-colors ${
                    activeRole === role ? "text-[#00236f] border-b-2 border-[#00236f] bg-white font-bold" : ""
                  }`}
                >
                  {t(role)}
                </button>
              ))}
            </div>

            <div className="p-8">
              <form className="space-y-6" onSubmit={handleLogin}>
                {loginError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 font-medium">
                    {loginError}
                  </div>
                )}

                {/* Identity Field */}
                {!otpMode ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#111c2a] mb-2">{t("username")}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <div className="flex items-center gap-1 pr-2 border-r border-[#c5c5d3]">
                            <div className="w-5 h-3.5 bg-red-600 relative overflow-hidden rounded-[1px]">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-2.5 h-2.5 bg-green-700 rounded-full"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <input
                          className="block w-full pl-16 pr-4 py-3 bg-white border border-[#c5c5d3] rounded-lg focus:ring-2 focus:ring-[#00236f] focus:border-[#00236f] transition-all text-sm"
                          placeholder="Enter identification or email"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          type="text"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-semibold text-[#111c2a]">{t("password")}</label>
                        <a className="text-xs text-[#00236f] hover:underline" href="#">{t("forgotPass")}</a>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#444651]">
                          <span className="material-symbols-outlined text-[20px]">lock</span>
                        </div>
                        <input
                          className="block w-full pl-10 pr-12 py-3 bg-white border border-[#c5c5d3] rounded-lg focus:ring-2 focus:ring-[#00236f] focus:border-[#00236f] transition-all text-sm"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          type={showPassword ? "text" : "password"}
                        />
                        <button
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#444651] hover:text-[#00236f]"
                          onClick={() => setShowPassword(!showPassword)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#111c2a] mb-2">{t("username")}</label>
                      <input
                        className="block w-full px-4 py-3 bg-white border border-[#c5c5d3] rounded-lg focus:ring-2 focus:ring-[#00236f] focus:border-[#00236f] transition-all text-sm"
                        placeholder="Enter registered phone number"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        type="text"
                      />
                    </div>
                    {otpSent ? (
                      <div>
                        <label className="block text-xs font-semibold text-[#111c2a] mb-2">ওটিপি কোড (OTP Code)</label>
                        <input
                          className="block w-full px-4 py-3 bg-white border border-[#c5c5d3] rounded-lg focus:ring-2 focus:ring-[#00236f] focus:border-[#00236f] transition-all text-sm"
                          placeholder="Enter 6-digit code"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          required
                          type="text"
                        />
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOTP}
                        className="w-full py-3 px-4 border border-[#c5c5d3] bg-white text-[#00236f] font-semibold rounded-lg hover:bg-[#eff4ff] transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">sms</span>
                        {t("getOTP")}
                      </button>
                    )}
                  </>
                )}

                {/* Primary Action Button */}
                <button
                  disabled={isLoading}
                  className="w-full py-4 px-4 bg-[#00236f] hover:bg-[#1e3a8a] text-white font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  type="submit"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                      Authenticating...
                    </>
                  ) : (
                    "Sign In to Dashboard"
                  )}
                </button>

                {/* Switch Modes */}
                <div className="flex items-center justify-between text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setOtpMode(!otpMode)}
                    className="text-[#006d30] hover:underline"
                  >
                    {otpMode ? "লগইন পাসওয়ার্ড দিয়ে (Password Mode)" : t("orLoginWith")}
                  </button>
                  <a className="text-[#00236f] hover:underline" href="#">New Admission? Register</a>
                </div>
              </form>
            </div>
          </div>

          {/* Autofill Demo Credentials Helper */}
          <div className="border-dashed border-2 border-[#006d30]/30 bg-green-50/50 rounded-xl p-4 space-y-2">
            <h4 className="text-xs font-bold text-[#006d30] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span>{t("autoFill")}</span>
            </h4>
            <p className="text-[10px] text-[#444651] leading-relaxed">
              রোল নির্বাচন করলে ইমেইল ও পাসওয়ার্ড অটোফিল হবে। ড্যাশবোর্ড স্ক্রিনসমূহ পরীক্ষার জন্য সরাসরি <b>Sign In to Dashboard</b> বাটনে ক্লিক করুন।
            </p>
            <div className="text-[9px] text-[#444651]/80 font-medium grid grid-cols-2 gap-x-2 gap-y-1 pt-1 border-t border-slate-100">
              <div><b>Admin:</b> admin@awsdc.edu.bd</div>
              <div><b>Teacher:</b> teacher@awsdc.edu.bd</div>
              <div><b>Student:</b> arif.rahman@student.awsdc.edu.bd</div>
              <div><b>Guardian:</b> guardian@awsdc.edu.bd</div>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="bg-[#d8e3f6] border-t border-[#c5c5d3] py-8 px-6 mt-auto">
        <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl text-[#00236f] font-bold">AWSD College</span>
            <p className="text-xs text-[#444651] mt-1">© 2026 Abdul Wadud Shah Degree College. All Rights Reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold uppercase text-[#444651]">
            <a className="hover:text-[#00236f] transition-colors" href="#">Contact Us</a>
            <a className="hover:text-[#00236f] transition-colors" href="#">EIIN: 123456</a>
            <a className="hover:text-[#00236f] transition-colors" href="#">Govt Board</a>
            <a className="hover:text-[#00236f] transition-colors" href="#">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
