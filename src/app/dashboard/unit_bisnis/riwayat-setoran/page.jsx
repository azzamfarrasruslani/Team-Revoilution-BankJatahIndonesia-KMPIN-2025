"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import FilterStatus from "./components/FilterStatus";
import SetoranCard from "./components/SetoranCard";
import EmptyState from "./components/EmptyState";

export default function RiwayatSetoranPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("semua");

  const statusList = ["semua", "pending", "diterima", "ditolak"];

  const fetchSetoran = async () => {
    setLoading(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user) return;

      const { data: setoran, error } = await supabase
        .from("setoran")
        .select(`
          id, volume_liter, status, created_at,
          pelanggan:users!setoran_pelanggan_id_fkey (id, nama)
        `)
        .eq("unit_id", user.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setData(setoran || []);
    } catch (err) {
      console.error("Error fetching setoran:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSetoran();
  }, []);

  const filtered = data.filter((row) =>
    filter === "semua" ? true : row.status === filter
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-[#FB6B00] mb-6">
        Riwayat Setoran Unit Bisnis
      </h1>

      <FilterStatus
        statusList={statusList}
        selected={filter}
        onSelect={setFilter}
      />

      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        filtered.map((row) => <SetoranCard key={row.id} row={row} />)
      )}
    </div>
  );
}
