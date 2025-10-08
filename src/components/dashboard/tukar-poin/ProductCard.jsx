"use client";

import { Star, Tag, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductCard({ product, userPoints, onRedeem }) {
  const isAvailable = userPoints >= product.points && product.stock > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col p-4"
    >
      {/* Badge Populer */}
      {product.popular && (
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#FB6B00] text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
          <Star size={12} />
          Populer
        </div>
      )}

      {/* Badge Habis */}
      {product.stock === 0 && (
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
          <XCircle size={12} />
          Habis
        </div>
      )}

      {/* Gambar Produk dengan hover effect */}
      <div className="overflow-hidden rounded-lg mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="h-40 w-full object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Nama & Kategori */}
      <h2 className="font-semibold text-gray-700 text-lg">{product.name}</h2>
      <div className="flex items-center gap-1 mb-2">
        <Tag size={14} className="text-gray-500" />
        <span className="text-gray-500 text-sm">{product.category}</span>
      </div>

      {/* Deskripsi */}
      <p className="text-gray-500 text-sm mb-3">{product.desc}</p>

      {/* Poin */}
      <div className="flex items-center gap-1 text-gray-700 mb-3 font-medium">
        <Star size={14} className="text-[#FB6B00]" />
        Butuh {product.points} poin
      </div>

      {/* Button Tukar */}
      <button
        onClick={() => onRedeem(product)}
        disabled={!isAvailable}
        className={`mt-auto py-2 px-4 rounded-lg font-semibold transition-all ${
          isAvailable
            ? "bg-[#FB6B00] text-white hover:bg-[#e65c00] shadow-md hover:shadow-lg"
            : "bg-gray-300 text-gray-600 cursor-not-allowed relative group"
        }`}
      >
        {isAvailable ? (
          "Tukar"
        ) : (
          <span className="group-hover:underline">Tidak cukup poin / Habis</span>
        )}
      </button>
    </motion.div>
  );
}
