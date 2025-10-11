"use client";

import { useState, useEffect } from "react";
import SetoranTable from "./components/SetoranTable";
import StatCard from "./components/StatCard";
import { PieChart, Droplet, CheckCheck, Clock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminSetoranPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data setoran dari Supabase
  const fetchSetoran = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("setoran")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching setoran:", error);
    else setData(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchSetoran();
  }, []);

  // Hitung statistik
  const totalVolume = data.reduce((sum, row) => sum + parseFloat(row.volume_liter), 0);
  const totalDisetujui = data.filter((d) => d.status === "disetujui").length;
  const totalMenunggu = data.filter((d) => d.status === "menunggu").length;

  return (
    <div className="max-w-8xl mx-auto py-10 px-4 md:px-6 space-y-8">
      <h1 className="text-3xl font-bold text-[#FB6B00] mb-6">Kelola Setoran & Validasi</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={PieChart} title="Total Setoran" value={data.length} />
        <StatCard icon={Droplet} title="Total Volume (L)" value={totalVolume.toFixed(2)} />
        <StatCard icon={CheckCheck} title="Disetujui" value={totalDisetujui} />
        <StatCard icon={Clock} title="Menunggu" value={totalMenunggu} />
      </div>

      {/* Tabel */}
      <SetoranTable />
    </div>
  );
}
