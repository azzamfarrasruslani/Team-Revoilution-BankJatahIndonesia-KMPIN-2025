"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Breadcrumb from "@/components/dashboard/Breadcrumb";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  const breadcrumbItems = ["Dashboard"]; // ❗️Kamu bisa update ini agar dinamis via props context/route

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!data.session) {
        router.replace("/login"); // 🔒 Redirect jika tidak login
      } else {
        setSession(data.session);
        setLoading(false); // ✅ Login sukses, load layout
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        Memuat dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar session={session} />

      {/* Main area: sidebar + konten */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar session={session} />

        {/* Main content */}
        <main className="flex-1 p-6 ml-64">
          <Breadcrumb items={breadcrumbItems} />
          {children}
        </main>
      </div>
    </div>
  );
}
