import {
  Home,
  Upload,
  CreditCard,
  Users,
  CheckCircle,
  HelpCircle,
  Gift,
  Layers,
  LogOut,
  QrCode,
  Package,
} from "lucide-react";

export const menuItems = [
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
    icon: Upload, 
    href: "/dashboard/unit_bisnis/setor-minyak",
    roles: ["unit_bisnis"],
  },
  {
    label: "Riwayat Setoran",
    icon: Layers, 
    href: "/dashboard/unit_bisnis/riwayat-setoran",
    roles: ["unit_bisnis"],
  },
  {
    label: "Wallet",
    icon: CreditCard, 
    href: "/dashboard/wallet",
    roles: ["pelanggan"],
  },
  {
    label: "Daftar Unit Bisnis",
    icon: Users, 
    href: "/dashboard/pelanggan/unit-bisnis",
    roles: ["pelanggan"],
  },
  // {
  //   label: "Validasi",
  //   icon: CheckCircle, // lebih representatif dari ShieldCheck
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
    roles: ["pelanggan"],
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
    icon: CheckCircle, 
    href: "/dashboard/admin/setoran",
    roles: ["admin"],
  },
  {
    label: "Produk",
    icon: Package, 
    href: "/dashboard/admin/produk",
    roles: ["admin"],
  },
];
