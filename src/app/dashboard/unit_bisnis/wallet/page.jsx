"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CreditCard, Info, ArrowUpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WalletPageUnit() {
  const [wallet, setWallet] = useState({ saldo_deposit: 0, saldo_real: 0 });
  const [deposit, setDeposit] = useState("");
  const [history, setHistory] = useState([]);

  const RATE_PER_LITER = 6000;

  // Fetch wallet & riwayat deposit unit bisnis
  const fetchWalletData = async () => {
    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError) throw authError;
      const user = authData?.user;
      if (!user) return;

      const userId = user.id;

      // Ambil wallet unit bisnis
      const { data: walletData, error: walletError } = await supabase
        .from("wallet")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      if (walletError) throw walletError;
      setWallet(walletData || { saldo_deposit: 0, saldo_real: 0 });

      // Riwayat deposit unit bisnis
      const { data: paymentData, error: paymentError } = await supabase
        .from("payment")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (paymentError) throw paymentError;
      setHistory(paymentData || []);
    } catch (err) {
      console.error("Fetch wallet error:", err?.message || err);
      setWallet({ saldo_deposit: 0, saldo_real: 0 });
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  const handleDeposit = async () => {
    if (!deposit || deposit <= 0) return alert("Masukkan jumlah deposit valid");
    const amount = parseFloat(deposit);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.getUser();
      if (authError) throw authError;
      const user = authData?.user;
      if (!user) throw new Error("Unit bisnis belum login");
      const userId = user.id;

      // Insert deposit pending
      const { error: insertError } = await supabase.from("payment").insert([
        {
          user_id: userId,
          amount,
          status: "pending",
          gateway: "Deposit Unit Bisnis",
        },
      ]);
      if (insertError) throw insertError;

      setDeposit("");
      await fetchWalletData(); // Fetch langsung agar muncul di riwayat
    } catch (err) {
      alert(err?.message || JSON.stringify(err));
    }
  };

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
        <h1 className="text-3xl font-bold">Wallet Unit Bisnis</h1>
      </motion.div>

      {/* Saldo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[#FFF2E6] to-white border border-[#FB6B00]/20 rounded-2xl p-6 shadow-sm space-y-2"
      >
        <div>
          <p className="text-gray-500 text-sm">Saldo Deposit (approved)</p>
          <p className="text-2xl font-semibold text-[#FB6B00]">
            Rp {wallet.saldo_deposit.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Saldo Real</p>
          <p className="text-2xl font-semibold text-[#FB6B00]">
            Rp {wallet.saldo_real.toLocaleString()}
          </p>
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white border-l-4 border-[#FB6B00] rounded-xl p-4 shadow flex items-start gap-3"
      >
        <Info className="text-[#FB6B00] mt-1" />
        <div>
          <p className="text-sm text-gray-700">
            Deposit dicatat sebagai pending. Saldo unit bisnis akan bertambah
            sesuai trigger DB saat admin approve.
          </p>
        </div>
      </motion.div>

      {/* Form Deposit */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 space-y-4">
        <label className="text-sm font-medium">Jumlah Deposit (Rp)</label>
        <input
          type="number"
          step="1000"
          min="1000"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />
        {deposit && (
          <p className="text-sm text-gray-600">
            ≈ {(parseFloat(deposit) / RATE_PER_LITER).toFixed(2)} liter
          </p>
        )}
        <button
          onClick={handleDeposit}
          className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg w-full font-semibold flex items-center justify-center gap-2"
        >
          <ArrowUpCircle size={18} /> Deposit ke Admin
        </button>
      </div>

      {/* Riwayat Deposit */}
      <div className="overflow-x-auto bg-white rounded-xl shadow p-4 border">
        <h2 className="text-lg font-semibold mb-4">Riwayat Deposit</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Tanggal
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Jumlah (Rp)
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((h) => (
              <tr key={h.id}>
                <td className="px-4 py-2 text-sm">
                  {new Date(h.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-sm">
                  Rp {Number(h.amount).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm">{h.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
