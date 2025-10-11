"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardLayout({ children, breadcrumbItems }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      // Ambil session dari Supabase
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // Jika tidak ada session, arahkan ke login
      if (error || !session) {
        router.replace("/auth/login");
        return;
      }

      setSession(session);

      // Ambil role user dari tabel users Supabase
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .maybeSingle();

      // Jika gagal ambil role, fallback ke "pelanggan"
      setRole(user?.role || "pelanggan");

      setLoading(false);
    };

    getUser();

    // Tambahkan listener agar saat logout, otomatis redirect ke login
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.replace("/auth/login");
      }
      if (event === "SIGNED_IN") {
        setSession(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  // Saat loading, tampilkan spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  // Jika session hilang (misal logout manual atau expire), redirect ulang
  if (!session) {
    router.replace("/auth/login");
    return null;
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar Desktop */}
      <div className="hidden md:flex flex-shrink-0 w-64">
        <Sidebar
          session={session}
          role={role}
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Konten Utama */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar
          session={session}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Sidebar Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <Sidebar
              session={session}
              role={role}
              sidebarOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <div
              className="flex-1 bg-black/30"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}

        {/* Konten Dashboard */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Breadcrumb items={breadcrumbItems} />
          {children}
        </main>
      </div>
    </div>
  );
}
