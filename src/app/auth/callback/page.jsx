"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Saat auth state berubah (login selesai, refresh token, dsb)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // ✅ Cek apakah user terdaftar di tabel users
        const { data: existingUser } = await supabase
          .from("users")
          .select("id, role")
          .eq("id", session.user.id)
          .maybeSingle();

        if (!existingUser) {
          await supabase.auth.signOut();
          router.replace("/auth/login?error=unregistered");
        } else {
          router.replace("/dashboard");
        }
      } else if (event === "SIGNED_OUT") {
        router.replace("/auth/login");
      }
    });

    // 🔄 Backup check (untuk memastikan tidak macet di loading)
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) return; // tunggu listener
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center  text-gray-700">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent mb-4"></div>
      <p>Memproses login...</p>
    </div>
  );
}
