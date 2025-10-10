"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Breadcrumb from "@/components/dashboard/Breadcrumb";

export default function DashboardLayout({ children }) {
  const breadcrumbItems = ["Dashboard"];

  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ tambahkan ini

  useEffect(() => {
    const getUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user) {
        const { data: user } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle();
        setUserRole(user?.role);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar session={session} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          session={session}
          role={userRole}
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Overlay untuk mode mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Konten utama */}
        <main
          className={`flex-1 p-6 transition-all duration-300 ${
            sidebarOpen ? "blur-sm" : ""
          } md:ml-64`}
        >
          <Breadcrumb items={breadcrumbItems} />
          {children}
        </main>
      </div>
    </div>
  );
}
