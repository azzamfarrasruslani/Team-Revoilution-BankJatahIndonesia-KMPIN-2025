"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userId = session.user.id;

        // Cek user di tabel users
        const { data: existingUser } = await supabase
          .from("users")
          .select("id, role")
          .eq("id", userId)
          .maybeSingle();

        if (!existingUser) {
          // User baru → simpan default role "pelanggan"
          await supabase
            .from("users")
            .insert({
              id: userId,
              email: session.user.email,
              role: "pelanggan",
            });
          // Update user_metadata untuk akses cepat di dashboard
          await supabase.auth.updateUser({ data: { role: "pelanggan" } });
        } else {
          // Update user_metadata agar dashboard langsung tahu role
          await supabase.auth.updateUser({ data: { role: existingUser.role } });
        }

        router.replace("/dashboard");
      } else if (event === "SIGNED_OUT") {
        router.replace("/auth/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent mb-4"></div>
      <p>Memproses login...</p>
    </div>
  );
}
