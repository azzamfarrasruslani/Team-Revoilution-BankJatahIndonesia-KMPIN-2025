"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Droplets, CheckCheck, Clock } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";

export default function UnitDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSetoran = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("setoran").select("*");
    if (error) console.error(error);
    else setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSetoran();
  }, []);

  const totalVolume = data.reduce((sum, row) => sum + parseFloat(row.volume_liter), 0);
  const totalDisetujui = data.filter(d => d.status === "disetujui").length;
  const totalMenunggu = data.filter(d => d.status === "menunggu").length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold text-[#FB6B00] mb-6">Dashboard Unit Bisnis</h1>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard icon={Droplets} title="Total Minyak Diterima" value={`${totalVolume.toFixed(2)} L`} />
        <StatCard icon={CheckCheck} title="Disetujui" value={totalDisetujui} />
        <StatCard icon={Clock} title="Menunggu" value={totalMenunggu} />
      </div>

      {/* Tabel setoran */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 mt-6">
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <table className="min-w-full bg-white text-left text-sm divide-y divide-gray-100">
            <thead className="bg-[#FB6B00]/10 text-[#FB6B00] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Volume (L)</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-100">
              {data.map(row => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{row.id}</td>
                  <td className="px-6 py-4">{row.user_id}</td>
                  <td className="px-6 py-4">{row.volume_liter}</td>
                  <td className="px-6 py-4">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
