"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  CreditCard,
  Info,
  TrendingUp,
  TrendingDown,
  ArrowDownCircle,
  QrCode,
} from "lucide-react";
import { motion } from "framer-motion";

export default function WalletPagePelanggan() {
  const [wallet, setWallet] = useState({ saldo_real: 0, saldo_deposit: 0 });
  const [transactions, setTransactions] = useState([]);

  const fetchWalletData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const userId = user.id;

      // Ambil wallet pelanggan (saldo_real & saldo_deposit)
      const { data: walletData, error: walletError } = await supabase
        .from("wallet")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      if (walletError) throw walletError;
      setWallet(walletData || { saldo_real: 0, saldo_deposit: 0 });

      // Ambil riwayat deposit / setoran pelanggan
      const { data: txData, error: txError } = await supabase
        .from("setoran")
        .select(
          `
    id,
    topup_unit,
    status,
    created_at,
    unit:users!setoran_unit_id_fkey(id, nama)
  `
        )
        .eq("pelanggan_id", userId)
        .order("created_at", { ascending: false });

      if (txError) throw txError;
      setTransactions(txData || []);
    } catch (err) {
      console.error("Gagal fetch wallet data:", err.message || err);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

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
        <h1 className="text-3xl font-bold">Dompet Digital Pelanggan</h1>
      </motion.div>

      {/* Saldo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[#FFF2E6] to-white border border-[#FB6B00]/20 rounded-2xl p-6 shadow-sm"
      >
        <p className="text-gray-500 text-sm">Saldo Real</p>
        <p className="text-4xl font-bold text-[#FB6B00]">
          Rp {wallet.saldo_real?.toLocaleString() || 0}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Saldo Deposit: Rp {wallet.saldo_deposit?.toLocaleString() || 0}
        </p>
        <div className="flex gap-2 mt-4">
          <button className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-600 flex items-center gap-2 shadow-md transition">
            <ArrowDownCircle size={18} /> Tarik Saldo
          </button>
          <button className="border border-[#FB6B00] text-[#FB6B00] px-4 py-2 rounded-lg text-sm hover:bg-[#FB6B00]/10 flex items-center gap-2 transition">
            <QrCode size={16} /> QRIS Saya
          </button>
        </div>
      </motion.div>

      {/* Info Wallet */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white border-l-4 border-[#FB6B00] rounded-xl p-4 shadow flex items-start gap-3"
      >
        <Info className="text-[#FB6B00] mt-1" />
        <div>
          <p className="text-sm text-gray-700">
            Saldo diperoleh dari deposit unit bisnis yang sudah diapprove oleh
            admin. Trigger di database mengupdate saldo wallet secara otomatis
            saat setoran diapprove atau dibatalkan.
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
          Riwayat Setoran / Deposit
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
                    tx.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : tx.status === "batal"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {tx.status === "approved" ? (
                    <TrendingUp size={16} />
                  ) : tx.status === "batal" ? (
                    <TrendingDown size={16} />
                  ) : (
                    <ArrowDownCircle size={16} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    {tx.gateway?.users?.nama || "Unit Bisnis"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(tx.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p
                className={`text-sm font-semibold ${
                  tx.status === "approved"
                    ? "text-green-600"
                    : tx.status === "batal"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {tx.status === "approved" ? "+" : "-"}Rp{" "}
                {tx.topup_unit?.toLocaleString() || 0}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
