"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, ShoppingCart, Heart, Search } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    name: "Tabungan Jelantah",
    desc: "Simpan minyak jelantahmu dan kumpulkan poin untuk ditukar hadiah menarik.",
    icon: CreditCard,
    href: "/dashboard/program-jelantah/tabungan-jelantah",
    color: "bg-amber-500",
  },
  {
    name: "Jual Beli Jelantah",
    desc: "Jual minyak jelantahmu ke mitra resmi dan dapatkan saldo langsung.",
    icon: ShoppingCart,
    href: "/dashboard/program-jelantah/jual-beli-jelantah",
    color: "bg-green-500",
  },
  {
    name: "Sedekah Jelantah",
    desc: "Donasikan minyak jelantahmu untuk program sosial Bank Jatah.",
    icon: Heart,
    href: "/dashboard/program-jelantah/sedekah-jelantah",
    color: "bg-pink-500",
  },
];

export default function ProgramJelantahPage() {
  const [search, setSearch] = useState("");

  const filteredPrograms = programs.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 space-y-10">
      {/* Header + Search */}
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
>
  {/* Title + desc */}
  <div className="space-y-3 md:max-w-2xl">
    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
      Program Jelantah
    </h1>
    <p className="text-gray-600 text-base md:text-lg">
      Pilih program yang sesuai untuk mulai menabung, menjual, atau
      bersedekah minyak jelantah. Setiap program punya manfaat berbeda
      untukmu dan lingkungan 🌱.
    </p>
  </div>

  {/* Search */}
  <div className="relative w-full max-w-sm">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
    <input
      type="text"
      placeholder="Cari program..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 shadow-sm 
                 placeholder:text-gray-500 text-gray-800
                 focus:outline-none focus:ring-2 focus:ring-[#FB6B00] focus:border-[#FB6B00] transition-all"
    />
  </div>
</motion.div>


      {/* Program Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPrograms.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center text-gray-500 py-10"
          >
            Program tidak ditemukan.
          </motion.div>
        ) : (
          filteredPrograms.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link href={program.href}>
                <div className="relative rounded-2xl p-6 h-56 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {/* Background warna + overlay */}
                  <div className={`absolute inset-0 ${program.color}`}></div>
                  <div className="absolute inset-0 bg-black/25"></div>

                  {/* Icon dekorasi */}
                  <div className="absolute bottom-0 right-0 opacity-20 text-white">
                    <program.icon size={120} />
                  </div>

                  {/* Konten */}
                  <div className="relative text-white">
                    <h2 className="text-xl font-bold mb-2">{program.name}</h2>
                    <p className="text-sm leading-relaxed opacity-90">
                      {program.desc}
                    </p>
                  </div>

                  {/* Tombol */}
                  <span className="relative text-white font-semibold text-sm mt-2 underline">
                    Lihat Program →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
