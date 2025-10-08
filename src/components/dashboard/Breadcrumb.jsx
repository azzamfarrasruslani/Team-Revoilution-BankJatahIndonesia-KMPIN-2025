"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Folder, FileText } from "lucide-react";

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-sm mb-4 mx-5 p-3 bg-white shadow rounded">
      {/* Home icon */}
      <Link
        href="/"
        className="flex items-center text-gray-600 hover:text-[#FB6B00] transition font-medium"
      >
        <Home size={16} className="mr-2" />
        Home
      </Link>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const href = "/" + segments.slice(0, index + 1).join("/");

        const Icon = isLast ? FileText : Folder;

        return (
          <span key={index} className="flex items-center">
            <span className="mx-2 text-gray-400">/</span>

            {isLast ? (
              <span className="flex items-center text-gray-800 font-semibold capitalize">
                <Icon size={14} className="mr-1 text-gray-500" />
                {segment.replace(/-/g, " ")}
              </span>
            ) : (
              <Link
                href={href}
                className="flex items-center text-gray-600 hover:text-[#FB6B00] transition capitalize font-medium"
              >
                <Icon size={14} className="mr-1 text-gray-500" />
                {segment.replace(/-/g, " ")}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
