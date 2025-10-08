"use client";

import { useState } from "react";
import {
  CheckCheck,
  Clock,
  AlertCircle,
  Eye,
  PieChart,
  Droplet,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const dummyValidasi = [
  {
    id: "VLD-001",
    nama: "Andi Saputra",
    status: "menunggu",
    tanggal: "2025-08-30",
    volume: 2.5,
  },
  {
    id: "VLD-002",
    nama: "Rina Dewi",
    status: "disetujui",
    tanggal: "2025-08-29",
    volume: 1.8,
  },
  {
    id: "VLD-003",
    nama: "Budi Hartono",
    status: "ditolak",
    tanggal: "2025-08-28",
    volume: 3.2,
  },
  {
    id: "VLD-004",
    nama: "Siti Aminah",
    status: "disetujui",
    tanggal: "2025-08-27",
    volume: 2.0,
  },
];

export default function ValidasiPage() {
  const [filter, setFilter] = useState("semua");
  const [selected, setSelected] = useState(null); // untuk modal

  const filtered = dummyValidasi.filter((data) =>
    filter === "semua" ? true : data.status === filter
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case "disetujui":
        return <Badge color="green" Icon={CheckCheck} text="Disetujui" />;
      case "menunggu":
        return <Badge color="yellow" Icon={Clock} text="Menunggu" />;
      case "ditolak":
        return <Badge color="red" Icon={AlertCircle} text="Ditolak" />;
      default:
        return null;
    }
  };

  const statusList = ["semua", "menunggu", "disetujui", "ditolak"];
  const totalVolume = dummyValidasi.reduce((sum, item) => sum + item.volume, 0);
  const totalDisetujui = dummyValidasi.filter(
    (d) => d.status === "disetujui"
  ).length;
  const totalMenunggu = dummyValidasi.filter(
    (d) => d.status === "menunggu"
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <h1 className="text-3xl font-bold text-[#FB6B00]">
          Validasi Setoran Minyak
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap">
          {statusList.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition ${
                filter === status
                  ? "bg-[#FB6B00] text-white border-[#FB6B00]"
                  : "border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Statistik */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={PieChart}
          title="Total Validasi"
          value={dummyValidasi.length}
        />
        <StatCard
          icon={Droplet}
          title="Total Volume (L)"
          value={totalVolume.toFixed(1)}
        />
        <StatCard icon={CheckCheck} title="Disetujui" value={totalDisetujui} />
        <StatCard icon={Clock} title="Menunggu" value={totalMenunggu} />
      </div>

      {/* Tabel Validasi */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="overflow-x-auto rounded-xl shadow-md border border-gray-200"
      >
        <table className="min-w-full bg-white text-sm text-left border-collapse">
          <thead className="bg-[#FB6B00]/10 text-[#FB6B00] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Nama</th>
              <th className="px-6 py-4">Volume</th>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  Tidak ada data validasi.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{item.id}</td>
                  <td className="px-6 py-4">{item.nama}</td>
                  <td className="px-6 py-4">{item.volume} L</td>
                  <td className="px-6 py-4">{item.tanggal}</td>
                  <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelected(item)}
                      className="flex items-center gap-1 text-sm text-white bg-[#FB6B00] hover:bg-[#e65c00] px-3 py-1 rounded-md transition"
                    >
                      <Eye size={16} /> Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      {/* Modal Detail */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#FB6B00] flex items-center gap-2">
                  <PieChart size={28} /> Detail Validasi
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-500 hover:text-gray-800 transition"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <InfoRow label="ID" value={selected.id} />
                <InfoRow label="Nama" value={selected.nama} />
                <InfoRow label="Volume" value={`${selected.volume} L`} />
                <InfoRow label="Tanggal" value={selected.tanggal} />
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Status:</span>
                  {getStatusBadge(selected.status)}
                </div>
              </div>

              {/* Footer / Actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition font-medium"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Stat Card Component
function StatCard({ icon: Icon, title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white border border-gray-200 rounded-2xl shadow-lg flex items-center gap-4 p-5 transition-all duration-300"
    >
      <div className="p-3 rounded-full bg-[#FB6B00] text-white flex items-center justify-center">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </motion.div>
  );
}

// Badge Component
function Badge({ color, Icon, text }) {
  const colors = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${colors[color]}`}
    >
      <Icon size={14} /> {text}
    </span>
  );
}
// Component InfoRow untuk baris info
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between bg-gray-50 px-4 py-2 rounded-lg shadow-sm">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-gray-800 font-semibold">{value}</span>
    </div>
  );
}
