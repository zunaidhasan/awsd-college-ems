"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/Tabs";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { demoCredentials } from "../../data/mockData";
import { setSessionUser, getUserHomeRoute } from "../../lib/auth";
import { ShieldAlert, KeyRound, Smartphone } from "lucide-react";
import { Footer } from "../../components/layout/Footer";

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const [activeRole, setActiveRole] = useState<string>("admin");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otpMode, setOtpMode] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

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
        return;
      }

      setSessionUser(data.user);
      router.push(getUserHomeRoute(data.user.role));
    } catch (error) {
      setLoginError("Unable to login at this time. Please try again.");
      console.error(error);
    }
  };

  const handleSendOTP = () => {
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <Card className="shadow-xl border-slate-200 dark:border-slate-800">
            <CardHeader className="text-center bg-gradient-to-r from-brand-primary/5 to-transparent py-6">
              <CardTitle className="text-xl font-extrabold text-brand-primary dark:text-white">
                {t("loginTitle")}
              </CardTitle>
              <p className="text-xs text-gray-500 font-semibold mt-1">
                {t("loginSubtitle")}
              </p>
            </CardHeader>
            <CardContent className="pt-6">
              
              {/* Role selection tab */}
              <Tabs value={activeRole} onValueChange={setActiveRole}>
                <TabsList className="grid grid-cols-4 gap-1">
                  <TabsTrigger value="admin">{t("admin")}</TabsTrigger>
                  <TabsTrigger value="teacher">{t("teacher")}</TabsTrigger>
                  <TabsTrigger value="student">{t("student")}</TabsTrigger>
                  <TabsTrigger value="guardian">{t("guardian")}</TabsTrigger>
                </TabsList>

                {/* Form */}
                <form onSubmit={handleLogin} className="mt-6 space-y-4">
                  {!otpMode ? (
                    <>
                      <Input
                        label={t("username")}
                        type="text"
                        placeholder="Enter email or phone"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        id="username-field"
                      />
                      <Input
                        label={t("password")}
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        id="password-field"
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        label={t("username")}
                        type="text"
                        placeholder="Enter registered phone number"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        id="otp-phone-field"
                      />
                      {otpSent ? (
                        <Input
                          label="ওটিপি কোড (OTP Code)"
                          type="text"
                          placeholder="Enter 6-digit code"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          required
                          id="otp-code-field"
                        />
                      ) : (
                        <div className="pt-2">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={handleSendOTP}
                            fullWidth
                            size="sm"
                          >
                            <Smartphone size={14} className="mr-1.5" />
                            {t("getOTP")}
                          </Button>
                        </div>
                      )}
                    </>
                  )}

                  {/* Actions & Toggles */}
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setOtpMode(!otpMode)}
                      className="text-brand-secondary hover:underline"
                    >
                      {otpMode ? "লগইন পাসওয়ার্ড দিয়ে (Password Mode)" : t("orLoginWith")}
                    </button>
                    <a href="#" className="text-gray-500 hover:underline">
                      {t("forgotPass")}
                    </a>
                  </div>

                  {loginError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {loginError}
                </div>
              ) : null}
              <Button type="submit" variant="primary" fullWidth className="py-2.5 mt-2 font-bold shadow-md shadow-brand-primary/10">
                <KeyRound size={16} className="mr-2" />
                {t("loginBtn")}
              </Button>
            </form>
          </Tabs>
            </CardContent>
          </Card>

          {/* Credential Helper Drawer Card */}
          <Card className="border-dashed border-2 border-brand-secondary/30 bg-green-50/50 dark:bg-slate-900/50">
            <CardContent className="py-4 space-y-2">
              <h4 className="text-xs font-extrabold text-brand-secondary dark:text-green-400 flex items-center space-x-1">
                <ShieldAlert size={14} />
                <span>{t("autoFill")}</span>
              </h4>
              <p className="text-[10px] text-gray-500 leading-snug">
                রোল নির্বাচন করলে ইমেইল ও পাসওয়ার্ড অটোফিল হবে। ড্যাশবোর্ড স্ক্রিনসমূহ পরীক্ষার জন্য সরাসরি <b>{t("loginBtn")}</b> বাটনে ক্লিক করুন।
              </p>
              <div className="text-[9px] text-slate-500 font-medium grid grid-cols-2 gap-x-2 gap-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div><b>Admin:</b> admin@awsdc.edu.bd</div>
                <div><b>Teacher:</b> teacher@awsdc.edu.bd</div>
                <div><b>Student:</b> arif.rahman@student.awsdc.edu.bd</div>
                <div><b>Guardian:</b> guardian@awsdc.edu.bd</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
