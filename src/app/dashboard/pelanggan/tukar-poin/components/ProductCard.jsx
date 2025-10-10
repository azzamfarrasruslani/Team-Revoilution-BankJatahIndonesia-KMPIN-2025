"use client";

import { Star, Tag, XCircle, Coins } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product, userPoints, onRedeem }) {
  const isAvailable = userPoints >= product.poin && product.stock > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col border border-gray-100"
    >
      {/* Badge Populer (opsional) */}
      {product.popular && (
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#FB6B00] text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
          <Star size={12} />
          Populer
        </div>
      )}

      {/* Badge Habis */}
      {product.stock === 0 && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
          <XCircle size={12} />
          Habis
        </div>
      )}

      {/* Gambar Produk */}
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={product.image || "/images/tukar-poin.jpeg"}
          alt={product.nama}
          className="h-40 w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Konten Produk */}
      <div className="flex flex-col flex-grow p-4 space-y-2">
        <h2 className="font-semibold text-gray-800 text-base truncate">
          {product.nama}
        </h2>

        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Tag size={13} />
          <span>Olahan Minyak Jelantah</span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 leading-snug">
          {product.deskripsi}
        </p>

        {/* Info poin dan stok */}
        <div className="flex justify-between items-center text-sm font-medium mt-2">
          <div className="flex items-center gap-1 text-[#FB6B00]">
            <Coins size={14} /> {product.poin} poin
          </div>
          <span
            className={`${
              product.stock > 0 ? "text-green-600" : "text-red-500"
            } text-xs font-semibold`}
          >
            {product.stock > 0 ? `${product.stock} stok` : "Habis"}
          </span>
        </div>

        {/* Harga Produk */}
        <div className="flex items-center justify-between mt-1 text-sm text-gray-700 font-semibold">
          <span>Harga:</span>
          <span className="text-green-600">
            Rp {Number(product.harga_rp).toLocaleString("id-ID")}
          </span>
        </div>
      </div>

      {/* Tombol Tukar */}
      <div className="p-4 pt-0">
        <button
          onClick={() => onRedeem(product)}
          disabled={!isAvailable}
          className={`w-full py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
            isAvailable
              ? "bg-[#FB6B00] text-white hover:bg-[#e55e00] shadow-md"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isAvailable ? "Tukar Poin" : "Tidak Cukup Poin / Habis"}
        </button>
      </div>
    </motion.div>
  );
}
