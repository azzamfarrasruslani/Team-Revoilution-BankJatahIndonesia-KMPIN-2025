"use client";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { supabase } from "@/lib/supabaseClient";
import { LogOut } from "lucide-react";
import { menuItems } from "./sidebarMenuItems"; // <-- import menuItems

export default function Sidebar({ sidebarOpen, onClose, role, session }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth/login");
  };

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
      </aside>
    </>
  );
}
