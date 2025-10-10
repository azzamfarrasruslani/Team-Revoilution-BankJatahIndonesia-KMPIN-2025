"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Eye } from "lucide-react";
import ModalDetail from "./ModalDetail";
import Badge from "./Badge";

export default function SetoranTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("semua");
  const [selected, setSelected] = useState(null);

  const statusList = ["semua", "menunggu", "disetujui", "ditolak"];

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

  const filtered = data.filter((row) =>
    filter === "semua" ? true : row.status === filter
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "disetujui":
        return <Badge color="green" text="Disetujui" />;
      case "menunggu":
        return <Badge color="yellow" text="Menunggu" />;
      case "ditolak":
        return <Badge color="red" text="Ditolak" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {statusList.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-medium rounded-md border ${
              filter === status
                ? "bg-[#FB6B00] text-white border-[#FB6B00]"
                : "border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <table className="min-w-full bg-white text-sm text-left border-collapse">
            <thead className="bg-[#FB6B00]/10 text-[#FB6B00] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Volume</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{row.id}</td>
                    <td className="px-6 py-4">{row.user_id}</td>
                    <td className="px-6 py-4">{row.unit_id}</td>
                    <td className="px-6 py-4">{row.volume_liter}</td>
                    <td className="px-6 py-4">{getStatusBadge(row.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelected(row)}
                        className="flex items-center gap-1 text-sm text-white bg-[#FB6B00] hover:bg-[#e65c00] px-3 py-1 rounded-md"
                      >
                        <Eye size={16} /> Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {selected && <ModalDetail row={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
