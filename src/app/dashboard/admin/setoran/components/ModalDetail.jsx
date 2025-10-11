"use client";

import { motion } from "framer-motion";
import { Droplet, User, Award, XCircle } from "lucide-react";

export default function ModalDetail({ row, onClose }) {
  if (!row) return null;

  // Fungsi untuk mengubah snake_case menjadi teks yang mudah dibaca
  const formatLabel = (key) => {
    const map = {
      id: "ID Setoran",
      pelanggan_id: "Pelanggan",
      unit_id: "Unit Bisnis",
      volume_liter: "Volume (Liter)",
      poin_diberikan: "Poin Diberikan",
      status: "Status",
      topup_unit: "Top-Up Unit",
      created_at: "Tanggal Setor",
    };
    return map[key] || key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Pisahkan data ke dalam kategori
  const infoSetoran = ["volume_liter", "status", "poin_diberikan", "topup_unit"];
  const infoUser = ["pelanggan_id", "unit_id"];
  const infoMeta = ["created_at", "id"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#FB6B00] text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Droplet size={22} /> Detail Setoran
          </h2>
          <button
            onClick={onClose}
            className="hover:text-gray-200 transition"
            aria-label="Tutup"
          >
            <XCircle size={22} />
          </button>
        </div>

        {/* Isi */}
        <div className="p-6 space-y-6">
          {/* Kategori 1 - Informasi Setoran */}
          <section>
            <h3 className="flex items-center gap-2 text-[#FB6B00] font-semibold mb-3 text-lg">
              <Droplet size={18} /> Informasi Setoran
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {infoSetoran
                .filter((key) => row[key] !== undefined)
                .map((key) => (
                  <div
                    key={key}
                    className="bg-orange-50 border border-orange-100 rounded-lg p-3 shadow-sm"
                  >
                    <p className="text-sm text-gray-500">{formatLabel(key)}</p>
                    <p className="text-base font-semibold text-gray-800">
                      {row[key]}
                    </p>
                  </div>
                ))}
            </div>
          </section>

          {/* Kategori 2 - Informasi Pelanggan & Unit */}
          <section>
            <h3 className="flex items-center gap-2 text-blue-600 font-semibold mb-3 text-lg">
              <User size={18} /> Informasi Pelanggan & Unit
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {infoUser.map((key) => (
                <div
                  key={key}
                  className="bg-blue-50 border border-blue-100 rounded-lg p-3 shadow-sm"
                >
                  <p className="text-sm text-gray-500">{formatLabel(key)}</p>
                  <p className="text-base font-semibold text-gray-800">
                    {key === "pelanggan_id" ? row.pelanggan?.nama : row.unit?.nama}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Kategori 3 - Metadata */}
          <section>
            <h3 className="flex items-center gap-2 text-green-700 font-semibold mb-3 text-lg">
              <Award size={18} /> Metadata & Tanggal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {infoMeta
                .filter((key) => row[key] !== undefined)
                .map((key) => (
                  <div
                    key={key}
                    className="bg-green-50 border border-green-100 rounded-lg p-3 shadow-sm"
                  >
                    <p className="text-sm text-gray-500">{formatLabel(key)}</p>
                    <p className="text-base font-semibold text-gray-800">
                      {row[key]}
                    </p>
                  </div>
                ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 font-medium transition"
          >
            Tutup
          </button>
        </div>
      </motion.div>
    </div>
  );
}
