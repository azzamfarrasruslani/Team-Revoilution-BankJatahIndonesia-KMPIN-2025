"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import Breadcrumb from "@/components/dashboard/Breadcrumb";

export default function DashboardLayout({ children }) {
  const breadcrumbItems = ["Dashboard", "Transaksi", "Detail"]; // Bisa diganti dinamis

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main area: sidebar + konten */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-6 ml-64">
          {/* Breadcrumb di atas konten */}
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Konten halaman */}
          {children}
        </main>
      </div>
    </div>
  );
}
