"use client";

export default function DashboardCTA() {
  return (
    <div className="bg-[#FB6B00] text-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center hover:shadow-lg transition">
      <div>
        <h2 className="text-lg font-semibold">Kelola Setoran</h2>
        <p className="text-sm mt-1">
          Validasi dan pantau setoran pelanggan agar operasional tetap lancar.
        </p>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <button className="bg-white text-[#FB6B00] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-100 transition">
          Lihat Semua Setoran
        </button>
        <button className="bg-white text-[#FB6B00] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-orange-100 transition">
          Tambah Setoran Manual
        </button>
      </div>
    </div>
  );
}
