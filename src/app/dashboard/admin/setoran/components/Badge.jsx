"use client";

import { Badge as BadgeUI } from "@/components/ui/badge";

export default function Badge({ color = "default", text }) {
  const variants = {
    green: "bg-green-100 text-green-700 hover:bg-green-200",
    yellow: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    red: "bg-red-100 text-red-700 hover:bg-red-200",
    default: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  };

  return (
    <BadgeUI
      className={`${variants[color]} inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors`}
    >
      {text}
    </BadgeUI>
  );
}
