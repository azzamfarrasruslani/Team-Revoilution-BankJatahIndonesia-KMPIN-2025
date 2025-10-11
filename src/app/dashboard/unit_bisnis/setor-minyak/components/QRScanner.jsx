"use client";
import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function QRScanner({ qrScan, onScan }) {
  const qrRef = useRef(null);

  useEffect(() => {
    let html5QrCode;
    let isActive = false;

    if (qrScan && qrRef.current) {
      html5QrCode = new Html5Qrcode("reader");

      html5QrCode
        .start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 250 },
          (decodedText) => {
            if (!isActive) return;
            onScan(decodedText);

            html5QrCode
              .stop()
              .then(() => {
                isActive = false;
              })
              .catch((err) => console.warn("Stop failed:", err));
          },
          (err) => console.log("Scan error:", err)
        )
        .then(() => {
          isActive = true;
        })
        .catch((err) => console.error("Start failed:", err));
    }

    return () => {
      if (html5QrCode && isActive) {
        html5QrCode.stop().catch(() => {});
        isActive = false;
      }
    };
  }, [qrScan, onScan]);

  return qrScan ? (
    <div id="reader" ref={qrRef} className="w-full h-64 border rounded-lg overflow-hidden mt-2" />
  ) : null;
}
