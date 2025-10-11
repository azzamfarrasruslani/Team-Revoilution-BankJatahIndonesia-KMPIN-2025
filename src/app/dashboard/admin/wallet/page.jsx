"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CreditCard, CheckCircle, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function WalletPageAdmin() {
  const [wallets, setWallets] = useState([]);
  const [payments, setPayments] = useState([]);

  // Fetch data wallet & deposit pending
  const fetchData = async () => {
    try {
      // Semua wallet beserta nama user
      const { data: walletData, error: walletError } = await supabase
        .from("wallet")
        .select("user_id, saldo_deposit, saldo_real, users(nama)")
        .order("saldo_deposit", { ascending: false });
      if (walletError) throw walletError;
      setWallets(walletData || []);

      // Deposit pending
      const { data: paymentData, error: paymentError } = await supabase
        .from("payment")
        .select("id, user_id, amount, status, gateway, created_at, users(nama)")
        .eq("status", "pending")
        .order("created_at", { ascending: true });
      if (paymentError) throw paymentError;
      setPayments(paymentData || []);
    } catch (err) {
      console.error("Gagal fetch data:", err.message || err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Approve deposit -> trigger di DB akan otomatis update saldo wallet
 const approveDeposit = async (payment) => {
  try {
    // 1️⃣ Update status payment jadi 'approved'
    const { error: errUpdate } = await supabase
      .from("payment")
      .update({ status: "approved" })
      .eq("id", payment.id);

    if (errUpdate) throw errUpdate;

    // 2️⃣ Ambil wallet user yang melakukan deposit (unit bisnis)
    const { data: walletUnit, error: errUnit } = await supabase
      .from("wallet")
      .select("*")
      .eq("user_id", payment.user_id)
      .maybeSingle();

    if (errUnit) throw errUnit;

    if (walletUnit) {
      // ✅ Tambahkan saldo_deposit sesuai jumlah payment
      await supabase
        .from("wallet")
        .update({
          saldo_deposit: walletUnit.saldo_deposit + (payment.amount || 0),
          // saldo_real bisa tetap atau ikut bertambah jika memang ingin unit bisa langsung pakai
          // saldo_real: walletUnit.saldo_real + (payment.amount || 0),
        })
        .eq("user_id", payment.user_id);
    }

    // 3️⃣ Update saldo pelanggan jika ada
    if (payment.pelanggan_id) {
      const { data: walletPelanggan, error: errPel } = await supabase
        .from("wallet")
        .select("*")
        .eq("user_id", payment.pelanggan_id)
        .maybeSingle();

      if (errPel) throw errPel;

      if (walletPelanggan) {
        await supabase
          .from("wallet")
          .update({
            saldo_real: walletPelanggan.saldo_real + (payment.amount || 0),
          })
          .eq("user_id", payment.pelanggan_id);
      }
    }

    // 4️⃣ Reload data wallet & pending deposit
    await fetchData();

    alert("Deposit berhasil diapprove dan saldo terupdate sesuai kolom.");
  } catch (err) {
    console.error(err);
    alert("Gagal approve deposit: " + (err.message || err));
  }
};


  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4 md:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 text-[#FB6B00]"
      >
        <CreditCard size={28} />
        <h1 className="text-3xl font-bold">Wallet Admin</h1>
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
            Pantau saldo semua unit bisnis & pelanggan. Approve deposit unit
            bisnis agar saldo wallet terupdate otomatis sesuai trigger di
            database.
          </p>
        </div>
      </motion.div>

      {/* Deposit Pending Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow p-4 border">
        <h2 className="text-lg font-semibold mb-4">Deposit Pending</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-orange-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nama
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Gateway
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Jumlah
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Tanggal
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">
                  {p.users?.nama || p.user_id}
                </td>
                <td className="px-4 py-2 text-sm">{p.gateway}</td>
                <td className="px-4 py-2 text-sm">
                  Rp {Number(p.amount).toLocaleString()}
                </td>
                <td className="px-4 py-2 text-sm">
                  {new Date(p.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 text-sm">
                  <button
                    onClick={() => approveDeposit(p)}
                    className="bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-xs"
                  >
                    <CheckCircle size={14} /> Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Semua Wallet Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow p-4 border">
        <h2 className="text-lg font-semibold mb-4">Semua Wallet</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Nama
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Saldo Deposit
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Saldo Real
              </th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((w, index) => (
              <tr key={w.user_id + index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">
                  {w.users?.nama || w.user_id}
                </td>
                <td className="px-4 py-2 text-sm">
                  Rp {w.saldo_deposit?.toLocaleString() || 0}
                </td>
                <td className="px-4 py-2 text-sm">
                  Rp {w.saldo_real?.toLocaleString() || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
