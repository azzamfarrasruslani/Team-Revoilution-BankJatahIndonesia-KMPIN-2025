"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import InputField from "@/components/form/InputField";
import TextAreaField from "@/components/form/TextAreaField";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    alamat: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          nama: form.nama,
          no_hp: form.no_hp,
          alamat: form.alamat,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Left side - gambar */}
        <div className="hidden md:flex relative">
          <img
            src="/images/login.jpeg"
            alt="Ilustrasi Register"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-3xl font-bold text-white drop-shadow-sm mb-2">
              Selamat Datang!
            </h2>
            <p className="text-sm text-white max-w-xs drop-shadow-sm">
              Bergabung dengan program Bank Minyak Jelantah untuk mendukung lingkungan yang lebih bersih.
            </p>
          </div>
        </div>

        {/* Right side - form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-[#FB6B00] mb-2 text-center md:text-left">Daftar Peserta</h1>
          <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
            Masukkan data diri Anda untuk mengikuti program Bank Jatah Indonesia.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Nama Lengkap"
              name="nama"
              placeholder="Masukkan nama Anda"
              value={form.nama}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={handleChange}
            />
            <InputField
              label="No. HP"
              name="no_hp"
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={form.no_hp}
              onChange={handleChange}
            />
            <TextAreaField
              label="Alamat Lengkap"
              name="alamat"
              placeholder="Tulis alamat lengkap di sini"
              value={form.alamat}
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
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6 md:text-left">
            Sudah punya akun?{" "}
            <a
              href="/auth/login"
              className="text-[#FB6B00] font-medium hover:underline"
            >
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
