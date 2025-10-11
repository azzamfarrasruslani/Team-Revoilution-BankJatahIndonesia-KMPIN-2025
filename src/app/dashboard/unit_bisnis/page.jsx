"use client";

import { useEffect, useState } from "react";
import { Droplets, CheckCheck, Clock, Users } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import StatCardUnit from "./components/StatCardUnit";
import DashboardCTA from "./components/DashboardCTA";
import { Badge } from "@/components/ui/badge";

export default function UnitDashboard() {
  const [setoran, setSetoran] = useState([]);
  const [pelanggan, setPelanggan] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data: setoranData } = await supabase.from("setoran").select("*");
    const { data: pelangganData } = await supabase.from("users").select("*").eq("role", "pelanggan");
    setSetoran(setoranData || []);
    setPelanggan(pelangganData || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const totalVolume = setoran.reduce((sum, row) => sum + parseFloat(row.volume_liter), 0);
  const totalDisetujui = setoran.filter(d => d.status === "diterima").length;
  const totalMenunggu = setoran.filter(d => d.status === "pending").length;
  const totalDitolak = setoran.filter(d => d.status === "ditolak").length;
  const totalPelanggan = pelanggan.length;
  const totalSetoran = setoran.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-[#FB6B00] mb-6">Dashboard Unit Bisnis</h1>

      {/* Statistik Ringkas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCardUnit
          icon={Droplets}
          title="Total Volume Minyak"
          value={`${totalVolume.toFixed(2)} L`}
          badge={<Badge variant="default">Liter</Badge>}
          subtitle="Semua setoran dari pelanggan"
          className="hover:scale-105 transition-transform duration-200"
        />
        <StatCardUnit
          icon={CheckCheck}
          title="Disetujui"
          value={totalDisetujui}
          badge={<Badge variant="green">{totalDisetujui} Setoran</Badge>}
          subtitle={`Dari total ${totalSetoran} setoran`}
          className="hover:scale-105 transition-transform duration-200"
        />
        <StatCardUnit
          icon={Clock}
          title="Menunggu"
          value={totalMenunggu}
          badge={<Badge variant="yellow">{totalMenunggu} Pending</Badge>}
          subtitle="Setoran yang menunggu validasi"
          className="hover:scale-105 transition-transform duration-200"
        />
        <StatCardUnit
          icon={Users}
          title="Pelanggan Aktif"
          value={totalPelanggan}
          badge={<Badge variant="blue">{totalPelanggan} Orang</Badge>}
          subtitle="Pelanggan yang sudah melakukan setoran"
          className="hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* CTA / Menu Pendukung */}
      <DashboardCTA />
    </div>
  );
}
