"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Breadcrumb from "@/components/dashboard/Breadcrumb";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardLayout({ children, breadcrumbItems }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) setSession(session);
    };
    getSession();
  }, []);

  const role = session?.user?.user_metadata?.role || "pelanggan";

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      {session && (
        <Sidebar
          session={session}
          role={role}
          sidebarOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar berada di dalam main content */}
        <Navbar session={session} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Overlay mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-6 md:ml-64 overflow-y-auto">
          <Breadcrumb items={breadcrumbItems} />
          {children}
        </main>
      </div>
    </div>
  );
}
