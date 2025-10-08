"use client";

import { Bell, User, Search, HelpCircle, Settings, MessageCircle, Grid } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md h-18 px-4 flex justify-between items-center ml-64">
      {/* Bagian kiri: search + shortcut */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-1 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-[#FB6B00] focus:border-[#FB6B00]"
          />
          <Search size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* Shortcut Icons */}
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Grid size={18} className="text-gray-600" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition relative">
          <MessageCircle size={18} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <HelpCircle size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Bagian kanan: notifikasi & profil user */}
      <div className="flex items-center gap-3">
        {/* Notifikasi */}
        <button className="relative p-1 rounded-full hover:bg-gray-100 transition">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Pengaturan */}
        <button className="p-1 rounded-full hover:bg-gray-100 transition">
          <Settings size={18} className="text-gray-600" />
        </button>

        {/* Profil User */}
        <div className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 transition rounded-full p-1">
          <User size={20} className="text-gray-600" />
          <span className="text-gray-700 font-medium text-sm truncate">Admin</span>
        </div>
      </div>
    </header>
  );
}
