"use client";

import { Badge } from "@/components/ui/badge";

export default function SetoranCard({ row }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "diterima":
        return <Badge variant="green">Diterima</Badge>;
      case "pending":
        return <Badge variant="yellow">Menunggu</Badge>;
      case "ditolak":
        return <Badge variant="red">Ditolak</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white flex justify-between items-center mb-3">
      <div>
        <p className="text-gray-700 font-medium">{row.pelanggan?.nama || "—"}</p>
        <p className="text-gray-500 text-sm">Volume: {row.volume_liter} L</p>
        <p className="text-gray-400 text-xs">
          {new Date(row.created_at).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
      <div>{getStatusBadge(row.status)}</div>
    </div>
  );
}
