"use client";

import { Building2, MapPin, Phone, Star, MapPin as MapIcon } from "lucide-react";

export default function MitraCard({ mitra }) {
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={i} size={16} className="text-gray-300" />
        ))}
      </>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all flex flex-col justify-between">
      {/* Gambar Mitra */}
      <div className="relative w-full h-40 rounded-t-2xl overflow-hidden">
        <img
          src={mitra.image || "/images/default-mitra.jpg"}
          alt={mitra.nama}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info Mitra */}
      <div className="flex flex-col gap-2 p-5">
        <h3 className="flex items-center gap-2 text-lg font-bold text-[#FB6B00]">
          <Building2 size={20} /> {mitra.nama}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapIcon size={16} /> {mitra.lokasi}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone size={16} /> {mitra.kontak}
        </div>
        <p className="text-sm text-gray-500 truncate">{mitra.deskripsi}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 mt-1">
          {renderStars(mitra.rating)}
          <span className="text-xs text-gray-400 ml-1">({mitra.rating})</span>
        </div>

        {/* Tombol aksi */}
        <div className="flex gap-2 mt-2">
          {/* Tombol WA */}
          <a
            href={`https://wa.me/62${mitra.kontak.replace(/[^0-9]/g, "").slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition"
          >
            Hubungi via WA
          </a>

          {/* Tombol Map */}
          <a
            href={mitra.mapsEmbed}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#FB6B00] hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium flex items-center justify-center gap-2 transition"
          >
            Lihat Peta
          </a>
        </div>
      </div>
    </div>
  );
}
