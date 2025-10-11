"use client";

import { useState } from "react";
import {
  MessageCircleQuestion,
  Mail,
  Phone,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const faqs = [
  {
    question: "Bagaimana cara menyetor minyak jelantah?",
    answer:
      "Kamu bisa menyetor minyak melalui halaman 'Setor Minyak' di dashboard. Masukkan volume dan jenis minyak lalu kirim.",
  },
  {
    question: "Kapan saldo masuk ke dompet digital?",
    answer:
      "Saldo biasanya masuk maksimal 1x24 jam setelah disetujui oleh tim validasi.",
  },
  {
    question: "Apakah bisa setor langsung ke mitra?",
    answer:
      "Ya, kamu bisa langsung datang ke mitra penampung yang tersedia dan mencantumkan kode setor.",
  },
  {
    question: "Apakah minyak harus disaring dulu?",
    answer:
      "Disarankan disaring agar tidak ada kotoran padat seperti nasi, sayur, atau plastik.",
  },
];

export default function BantuanPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      {/* Header Full Width dengan Gambar Panjang */}
      <div className="w-full bg-gradient-to-r from-[#FB6B00] to-orange-400 px-4 md:px-6 py-12 rounded-xl shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
          {/* Gambar Full Lebar */}
          <Image
            src="/images/bantuan.png"
            alt="Ilustrasi Bantuan"
            width={1600}
            height={400}
            className="w-full max-h-[320px] object-cover rounded-xl shadow"
          />

          {/* Judul & Deskripsi */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold flex justify-center items-center gap-3 text-white">
              <HelpCircle size={36} className="drop-shadow" />
              Pusat Bantuan Pengguna
            </h1>
            <p className="text-white/90 text-base max-w-2xl mx-auto">
              Temukan jawaban umum tentang penyetoran minyak, penggunaan dompet
              digital, serta informasi seputar layanan Bank Jatah Indonesia.
            </p>

            {/* Tombol Scroll ke FAQ */}
            <a
              href="#faq"
              className="inline-block mt-4 bg-white text-[#FB6B00] hover:bg-orange-100 font-semibold px-5 py-2 rounded-lg text-sm shadow-md transition"
            >
              Lihat FAQ
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(i)}
              className="flex justify-between items-center w-full px-6 py-4 text-left text-[#FB6B00] font-semibold text-base hover:bg-orange-50 rounded-t-xl"
            >
              <span className="flex gap-2 items-center">
                <MessageCircleQuestion size={20} />
                {faq.question}
              </span>
              {openIndex === i ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden px-6 pb-4 text-gray-700 text-sm"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Kontak Admin Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[#FB6B00] to-orange-500 text-white rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md"
      >
        <div className="flex items-start gap-3">
          <div className="bg-white/20 p-2 rounded-md">
            <Info size={24} />
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-1">
              Masih butuh bantuan lebih lanjut?
            </h4>
            <p className="text-sm opacity-90">
              Hubungi admin kami melalui email atau WhatsApp.
            </p>
          </div>
        </div>
        <div className="flex gap-3 flex-wrap">
          <a
            href="mailto:admin@bankjatah.com"
            className="flex items-center gap-2 bg-white text-[#FB6B00] px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-100 transition"
          >
            <Mail size={16} />
            Email Admin
          </a>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition"
          >
            <Phone size={16} />
            WhatsApp
          </a>
        </div>
      </motion.div>
    </div>
  );
}
