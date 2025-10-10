"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
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

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // 🔑 Login email/password
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

  // 🔑 Login Google → redirect ke /auth/callback
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) console.error(error.message);
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 p-4">
      <Card className="w-full max-w-5xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white border border-orange-100">
        {/* LEFT IMAGE */}
        <div className="hidden md:flex relative">
          <img
            src="/images/login.jpeg"
            alt="Login"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Tukar Minyak, Selamatkan Bumi!
            </h2>
            <p className="text-sm text-gray-200 max-w-xs">
              Login untuk mulai menyetor minyak jelantah dan dukung lingkungan
              lebih bersih.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-[#FB6B00] text-3xl font-bold">
              Selamat Datang 👋
            </CardTitle>
            <CardDescription className="text-gray-600">
              Masuk ke akun Anda untuk mengelola transaksi minyak jelantah.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 p-0">
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
              <FcGoogle size={22} /> Masuk dengan Google
            </Button>

            {/* Tambahkan di bawah tombol login & tombol Google */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Belum punya akun?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/auth/register")}
                  className="text-[#FB6B00] font-medium hover:underline"
                >
                  Daftar di sini
                </button>
              </p>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
