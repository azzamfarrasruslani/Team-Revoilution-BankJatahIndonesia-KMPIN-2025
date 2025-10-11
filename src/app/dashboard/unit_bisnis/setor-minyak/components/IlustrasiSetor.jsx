"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { UploadCloud, Info } from "lucide-react";

export default function IlustrasiSetor({ unitSaldo }) {
  return (
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
          Tukarkan minyak bekas pelanggan menjadi <strong>saldo digital</strong>. Simpan minyak dalam wadah bersih dan hindari pencampuran dengan air atau zat lain.
        </p>
        <div className="flex items-start gap-3 bg-orange-100/30 border-l-4 border-[#FB6B00] p-4 rounded-lg">
          <Info size={20} className="text-[#FB6B00] mt-0.5" />
          <span className="text-sm text-[#FB6B00] leading-relaxed">
            Minimal setor: <strong>0.1 Liter</strong>
          </span>
        </div>
        <p className="text-sm text-gray-700">
          Saldo unit bisnis saat ini: <strong>Rp {unitSaldo.toLocaleString()}</strong>
        </p>
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
  );
}
