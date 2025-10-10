// Navbar.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  User,
  Search,
  HelpCircle,
  Settings,
  MessageCircle,
  Grid,
  Menu,
  ChevronDown,
} from "lucide-react";

export default function Navbar({ session, onToggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getInitials = (name) => {
    if (!name) return "A";
    const names = name.split(" ");
    const initials = names.map((n) => n[0].toUpperCase());
    return initials.slice(0, 2).join("");
  };

  const userName = session?.user?.user_metadata?.nama || session?.user?.email;

  return (
    <header className="bg-white shadow-md h-16 px-4 flex items-center justify-between">
      {/* Hamburger untuk Mobile */}
     <button
  className="md:hidden p-2 rounded-md bg-[#FB6B00] text-white hover:bg-gray-800 transition"
  onClick={onToggleSidebar}
>
  <Menu size={20} />
</button>


      {/* Bagian Kiri: Search dan Ikon */}
      <div className="flex items-center gap-2 flex-1 overflow-hidden">
        <div className="relative flex-1 hidden sm:block"></div>
      </div>

      {/* Bagian Kanan: Notifikasi dan Profil */}
      <div className="relative flex items-center gap-2 ml-2">
        {/* Dropdown Profil */}
        <div className="relative">
          <button
            className="flex items-center gap-1 hover:bg-gray-100 p-1 rounded-full transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="bg-[#FB6B00] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
              {getInitials(userName)}
            </div>
            <span className="hidden sm:block text-sm text-gray-700 font-medium truncate max-w-[100px]">
              {userName}
            </span>
            <ChevronDown size={14} className="text-gray-500" />
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border"
              >
                <ul className="text-sm text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Profil
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Pengaturan
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Keluar
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
