"use client";

export default function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg flex items-center gap-4 p-5">
      <div className="p-3 rounded-full bg-[#FB6B00] text-white flex items-center justify-center">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
