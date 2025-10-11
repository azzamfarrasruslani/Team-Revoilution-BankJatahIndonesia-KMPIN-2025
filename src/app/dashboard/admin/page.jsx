"use client";

import { useEffect, useState } from "react";
import { CreditCard, Droplets, CheckCheck, Clock, PieChart, Eye, Download, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { supabase } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

// ==========================
// Reusable StatCard Component
// ==========================
function StatCard({ icon: Icon, title, value, badge }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg flex items-center gap-4 p-5">
      <div className="p-3 rounded-full bg-[#FB6B00] text-white flex items-center justify-center">
        <Icon size={24} />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {badge && <div className="mt-1 flex gap-2">{badge}</div>}
      </div>
    </div>
  );
}

// ==========================
// AdminDashboard Page
// ==========================
export default function AdminDashboard() {
  const [setoran, setSetoran] = useState([]);
  const [units, setUnits] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    const { data: setoranData } = await supabase.from("setoran").select("*");
    const { data: unitData } = await supabase.from("users").select("*").eq("role", "unit_bisnis");
    const { data: pelangganData } = await supabase.from("users").select("*").eq("role", "pelanggan");

    setSetoran(setoranData || []);
    setUnits(unitData || []);
    setPelanggan(pelangganData || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  // ==========================
  // Ringkasan
  // ==========================
  const totalSetoran = setoran.length;
  const totalVolume = setoran.reduce((sum, s) => sum + parseFloat(s.volume_liter), 0);
  const disetujui = setoran.filter(s => s.status === "diterima").length;
  const menunggu = setoran.filter(s => s.status === "pending").length;
  const ditolak = setoran.filter(s => s.status === "ditolak").length;
  const totalUnitAktif = units.length;
  const totalPelanggan = pelanggan.length;

  // Chart Data
  const pieData = {
    labels: ["Disetujui", "Menunggu", "Ditolak"],
    datasets: [{
      data: [disetujui, menunggu, ditolak],
      backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
      borderWidth: 1,
    }],
  };

  const lineData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [{
      label: "Liter per Jam",
      data: Array.from({ length: 24 }, (_, i) => {
        return setoran.filter(s => new Date(s.created_at).getHours() === i)
                      .reduce((sum, s) => sum + parseFloat(s.volume_liter), 0);
      }),
      borderColor: "#FB6B00",
      backgroundColor: "rgba(251,107,0,0.2)",
      tension: 0.3,
      fill: true,
      pointRadius: 3,
    }],
  };

  return (
    <div className="space-y-10 py-8 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h1 className="text-3xl font-bold text-[#FB6B00]">Dashboard Admin 👋</h1>
        <p className="text-gray-600 mt-1">Ringkasan setoran minyak jelantah dan aktivitas unit bisnis.</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={PieChart} title="Total Setoran" value={totalSetoran} badge={<Badge variant="default">Semua</Badge>} />
        <StatCard icon={Droplets} title="Total Volume (L)" value={totalVolume.toFixed(2)} badge={<Badge variant="default">Liter</Badge>} />
        <StatCard 
          icon={CheckCheck} 
          title="Disetujui" 
          value={disetujui} 
          badge={
            <>
              <Badge variant="green">{totalPelanggan} Pelanggan</Badge>
              <Badge variant="blue">{totalUnitAktif} Unit</Badge>
            </>
          } 
        />
        <StatCard icon={Clock} title="Menunggu" value={menunggu} badge={<Badge variant="yellow">{menunggu} Pending</Badge>} />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Status Setoran</h2>
          <div className="h-48">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-4 md:p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Volume Hari Ini (Liter)</h2>
          <div className="h-48">
            <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        </motion.div>
      </div>

      {/* CTA / Menu Pendukung */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-[#FB6B00] text-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center hover:shadow-lg transition">
        <div>
          <h2 className="text-lg font-semibold">Validasi Setoran</h2>
          <p className="text-sm mt-1">Segera validasi setoran dari unit bisnis agar data tetap akurat.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="bg-white text-[#FB6B00] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-100 transition flex items-center gap-1">
            <Download size={16} /> Export Data
          </button>
          <button className="bg-white text-[#FB6B00] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-100 transition flex items-center gap-1">
            <Eye size={16} /> Lihat Setoran
          </button>
        </div>
      </motion.div>
    </div>
  );
}
