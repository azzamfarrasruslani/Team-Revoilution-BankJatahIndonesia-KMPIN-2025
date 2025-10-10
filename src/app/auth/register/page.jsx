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
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100">
      <div className="w-full max-w-6xl grid md:grid-cols-2 bg-white/70 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-orange-100">

        {/* Kiri - Gambar Hero */}
        <div className="hidden md:flex relative">
          <img
            src="/images/login.jpeg"
            alt="Ilustrasi Register"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end items-center text-center pb-10 px-6">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
              Bergabung Sekarang!
            </h2>
            <p className="text-sm text-white/90 max-w-sm">
              Jadilah bagian dari perubahan — bantu kelola minyak jelantah menjadi energi ramah lingkungan.
            </p>
          </div>
        </div>

        {/* Kanan - Form Register */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-12 bg-white">
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-bold text-[#FB6B00]">
              Daftar Akun Baru
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Isi data Anda untuk bergabung dalam program Bank Jatah Indonesia.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {error && (
              <p className="text-sm text-red-600 text-center md:text-left">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FB6B00] hover:bg-orange-600 text-white font-semibold py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              {loading ? "Memproses..." : "Daftar Sekarang"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-8">
            Sudah punya akun?{" "}
            <a
              href="/auth/login"
              className="text-[#FB6B00] font-semibold hover:underline"
            >
              Masuk di sini
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
