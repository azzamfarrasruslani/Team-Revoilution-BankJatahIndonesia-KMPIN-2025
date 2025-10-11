"use client";

export default function FilterStatus({ statusList, selected, onSelect }) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {statusList.map((status) => (
        <button
          key={status}
          onClick={() => onSelect(status)}
          className={`px-4 py-2 text-sm font-semibold rounded-full shadow-sm transition-all duration-200 ${
            selected === status
              ? "bg-[#FB6B00] text-white shadow-md scale-105"
              : "bg-white border border-gray-300 text-gray-600 hover:bg-orange-50"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
}
