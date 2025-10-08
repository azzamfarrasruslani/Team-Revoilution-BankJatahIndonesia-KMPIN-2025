"use client";

import { useState } from "react";
import {
  CreditCard,
  QrCode,
  ArrowDownCircle,
  Info,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { motion } from "framer-motion";

export default function WalletPage() {
  const [saldo, setSaldo] = useState(120000);
  const [transactions] = useState([
    {
      id: 1,
      type: "Setor Minyak",
      date: "30 Agustus 2025",
      amount: 12000,
      status: "Masuk",
    },
    {
      id: 2,
      type: "Penarikan Saldo",
      date: "28 Agustus 2025",
      amount: 25000,
      status: "Keluar",
    },
    {
      id: 3,
      type: "Bonus Promo",
      date: "20 Agustus 2025",
      amount: 5000,
      status: "Masuk",
    },
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4 md:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 text-[#FB6B00]"
      >
        <CreditCard size={28} />
        <h1 className="text-3xl font-bold">Dompet Digital</h1>
      </motion.div>

      {/* Box Saldo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[#FFF2E6] to-white border border-[#FB6B00]/20 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-gray-500 text-sm">Saldo Saat Ini</p>
            <p className="text-4xl font-bold text-[#FB6B00]">
              Rp {saldo.toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 flex items-center gap-2 shadow-md transition">
              <ArrowDownCircle size={18} />
              Tarik Saldo
            </button>
            <button className="border border-[#FB6B00] text-[#FB6B00] px-4 py-2 rounded-lg text-sm hover:bg-[#FB6B00]/10 flex items-center gap-2 transition">
              <QrCode size={16} />
              QRIS Saya
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tentang Wallet */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white border-l-4 border-[#FB6B00] rounded-xl p-4 shadow flex items-start gap-3"
      >
        <Info className="text-[#FB6B00] mt-1" />
        <div>
          <p className="text-sm text-gray-700">
            Dompet digital ini berfungsi sebagai penyimpanan saldo dari hasil penukaran minyak jelantah.
            Anda dapat menarik saldo, melihat riwayat, dan menggunakan QRIS untuk transaksi.
          </p>
        </div>
      </motion.div>

      {/* Riwayat Transaksi */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Riwayat Transaksi
        </h2>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    tx.status === "Masuk"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {tx.status === "Masuk" ? (
                    <TrendingUp size={16} />
                  ) : (
                    <TrendingDown size={16} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{tx.type}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
              <p
                className={`text-sm font-semibold ${
                  tx.status === "Masuk" ? "text-green-600" : "text-red-600"
                }`}
              >
                {tx.status === "Masuk" ? "+" : "-"}Rp{" "}
                {tx.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
