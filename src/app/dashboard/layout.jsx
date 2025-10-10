"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardLayout({ children, breadcrumbItems }) {
   const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setSession(session);
        // Ambil role langsung dari tabel users
        const { data: user } = await supabase.from("users").select("role").eq("id", session.user.id).maybeSingle();
        setRole(user?.role || "pelanggan");
      }
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar desktop jadi bagian flex */}
      {session && role && (
        <div className="hidden md:flex flex-shrink-0 w-64">
          <Sidebar
            session={session}
            role={role}
            sidebarOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar session={session} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Sidebar mobile overlay */}
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

        {/* Konten utama */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Breadcrumb items={breadcrumbItems} />
          {children}
        </main>
      </div>
    </div>
  );
}
