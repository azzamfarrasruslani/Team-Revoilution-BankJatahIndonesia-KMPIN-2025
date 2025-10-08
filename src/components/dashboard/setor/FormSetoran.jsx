"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Droplet, CheckCircle, ChevronDown } from "lucide-react";

// Dummy mitra
const mitraList = [
  { id: 1, nama: "Mitra Kelurahan A" },
  { id: 2, nama: "Mitra Kelurahan B" },
  { id: 3, nama: "Mitra Kelurahan C" },
];

export default function FormSetoran() {
  const [mitra, setMitra] = useState("");
  const [jenisMinyak, setJenisMinyak] = useState("");
  const [catatan, setCatatan] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mitra || !jenisMinyak) return;

    // Simulasi kirim data
    console.log({ mitra, jenisMinyak, catatan });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    // Reset form (optional)
    setMitra("");
    setJenisMinyak("");
    setCatatan("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6 max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold text-[#FB6B00] flex items-center gap-2 mb-4">
        <Droplet size={22} className="text-[#FB6B00]" />
        Formulir Setoran Minyak
      </h2>

      {/* Pilih Mitra */}
      <div className="space-y-1 relative">
        <label className="text-[15px] font-medium text-gray-900">Pilih Mitra</label>
        <select
          required
          value={mitra}
          onChange={(e) => setMitra(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB6B00] outline-none text-[15px] text-gray-900 bg-white appearance-none"
        >
          <option value="">-- Pilih Mitra --</option>
          {mitraList.map((m) => (
            <option key={m.id} value={m.id}>
              {m.nama}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-2.5 text-gray-600" size={18} />
      </div>

      {/* Jenis Minyak */}
      <div className="space-y-1 relative">
        <label className="text-[15px] font-medium text-gray-900">Jenis Minyak</label>
        <select
          required
          value={jenisMinyak}
          onChange={(e) => setJenisMinyak(e.target.value)}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB6B00] outline-none text-[15px] text-gray-900 bg-white appearance-none"
        >
          <option value="">-- Pilih Jenis Minyak --</option>
          <option value="minyak-goreng">Minyak Goreng</option>
          <option value="minyak-sawit">Minyak Sawit</option>
          <option value="lainnya">Lainnya</option>
        </select>
        <ChevronDown className="absolute right-3 top-2.5 text-gray-600" size={18} />
      </div>

      {/* Catatan Tambahan */}
      <div className="space-y-1">
        <label className="text-[15px] font-medium text-gray-900">Catatan Tambahan</label>
        <textarea
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          rows={3}
          placeholder="Opsional: Tambahkan catatan atau info tambahan"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB6B00] outline-none text-[15px] text-gray-900 resize-none"
        />
      </div>

      {/* Tombol Kirim */}
      <button
        type="submit"
        className="bg-[#FB6B00] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md"
      >
        Konfirmasi Setoran
      </button>

      {/* Notifikasi berhasil */}
      {submitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-green-600 mt-2 text-sm"
        >
          <CheckCircle size={20} />
          <span>Setoran berhasil dikonfirmasi. Terima kasih!</span>
        </motion.div>
      )}
    </motion.form>
  );
}
