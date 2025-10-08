"use client";

import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import Link from "next/link";

export default function TabunganJelantahPage() {
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
          <div className="p-3 rounded-full bg-yellow-500 text-white">
            <CreditCard size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Tabungan Jelantah
          </h1>
        </div>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl">
          Simpan minyak jelantahmu di program tabungan ini dan kumpulkan poin
          untuk ditukar dengan hadiah menarik. Program ini membantu menjaga
          lingkungan sekaligus memberi manfaat untukmu.
        </p>
      </motion.div>

      {/* Konten Detail */}
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Cara Kerja</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Kumpulkan minyak jelantah minimal 1 liter.</li>
            <li>Serahkan ke pos pengumpulan terdekat.</li>
            <li>Dapatkan poin yang langsung masuk ke akunmu.</li>
            <li>Poin bisa ditukar dengan hadiah di halaman reward.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Manfaat</h2>
          <p className="text-gray-600">
            Dengan mengikuti Tabungan Jelantah, kamu berkontribusi dalam
            menjaga lingkungan dari pencemaran minyak bekas sekaligus
            memperoleh hadiah yang menarik.
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
