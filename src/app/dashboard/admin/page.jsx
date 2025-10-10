"use client";

import { useEffect, useState } from "react";
import {
  CreditCard,
  Droplets,
  CheckCheck,
  Clock,
  PieChart,
  Eye,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { supabase } from "@/lib/supabaseClient";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// StatCard Component
function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg flex items-center gap-4 p-5">
      <div className="p-3 rounded-full bg-[#FB6B00] text-white flex items-center justify-center">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [setoran, setSetoran] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data setoran
  const fetchSetoran = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("setoran")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) console.error(error);
    else setSetoran(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSetoran();
  }, []);

  // Hitung ringkasan
  const totalSetoran = setoran.length;
  const totalVolume = setoran.reduce((sum, s) => sum + parseFloat(s.volume_liter), 0);
  const disetujui = setoran.filter(s => s.status === "disetujui").length;
  const menunggu = setoran.filter(s => s.status === "menunggu").length;

  // Data chart per hari
  const today = new Date().toISOString().slice(0, 10);
  const todaySetoran = setoran.filter(s => s.created_at?.slice(0, 10) === today);
  const volumePerHour = Array(24).fill(0);
  todaySetoran.forEach(s => {
    const hour = new Date(s.created_at).getHours();
    volumePerHour[hour] += parseFloat(s.volume_liter);
  });

  const barData = {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [
      {
        label: "Liter per Jam",
        data: volumePerHour,
        backgroundColor: "#FB6B00",
      },
    ],
  };

  const pieData = {
    labels: ["Disetujui", "Menunggu", "Ditolak"],
    datasets: [
      {
        data: [
          disetujui,
          menunggu,
          totalSetoran - disetujui - menunggu,
        ],
        backgroundColor: ["#22c55e", "#facc15", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-10 py-8 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow p-6 border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-[#FB6B00]">Dashboard Admin 👋</h1>
        <p className="text-gray-600 mt-1">
          Ringkasan setoran minyak jelantah dan aktivitas unit bisnis.
        </p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={PieChart} title="Total Setoran" value={totalSetoran} />
        <StatCard icon={Droplets} title="Total Volume (L)" value={totalVolume.toFixed(2)} />
        <StatCard icon={CheckCheck} title="Disetujui" value={disetujui} />
        <StatCard icon={Clock} title="Menunggu" value={menunggu} />
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Status Setoran</h2>
          <Pie data={pieData} />
        </motion.div>

        {/* Bar Chart Hari Ini */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Volume Hari Ini (Liter)</h2>
          <Bar data={barData} />
        </motion.div>
      </div>

      {/* CTA Admin */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-[#FB6B00] text-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center hover:shadow-lg transition"
      >
        <div>
          <h2 className="text-lg font-semibold">Lakukan Validasi Setoran</h2>
          <p className="text-sm mt-1">
            Segera validasi setoran dari unit bisnis agar data tetap akurat.
          </p>
        </div>
        <button className="mt-4 md:mt-0 bg-white text-[#FB6B00] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-100 transition flex items-center gap-1">
          <Download size={16} /> Validasi Sekarang
        </button>
      </motion.div>
    </div>
  );
}
