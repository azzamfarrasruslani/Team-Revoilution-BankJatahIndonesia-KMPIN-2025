import { motion } from "framer-motion";
import { Star } from "lucide-react"; // sebagai ikon poin

export default function PoinKategori({ userPoints, categories, selectedCategory, setSelectedCategory }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Poin user dengan icon Star */}
      <motion.div
        key={userPoints}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-[#FFF4E6] text-[#FB6B00] px-4 py-2 rounded-full font-semibold text-lg shadow-sm flex items-center gap-2"
      >
        <Star size={16} className="text-[#FB6B00]" />
        <span className="text-lg font-bold">{userPoints}</span>
        <span>Poin</span>
      </motion.div>

      {/* Kategori */}
      <div className="relative flex-1 ml-6 overflow-x-auto">
        <div className="absolute left-0 top-0 bottom-0 w-6 pointer-events-none bg-gradient-to-r from-white"></div>
        <div className="absolute right-0 top-0 bottom-0 w-6 pointer-events-none bg-gradient-to-l from-white"></div>

        <div className="flex gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition flex-shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#FB6B00] text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-[#FB6B00] hover:text-white"
              } focus:outline-none focus:ring-2 focus:ring-[#FB6B00] focus:ring-offset-1`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
