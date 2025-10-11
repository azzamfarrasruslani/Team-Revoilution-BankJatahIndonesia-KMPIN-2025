"use client";

export default function EmptyState({ text = "Tidak ada data setoran." }) {
  return (
    <div className="text-center py-8 text-gray-500 border rounded-lg bg-gray-50">
      {text}
    </div>
  );
}
