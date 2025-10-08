"use client";

import {
  CreditCard,
  Droplets,
  QrCode,
  Download,
  Gift,
  Info,
  ArrowRightCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="space-y-10 py-8 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow p-6 border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-[#FB6B00]">
          Selamat Datang, Pelanggan! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Terima kasih telah berkontribusi menyelamatkan lingkungan 🌱
        </p>
      </motion.div>

      {/* Cards Section */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Wallet Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Saldo Anda</h2>
            <CreditCard className="text-[#FB6B00]" />
          </div>
          <p className="text-3xl font-bold text-[#FB6B00]">Rp 120.000</p>
          <div className="mt-4 flex gap-3">
            <button className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 transition">
              Tarik Saldo
            </button>
            <button className="border border-[#FB6B00] text-[#FB6B00] px-4 py-2 rounded-lg text-sm hover:bg-[#FB6B00]/10 flex items-center gap-1">
              <QrCode size={16} /> QRIS
            </button>
          </div>
        </motion.div>

        {/* Total Minyak Disetor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Total Minyak Disetor</h2>
            <Droplets className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-700">6.4 Liter</p>
          <div className="mt-3">
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full w-[64%]"></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">64% dari target bulan ini</p>
          </div>
        </motion.div>

        {/* CTA Setor Minyak */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#FB6B00] text-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition relative overflow-hidden"
        >
          <div className="absolute -right-5 -bottom-5 opacity-10">
            <Droplets size={150} />
          </div>
          <div className="flex items-center justify-between z-10 relative">
            <h2 className="text-lg font-semibold">Ayo Setor Minyak!</h2>
            <Download />
          </div>
          <p className="mt-2 text-sm relative z-10">
            Jangan biarkan minyak jelantah terbuang sia-sia. Tukarkan sekarang!
          </p>
          <button className="mt-4 bg-white text-[#FB6B00] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-100 transition z-10 relative">
            Setor Minyak Sekarang
          </button>
        </motion.div>
      </div>

      {/* Riwayat Transaksi */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Riwayat Transaksi Terbaru</h2>
        <ul className="divide-y divide-gray-200">
          {[1, 2, 3].map((item, i) => (
            <li key={i} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-700">
                  Setor Minyak - {2 + i} Liter
                </p>
                <p className="text-sm text-gray-500">20 Agustus 2025</p>
              </div>
              <p className="text-sm font-semibold text-green-600">+Rp {12000 + i * 3000}</p>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Promo / Reward Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-[#FB6B00] to-orange-500 text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between shadow-md"
      >
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">🎁 Promo Spesial Bulan Ini!</h2>
          <p className="text-sm">Setor 10 liter bulan ini dan dapatkan bonus saldo Rp 25.000!</p>
        </div>
        <Gift className="w-10 h-10 mt-3 md:mt-0" />
      </motion.div>

      {/* Edukasi */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex gap-4 items-start"
      >
        <div className="p-3 bg-[#FB6B00]/10 rounded-full">
          <Info className="text-[#FB6B00]" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-base">Tahukah kamu?</h3>
          <p className="text-sm text-gray-600 mt-1">
            Satu liter minyak jelantah bisa mencemari hingga 1 juta liter air bersih. Yuk, setor minyakmu sekarang demi lingkungan!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
