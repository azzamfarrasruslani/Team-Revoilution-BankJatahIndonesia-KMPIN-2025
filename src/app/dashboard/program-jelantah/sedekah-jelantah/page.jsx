"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function SedekahJelantahPage() {
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
          <div className="p-3 rounded-full bg-pink-500 text-white">
            <Heart size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Sedekah Jelantah
          </h1>
        </div>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl">
          Donasikan minyak jelantahmu untuk program sosial Bank Jatah.
          Hasilnya akan digunakan untuk mendukung kegiatan amal dan
          pemberdayaan masyarakat.
        </p>
      </motion.div>

      {/* Konten Detail */}
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Cara Kerja</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Kumpulkan minyak jelantah yang tidak terpakai.</li>
            <li>Serahkan ke titik donasi terdekat atau mitra penjemputan.</li>
            <li>Minyak jelantah akan diolah dan hasilnya didonasikan.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Manfaat</h2>
          <p className="text-gray-600">
            Dengan sedekah jelantah, kamu ikut berkontribusi dalam kegiatan
            sosial, membantu masyarakat kurang mampu, serta mendukung
            pengolahan minyak jelantah yang ramah lingkungan.
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
