"use client";

import QRCode from "react-qr-code";

export default function QRInfo({ user }) {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-white to-orange-50 p-6 rounded-3xl shadow-xl space-y-6 ">
      {/* QR Code */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <QRCode value={user.qr_code_id} size={200} />
      </div>

      {/* Info User */}
      <div className="text-center space-y-1">
        <p className="text-lg font-semibold text-orange-700">{user.nama}</p>
        <p className="text-gray-600 text-sm">{user.email}</p>
        <p className="text-gray-700 font-medium">Poin: {user.poin}</p>
      </div>
    </div>
  );
}
