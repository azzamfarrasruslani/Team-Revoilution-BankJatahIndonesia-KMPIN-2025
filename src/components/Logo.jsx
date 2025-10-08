"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo({ size = 140 }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo-bankjatah.png"  // Pastikan file ini ADA di folder /public/images/
        alt="Logo Bank Jatah Indonesia"
        width={size}
        height={size / 3}
        priority
      />
    </Link>
  );
}
