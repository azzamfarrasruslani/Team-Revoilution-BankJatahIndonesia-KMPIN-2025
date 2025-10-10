"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, Search, Bell } from "lucide-react";

export default function Navbar({ session, role, onToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getInitials = (name) => {
    if (!name) return "A";
    const names = name.split(" ");
    const initials = names.map(n => n[0].toUpperCase());
    return initials.slice(0,2).join("");
  };

  const userName = session?.user?.nama || session?.user?.email || "User";

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // bisa tambahkan fungsi pencarian dashboard di sini
  };

  return (
    <header className="bg-white shadow-md h-16 px-4 flex items-center justify-between relative z-40">
      {/* Hamburger untuk mobile */}
      <button
        className="md:hidden p-2 rounded-md bg-[#FB6B00] text-white hover:bg-gray-800 transition"
        onClick={onToggleSidebar}
      >
        <Menu size={20} />
      </button>

      {/* Search bar */}
      <form 
        onSubmit={handleSearch} 
        className="hidden md:flex flex-1 mx-4 max-w-md relative"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari..."
          className="w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FB6B00]"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      </form>

      <div className="flex items-center ml-auto gap-4">
        {/* Notifikasi */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Nama & Role */}
        <div className="relative flex items-center">
          <button
            className="flex items-center gap-3 hover:bg-gray-100 p-1 rounded-full transition relative z-10"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="bg-[#FB6B00] text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">
              {getInitials(userName)}
            </div>
            <div className="flex flex-col items-end ml-2">
              <span className="text-sm text-gray-700 font-medium truncate max-w-[150px] text-right">
                {userName}
              </span>
              <span className="text-xs text-gray-400 capitalize text-right">
                {role || "pelanggan"}
              </span>
            </div>
            <ChevronDown size={14} className="text-gray-500" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border"
              >
                <ul className="text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profil</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Pengaturan</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Keluar</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
