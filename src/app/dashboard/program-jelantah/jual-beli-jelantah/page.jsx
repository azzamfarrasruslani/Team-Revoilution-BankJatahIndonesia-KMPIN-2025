"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function JualBeliJelantahPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-green-500 text-white">
            <ShoppingCart size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Jual Beli Jelantah
          </h1>
        </div>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl">
          Jual minyak jelantahmu ke mitra resmi dan dapatkan saldo langsung.
          Program ini memberikan keuntungan finansial sekaligus mendukung
          pengolahan minyak jelantah secara aman.
        </p>
      </motion.div>

      {/* Konten Detail */}
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Cara Kerja</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Kumpulkan minyak jelantah minimal 2 liter.</li>
            <li>Hubungi mitra resmi untuk jadwal penjemputan.</li>
            <li>Terima pembayaran langsung ke saldo e-wallet kamu.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Manfaat</h2>
          <p className="text-gray-600">
            Program ini memberi kesempatan untuk menghasilkan uang tambahan
            dari minyak jelantah bekas, sekaligus mendukung daur ulang yang
            ramah lingkungan.
          </p>
        </section>

        <div className="pt-4">
          <Link
            href="/dashboard/program-jelantah"
            className="text-[#FB6B00] font-semibold hover:underline"
          >
            ← Kembali ke Program Jelantah
          </Link>
        </div>
      </div>
    </div>
  );
}
