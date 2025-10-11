"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

// Reusable InputWithLabel
function InputWithLabel({ label, value, onChange, type = "text", readOnly = false }) {
  return (
    <div className="flex flex-col">
      <Label>{label}</Label>
      <Input type={type} value={value || ""} onChange={onChange} readOnly={readOnly} />
    </div>
  );
}

// Fungsi sederhana untuk mengecek kekuatan password
function checkPasswordStrength(password) {
  if (password.length < 6) return "Lemah";
  if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8)
    return "Kuat";
  return "Sedang";
}

// Register Form
function RegisterForm({ onSuccess }) {
  const router = useRouter();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    no_hp: "",
    alamat: "",
    password: "",
    confirmPassword: "",
    role: "pelanggan",
  });
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });

  const handleChange = (key) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key === "password") setPasswordStrength(checkPasswordStrength(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setAlert({ type: "error", message: "Password dan konfirmasi password tidak cocok!" });
      return;
    }

    setLoading(true);
    try {
      // Generate QR ID di client saat submit
      const qr_code_id = crypto.randomUUID();

      // Sign up user di Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        setAlert({ type: "error", message: authError.message });
        setLoading(false);
        return;
      }

      const userId = authData.user.id;

      // Insert ke tabel users
      const { error: userError } = await supabase.from("users").insert([
        {
          id: userId,
          nama: form.nama,
          email: form.email,
          no_hp: form.no_hp,
          alamat: form.alamat,
          role: form.role,
          qr_code_id,
          poin: 0,
          status: "aktif",
        },
      ]);

      if (userError) throw userError;

      setAlert({ type: "success", message: "Registrasi berhasil! Silakan login." });
      onSuccess && onSuccess(authData.user);
    } catch (err) {
      setAlert({ type: "error", message: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Auto-clear alert setelah 5 detik
  useEffect(() => {
    if (alert.message) {
      const timer = setTimeout(() => setAlert({ type: "", message: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-2xl">
      {alert.message && (
        <Alert variant={alert.type === "error" ? "destructive" : "default"} className="mb-4">
          {alert.type === "error" ? <AlertCircleIcon /> : <CheckCircle2Icon />}
          <AlertTitle>{alert.type === "error" ? "Terjadi Kesalahan" : "Sukses"}</AlertTitle>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWithLabel label="Nama" value={form.nama} onChange={handleChange("nama")} />
        <InputWithLabel label="Email" type="email" value={form.email} onChange={handleChange("email")} />
      </div>

      <InputWithLabel label="No HP" value={form.no_hp} onChange={handleChange("no_hp")} />
      <InputWithLabel label="Alamat" value={form.alamat} onChange={handleChange("alamat")} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <InputWithLabel label="Password" type="password" value={form.password} onChange={handleChange("password")} />
          {form.password && (
            <p
              className={`text-sm font-medium mt-1 ${
                passwordStrength === "Kuat" ? "text-green-600" : passwordStrength === "Sedang" ? "text-yellow-500" : "text-red-600"
              }`}
            >
              Kekuatan Password: {passwordStrength}
            </p>
          )}
        </div>
        <InputWithLabel
          label="Konfirmasi Password"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange("confirmPassword")}
        />
      </div>

      <Button type="submit" disabled={loading} className="mt-4">
        {loading ? "Mendaftar..." : "Register"}
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-500">
          Sudah punya akun?{" "}
          <button type="button" onClick={() => router.push("/auth/login")} className="text-[#FB6B00] font-medium hover:underline">
            Masuk di sini
          </button>
        </p>
      </div>
    </form>
  );
}

// Halaman RegisterPage lengkap
export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-orange-50 p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white border border-orange-100">
        {/* Gambar kiri */}
        <div className="hidden md:flex relative">
          <img src="/images/register.jpeg" alt="Register" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-10">
            <h2 className="text-3xl font-bold text-white mb-2">Bergabunglah dengan Kami!</h2>
            <p className="text-sm text-gray-200 max-w-xs">
              Daftar untuk mulai menyetor minyak jelantah dan dukung lingkungan lebih bersih.
            </p>
          </div>
        </div>

        {/* Form kanan */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-[#FB6B00] mb-2">Buat Akun Baru 👋</h1>
            <p className="text-gray-600 md:text-base">
              Daftar sekarang untuk mulai menyetor minyak jelantah dan dukung lingkungan lebih bersih.
            </p>
          </div>

          <RegisterForm onSuccess={() => router.push("/auth/login")} />
        </div>
      </div>
    </div>
  );
}
