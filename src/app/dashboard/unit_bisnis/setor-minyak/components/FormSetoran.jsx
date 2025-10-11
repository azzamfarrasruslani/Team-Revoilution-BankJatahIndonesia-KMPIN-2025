"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle, Droplet } from "lucide-react";
import QRScanner from "./QRScanner";

export default function FormSetoran() {
  const [volume, setVolume] = useState("");
  const [pelangganId, setPelangganId] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [qrScan, setQrScan] = useState(false);
  const [unitSaldo, setUnitSaldo] = useState(0); // hanya info, saldo deposit unit

  const RATE_PER_LITER = 6000;

  // Ambil saldo deposit unit bisnis
  const fetchSaldo = async () => {
    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error("Unit bisnis belum login");

      const { data: walletData } = await supabase
        .from("wallet")
        .select("saldo_deposit")
        .eq("user_id", user.id)
        .maybeSingle();

      setUnitSaldo(walletData?.saldo_deposit ?? 0);
    } catch (err) {
      console.error(
        "Gagal mengambil saldo:",
        err instanceof Error ? err.message : err
      );
      setUnitSaldo(0);
    }
  };

  useEffect(() => {
    fetchSaldo();
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pelangganId) return alert("Pelanggan belum dipilih");
    if (!volume || parseFloat(volume) <= 0)
      return alert("Masukkan volume valid");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error("Unit bisnis belum login");

      // Ambil data pelanggan dari qr_code_id
      const { data: pelanggan } = await supabase
        .from("users")
        .select("id")
        .eq("qr_code_id", pelangganId)
        .maybeSingle();

      if (!pelanggan) throw new Error("Pelanggan tidak ditemukan");

      const nilaiRupiah = Math.floor(parseFloat(volume) * RATE_PER_LITER);
      const poin = Math.floor(parseFloat(volume));

      // Simpan setoran dengan status pending
      await supabase.from("setoran").insert([
        {
          pelanggan_id: pelanggan.id,
          unit_id: user.id,
          volume_liter: parseFloat(volume),
          status: "pending", // tetap pending sampai admin approve
          poin_diberikan: poin,
          topup_unit: nilaiRupiah,
        },
      ]);

      setSubmitted(true);
      setVolume("");
      setPelangganId("");
      setTimeout(() => setSubmitted(false), 3000);

      fetchSaldo(); // refresh saldo unit bisnis
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.message || JSON.stringify(err)));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6">
      <h2 className="text-xl font-semibold text-[#FB6B00] flex items-center gap-2 mb-4">
        <Droplet size={22} className="text-[#FB6B00]" />
        Formulir Penyetoran (Unit Bisnis)
      </h2>

      <p className="text-sm mb-2">
        <strong>Saldo Deposit Unit Bisnis:</strong> Rp{" "}
        {unitSaldo.toLocaleString()} (info)
      </p>

      <button
        onClick={() => setQrScan(!qrScan)}
        className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg"
      >
        {qrScan ? "Tutup Scanner" : "Scan QR Pelanggan"}
      </button>

      <QRScanner qrScan={qrScan} onScan={setPelangganId} />

      <div className="space-y-2 mt-2">
        <label className="text-sm font-medium">
          Atau Masukkan QR Code ID Pelanggan
        </label>
        <input
          type="text"
          placeholder="Scan atau input QR code ID"
          value={pelangganId}
          onChange={(e) => setPelangganId(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Volume Minyak (liter)</label>
        <input
          type="number"
          step="0.01"
          min="0.1"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded-lg w-full font-semibold"
      >
        Simpan Setoran
      </button>

      {submitted && (
        <div className="flex items-center gap-2 text-green-600 mt-2 text-sm">
          <CheckCircle size={18} /> Setoran berhasil dicatat! Menunggu
          konfirmasi admin sebelum saldo pelanggan bertambah.
        </div>
      )}
    </div>
  );
}
