"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

export default function ToastNotification({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50"
        >
          <CheckCircle size={18} />
          <span className="text-sm">{toast}</span>
          <button onClick={onClose}>
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
