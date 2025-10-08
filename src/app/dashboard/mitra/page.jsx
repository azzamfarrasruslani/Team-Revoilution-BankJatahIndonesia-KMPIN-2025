"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HeroMitra from "@/components/dashboard/mitra/HeroMitra";
import MitraCard from "@/components/dashboard/mitra/MitraCard";

const mitraList = [
  {
    nama: "Mitra Jelantah A",
    lokasi: "Kelurahan Sukamaju, Jakarta",
    kontak: "0812-3456-7890",
    deskripsi: "Melayani penjemputan mulai dari 2 liter.",
    rating: 4.5,
    mapsEmbed: "https://www.google.com/maps/embed?...",
   image: "/images/tukar-poin.jpeg",
  },
  {
    nama: "Mitra Jelantah B",
    lokasi: "Kelurahan Melati, Bandung",
    kontak: "0856-1234-5678",
    deskripsi: "Tersedia drop point dan pembayaran via QRIS.",
    rating: 5,
    mapsEmbed: "https://www.google.com/maps/embed?...",
   image: "/images/tukar-poin.jpeg",
  },
  {
    nama: "Mitra Jelantah C",
    lokasi: "Kelurahan Mawar, Surabaya",
    kontak: "0821-9876-5432",
    deskripsi: "Melayani setor langsung ke tempat mitra.",
    rating: 3.8,
    mapsEmbed: "https://www.google.com/maps/embed?...",
    image: "/images/tukar-poin.jpeg",
  },
];

export default function MitraPage() {
  const [search, setSearch] = useState("");

  const filteredMitra = mitraList.filter(
    (mitra) =>
      mitra.nama.toLowerCase().includes(search.toLowerCase()) ||
      mitra.lokasi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroMitra search={search} setSearch={setSearch} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredMitra.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center text-gray-500 text-sm py-10"
          >
            Mitra tidak ditemukan berdasarkan pencarianmu.
          </motion.div>
        ) : (
          filteredMitra.map((mitra, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.03 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MitraCard mitra={mitra} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
