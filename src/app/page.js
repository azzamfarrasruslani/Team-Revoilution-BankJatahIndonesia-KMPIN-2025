"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Proses autentikasi bisa ditambahkan di sini
    console.log("Login:", { email, password });
    router.push("/dashboard"); // Redirect ke dashboard
  };

  const handleGoogleLogin = () => {
    console.log("Login dengan Google");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Kiri - Gambar & Slogan */}
        <div className="relative bg-[#FB6B00]/10 p-6 flex items-center justify-center">
          <div className="text-center space-y-6">
            <Image
              src="/images/login.jpeg"
              alt="Ilustrasi Login"
              width={400}
              height={400}
              className="rounded-xl mx-auto drop-shadow"
              priority
            />
            <h2 className="text-2xl font-bold text-[#FB6B00]">
              Tukar Minyak, Selamatkan Bumi!
            </h2>
            <p className="text-sm text-gray-600 max-w-xs mx-auto">
              Login untuk menyetor minyak dan mendukung lingkungan yang lebih baik.
            </p>
          </div>
        </div>

        {/* Kanan - Form Login */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl font-bold text-[#FB6B00]">
              Masuk ke Akun Anda
            </h1>
            <p className="text-sm text-gray-600">
              Silakan login untuk melanjutkan transaksi minyak jelantah Anda.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center gap-2 mt-1 px-3 py-2 border rounded-md bg-white focus-within:ring-2 focus-within:ring-[#FB6B00]">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm text-gray-800 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center gap-2 mt-1 px-3 py-2 border rounded-md bg-white focus-within:ring-2 focus-within:ring-[#FB6B00]">
                <Lock size={18} className="text-gray-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm text-gray-800 outline-none"
                />
              </div>
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-[#FB6B00] hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-all"
            >
              Masuk
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

          {/* Link ke Daftar */}
          <p className="text-sm text-center text-gray-500 mt-6">
            Belum punya akun?{" "}
            <a href="/daftar" className="text-[#FB6B00] font-medium hover:underline">
              Daftar sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
