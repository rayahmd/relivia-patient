// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.6 3 24 3 16.3 3 9.7 7.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 45c5.5 0 10.5-2.1 14.2-5.6l-6.6-5.6C29.5 35.5 26.9 36 24 36c-5.3 0-9.7-3.3-11.3-7.9l-6.6 5.1C9.6 40.6 16.3 45 24 45z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.7l6.6 5.6C40.9 36.6 44 30.8 44 24c0-1.4-.1-2.7-.4-3.5z" />
    </svg>
  );
}

type Tab = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const supabase = createClient();

    if (tab === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        setError(
          error.message === "Invalid login credentials"
            ? "Email atau kata sandi salah."
            : error.message
        );
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      setLoading(false);
      if (error) {
        setError(error.message);
        return;
      }
      setMessage("Cek emailmu untuk konfirmasi akun sebelum masuk.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background */}
      <img
        src="/image.gif"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />
      {/* Dim overlay biar glass panel tetap kontras di atas background terang/gelap apa pun */}
      <div className="absolute inset-0 bg-black/25 -z-10" />

      {/* Liquid glass panel */}
      <div className="relative max-w-sm w-full rounded-[2rem] bg-white/10 backdrop-blur-2xl border border-white/25 shadow-[0_8px_40px_rgba(0,0,0,0.35)] p-8">
        {/* highlight halus di tepi atas, ciri khas glass */}
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/15 to-transparent" />

        <div className="relative">
          <h1 className="text-2xl font-bold text-white mb-1 text-center drop-shadow-sm">
            Selamat datang di Relivia
          </h1>
          <p className="text-sm text-white/70 mb-8 text-center">
            Mulai dokumentasikan perjalananmu dengan tenang.
          </p>

          {/* Tab switcher */}
          <div className="flex rounded-full bg-white/10 backdrop-blur-md border border-white/20 p-1 mb-6">
            {(["login", "register"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setError("");
                  setMessage("");
                }}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${tab === t
                    ? "bg-purple-500 text-ink shadow-sm"
                    : "text-white/70 hover:text-white"
                  }`}
              >
                {t === "login" ? "Masuk" : "Daftar"}
              </button>
            ))}
          </div>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {tab === "register" && (
              <div>
                <label className="text-sm font-medium text-white/85 mb-1.5 block">
                  Nama lengkap
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama kamu"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 text-white placeholder:text-white/40 outline-none focus:border-white/60 focus:bg-white/15 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-white/85 mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 text-white placeholder:text-white/40 outline-none focus:border-white/60 focus:bg-white/15 transition-colors"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-white/85 mb-1.5 block">
                Kata sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full px-4 py-2.5 pr-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/25 text-white placeholder:text-white/40 outline-none focus:border-white/60 focus:bg-white/15 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-200 bg-red-500/20 border border-red-400/30 rounded-xl px-3 py-2">
                {error}
              </p>
            )}
            {message && (
              <p className="text-sm text-emerald-100 bg-emerald-500/20 border border-emerald-400/30 rounded-xl px-3 py-2">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium text-white bg-purple-500 hover:bg-purple-600 disabled:opacity-60 transition-colors shadow-lg"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {tab === "login" ? "Masuk" : "Buat Akun"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/20" />
            <span className="text-xs text-white/50">atau</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-medium text-black bg-white/90 backdrop-blur-md hover:bg-white transition-colors shadow-lg"
          >
            <GoogleIcon />
            Masuk Dengan Google
          </button>
        </div>
      </div>
    </div>
  );
}