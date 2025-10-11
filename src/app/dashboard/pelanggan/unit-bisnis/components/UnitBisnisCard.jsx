"use client";

import { Building2, Mail, Phone, MapPin } from "lucide-react";

export default function UnitBisnisCard({ unit }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 flex flex-col justify-between ">
      {/* Header: Nama + Status */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-lg font-bold text-[#FB6B00]">
          <Building2 size={20} /> {unit.nama}
        </h3>
        {unit.status && (
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              unit.status === "aktif"
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {unit.status}
          </span>
        )}
      </div>

      {/* Detail Kontak & Alamat */}
      <div className="flex flex-col gap-3 text-gray-600 text-sm">
        <div className="flex items-center gap-2">
          <Mail size={16} className="text-gray-400" />
          <span className="font-medium">Email:</span>
          <span>{unit.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-gray-400" />
          <span className="font-medium">No HP:</span>
          <span>{unit.no_hp}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-400" />
          <span className="font-medium">Alamat:</span>
          <span>{unit.alamat}</span>
        </div>
      </div>
    </div>
  );
}
