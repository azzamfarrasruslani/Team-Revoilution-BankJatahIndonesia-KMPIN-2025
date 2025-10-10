"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import AdminDashboard from "./admin/page";
import UnitDashboard from "./unit_bisnis/page";
import PelangganDashboard from "./pelanggan/page";

export default function DashboardPage() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setRole("guest");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error) console.error(error);
      else setRole(data.role);

      setLoading(false);
    };

    fetchRole();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  switch(role) {
    case "admin":
      return <AdminDashboard />;
    case "unit_bisnis":
      return <UnitDashboard />;
    case "pelanggan":
      return <PelangganDashboard />;
    default:
      return <p>Silakan login untuk mengakses dashboard.</p>;
  }
}
