"use client";

import { Building2, Search } from "lucide-react";

export default function HeroMitra({ search, setSearch }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-6 py-8 shadow-md flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
      {/* Ikon Besar */}
      <div className="bg-[#FB6B00]/10 p-4 rounded-full flex-shrink-0">
        <Building2 size={48} className="text-[#FB6B00]" />
      </div>

      {/* Judul & Deskripsi */}
      <div className="flex-1 space-y-3 md:space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-snug">
          Temukan Mitra Penampung Jelantah
        </h1>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
          Jelajahi mitra resmi Bank Jatah di berbagai wilayah. Cari berdasarkan kelurahan atau nama mitra untuk memulai penyetoran minyak bekas.
        </p>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mt-4">
          <div className="flex items-center border border-gray-300 bg-white rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-[#FB6B00] transition">
            <span className="pl-3 flex items-center justify-center text-gray-400">
              <Search size={20} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama mitra, kelurahan, atau kota..."
              className="flex-1 px-3 py-2 text-sm sm:text-base text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="pr-3 text-gray-400 hover:text-gray-600 transition"
                title="Bersihkan"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Call-to-action */}
        <button className="mt-4 inline-flex items-center gap-2 bg-[#FB6B00] hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-xl shadow-md transition">
          Lihat Semua Mitra
        </button>
      </div>
    </div>
  );
}
