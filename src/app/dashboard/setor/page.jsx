"use client";

import { useState } from "react";
import {
  UploadCloud,
  Droplet,
  CheckCircle,
  Info,
  Flame,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SetorMinyakPage() {
  const [volume, setVolume] = useState("");
  const [jenisMinyak, setJenisMinyak] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log({ volume, jenisMinyak });
    setVolume("");
    setJenisMinyak("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Kiri - Informasi dan Ilustrasi */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden"
      >
        <div className="p-8 space-y-5">
          <h1 className="text-3xl font-bold text-[#FB6B00] flex items-center gap-3">
            <UploadCloud size={28} />
            Setor Minyak Jelantah
          </h1>
          <p className="text-gray-700 leading-relaxed text-[15px]">
            Tukarkan minyak bekas Anda menjadi <strong>saldo digital</strong>. Simpan
            minyak dalam wadah bersih dan hindari pencampuran dengan air atau zat lain.
          </p>

          <div className="flex items-start gap-3 bg-orange-100/30 border-l-4 border-[#FB6B00] p-4 rounded-lg">
            <Info size={20} className="text-[#FB6B00] mt-0.5" />
            <span className="text-sm text-[#FB6B00] leading-relaxed">
              Minimal setor: <strong>0.1 Liter</strong><br />
              Diterima: <strong>Minyak goreng, sawit</strong>
            </span>
          </div>
        </div>
        <Image
          src="/images/setor.png"
          alt="Ilustrasi Setor Minyak"
          width={700}
          height={400}
          className="object-contain w-full"
          priority
        />
      </motion.div>

     {/* Kanan - Formulir Penyetoran */}
<motion.form
  onSubmit={handleSubmit}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
  viewport={{ once: true }}
  className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6"
>
  <h2 className="text-xl font-semibold text-[#FB6B00] flex items-center gap-2 mb-4">
    <Droplet size={22} className="text-[#FB6B00]" />
    Formulir Penyetoran
  </h2>

  {/* Volume Minyak */}
  <div className="space-y-1">
    <label className="text-[15px] font-medium text-gray-900">
      Volume Minyak (liter)
    </label>
    <div className="relative">
      <input
        type="number"
        step="0.1"
        min="0.1"
        required
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB6B00] outline-none text-[15px] text-gray-900"
        placeholder="Contoh: 2.5"
      />
      <Flame className="absolute left-3 top-2.5 text-[#FB6B00]" size={18} />
    </div>
  </div>

  {/* Jenis Minyak */}
  <div className="space-y-1">
    <label className="text-[15px] font-medium text-gray-900">Jenis Minyak</label>
    <div className="relative">
      <select
        required
        value={jenisMinyak}
        onChange={(e) => setJenisMinyak(e.target.value)}
        className="w-full px-4 py-2 pl-10 pr-10 appearance-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FB6B00] outline-none text-[15px] text-gray-900 bg-white"
      >
        <option value="">Pilih Jenis Minyak</option>
        <option value="minyak-goreng">Minyak Goreng</option>
        <option value="minyak-sawit">Minyak Sawit</option>
        <option value="lainnya">Lainnya</option>
      </select>
      <Flame className="absolute left-3 top-2.5 text-[#FB6B00]" size={18} />
      <ChevronDown className="absolute right-3 top-2.5 text-gray-600" size={18} />
    </div>
  </div>

  {/* Tombol Kirim */}
  <button
    type="submit"
    className="bg-[#FB6B00] text-white w-full py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md"
  >
    Kirim Setoran
  </button>

  {/* Notifikasi berhasil */}
  {submitted && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 text-green-600 mt-2 text-sm"
    >
      <CheckCircle size={20} />
      <span>Setoran berhasil dikirim. Terima kasih!</span>
    </motion.div>
  )}
</motion.form>

    </div>
  );
}
