"use client";

import { motion } from "framer-motion";

export default function ConfirmModal({ product, onConfirm, onCancel }) {
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full space-y-4"
      >
        <h3 className="text-lg font-semibold text-gray-800">Konfirmasi Penukaran</h3>
        <p className="text-sm text-gray-600">
          Anda yakin ingin menukar <strong>{product.name}</strong> seharga{" "}
          <strong>{product.points} poin</strong>?
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Batal
          </button>
          <button
            onClick={() => onConfirm(product)}
            className="px-4 py-2 bg-[#FB6B00] text-white rounded hover:bg-orange-600"
          >
            Konfirmasi
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
