"use client";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  UploadCloud,
  Wallet,
  Users,
  ShieldCheck,
  HelpCircle,
  Gift,
  Layers,
  LogOut,
  QrCode,
} from "lucide-react";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabaseClient";

export default function Sidebar({ sidebarOpen, onClose, role, session }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  };

  const menuItems = [
    {
      label: "Beranda",
      icon: Home,
      href: "/dashboard",
      exact: true,
      roles: ["admin", "unit_bisnis", "pelanggan"],
    },
    {
      label: "QR Setoran Minyak",
      icon: QrCode,
      href: "/dashboard/pelanggan/setor-minyak",
      roles: ["pelanggan"],
    },
    {
      label: "Setor Minyak",
      icon: UploadCloud,
      href: "/dashboard/unit_bisnis/setor-minyak",
      roles: ["unit_bisnis"],
    },
    {
      label: "Wallet",
      icon: Wallet,
      href: "/dashboard/wallet",
      roles: ["pelanggan"],
    },
    {
      label: "Mitra",
      icon: Users,
      href: "/dashboard/mitra",
      roles: ["pelanggan"],
    },
    // {
    //   label: "Validasi",
    //   icon: ShieldCheck,
    //   href: "/dashboard/validasi",
    //   roles: ["admin", "unit_bisnis"],
    // },
    {
      label: "Tukar Poin",
      icon: Gift,
      href: "/dashboard/pelanggan/tukar-poin",
      roles: ["pelanggan"],
    },
    {
      label: "Program Jelantah",
      icon: Layers,
      href: "/dashboard/program-jelantah",
      roles: ["pelanggan", "unit_bisnis"],
    },
    {
      label: "Bantuan",
      icon: HelpCircle,
      href: "/dashboard/bantuan",
      roles: ["unit_bisnis", "pelanggan"],
    },
    {
      label: "User",
      icon: Users,
      href: "/dashboard/admin/users",
      roles: ["admin"],
    },
    {
      label: "Setoran Minyak",
      icon: Layers, 
      href: "/dashboard/admin/setoran",
      roles: ["admin"],
    },
  ];

  const logoutItem = { label: "Keluar", icon: LogOut, href: "/logout" };

  const renderNavItem = (item, isLogout = false) => {
    const Icon = item.icon;
    const isActive = item.exact
      ? pathname === item.href
      : pathname.startsWith(item.href);
    const commonClasses = `flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
      isActive
        ? "bg-[#FB6B00]/10 text-[#FB6B00] font-semibold"
        : "text-gray-700 hover:bg-gray-100"
    }`;

    const iconWrapper = (
      <div
        className={`p-2 rounded-md ${
          isActive ? "bg-[#FB6B00]/20" : "group-hover:bg-gray-200"
        }`}
      >
        <Icon size={18} />
      </div>
    );

    if (isLogout)
      return (
        <button
          key={item.label}
          onClick={handleLogout}
          className={commonClasses + " w-full text-left"}
        >
          {iconWrapper}
          <span className="text-sm">{item.label}</span>
        </button>
      );

    return (
      <Link key={item.href} href={item.href} className={commonClasses}>
        {iconWrapper}
        <span className="text-sm">{item.label}</span>
      </Link>
    );
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(role)
  );
  const userName = session?.user?.nama || session?.user?.email || "User";

  // Potong email/nama terlalu panjang
  const displayName =
    userName.length > 15 ? userName.slice(0, 15) + "..." : userName;

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200 shadow-md fixed inset-y-0 z-30">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-center">
          <Logo size={120} />
        </div>
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          {filteredMenuItems.map((item) => renderNavItem(item))}
        </nav>

        {/* User info + Logout di bawah sidebar */}
        <div className="px-4 py-4 border-t border-gray-200 flex flex-col gap-2">
          <ConfirmDialog
            trigger={
              <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 w-full text-left">
                <LogOut size={18} />
                <span className="text-sm">Keluar</span>
              </button>
            }
            title="Konfirmasi Logout"
            description="Apakah Anda yakin ingin keluar dari akun?"
            onConfirm={async () => {
              await supabase.auth.signOut();
              router.replace("/auth/login");
            }}
          />

          {/* Info user */}
          <div className="flex items-center gap-2">
            <div className="bg-[#FB6B00] text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{displayName}</span>
              <span className="text-xs text-gray-400 capitalize">
                {role || "pelanggan"}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-md z-40 transform transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-center">
          <Logo size={100} />
        </div>
        <nav className="flex-1 px-4 py-4 overflow-y-auto">
          {filteredMenuItems.map((item) => renderNavItem(item))}
        </nav>
        <div className="px-4 py-4 border-t border-gray-200 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-[#FB6B00] text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">
              {displayName.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{displayName}</span>
              <span className="text-xs text-gray-400 capitalize">
                {role || "pelanggan"}
              </span>
            </div>
          </div>
          {renderNavItem(logoutItem, true)}
        </div>
      </aside>
    </>
  );
}
