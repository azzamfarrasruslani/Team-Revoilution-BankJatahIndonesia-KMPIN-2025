"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import UnitBisnisCard from "./components/UnitBisnisCard";
import HeroUnit from "./components/HeroUnit";

export default function UnitBisnisPage() {
  const [search, setSearch] = useState("");
  const [unitList, setUnitList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "unit_bisnis")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching unit bisnis:", error);
      else setUnitList(data);

      setLoading(false);
    };

    fetchUnits();
  }, []);

  const filteredUnits = unitList.filter(
    (unit) =>
      unit.nama.toLowerCase().includes(search.toLowerCase()) ||
      unit.email.toLowerCase().includes(search.toLowerCase()) ||
      unit.alamat.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroUnit search={search} setSearch={setSearch} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {loading ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            Memuat data unit bisnis...
          </div>
        ) : filteredUnits.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            Tidak ada unit bisnis yang cocok dengan pencarianmu.
          </div>
        ) : (
          filteredUnits.map((unit) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
            >
              <UnitBisnisCard unit={unit} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
