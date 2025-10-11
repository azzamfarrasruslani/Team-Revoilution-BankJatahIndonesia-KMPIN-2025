"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Eye } from "lucide-react";
import ModalDetail from "./ModalDetail";
import Badge from "./Badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function SetoranTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("semua");
  const [selected, setSelected] = useState(null);

  const statusList = ["semua", "pending", "diterima", "ditolak"];

  const fetchSetoran = async () => {
    setLoading(true);
    const { data: setoranData, error } = await supabase
      .from("setoran")
      .select(
        `
    id,
    volume_liter,
    status,
    poin_diberikan,
    topup_unit,
    created_at,
    pelanggan:users(id, nama),
    unit:users(id, nama)
  `
      )
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching setoran:", error);
    else setData(setoranData || []);
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
      case "diterima":
        return <Badge color="green" text="Diterima" />;
      case "pending":
        return <Badge color="yellow" text="Menunggu" />;
      case "ditolak":
        return <Badge color="red" text="Ditolak" />;
      default:
        return null;
    }
  };

  const getRowColor = (status) => {
    switch (status) {
      case "diterima":
        return "bg-green-50 hover:bg-green-100/80";
      case "pending":
        return "bg-yellow-50 hover:bg-yellow-100/80";
      case "ditolak":
        return "bg-red-50 hover:bg-red-100/80";
      default:
        return "hover:bg-gray-50";
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      // Ambil setoran terkait
      const { data: setoran, error: fetchError } = await supabase
        .from("setoran")
        .select("id, pelanggan_id, unit_id, topup_unit, status")
        .eq("id", id)
        .maybeSingle();
      if (fetchError) throw fetchError;
      if (!setoran) throw new Error("Setoran tidak ditemukan");

      // Update status setoran
      const { error: updateError } = await supabase
        .from("setoran")
        .update({ status: newStatus })
        .eq("id", id);
      if (updateError) throw updateError;

      // Jika diterima, update saldo pelanggan & kurangi saldo deposit unit
      if (newStatus === "diterima") {
        // Update saldo pelanggan
        const { data: walletPelanggan } = await supabase
          .from("wallet")
          .select("saldo_real")
          .eq("user_id", setoran.pelanggan_id)
          .maybeSingle();
        const newSaldoPelanggan =
          (walletPelanggan?.saldo_real || 0) + setoran.topup_unit;
        await supabase
          .from("wallet")
          .update({ saldo_real: newSaldoPelanggan })
          .eq("user_id", setoran.pelanggan_id);

        // Kurangi saldo deposit unit bisnis
        const { data: walletUnit } = await supabase
          .from("wallet")
          .select("saldo_deposit")
          .eq("user_id", setoran.unit_id)
          .maybeSingle();
        const newSaldoDeposit =
          (walletUnit?.saldo_deposit || 0) - setoran.topup_unit;
        await supabase
          .from("wallet")
          .update({ saldo_deposit: newSaldoDeposit })
          .eq("user_id", setoran.unit_id);
      }

      fetchSetoran();
    } catch (err) {
      alert("Gagal update status: " + (err?.message || JSON.stringify(err)));
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {statusList.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 text-sm font-semibold rounded-full shadow-sm transition-all duration-200 ${
              filter === status
                ? "bg-[#FB6B00] text-white shadow-md scale-105"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-orange-50"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Memuat data...</div>
        ) : (
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-[#FB6B00]/10 text-[#FB6B00] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Pelanggan</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Volume (L)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    Tidak ada data setoran.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={row.id}
                    className={`${getRowColor(
                      row.status
                    )} transition duration-200`}
                  >
                    <td className="px-6 py-3 font-medium text-gray-700">
                      {row.pelanggan?.nama || "—"}
                    </td>
                    <td className="px-6 py-3 text-gray-700">
                      {row.unit?.nama || "—"}
                    </td>
                    <td className="px-6 py-3">{row.volume_liter} L</td>
                    <td className="px-6 py-3">{getStatusBadge(row.status)}</td>
                    <td className="px-6 py-3 text-gray-500">
                      {new Date(row.created_at).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">Aksi</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setSelected(row)}>
                            <Eye size={14} /> Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(row.id, "diterima")
                            }
                          >
                            Terima
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(row.id, "ditolak")
                            }
                          >
                            Tolak
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(row.id)}
                            className="text-red-600"
                          >
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {selected && (
        <ModalDetail setoran={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
