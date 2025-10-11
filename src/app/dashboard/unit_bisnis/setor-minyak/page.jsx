"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import IlustrasiSetor from "./components/IlustrasiSetor";
import FormSetoran from "./components/FormSetoran";

export default function SetorMinyakUnitPage() {
  const [unitSaldo, setUnitSaldo] = useState(0);

  useEffect(() => {
    const fetchUnitSaldo = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) throw authError;
        if (!user) throw new Error("Unit bisnis belum login");

        const { data: walletData, error: walletError } = await supabase
          .from("wallet")
          .select("saldo_deposit")
          .eq("user_id", user.id)
          .single(); // pakai single supaya selalu 1 row atau error

        // Jika wallet belum ada, buat baru dengan saldo 0
        if (walletError && walletError.code === "PGRST116") {
          await supabase.from("wallet").insert({
            user_id: user.id,
            saldo_deposit: 0,
            saldo_real: 0,
          });
          setUnitSaldo(0);
        } else if (walletError) {
          throw walletError;
        } else {
          setUnitSaldo(walletData?.saldo_deposit ?? 0);
        }
      } catch (err) {
        console.error("Gagal fetch unit saldo:", err instanceof Error ? err.message : err);
        setUnitSaldo(0);
      }
    };

    fetchUnitSaldo();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <IlustrasiSetor unitSaldo={unitSaldo} />
      <FormSetoran unitSaldo={unitSaldo} setUnitSaldo={setUnitSaldo} />
    </div>
  );
}
