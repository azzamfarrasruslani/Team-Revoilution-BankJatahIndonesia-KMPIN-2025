"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabaseClient";
import InputField from "@/components/form/InputField";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError("Email atau password salah.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) console.error("Google login error:", error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left side - subtle image with overlay */}
        <div className="hidden md:flex relative">
          <img
            src="/images/login.jpeg"
            alt="Ilustrasi Login"
            className="object-cover w-full h-full"
          />
          {/* Overlay gelap */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Text di atas overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-3xl font-bold text-white drop-shadow-sm mb-2">
              Tukar Minyak, Selamatkan Bumi!
            </h2>
            <p className="text-sm text-white max-w-xs drop-shadow-sm">
              Login untuk menyetor minyak dan mendukung lingkungan yang lebih
              baik.
            </p>
          </div>
        </div>

        {/* Right side - form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-[#FB6B00] mb-2 text-center md:text-left">
            Masuk ke Akun Anda
          </h1>
          <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
            Silakan login untuk melanjutkan transaksi minyak jelantah Anda.
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
            />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FB6B00] hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-all"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-gray-300 flex-1" />
            <span className="text-sm text-gray-500">atau</span>
            <div className="h-px bg-gray-300 flex-1" />
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 hover:bg-gray-100 py-2.5 rounded-lg flex items-center justify-center gap-3 transition"
          >
            <FcGoogle size={20} />
            <span className="text-sm font-medium text-gray-700">
              Masuk dengan Google
            </span>
          </button>

          <p className="text-sm text-center text-gray-500 mt-6">
            Belum punya akun?{" "}
            <a
              href="/auth/register"
              className="text-[#FB6B00] font-medium hover:underline"
            >
              Daftar sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
