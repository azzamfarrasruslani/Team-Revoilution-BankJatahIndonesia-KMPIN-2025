"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FiX } from "react-icons/fi";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // 🔍 Deteksi error dari query param
  useEffect(() => {
    if (searchParams.get("error") === "unregistered") {
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
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
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error("Google login error:", error.message);
  };

  return (
    <div className="min-w-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4">
      {/* 🔔 POPUP DIALOG */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="sm:max-w-sm rounded-2xl shadow-xl border border-orange-100">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <FiX size={20} />
          </button>
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Akun Belum Terdaftar
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Akun Google Anda belum terdaftar di sistem.  
              Silakan daftar manual terlebih dahulu.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button
              className="bg-[#FB6B00] hover:bg-orange-600 text-white"
              onClick={() => {
                setShowPopup(false);
                router.replace("/auth/register");
              }}
            >
              Daftar Sekarang
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* MAIN CARD */}
      <Card className="w-full max-w-5xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white border border-orange-100">
        {/* LEFT SIDE (IMAGE) */}
        <div className="hidden md:flex relative">
          <img
            src="/images/login.jpeg"
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Tukar Minyak, Selamatkan Bumi!
            </h2>
            <p className="text-sm text-gray-200 max-w-xs">
              Login untuk mulai menyetor minyak jelantah dan dukung lingkungan lebih bersih.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-[#FB6B00] text-3xl font-bold">
              Selamat Datang 👋
            </CardTitle>
            <CardDescription className="text-gray-600">
              Masuk ke akun Anda untuk mengelola transaksi minyak jelantah.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="rounded-xl border-gray-300 focus:ring-[#FB6B00]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="rounded-xl border-gray-300 focus:ring-[#FB6B00]"
                />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FB6B00] hover:bg-orange-600 text-white rounded-xl py-2 text-base"
              >
                {loading ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <Separator className="flex-1" />
              <span className="text-gray-400 text-sm">atau</span>
              <Separator className="flex-1" />
            </div>

            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-3 border-gray-300 hover:bg-gray-50 rounded-xl py-2 text-base"
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={22} />
              <span>Masuk dengan Google</span>
            </Button>

            <p className="text-sm text-center text-gray-500 mt-6">
              Belum punya akun?{" "}
              <a
                href="/auth/register"
                className="text-[#FB6B00] font-semibold hover:underline"
              >
                Daftar Sekarang
              </a>
            </p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
