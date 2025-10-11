"use client";

export default function StatCard({ icon: Icon, title, value, trend }) {
  return (
    <div
      className="
        relative overflow-hidden bg-gradient-to-br from-white to-orange-50
        border border-orange-100 rounded-3xl shadow-md
        flex items-center gap-5 p-6
      "
    >
      {/* Elemen dekoratif */}
      <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-100 rounded-full opacity-40 blur-2xl"></div>

      {/* Ikon */}
      <div className="p-4 rounded-2xl bg-[#FB6B00] text-white flex items-center justify-center shadow-md">
        <Icon size={28} strokeWidth={2.5} />
      </div>

      {/* Konten */}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500 tracking-wide uppercase">
          {title}
        </p>
        <p className="text-3xl font-extrabold text-gray-900 mt-1">{value}</p>

        {/* Indikator tren (opsional) */}
        {trend && (
          <p
            className={`text-sm mt-1 font-semibold ${
              trend > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend > 0 ? `▲ +${trend}% dari minggu lalu` : `▼ ${trend}% dari minggu lalu`}
          </p>
        )}
      </div>
    </div>
  );
}
