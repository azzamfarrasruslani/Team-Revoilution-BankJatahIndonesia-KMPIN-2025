"use client";

export default function ModalDetail({ row, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#FB6B00]">Detail Setoran</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>
        <div className="space-y-4">
          {Object.entries(row).map(([key, value]) => (
            <div key={key} className="flex justify-between bg-gray-50 px-4 py-2 rounded-lg shadow-sm">
              <span className="text-gray-500 font-medium">{key}</span>
              <span className="text-gray-800 font-semibold">{String(value)}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
