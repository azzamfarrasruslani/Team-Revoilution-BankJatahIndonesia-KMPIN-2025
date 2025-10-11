"use client";
import { Badge } from "@/components/ui/badge";

export default function StatCardUnit({ icon: Icon, title, value, badge, subtitle, className }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col items-start gap-3 p-5 ${className}`}>
      <div className="flex items-center gap-3 w-full">
        <div className="p-3 rounded-full bg-[#FB6B00] text-white flex items-center justify-center">
          <Icon size={24} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
      {badge && <div>{badge}</div>}
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
}
