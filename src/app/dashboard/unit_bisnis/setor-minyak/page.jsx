"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CheckCircle, UploadCloud, Droplet, Info } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Html5Qrcode } from "html5-qrcode";

export default function SetorMinyakUnitPage() {
  const [volume, setVolume] = useState("");
  const [pelangganId, setPelangganId] = useState("");
  const [qrScan, setQrScan] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const qrRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pelangganId) return alert("Pelanggan belum dipilih");

    try {
      // Ambil user aktif (unit bisnis)
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("Unit bisnis belum login");

      // Cari pelanggan berdasarkan qr_code_id
      const { data: pelanggan, error: pelangganError } = await supabase
        .from("users")
        .select("id")
        .eq("qr_code_id", pelangganId)
        .maybeSingle();

      if (pelangganError) throw pelangganError;
      if (!pelanggan)
        throw new Error("QR tidak valid atau pelanggan tidak ditemukan.");

      // Simpan ke tabel setoran
      const { error } = await supabase.from("setoran").insert([
        {
          pelanggan_id: pelanggan.id,
          unit_id: user.id,
          volume_liter: parseFloat(volume),
          status: "pending",
          poin_diberikan: Math.floor(volume * 10),
          topup_unit: 0,
        },
      ]);

      if (error) throw error;

      setSubmitted(true);
      setVolume("");
      setPelangganId("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  useEffect(() => {
    let html5QrCode;
    let isActive = false;

    if (qrScan && qrRef.current) {
      html5QrCode = new Html5Qrcode("reader");

      html5QrCode
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            if (!isActive) return;
            setPelangganId(decodedText);

            html5QrCode
              .stop()
              .then(() => {
                isActive = false;
                setQrScan(false);
              })
              .catch((err) => console.warn("Stop failed:", err));
          },
          (err) => console.log("Scan error:", err)
        )
        .then(() => {
          isActive = true;
        })
        .catch((err) => console.error("Start failed:", err));
    }

    return () => {
      if (html5QrCode && isActive) {
        html5QrCode.stop().catch(() => {});
        isActive = false;
      }
    };
  }, [qrScan]);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Kiri - Ilustrasi */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden"
      >
        <div className="p-8 space-y-5">
          <h1 className="text-3xl font-bold text-[#FB6B00] flex items-center gap-3">
            <UploadCloud size={28} /> Setor Minyak Jelantah
          </h1>
          <p className="text-gray-700 leading-relaxed text-[15px]">
            Tukarkan minyak bekas pelanggan menjadi{" "}
            <strong>saldo digital</strong>. Simpan minyak dalam wadah bersih dan
            hindari pencampuran dengan air atau zat lain.
          </p>

          <div className="flex items-start gap-3 bg-orange-100/30 border-l-4 border-[#FB6B00] p-4 rounded-lg">
            <Info size={20} className="text-[#FB6B00] mt-0.5" />
            <span className="text-sm text-[#FB6B00] leading-relaxed">
              Minimal setor: <strong>0.1 Liter</strong>
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

      {/* Kanan - Form Unit Bisnis */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-6"
      >
        <h2 className="text-xl font-semibold text-[#FB6B00] flex items-center gap-2 mb-4">
          <Droplet size={22} className="text-[#FB6B00]" />
          Formulir Penyetoran (Unit Bisnis)
        </h2>

        <button
          onClick={() => setQrScan(!qrScan)}
          className="bg-[#FB6B00] text-white px-4 py-2 rounded-lg"
        >
          {qrScan ? "Tutup Scanner" : "Scan QR Pelanggan"}
        </button>

        {qrScan && (
          <div
            id="reader"
            ref={qrRef}
            className="w-full h-64 border rounded-lg overflow-hidden mt-2"
          />
        )}

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
            <CheckCircle size={18} /> Setoran berhasil dicatat!
          </div>
        )}

        {pelangganId && (
          <div className="mt-6 p-4 border rounded-lg bg-gray-50">
            <p>
              <strong>Pelanggan ID:</strong> {pelangganId}
            </p>
            <p>
              <strong>Volume:</strong> {volume} liter
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
